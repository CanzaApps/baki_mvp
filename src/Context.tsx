import { createContext, useState, FC } from "react";
export const Context = createContext<any | null>(null);
declare const window: any;
export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setAuth] = useState<boolean>(() =>
    window.localStorage.getItem("baki_user") ? true : false
  );

  window.ethereum.on("disconnect", () => {
    setAuth(false);
  });

  return (
    <Context.Provider value={{ isAuthenticated }}>
      <span>{children}</span>
    </Context.Provider>
  );
};
