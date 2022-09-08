import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CUSD from "../assets/cUSD.png";
import useBaki from "../hooks/useBaki";
import AVAX from "../assets/avax.png";
import USDK from "../assets/usdk.png";
import ZUSD from "../assets/ZUSD.png";
import { config } from "../config";
import { ethers } from "ethers";
import cUSD from "../contracts/cUSD.json";
import redstone from "redstone-api";
import { BiChevronDown } from "react-icons/bi";

import axios from "axios";
import { updateCollateral } from "../redux/reducers/bakiReducer";
axios.defaults.baseURL = `https://api.coinlayer.com/api/live?access_key=${config.coinlayerAPIKEY}`;
declare const window: any;

const MintComponent: FC = (): JSX.Element => {
  const [depositAmount, setDepositAmount] = useState<any>();
  const [mintAmount, setMintAmount] = useState<any>();
  const { deposit } = useBaki();
  const [isInputOpen, setInputIsOpen] = useState<boolean>(false);
  const [avaxRate, setAvaxRate] = useState<any>(false);
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { collateralRatio, totalCollateral, userDebt, userAddress } =
    useSelector((state: any) => state.baki);
  const [collaterals] = useState([
    {
      name: "cUSD",
      image: CUSD,
    },
  ]);

  const [selectedInput, setSelectedInput] = useState<string>(
    collaterals[0].name
  );
  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(config.cUSD, cUSD, signer));
    }
  }, [provider]);

  const handleInputSelect = () => {
    setInputIsOpen(!isInputOpen);
  };
  const getAvaxRate = async () => {
    const price = await redstone.getPrice("AVAX");
    setAvaxRate(price.value);
  };

  const handleDeposit = async () => {
    if (depositAmount && mintAmount) {
      setLoading(true);
      const multiple = 10 ** 18;
      let amount = BigInt(JSON.stringify(depositAmount * multiple));

      await contract.approve(config.vaultAddress, amount);
      try {
        await deposit(depositAmount, mintAmount);
        setDepositAmount(0);
        setMintAmount(0);
        setLoading(false);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (selectedInput === "AVAX") {
      getAvaxRate();
    }
  }, [selectedInput]);

  const calculateValue = (percentage: number) => {
    if (depositAmount) {
      let colBalance: any = totalCollateral * 10 ** -18;
      let debt = userDebt * 10 ** -18;
      let colRatio = 1.5;
      let val2 = (colBalance + Number(depositAmount)) / colRatio;
      let val3 = val2 - debt;

      let maxVal = Math.max(0, val3);
      setMintAmount(maxVal * percentage);
    }
  };
  return (
    <div className=" w-95 shadow-md rounded-lg mt-7">
      <div className="p-2 w-full justify-center items-center rounded-lg">
        <p className="font-bold">Mint</p>
        <div className="mt-10">
          <div className="mt-10">
            <label className="text-sm">Deposit Collateral</label>

            <SelectCollateral
              defaultToken={collaterals[0]}
              setSelectedToken={setSelectedInput}
              setIsOpen={setInputIsOpen}
              isOpen={isInputOpen}
              handleSelect={handleInputSelect}
              tokens={collaterals}
              value={depositAmount}
              updateCollateralValue={setDepositAmount}
            />
          </div>
        </div>
        <div className="mt-10">
          <label className="text-sm">Mint</label>

          <div className="flex border-2 p-2 rounded-lg">
            <input
              type="text"
              placeholder="0.0"
              value={mintAmount}
              onChange={e => setMintAmount(e.target.value)}
              className="w-full focus:outline-none"
            />

            <div>
              <img src={ZUSD} alt="" className="h-7" />
            </div>
          </div>
        </div>
        <div className="flex justify-around">
          <button
            className="w-1/3 mx-1 chip"
            onClick={() => calculateValue(10 / 100)}
          >
            10 %
          </button>
          <button
            className="w-1/3 mx-1 chip"
            onClick={() => calculateValue(25 / 100)}
          >
            25 %
          </button>
          <button
            className="w-1/3 mx-1 chip"
            onClick={() => calculateValue(50 / 100)}
          >
            50 %
          </button>
          <button
            className="w-1/3 mx-1 chip"
            onClick={() => calculateValue(75 / 100)}
          >
            75 %
          </button>
          <div className="chip">
            <input
              type="text"
              className="focus:outline-none"
              placeholder="Custom"
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
              onChange={e => calculateValue(Number(e.target.value) / 100)}
            />
            %
          </div>
        </div>
        <div className="text-sm mt-2 flex justify-center">
          <div className="p-2">
            <p>Total Collateral</p>
            <p className="font-bold text-center">
              {(totalCollateral * 10 ** -18).toFixed(2)} <b>{selectedInput}</b>
            </p>
          </div>
          <div className="p-2">
            <p>Total Debt</p>
            <p className="font-bold text-center">
              {(userDebt * 10 ** -18).toFixed(2)} zUSD
            </p>
          </div>
          <div className="p-2">
            <p>Collateral Ratio:</p>
            <p className="font-bold text-center">
              {collateralRatio.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="pt-3">
          <p>
            <span className="p-2">Price:</span>
            {selectedInput === "AVAX" ? avaxRate.toString().slice(0, 6) : "1"}
            <b>zUSD</b> = 1<b>{selectedInput}</b>
          </p>
        </div>
        <button className="mint-btn" onClick={handleDeposit}>
          {loading ? "Loading..." : "Deposit & Mint"}
        </button>
      </div>
    </div>
  );
};

interface Props {
  tokens: any;
  isOpen: boolean;
  handleSelect: any;
  setIsOpen: any;
  setSelectedToken: any;
  defaultToken: any;
  value: number;
  updateCollateralValue: any;
}
const SelectCollateral: FC<Props> = ({
  tokens,
  isOpen,
  handleSelect,
  setIsOpen,
  setSelectedToken,
  defaultToken,
  value,
  updateCollateralValue,
}): JSX.Element => {
  const [selectedTokenImg, setSelectedTokenImg] = useState<any>("");
  const { changeNetwork } = useBaki();
  const dispatch = useDispatch();

  const select = (_token: any) => {
    setSelectedToken(_token.name);
    setSelectedTokenImg(_token.image);
    setIsOpen(!isOpen);
    changeNetwork(_token.name);
    dispatch(updateCollateral(_token.name));
  };
  return (
    <div className=" border-2 p-2 rounded-lg">
      <div className="flex">
        <input
          type="text"
          placeholder="0.0"
          className="w-full focus:outline-none"
          value={value}
          onChange={e => updateCollateralValue(e.target.value)}
        />

        <div className="flex cursor-pointer" onClick={handleSelect}>
          <img
            src={selectedTokenImg || defaultToken.image}
            alt=""
            className="h-7"
          />
          <BiChevronDown size={30} />
        </div>
      </div>
      <div
        style={{
          transition: "all 0.3s ease-in-out",
          height: isOpen ? 50 : 0,
        }}
      >
        {tokens.map((token: any) => (
          <div
            key={token.name}
            onClick={(): void => select(token)}
            style={{
              transition: "all 0.3s ease-in-out",
              display: isOpen ? "flex" : "none",
            }}
            className="flex items-center hover:bg-red-100 p-2 cursor-pointer"
          >
            <img src={token.image} alt="" className="h-7" />
            <p className="ml-2 text-sm">{token.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MintComponent;

// http://api.coinlayer.com/api/live?access_key=RPGQctIVDY8a27eDUSB3i8BU4qGdqqMM&symbols=BTC,ETH
