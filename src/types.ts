import { providers } from 'ethers'

export interface Token {
  address: string
  overrides?: {
    // This is set to a string for l2 tokens and a map for
    // l1 tokens in order to map from l1 to the appropriate
    // l2 bridge.
    bridge?: string | Partial<Record<L2Chain, string>>
    name?: string
    symbol?: string
    decimals?: number
  }
}

/*
 * Supported chains for the tokenlist
 * If adding a new chain consider keeping the name
 * consistent with wagmi
 * @see https://github.com/wagmi-dev/references/blob/main/packages/chains/src/optimismGoerli.ts
 */
export type Chain =
  | 'ethereum'
  | 'optimism'
  | 'base'
  | 'unichain'
  | 'optimism-sepolia'
  | 'base-sepolia'
  | 'unichain-sepolia'
  | 'sepolia'
  | 'mode'
  | 'lisk'
  | 'lisk-sepolia'
  | 'redstone'
  | 'metall2'
  | 'metall2-sepolia'
  | 'soneium'
  | 'soneium-minato'
  | 'celo'
  | 'swellchain'
  | 'ink'
  | 'ink-sepolia'
  | 'worldchain'
  | 'worldchain-sepolia'
const l2Chains = [
  'optimism',
  'optimism-sepolia',
  'base',
  'base-sepolia',
  'unichain',
  'unichain-sepolia',
  'mode',
  'lisk',
  'lisk-sepolia',
  'redstone',
  'metall2',
  'metall2-sepolia',
  'soneium',
  'soneium-minato',
  'celo',
  'swellchain',
  'ink',
  'ink-sepolia',
  'worldchain',
  'worldchain-sepolia',
] as const
export type L2Chain = typeof l2Chains[number]

export const isL2Chain = (chain: string): chain is L2Chain => {
  return l2Chains.includes(chain as L2Chain)
}

export const isL1Chain = (chain: string): chain is L1Chain => !isL2Chain(chain)

export type L1Chain = 'ethereum' | 'sepolia'

export interface TokenData {
  nonstandard?: boolean
  nobridge?: boolean
  twitter?: string
  name: string
  symbol: string
  decimals: number
  description: string
  website: string
  tokens: Partial<Record<Chain, Token>>
}

export interface ExpectedMismatches {
  symbol?: string
  name?: string
}

export interface ValidationResult {
  type: 'error' | 'warning'
  message: string
}

export interface Network {
  id: number
  name: string
  provider: providers.BaseProvider
  layer: number
}
