/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import { useDispatch } from "react-redux";
import vault from "../contracts/vault.json";
import cUSD from "../contracts/cUSD.json";
import { ethers } from "ethers";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  updateZUSDBalance,
  updateZNGNBalance,
  updateZCFABalance,
  updateZZARBalance,
  updateUserAddress,
  updateUserNetMint,
  updateGlobalNetMint,
  updateGlobalDebt,
  updateUserShare,
  updateUserDebt,
  updateTotalCollateral,
  updateCollateralRatio,
} from "../redux/reducers/bakiReducer";
declare const window: any;

axios.defaults.headers.common["apikey"] = config.exchangeRatesAPIKEY;

const useBaki = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { userAddress } = useSelector((state: any) => state.baki);
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [balances, setBalances] = useState<any>();
  const [contractName, setContractName] = useState<any>(null);

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
    dispatch(updateUserAddress(window.localStorage.getItem("baki_user")));
  }, []);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.vaultAddress, vault, signer));
    }
  }, [provider]);

  useEffect(() => {
    if (balances) {
      dispatch(updateZZARBalance(balances.ZZAR));
      dispatch(updateZUSDBalance(balances.ZUSD));
      dispatch(updateZNGNBalance(balances.ZNGN));
      dispatch(updateZCFABalance(balances.ZCFA));
      getPosition();
    }
  }, [balances]);

  useEffect(() => {
    getWalletBalance();
  }, [contract]);

  const getRates = async () => {
    const result = await axios.get(
      "https://api.apilayer.com/exchangerates_data/latest?symbols=NGN&base=USD"
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
  const getWalletBalance = async () => {
    try {
      const ZUSD = await contract?.getBalance(config.zUSD);
      const ZCFA = await contract?.getBalance(config.zCFA);
      const ZZAR = await contract?.getBalance(config.zZAR);
      const ZNGN = await contract?.getBalance(config.zNGN);
      setBalances({
        ZUSD: ZUSD.toNumber(),
        ZCFA: ZCFA.toNumber(),
        ZZAR: ZZAR.toNumber(),
        ZNGN: ZNGN.toNumber(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPosition = async () => {
    // get user net mint
    const userNetMint = await contract.getNetUserMintValue(userAddress);
    dispatch(updateUserNetMint(userNetMint.toNumber()));
    // get global net mint
    const globalNetMint = await contract.getNetGlobalMintValue();
    dispatch(updateGlobalNetMint(globalNetMint.toNumber()));
    // get global debt
    // const globalDebt = await contract.getGlobalDebt();
    // dispatch(updateGlobalDebt(globalDebt));
    // get user share
    // get user debt
    const userDebt = await contract.getUserDebtOutstanding();
    dispatch(updateUserDebt(userDebt.toNumber()));
    // get collateral Ratio
    const collaterizationRatio = await contract.getCollaterizationRatio();
    dispatch(updateCollateralRatio(collaterizationRatio.toNumber()));
    // get total collateral
    const totalCollateral = await contract.getUserCollateralBalance();
    dispatch(updateTotalCollateral(totalCollateral.toNumber()));
  };

  const deposit = async (depositAmount: number, mintAmount: number) => {
    try {
      const result = await contract?.depositAndMint(
        depositAmount,
        mintAmount,
        415,
        415,
        415
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const repay = async (
    _amountToRepay: number,
    _amountToWithdraw: number,
    _zToken: string
  ) => {
    try {
      const result = await contract.repayAndWithdraw(
        _amountToRepay,
        _amountToWithdraw,
        _zToken,
        415,
        415,
        415,
        415
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const swap = async (
    _amount: number,
    _fromzToken: string,
    _tozToken: string
  ) => {
    let from = "";
    let to = "";
    if (_fromzToken === "zUSD") {
      from = config.zUSD;
    } else if (_fromzToken === "zCFA") {
      from = config.zCFA;
    } else if (_fromzToken === "zNGN") {
      from = config.zNGN;
    } else if (_fromzToken === "zZAR") {
      from = config.zZAR;
    }
    if (_tozToken === "zUSD") {
      to = config.zUSD;
    } else if (_tozToken === "zCFA") {
      to = config.zCFA;
    } else if (_tozToken === "zNGN") {
      to = config.zNGN;
    } else if (_tozToken === "zZAR") {
      to = config.zZAR;
    }
    const result = await contract.swap(_amount, from, to, 415, 415);
    console.log(result);

    // getRates().then(rates => {
    //   console.log(rates);
    // });
  };

  return {
    connectWallet,
    changeNetwork,
    getWalletBalance,
    deposit,
    repay,
    swap,
  };
};

export default useBaki;
