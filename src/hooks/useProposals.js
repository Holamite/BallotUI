import { useCallback, useEffect, useState } from "react";
import { readOnlyProvider } from "../Constant/provider";
import { decodeBytes32String, ethers } from "ethers";
import { getProposalsContract } from "../Constant/contracts";
import { toast } from "react-toastify";

const useProposals = () => {
  const [proposals, setProposals] = useState({
    loading: true,
    data: [],
  });

  // const handleVoteEvent = (log) => {
  //     console.log("vote: ", log);
  //     const encodedProposalIndex = log.topics[2];
  //     const encodedVoteWeight = log.data;

  //     const decodedProposalIndex = abicoder.decode(
  //         ["uint256"],
  //         encodedProposalIndex
  //     );

  //     const decodedVoteWeight = abicoder.decode(
  //         ["uint256"],
  //         encodedVoteWeight
  //     );

  //     console.log("got hrer");

  //     const index = Number(decodedProposalIndex[0]);
  //     const voteWeight = Number(decodedVoteWeight[0]);

  //     console.log(index, voteWeight);

  //     setProposal((prev) => ({
  //         ...prev,
  //         data: prev.data.map((item, id) =>
  //             index === id
  //                 ? { ...item, voteCount: item.voteCount + voteWeight }
  //                 : item
  //         ),
  //     }));

  //     console.log("worked!");
  // };

  const handleVoteEventCallback = useCallback(
    (log) => {
      const encodedProposalIndex = log.topics[2];
      const encodedVoteWeight = log.data;

      const decodedProposalIndex = ethers.AbiCoder.defaultAbiCoder().decode(
        ["uint256"],
        encodedProposalIndex
      );

      const decodedVoteWeight = ethers.AbiCoder.defaultAbiCoder().decode(
        ["uint256"],
        encodedVoteWeight
      );

      const index = Number(decodedProposalIndex[0]);
      const voteWeight = Number(decodedVoteWeight[0]);

      console.log(index, voteWeight);

      const newData = [...proposals.data];

      newData[index].voteCount += voteWeight;

      setProposals((prev) => ({ ...prev, data: newData }));
    },
    [proposals.data]
  );

  useEffect(() => {
    const contract = getProposalsContract(readOnlyProvider);

    contract
      .getAllProposals()
      .then((res) => {
        const converted = res.map((item) => ({
          name: decodeBytes32String(item.name),
          voteCount: Number(item.voteCount),
        }));
        setProposals({
          loading: false,
          data: converted,
        });
      })
      .catch((err) => {
        toast.error("error fetching proposals: ", err);
        setProposals((prev) => ({ ...prev, loading: false }));
      });

    const filter = {
      address: import.meta.env.VITE_ballot_contract_address,
      topics: [ethers.id("Vote(address,uint256,uint256)")],
    };

    const wssProvider = new ethers.WebSocketProvider(
      import.meta.env.VITE_wss_rpc_url
    );

    wssProvider.on(filter, handleVoteEventCallback);

    return () => wssProvider.off(filter, handleVoteEventCallback);
  }, [handleVoteEventCallback]);

  return proposals;
};

export default useProposals;
