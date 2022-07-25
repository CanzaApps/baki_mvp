export const config: any = {
  celoMainnetChainID: 42220,
  alfajoresChainID: 44787,
  vaultAddress: "0x198Acc272A58884541cC020D86a80Af4b83E8303",
  zUSD: "0xebf9897298CA091d7eCdFDC9319c9d83Dc074422",
  zNGN: "0x708A3a6d8cb50a51A76A7318EAE0023A0c1629B4",
  zCFA: "0xc487269508DcCd9b591AD25D4C1e31dFad553C7F",
  zZAR: "0x9204DE3eA0009CC54D01B193cc68E9a7DfacA036",
  cUSD: "0xa93B20218175918B750f8bd39E5B28426DFA846b",
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
