import { useQuery } from "@apollo/client";
import { CANDIDATES_QUERIES } from "apollo/candidatesQueries";
import CandidateCard from "components/CandidateCard";
import Error from "components/Error";
import Loading from "components/Loading";
import Modal from "components/Modal/Modal";
import { ICandidate } from "interface/candidate";
import { useContext, useEffect } from "react";
import { ModalContext } from "store/modalContext";
import { ELECTION_STATUS_QUERIES } from "../apollo/electionStatusQueries";

const CandidateList = () => {
  const {
    data: dataCandidates,
    loading: loadingCandidates,
    error: errorCandidates,
  } = useQuery(CANDIDATES_QUERIES);
  const {
    data: dataStatus,
    loading: loadingStatus,
    error: errorStatus,
  } = useQuery(ELECTION_STATUS_QUERIES);
  const { setCandidateList } = useContext(ModalContext);

  useEffect(() => {
    if (dataCandidates?.candidates) {
      setCandidateList(dataCandidates?.candidates);
    }
  }, [dataCandidates, setCandidateList]);

  if (loadingCandidates || loadingStatus) {
    return <Loading />;
  }

  if (errorCandidates || errorStatus) {
    return <Error />;
  }

  return (
    <div>
      <p className="text-center text-2xl font-bold">Candidates</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-[1080px] mx-auto p-5">
        {dataCandidates?.candidates?.map(
          (candidate: ICandidate, index: number) => (
            <div key={index} className="snap-start">
              <CandidateCard isOpen={dataStatus?.isOpen} {...candidate} />
            </div>
          )
        )}
      </div>

      <Modal />
    </div>
  );
};

export default CandidateList;
