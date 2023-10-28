import { PublicClient, createPublicClient, http } from 'viem';
import { go } from '@api3/promise-utils';
import { getScriptChains } from './utils/cli';
import { postSlackMessage } from './utils/slack';
import { Chain } from '../src';

// A somewhat arbitrary multiplier applied to the average block ms to determine whether
// or not the reported latest block is recent or not
const BLOCK_TOLERANCE_MULTIPLIER = 8;

async function main(): Promise<PromiseSettledResult<void>[]> {
  const chains = getScriptChains();

  const promises = chains.map(async (chain) => {
    const client = createPublicClient({ transport: http(chain.providerUrl) });

    await validateChainId(client, chain);
    await go(() => validateLatestBlock(client, chain), { retries: 3, delay: { type: 'static', delayMs: 60_000 } });
  });

  return await Promise.allSettled(promises);
}

async function validateChainId(client: PublicClient, chain: Chain): Promise<void> {
  const chainIdRes = await go(() => client.getChainId(), { retries: 1 });
  if (!chainIdRes.success) {
    throw new Error(`Unable to fetch chain ID for ${chain.alias}`);
  }
  const chainId = chainIdRes.data;
  if (chainId.toString() !== chain.id) {
    throw new Error(`${chain.alias} provider reports chain ID as ${chainId}, while it is defined as ${chain.id}`);
  }
}

async function validateLatestBlock(client: PublicClient, chain: Chain): Promise<void> {
  const blockRes = await go(() => client.getBlock({ blockTag: 'latest' }), { retries: 1 });
  if (!blockRes.success) {
    throw new Error(`Unable to fetch latest block for ${chain.alias}`);
  }
  const block = blockRes.data;
  const blockTimestamp = block.timestamp;
  const deltaTime = Number(BigInt(Math.floor(new Date().getTime() / 1000)) - blockTimestamp);
  // The block time in seconds multiplied by an arbitrary tolerance multiplier
  const tolerance = (chain.blockTimeMs / 1_000) * BLOCK_TOLERANCE_MULTIPLIER;
  if (Math.abs(deltaTime) > tolerance) {
    throw new Error(`${chain.alias} latest block timestamp is ${deltaTime} seconds behind the system clock`);
  }
}

async function notifySlack(errors: Error[]): Promise<Error[]> {
  if (errors.length > 0) {
    const text = errors.reduce((acc, error) => `${acc}\n${error.message}`, '');
    await postSlackMessage(text);
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
  })
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
