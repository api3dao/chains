import fs from 'fs';
import path from 'path';
import { createPublicClient, http } from 'viem';
import { CHAINS } from '../src';

const BLOCK_LOOKBACK = BigInt(400_000);

const specifiedChain = CHAINS.find((chain) => chain.alias === process.env.CHAIN);
const chains = specifiedChain ? [specifiedChain] : CHAINS;

async function calculateAverageBlockTimes(): Promise<void> {
  const results = await Promise.allSettled(
    chains.map(async (chain) => {
      const client = createPublicClient({ transport: http(chain.providerUrl) });
      const chainId = await client.getChainId();
      if (chainId.toString() !== chain.id) {
        throw new Error(`${chain.alias} provider reports chain ID as ${chainId}, while it is defined as ${chain.id}`);
      }

      const latestBlock = await client.getBlock({ blockTag: 'latest' });
      if (!latestBlock) {
        throw new Error(`Failed to get latest block for ${chain.alias}.`);
      }

      const latestBlockNumber = latestBlock.number;
      const blockDiff = latestBlockNumber - BLOCK_LOOKBACK;

      const referenceBlock = await client.getBlock({ blockNumber: blockDiff });
      if (!referenceBlock) {
        throw new Error(`Failed to get reference block for ${chain.alias}.`);
      }

      const referenceBlockBlockTimestamp = referenceBlock.timestamp * BigInt(1000);
      const latestBlockTimestamp = latestBlock.timestamp * BigInt(1000);
      const timeDiff = latestBlockTimestamp - referenceBlockBlockTimestamp;
      const blockTimeMs = Math.ceil(Number(timeDiff / BLOCK_LOOKBACK));

      if (blockTimeMs) {
        const filePath = path.join(__dirname, `../chains/${chain.alias}.json`);
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        fs.writeFileSync(filePath, JSON.stringify({ ...fileContent, blockTimeMs }, null, 2));
      }

      return { alias: chain.alias, blockTimeMs };
    })
  );

  console.log(results.map((result) => (result.status === 'fulfilled' ? result.value : result.reason)));
}

calculateAverageBlockTimes();
