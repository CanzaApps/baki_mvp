import React, { FC } from "react";
import Header from "../components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="w-full flex justify-center items-center pt-10 ">
        {children}
      </div>
      <div className="mt-20 w-full flex justify-center items-center">
        <p>Canza Finance © 2022. All rights reserved | www.canza.io</p>
      </div>
    </div>
  );
};

export default MainLayout;
