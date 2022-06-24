import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { config } from "../config";
import Vault from "../contracts/Vault.json";
declare const window: any;

const useBaki = () => {
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

  const deposit = async (depositAmount: number, mintAmount: number) => {
    try {
      const result = await contract.deposit(depositAmount, mintAmount);

      return result;
    } catch (err) {
      console.log(err);
    }
  };
  const repay = async (
    _amountToRepay: number,
    _amountToWithdraw: number,
    _zToken: string,
    rate: number
  ) => {
    try {
      const result = await contract.repayAndWithdraw(
        _amountToRepay,
        _amountToWithdraw,
        _zToken,
        rate
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const swap = async (
    _amount: number,
    _fromzToken: string,
    _tozToken: string,
    rate: number
  ) => {
    try {
      const result = await contract.swap(_amount, _fromzToken, _tozToken, rate);
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const mint = async (mintAmount: number) => {
    const result = await contract.deposit(0, mintAmount);
    return result;
  };

  return {
    deposit,
    repay,
    swap,
    mint,
  };
};

export default useBaki;
