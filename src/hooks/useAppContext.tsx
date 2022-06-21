import { useContext } from "react";
import { Context } from "../Context";

const useAppContext = () => {
  return useContext<any>(Context);
};

export default useAppContext;
