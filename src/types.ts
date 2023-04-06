import { z } from 'zod';

export const ChainExplorerAPIKeySchema = z.object({
  required: z.boolean(),
  hardhatEtherscanAlias: z.string().optional(),
});

export const ChainExplorerAPISchema = z.object({
  key: ChainExplorerAPIKeySchema,
  url: z.string().url(),
});

export const ChainExplorerSchema = z.object({
  api: ChainExplorerAPISchema.optional(),
  browserUrl: z.string().url(),
});

export const ChainSchema = z.object({
  alias: z.string(),
  name: z.string(),
  // TODO: should id rather be a number?
  id: z.string().regex(/^\d+$/),
  providerUrl: z.string().url(),
  symbol: z.string(),
  explorer: ChainExplorerSchema,
});

export type Chain = z.infer<typeof ChainSchema>;
export type ChainExplorer = z.infer<typeof ChainExplorerSchema>;
export type ChainExplorerAPI = z.infer<typeof ChainExplorerAPISchema>;
export type ChainExplorerAPIKey = z.infer<typeof ChainExplorerAPIKeySchema>;

export interface HardhatConfigNetworks {
  [key: string]: {
    accounts: { mnemonic: '' };
    chainId: number;
    url: string;
  }
}

export interface HardhatEtherscanNetworks {
  apiKey: { [etherscanAlias: string]: string; }
  customChains: {
    network: string;
    chainId: number;
    urls: { apiURL: string; browserURL: string; }
  }[]
}
