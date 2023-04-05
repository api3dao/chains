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
  id: z.string().regex(/^\d+$/),
  providerUrl: z.string().url(),
  symbol: z.string(),
  explorer: ChainExplorerSchema,
});

export type Chain = z.infer<typeof ChainSchema>;
export type ChainExplorer = z.infer<typeof ChainExplorerSchema>;
export type ChainExplorerAPI = z.infer<typeof ChainExplorerAPISchema>;
export type ChainExplorerAPIKey = z.infer<typeof ChainExplorerAPIKeySchema>;
