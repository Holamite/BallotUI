import "./App.css";
import { configureWeb3Modal } from "./Connection/connect";
import { ToastContainer } from "react-toastify";
import Header from "./Component/Header";
import "@radix-ui/themes/styles.css";
import { Flex, Container } from "@radix-ui/themes";
import DelegateVote from "./Component/DelegateVote";
import HandleVote from "./Component/HandleVote";
import useProposals from "./hooks/useProposals";
import useNumberOfVoters from "./hooks/useNumberOfVoters";

configureWeb3Modal();

function App() {
  const { loading, data: proposals } = useProposals();

  const numberOfEligibleVoters = useNumberOfVoters();

  return (
    <>
      <Container>
        <Header />
        <main className="mt-6">
          <Flex mb="4" justify="between">
            <DelegateVote />
            <span>Eligible Voters: {numberOfEligibleVoters}</span>
          </Flex>

          <HandleVote loading={loading} proposals={proposals} />
        </main>
        <ToastContainer />
      </Container>
    </>
  );
}

export default App;
