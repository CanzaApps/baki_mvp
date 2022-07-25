import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import Vault from "../contracts/Vault.json";
import { ethers } from "ethers";
import axios from "axios";
declare const window: any;

axios.defaults.baseURL = "https://api.apilayer.com";
axios.defaults.headers.common["apikey"] = config.exchangeRatesAPIKEY;

const useBaki = () => {
  let navigate = useNavigate();
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, Vault, signer));
    }
  }, [provider]);

  const getRates = async () => {
    const result = await axios.get(
      "/exchangerates_data/latest?symbols=NGN,XAF,ZAR&base=USD"
    );
    return result.data.rates;
  };

  const connectWallet = async () => {
    provider.send("eth_requestAccounts").then((result: Array<string>) => {
      localStorage.setItem("baki_user", result[0]);
      navigate("/mint");
    });
  };
  const changeNetwork = async (network: any) => {
    provider.send("wallet_addEthereumChain", [config.networks[network]]);
    connectWallet();
  };
  const getWalletBallance = async () => {};

  const deposit = async (depositAmount: number, mintAmount: number) => {};
  const repay = async (
    _amountToRepay: number,
    _amountToWithdraw: number,
    _zToken: string,
    rate: number
  ) => {};
  const swap = async (
    _amount: number,
    _fromzToken: string,
    _tozToken: string
  ) => {
    getRates().then(rates => {
      console.log(rates);
    });
  };
  const mint = async (mintAmount: number) => {};

  return {
    connectWallet,
    changeNetwork,
    getWalletBallance,
    deposit,
    repay,
    swap,
    mint,
  };
};

export default useBaki;
