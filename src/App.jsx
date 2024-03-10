import "./App.css";
import { configureWeb3Modal } from "./Connection/connect";
import { ToastContainer } from "react-toastify";
import Header from "./Component/Header";
import "@radix-ui/themes/styles.css";
import { Box, Container } from "@radix-ui/themes";
import DelegateVote from "./Component/DelegateVote";
import HandleVote from "./Component/HandleVote";
import useProposals from "./hooks/useProposals";

configureWeb3Modal();

function App() {
  const { loading, data: proposals } = useProposals();
  return (
    <>
      <Container>
        <Header />
        <main className="mt-6">
          <Box mb="4">
            <DelegateVote />
          </Box>

          <HandleVote loading={loading} proposals={proposals} />
        </main>
        <ToastContainer />
      </Container>
    </>
  );
}

export default App;
