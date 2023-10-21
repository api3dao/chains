import { z } from 'zod';

export const chainExplorerAPIKeySchema = z.object({
  required: z.boolean(),
  hardhatEtherscanAlias: z.string().optional(),
});

export const chainExplorerAPISchema = z.object({
  key: chainExplorerAPIKeySchema,
  url: z.string().url(),
});

export const chainExplorerSchema = z.object({
  api: chainExplorerAPISchema.optional(),
  browserUrl: z.string().url(),
});

export const chainProviderSchema = z
  .object({
    alias: z.string(),
    homepageUrl: z.string().url().optional(),
    rpcUrl: z.string().url().optional(),
  })
  .refine(
    // Either rpcUrl or homepageUrl must be present
    (provider) => provider.rpcUrl || provider.homepageUrl,
    { message: 'rpcUrl or homepageUrl is required' }
  );

export const chainSchema = z.object({
  alias: z.string(),
  name: z.string(),
  // Most chain IDs are numbers, but to remain flexible this has purposefully been kept as a string
  // It can be adjusted if we want to support chains that don't use numbers.
  // See: https://github.com/api3dao/chains/pull/1#discussion_r1161102392
  id: z.string().regex(/^\d+$/),
  providers: z.array(chainProviderSchema),
  symbol: z.string(),
  testnet: z.boolean(),
  explorer: chainExplorerSchema,
  blockTimeMs: z.number().positive(),
});

export type Chain = z.infer<typeof chainSchema>;
export type ChainExplorer = z.infer<typeof chainExplorerSchema>;
export type ChainExplorerAPI = z.infer<typeof chainExplorerAPISchema>;
export type ChainExplorerAPIKey = z.infer<typeof chainExplorerAPIKeySchema>;

export interface HardhatNetworksConfig {
  [key: string]: {
    accounts: { mnemonic: string };
    chainId: number;
    url: string;
  };
}

// https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#adding-support-for-other-networks
export interface HardhatEtherscanCustomChain {
  network: string;
  chainId: number;
  urls: { apiURL: string; browserURL: string };
}

export interface HardhatEtherscanConfig {
  apiKey: { [alias: string]: string };
  customChains: HardhatEtherscanCustomChain[];
}
