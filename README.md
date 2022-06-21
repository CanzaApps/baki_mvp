## Executive Summary
Baki is an infinite liquidity FX exchange focused on providing access to local African currencies and USD markets at the central bank exchange rates in a permissionless manner. Baki allows users to deposit collateral and mint zTokens, each representing a currency (zUSD, zNGN, zCFA, or zZAR). Any zToken can be swapped with no slippage, or requirement for liquidity, through a burning and minting mechanism.

## Motivation
The Nigerian economy is one of the most dynamic and fastest growing economies on the African continent. Although it has a large amount of natural resources that net $6.69b worth of exports, it is also highly dependent on imports, which require US Dollars (USD) to settle. Due to broader macro trends the Nigerian Naira (NGN) has devalued by 90% against the US Dollar over the last two decades. All this combined creates a strong demand for foreign currencies to facilitate imports and avoid the erosion of savings, which has resulted in a significant flight of capital from the country. To address this the Central Bank of Nigeria (CBN) has put a number of capital controls, including limiting the foreign reserves available to Bureau d’Echanges and businesses on a monthly basis at the CBN USD/NGN exchange rate. This scarcity in FX has resulted in the birth of a black market with a parallel rate that is less favorable than the CBN rate, forcing businesses and individuals to pay a premium to access FX. Moreover, cross border settlements between African currencies

Although the case study above refers to Nigeria specifically, this problem is present across the continent and emerging markets which limits businesses and investors from accessing international financial markets and protecting their wealth. Cryptocurrencies have emerged as a solution to help as once a user is on-ramped they have access to permissionless and borderless markets. However, for a user to be on-ramped they will face the same premium to enter a crypto position, defeating the solution. A synthetic stable coin pegged to the value of African currencies, which can be redeemed for USD at the Central Bank rates, is needed to solve these concerns.

## Mechanics
Baki allows users who deposit collateral to mint zTokens. These zTokens can, at any point, can be swapped for the same value of any other zToken, at the central bank FX rate, through a burning and minting mechanism. Baki will support exchanges across four currencies at launch: US Dollar (zUSD), Nigerian Naira (zNGN), West African Franc (zCFA), and South African Rand (zZAR).

To ensure that the protocol is collateralized, and support the peg, the value of all outstanding zTokens are over-collateralized against the collateral deposited. This outstanding debt is allocated to each of the minters and can fluctuate over time based on the number outstanding of zTokens and the value of the underlying currencies. 
Pegging
All zToken minters are required to maintain a collateralization ratio of 150% or above. Should they drop below 150% collateralization ratio, their position can be liquidated. Liquidators will provide zTokens in exchange for the collateral plus a 10% liquidation fee.

Additionally, the peg to the dollar shall be incentivized through the following arbitrage opportunities. If zUSD is greater than a dollar, Users can mint zUSD and sell it for 10% profit. Alternatively, should it be less than $1, minters can purchase zUSD and use it to close their positions at a profit.

## Liquidity Strategy
Since any zToken can be swapped for an equal amount in another currency, acquiring any type of zToken provides access to any currencies available on Baki. Therefore liquidity must only be secured for zUSD paired with any other recognized stable coin (i.e. cUSD). This will avoid the fragmentation of the liquidity and will allow the peg to be more securely maintained. 

## Profit Model
In return for providing the collateral to support the required debt, minters receive a share of the trading fees any time a swap between zTokens occurs, allowing them to generate yield on their deposits. This is shared with the protocol
Current Release
Currently, Baki is in pre-Alpha. In the current release users can mint zTokens by depositing cUSD (Celo USD) as collateral at a collateralization rate of 150%. Four currencies are currently available: US Dollars (zUSD), West African CFA (zCFA) and South African Rand (zZAR). Lastly, users can also swap between any supported currency, with no slippage.

Further functionalities such as liquidations, asynchronous liquidation auctions, back-up oracles, and additional currencies will be added in future updates.

## Conclusion
The Baki protocol will not only help provide further access to the USD FX market for emerging markets but will also provide the best rates to swap between African currencies and USD in crypto. Moreover, it can also support additional use cases such as cross border settlements, DeFi investment opportunities and remittance.
