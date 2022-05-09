import { useAuthToken } from "apollo/auth";
import { subscribeVoteUpdated } from "apollo/voteUpdatedSubscription";
import { ICandidate } from "interface/candidate";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";

export type IModalType = "vote" | "success" | "error" | "voted";

interface IModalContext {
  candidate?: ICandidate | undefined;
  setCandidate: Dispatch<SetStateAction<ICandidate | undefined>>;
  isModalOpen?: boolean | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalType?: IModalType;
  setModalType: Dispatch<SetStateAction<IModalType>>;
  errorMessage?: string;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
  candidateList?: ICandidate[];
  setCandidateList: Dispatch<SetStateAction<ICandidate[] | undefined>>;
  totalVoted?: number;
}

export const ModalContext = createContext<IModalContext>({
  setCandidate: () => {},
  setIsModalOpen: () => false,
  setModalType: () => "vote",
  setErrorMessage: () => null,
  setCandidateList: () => null,
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { authToken } = useAuthToken();
  const [candidate, setCandidate] = useState<ICandidate | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<IModalType>(
    authToken ? "voted" : "vote"
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [candidateList, setCandidateList] = useState<
    ICandidate[] | undefined
  >();
  const [totalVoted, setTotalVoted] = useState(0);

  useEffect(() => {
    const voted = candidateList?.reduce((acc, obj) => {
      return acc + obj.votedCount;
    }, 0);

    setTotalVoted((prev) => voted || prev);
  }, [candidateList]);

  const store = {
    candidate,
    setCandidate,
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    errorMessage,
    setErrorMessage,
    candidateList,
    setCandidateList,
    totalVoted,
  };

  return (
    <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
  );
};
