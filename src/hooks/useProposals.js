import { useEffect, useState } from "react";
import { readOnlyProvider } from "../Constant/provider";
import { decodeBytes32String } from "ethers";
import { getProposalsContract } from "../Constant/contracts";
import { toast } from "react-toastify";

const useProposals = () => {
  const [proposals, setProposals] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    const contract = getProposalsContract(readOnlyProvider);

    contract
      .getAllProposals()
      .then((res) => {
        const converted = res.map((item) => ({
          name: decodeBytes32String(item.name),
          voteCount: item.voteCount,
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
  }, []);

  return proposals;
};

export default useProposals;
