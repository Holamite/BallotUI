import { SUPPORTED_CHAIN } from "../Connection/connect";

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN;
