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

export const chainSchema = z.object({
  alias: z.string(),
  name: z.string(),
  id: z.string().regex(/^\d+$/),
  providerUrl: z.string().url(),
  symbol: z.string(),
  explorer: chainExplorerSchema,
});

export type Chain = z.infer<typeof chainSchema>;
export type ChainExplorer = z.infer<typeof chainExplorerSchema>;
export type ChainExplorerAPI = z.infer<typeof chainExplorerAPISchema>;
export type ChainExplorerAPIKey = z.infer<typeof chainExplorerAPIKeySchema>;

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
