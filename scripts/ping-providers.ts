import { WebClient } from '@slack/web-api';
import { type PublicClient, createPublicClient, http } from 'viem';
import { go } from '@api3/promise-utils';
import { CHAINS, type Chain } from '../src';

const specifiedChain = CHAINS.find((chain) => chain.alias === process.env.CHAIN);
const chains = specifiedChain ? [specifiedChain] : CHAINS;

// Set the following environment variables to also notify to Slack
const slackToken = process.env.SLACK_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL;
const slackClient = new WebClient(slackToken);

async function main(): Promise<PromiseSettledResult<void>[]> {
  const promises = chains.map(async (chain) => {
    // Skip the provider check for chains not supporting dAPIs
    if (chain.skipProviderCheck) return;

    // Every chain should have at least a default provider with an RPC URL
    const defaultProvider = chain.providers.find((p) => p.alias === 'default')!;
    const client = createPublicClient({ transport: http(defaultProvider.rpcUrl!) });

    await validateChain(client, chain);
  });

  return await Promise.allSettled(promises);
}

async function validateChain(client: PublicClient, chain: Chain): Promise<void> {
  const chainIdRes = await go(() => client.getChainId(), { retries: 1 });
  if (!chainIdRes.success) {
    throw new Error(`Unable to fetch chain ID for ${chain.alias}`);
  }
  const chainId = chainIdRes.data;
  if (chainId.toString() !== chain.id) {
    throw new Error(`${chain.alias} provider reports chain ID as ${chainId}, while it is defined as ${chain.id}`);
  }
}

async function notifySlack(errors: Error[]): Promise<Error[]> {
  if (errors.length > 0 && slackChannel) {
    const text = errors.reduce((acc, error) => `${acc}\n${error.message}`, '');
    await slackClient.chat.postMessage({ channel: slackChannel, text });
  }
  return errors;
}

main()
  .then((results) => {
    const rejectedPromises = results.filter((res) => res.status === 'rejected') as PromiseRejectedResult[];
    const errors = rejectedPromises.map((res) => res.reason) as Error[];
    return notifySlack(errors);
  })
  .then((errors) => {
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error.message);
      });
      throw new Error('At least one chain did not pass all provider checks');
    }
    return;
  })
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
