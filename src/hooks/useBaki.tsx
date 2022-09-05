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
  updatezXAFBalance,
  updateZZARBalance,
  updateUserAddress,
  updateUserNetMint,
  updateGlobalNetMint,
  updateGlobalDebt,
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
      dispatch(updatezXAFBalance(balances.zXAF));
      getPosition();
    }
  }, [balances]);

  useEffect(() => {
    getWalletBalance();
  }, [contract]);

  const getRates = async (symbol: string) => {
    const result = await axios.get(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbol}&base=USD`
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
      const zXAF = await contract?.getBalance(config.zXAF);
      const ZZAR = await contract?.getBalance(config.zZAR);
      const ZNGN = await contract?.getBalance(config.zNGN);

      setBalances({
        ZUSD: Number(ZUSD?._hex),
        zXAF: Number(zXAF?._hex),
        ZZAR: Number(ZZAR?._hex),
        ZNGN: Number(ZNGN?._hex),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getPosition = async () => {
    // get user net mint
    const userNetMint = await contract?.getNetUserMintValue(userAddress);

    dispatch(updateUserNetMint(Number(userNetMint?._hex)));
    // get global net mint
    const globalNetMint = await contract?.getNetGlobalMintValue();
    dispatch(updateGlobalNetMint(Number(globalNetMint?._hex)));
    // get global debt
    let totalzUSD = await contract?.getTotalSupply(config.zUSD);
    let totalzNGN = await contract?.getTotalSupply(config.zNGN);
    let totalzXAF = await contract?.getTotalSupply(config.zXAF);
    let totalzZAR = await contract?.getTotalSupply(config.zZAR);
    let NGNUSDRate = await getRates("NGN");
    let XAFUSDRate = await getRates("XAF");
    let ZARUSDRate = await getRates("ZAR");
    const globalDebt =
      Number(totalzUSD?._hex) +
      Number(totalzNGN?._hex) * NGNUSDRate?.NGN +
      Number(totalzZAR?._hex) * ZARUSDRate?.ZAR +
      Number(totalzXAF?._hex) * XAFUSDRate?.XAF;
    dispatch(updateGlobalDebt(globalDebt));
    // get user debt
    const userDebt = await contract?.getUserDebtOutstanding();
    dispatch(updateUserDebt(Number(userDebt?._hex)));
    // get collateral Ratio
    const collaterizationRatio = await contract?.getCollaterizationRatio();
    dispatch(updateCollateralRatio(Number(collaterizationRatio?._hex)));
    // get total collateral
    const totalCollateral = await contract?.getUserCollateralBalance();
    dispatch(updateTotalCollateral(Number(totalCollateral?._hex)));
  };

  const deposit = async (depositAmount: number, mintAmount: number) => {
    const rates: any[] = [];
    try {
      getRates("NGN").then((data: any) => {
        rates.push(data?.NGN);
        getRates("XAF").then((data: any) => {
          rates.push(data?.XAF);
          getRates("ZAR").then(async (data: any) => {
            rates.push(data?.ZAR);
            try {
              contract
                ?.depositAndMint(
                  depositAmount,
                  mintAmount,
                  Math.floor(rates[0]),
                  Math.floor(rates[1]),
                  Math.floor(rates[2])
                )
                .then(() => {
                  alert("Transaction was successful !!");
                  window.location.reload();
                });
            } catch (error) {
              alert("Transaction was unsuccessful !!");
              console.error(error);
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  const repay = async (
    _amountToRepay: number,
    _amountToWithdraw: number,
    _zToken: string
  ) => {
    try {
      await contract
        .repayAndWithdraw(
          _amountToRepay,
          _amountToWithdraw,
          _zToken,
          415,
          415,
          415,
          415
        )
        .then(() => {
          alert("Transaction was successful !!");
          window.location.reload();
        });
    } catch (error) {
      alert("Transaction was unsuccessful !!");
      console.error(error);
    }
  };
  const swap = async (
    _amount: number,
    _fromzToken: string,
    _tozToken: string,
    _fromUSDRate: number,
    _toUSDRate: number
  ) => {
    let from = "";
    let to = "";
    if (_fromzToken === "zUSD") {
      from = config.zUSD;
    } else if (_fromzToken === "zXAF") {
      from = config.zXAF;
    } else if (_fromzToken === "zNGN") {
      from = config.zNGN;
    } else if (_fromzToken === "zZAR") {
      from = config.zZAR;
    }
    if (_tozToken === "zUSD") {
      to = config.zUSD;
    } else if (_tozToken === "zXAF") {
      to = config.zXAF;
    } else if (_tozToken === "zNGN") {
      to = config.zNGN;
    } else if (_tozToken === "zZAR") {
      to = config.zZAR;
    }
    try {
      const result = await contract.swap(_amount, from, to, 415, 415);
      console.log(result);
      alert("Transaction was successfully !!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed !!");
    }

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
