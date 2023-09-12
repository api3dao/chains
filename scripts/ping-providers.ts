import { WebClient } from '@slack/web-api';
import { createPublicClient, http } from 'viem';
import { CHAINS } from '../src';

const specifiedChain = CHAINS.find((chain) => chain.alias === process.env.CHAIN);
const chains = specifiedChain ? [specifiedChain] : CHAINS;

// Set the following environment variables to also notify to Slack
const slackToken = process.env.SLACK_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL;
const slackClient = new WebClient(slackToken);

async function pingAll(): Promise<PromiseSettledResult<void>[]> {
  const promises = chains.map(async (chain) => {
    const client = createPublicClient({ transport: http(chain.providerUrl) });

    const chainId = await client.getChainId();
    if (chainId.toString() !== chain.id) {
      throw new Error(`${chain.alias} provider reports chain ID as ${chainId}, while it is defined as ${chain.id}`);
    }

    const block = await client.getBlock({ blockTag: 'latest' });
    const blockTimestamp = block.timestamp;
    const deltaTime = Number(BigInt(Math.floor(new Date().getTime() / 1000)) - blockTimestamp);
    const tolerance = 5 * 60; // 5 minutes
    if (Math.abs(deltaTime) > tolerance) {
      throw new Error(`${chain.alias} latest block timestamp is ${deltaTime} seconds behind the system clock`);
    }
  });

  return await Promise.allSettled(promises);
}

async function notifySlack(errors: Error[]): Promise<Error[]> {
  if (errors.length > 0 && slackChannel) {
    const text = errors.reduce((acc, error) => `${acc}\n${error.message}`, '');
    await slackClient.chat.postMessage({ channel: slackChannel, text });
  }
  return errors;
}

pingAll()
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
  })
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
