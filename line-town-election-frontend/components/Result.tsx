import { useQuery } from "@apollo/client";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CANDIDATES_QUERIES } from "apollo/candidatesQueries";
import { ICandidate } from "interface/candidate";
import Image from "next/image";
import { useEffect, useState } from "react";
import Confetti from "components/Confetti";
import ResultChart from "components/ResultChart";

const Result = () => {
  const {
    data: dataCandidates,
    loading: loadingCandidates,
    error: errorCandidates,
  } = useQuery(CANDIDATES_QUERIES);
  const [result, setResult] = useState<ICandidate[] | null>();

  useEffect(() => {
    if (dataCandidates?.candidates) {
      let result: ICandidate[] = [...dataCandidates.candidates];
      result.sort((a: ICandidate, b: ICandidate) =>
        a.votedCount > b.votedCount ? -1 : 1
      );
      setResult(result);
    }
  }, [dataCandidates]);

  if (!result) {
    return null;
  }

  return (
    <div className="w-full max-w-[1080px] mx-auto p-5 mb-20">
      {/* new mayor */}
      <div className="bg-gray-100 w-full p-5 rounded-lg relative mb-10">
        <Confetti />
        <div className="relative w-max text-yellow-400 mt-6 mx-auto">
          <FontAwesomeIcon
            icon={faCrown}
            size="4x"
            className="absolute -top-7 left-1/2 -translate-x-1/2 z-10"
          />
          <div className="w-40 h-3w-40 border-4 border-white shadow rounded-full">
            <Image
              src={result[0].imageURL}
              alt={result[0].name}
              width={1}
              height={1}
              layout="responsive"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>

        <h2 className="text-center mt-1 font-medium">
          #{result[0].id}{" "}
          <span className="text-xl font-bold">{result[0].name}</span>
        </h2>
        <p className="text-sm text-center text-gray-500 font-light">
          The new mayor
        </p>
      </div>

      <ResultChart result={result} />
    </div>
  );
};

export default Result;
