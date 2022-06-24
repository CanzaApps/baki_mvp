import React, { FC } from "react";
import "../styles/pages/Home.css";
import logo from "../assets/baki_logo_1.png";
import metamask from "../assets/metamask.png";
import useWallet from "../hooks/useWallet";

const Home: FC = (): JSX.Element => {
  const { connectWallet } = useWallet();

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <img src={logo} alt="" className="h-40 " />
      <p className="text-center">
        Welcome to baki, your one stop shop for infinite synthetic asset trading
        for real value. Connect Your Wallet to get started.
      </p>

      <button className="home-btn" onClick={() => connectWallet("metamask")}>
        <img src={metamask} alt="" className="h-7 " />
        <span className="ml-2"> Metamask </span>
      </button>

      <div className="mt-80">
        <p>Canza Finance © 2022 all rights reserved | www.Canza.io</p>
      </div>
    </div>
  );
};

export default Home;
