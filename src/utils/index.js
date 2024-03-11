import { SUPPORTED_CHAIN } from "../Connection/connect";
import { getProposalsContract } from "../Constant/contracts";
import { getProvider } from "../Constant/provider";

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN;

export const getReadWriteBallotContract = async (provider) => {
  const readWriteProvider = getProvider(provider);

  const signer = await readWriteProvider.getSigner();

  return getProposalsContract(signer);
};
