import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../config";

axios.defaults.headers.common["apikey"] = config.exchangeRatesAPIKEY;
export interface PositionState {
  collateral: String;
  zUSDBalance: number;
  zNGNBalance: number;
  zCFABalance: number;
  zZARBalance: number;
  userAddress: String;
  userNetMint: number;
  globalNetMint: number;
  globalDebt: number;
  userShare: number;
  userDebt: number;
  totalCollateral: number;
  totalDebt: number;
  collateralRatio: number;
  swapOutput: number;
}

const initialState: PositionState = {
  collateral: "cUSD",
  zUSDBalance: 0,
  zNGNBalance: 0,
  zCFABalance: 0,
  zZARBalance: 0,
  userAddress: "",
  userNetMint: 0,
  globalNetMint: 0,
  globalDebt: 0,
  userShare: 0,
  userDebt: 0,
  totalCollateral: 0,
  totalDebt: 0,
  collateralRatio: 0,
  swapOutput: 0,
};

export const bakiSlice = createSlice({
  name: "Baki",
  initialState,
  reducers: {
    updateCollateral: (state, action: PayloadAction<string>) => {
      state.collateral = action.payload;
    },
    updateZUSDBalance: (state, action: PayloadAction<number>) => {
      state.zUSDBalance = action.payload;
    },
    updateZNGNBalance: (state, action: PayloadAction<number>) => {
      state.zNGNBalance = action.payload;
    },
    updateZCFABalance: (state, action: PayloadAction<number>) => {
      state.zCFABalance = action.payload;
    },
    updateZZARBalance: (state, action: PayloadAction<number>) => {
      state.zZARBalance = action.payload;
    },
    updateUserAddress: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
    },
    updateUserNetMint: (state, action: PayloadAction<number>) => {
      state.userNetMint = action.payload;
    },
    updateGlobalNetMint: (state, action: PayloadAction<number>) => {
      state.globalNetMint = action.payload;
    },
    updateGlobalDebt: (state, action: PayloadAction<number>) => {
      state.globalDebt = action.payload;
    },
    updateUserShare: (state, action: PayloadAction<number>) => {
      state.userShare = action.payload;
    },
    updateUserDebt: (state, action: PayloadAction<number>) => {
      state.userDebt = action.payload;
    },
    updateTotalCollateral: (state, action: PayloadAction<number>) => {
      state.totalCollateral = action.payload;
    },
    updateTotalDebt: (state, action: PayloadAction<number>) => {
      state.totalDebt = action.payload;
    },
    updateCollateralRatio: (state, action: PayloadAction<number>) => {
      state.collateralRatio = action.payload;
    },

    updateSwapOutput: (state, action: PayloadAction<any>) => {
      state.swapOutput = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCollateral,
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
  updateTotalDebt,
  updateCollateralRatio,
  updateSwapOutput,
} = bakiSlice.actions;

export default bakiSlice.reducer;
