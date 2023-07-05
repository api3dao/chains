import fs from 'fs';
import path from 'path';
import { JsonRpcProvider } from 'ethers';
import { CHAINS } from '../src';

const BLOCK_LOOKBACK = 400_000;

async function calculateAverageBlockTimes(): Promise<void> {
  const results = await Promise.allSettled(
    CHAINS.map(async (chain) => {
      const provider = new JsonRpcProvider(chain.providerUrl);
      const chainId = (await provider.getNetwork()).chainId;
      if (chainId.toString() !== chain.id) {
        throw new Error(
          `${chain.alias} provider reports chain ID to be ${chainId}, while it is defined to be ${chain.id}`
        );
      }

      const latestBlock = await provider.getBlock('latest');
      if (!latestBlock) {
        throw new Error(`Failed to get latest block for ${chain.alias}.`);
      }

      const latestBlockNumber = latestBlock.number;
      const latestBlockTimestamp = latestBlock.timestamp * 1000;

      const blockDiff = latestBlockNumber - BLOCK_LOOKBACK;
      const referenceBlock = await provider.getBlock(blockDiff);
      if (!latestBlock || !referenceBlock) {
        throw new Error(`Failed to get reference block for ${chain.alias}.`);
      }

      const referenceBlockBlockTimestamp = referenceBlock.timestamp * 1000;
      const timeDiff = latestBlockTimestamp - referenceBlockBlockTimestamp;
      const blockTimeMs = Math.ceil(timeDiff / BLOCK_LOOKBACK);

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
