import { useEffect, useState } from "react";
import useBaki from "./useBaki";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { config } from "../config";
import faucet from "../contracts/faucet.json";

declare const window: any;

const useFaucet = () => {
  const { getWalletBalance } = useBaki();
  const { userAddress } = useSelector((state: any) => state.baki);
  const [address, setAddress] = useState<string>();
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.faucetAddress, faucet, signer));
    }
  }, [provider]);
  useEffect(() => {
    getWalletBalance();
  }, []);
  const getCUSD = async () => {
    try {
      await contract.getCUSD(address);
      alert("Operation completed successfully !!");
    } catch (error) {
      console.error(error);
      alert("Operation failed !!");
    }
  };
  const myWallet = () => {
    setAddress(userAddress);
  };
  return { getCUSD, address, setAddress, myWallet };
};

export default useFaucet;
