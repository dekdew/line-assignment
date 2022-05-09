import { useQuery } from "@apollo/client";
import Alert from "components/Alert";
import Result from "components/Result";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { ELECTION_STATUS_QUERIES } from "../apollo/electionStatusQueries";
import CandidateList from "../components/CandidateList";

const Home: NextPage = () => {
  const { data: dataStatus } = useQuery(ELECTION_STATUS_QUERIES);

  return (
    <div>
      <Head>
        <title>LINE TOWN Election</title>
        <meta name="LINE TOWN Election" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {dataStatus && !dataStatus?.isOpen ? (
        <Alert>The election system is currently closed.</Alert>
      ) : (
        ""
      )}

      <div className="w-screen h-max min-h-[var(--app-height)] bg-gray-200 py-20 overflow-hidden">
        <h1 className="text-center text-3xl font-semibold mb-10">
          LINE TOWN Election
        </h1>

        <AnimatePresence>
          {dataStatus && !dataStatus?.isOpen ? <Result /> : ""}
        </AnimatePresence>

        <CandidateList />
      </div>
    </div>
  );
};

export default Home;
