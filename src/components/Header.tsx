import { FC, useEffect, useState } from "react";
import logo from "../assets/baki_logo_1.png";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaWallet } from "react-icons/fa";

declare const window: any;

const Header: FC = () => {
  const [address, setAddress] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setAddress(window.localStorage.getItem("baki_user"));
  }, []);

  return (
    <div className="p-5 w-full bg-red-100 flex justify-center">
      <div className="w-10/12 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="" className="h-10 " />
          </Link>
          <Link to="/mint" className="ml-2 font-bold">
            <p
              style={{
                color: location.pathname === "/mint" ? "#fb5f33" : "#000",
              }}
            >
              Mint
            </p>
          </Link>
          <Link to="/swap" className="ml-2 font-bold hover:text-white">
            <p
              style={{
                color: location.pathname === "/swap" ? "#fb5f33" : "#000",
              }}
            >
              Swap
            </p>
          </Link>
        </div>
        <div className="flex">
          <div className="w-100 flex items-center">
            <FaUserCircle size={20} />
            <div className="text-sm ml-2">
              <p className="font-bold">Connected as</p>
              <div className="flex">
                <p>
                  {address.slice(0, 6)}...{address.slice(37, 42)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-100 flex items-center ml-7">
            <FaWallet size={20} />

            <div className="text-sm ml-3">
              <p className="font-bold">zUSD</p>
              <p className="text-center">0.0</p>
            </div>
            <div className="text-sm ml-3">
              <p className="font-bold">zCFA</p>
              <p className="text-center">0.0</p>
            </div>
            <div className="text-sm ml-3">
              <p className="font-bold">zNGN</p>
              <p className="text-center">0.0</p>
            </div>
            <div className="text-sm ml-3">
              <p className="font-bold">zZAR</p>
              <p className="text-center">0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
