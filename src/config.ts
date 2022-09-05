export const config: any = {
  celoMainnetChainID: 42220,
  alfajoresChainID: 44787,
  vaultAddress: "0xA5d2f2AE7bd05fF9A66f4e3c8E67Ee785fa43518",
  faucetAddress: "0x30702c6A7BB9dd7cC812EFf62F26f76e36DC5A33",
  zUSD: "0x5Caf144a0076cF961f5004Afa96889CA9CAb1fb2",
  zNGN: "0x440b250627C5aC09f2927820a7611B7402bC204A",
  zXAF: "0x2d550bBfcFDa2399A1A1C19E500E58a7C50a8739",
  zZAR: "0x36714d4Ba0df63407f31f043Fa3BCF3dABEcFA78",
  cUSD: "0x072BdcfAae4E2292eEc87B67189d495983dd80ca",
  networks: {
    cUSD: {
      chainId: `0x${Number(44787).toString(16)}`,
      rpcUrls: ["https://alfajores-forno.celo-testnet.org/"],
      chainName: "Alfajores Testnet",
      nativeCurrency: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18,
      },
      blockExplorerUrls: ["https://alfajoresblockscout.celo-testnet.org"],
    },
    USDK: {
      chainId: `0x${Number(65).toString(16)}`,
      rpcUrls: ["https://exchaintestrpc.okex.org/"],
      chainName: "OKExChain Testnet",
      nativeCurrency: {
        name: "OKT",
        symbol: "OKT",
        decimals: 18,
      },
      blockExplorerUrls: ["https://www.oklink.com/"],
    },
    AVAX: {
      chainId: `0x${Number(43113).toString(16)}`,
      rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
      chainName: "Avalanche Fuji Testnet",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },

      blockExplorerUrls: ["https://explorer.avax.network/"],
    },
  },
  exchangeRatesAPIKEY: "jlv8wq9FomD9CdRDAYl2XwZpSpxvXxBi",
  coinlayerAPIKEY: "49505e855f2ab02b59638b6895755f23",
};
