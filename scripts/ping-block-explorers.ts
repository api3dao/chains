import axios from 'axios';
import { go } from '@api3/promise-utils';
import { getScriptChains } from './utils/cli';
import { postSlackMessage } from './utils/slack';
import { Chain } from '../src';

// The amount of time each chain has to respond
const TIMEOUT_MS = 10_000;

async function main(): Promise<PromiseSettledResult<void>[]> {
  const chains = getScriptChains();

  const promises = chains.map(async (chain) => {
    await pingExplorerApi(chain);
  });

  return await Promise.allSettled(promises);
}

async function pingExplorerApi(chain: Chain): Promise<void> {
  const url = chain.explorer.api?.url;
  if (url) {
    const res = await go(() => axios.head(`${url}?module=account&action=eth_get_balance&address=0x0000000000000000000000000000000000000000`, { timeout: TIMEOUT_MS }), { totalTimeoutMs: TIMEOUT_MS });
    if (!res.success || res.error || res.data.status >= 400) {
      throw new Error(
        `Unable to get a successful block explorer API response for chain:${chain.alias} url:${url} error:${res.error?.message}`
      );
    }
  }
  return Promise.resolve();
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
