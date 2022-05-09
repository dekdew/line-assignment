import { useAuthToken } from "apollo/auth";
import Button from "components/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useVoteMutation } from "hooks/useVoteMutation";
import Image from "next/image";
import { useCallback, useState, useContext, useEffect } from "react";
import OtpInput from "react-otp-input";
import thaiIdCard from "thai-id-card";
interface IVote {
  onClose?: () => void;
}
import { ModalContext } from "store/modalContext";

const Vote = ({ onClose }: IVote) => {
  const [idCard, setIdCard] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    vote,
    mutationResults: { data, loading, error },
  } = useVoteMutation();
  const { setAuthToken } = useAuthToken();
  const { candidate, setModalType, setIsModalOpen, setErrorMessage } =
    useContext(ModalContext);

  const handleVote = useCallback(async () => {
    const isValid: boolean = thaiIdCard.verify(idCard);

    if (isValid) {
      await setAuthToken(idCard);

      try {
        await vote(candidate!.id);
      } catch ({ message }: any) {
        if (message === "Duplicated IDCard") {
          setIsModalOpen(false);
          setModalType("voted");
          setTimeout(() => {
            setIsModalOpen(true);
          }, 100);
        } else {
          setIsModalOpen(false);
          setModalType("error");
          setErrorMessage(message);
          setTimeout(() => {
            setIsModalOpen(true);
          }, 100);
        }
      }
    } else {
      setIsError(true);
    }
  }, [
    idCard,
    setAuthToken,
    vote,
    candidate,
    setIsModalOpen,
    setModalType,
    setErrorMessage,
  ]);

  useEffect(() => {
    if (data?.vote) {
      setIsModalOpen(false);
      setModalType("success");
      setTimeout(() => {
        setIsModalOpen(true);
      }, 100);
    }
  }, [data, setModalType, setIsModalOpen]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-center text-2xl font-semibold">
          LINE TOWN Election
        </h1>

        <div className="my-5 rounded shadow">
          <Image
            src={candidate!.imageURL}
            alt=""
            width={1}
            height={0.5}
            layout="responsive"
            objectFit="cover"
            className="rounded"
          />
        </div>

        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-gray-500 text-sm font-light">Vote for</p>
            <p className="text-2xl font-semibold leading-5">
              {candidate!.name}
            </p>
          </div>

          <p className="text-gray-500 text-sm">
            no.{" "}
            <span className="text-red-500 font-bold text-[2.5rem]">
              {candidate!.id}
            </span>
          </p>
        </div>

        <label className="text-sm text-gray-500">
          Please enter your national ID to confirm your vote.
        </label>
        <OtpInput
          isInputNum
          hasErrored={isError}
          errorStyle="border-red-500"
          inputStyle="border rounded text-lg w-[100%!important] min-w-[20px] mx-[3px]"
          value={idCard}
          onChange={(e: any) => {
            setIdCard(e);
            setIsError(false);
          }}
          isDisabled={loading}
          numInputs={13}
          className="w-full mt-2"
        />
        <AnimatePresence>
          {isError ? (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: [0, -1, 1, 0] }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-sm text-red-500 font-light"
            >
              Invalid ID. Please check your ID and try again.
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleVote}
          disabled={idCard?.length !== 13 || loading}
          className="w-full"
        >
          Vote
        </Button>

        <Button type="secondary" onClick={onClose} className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Vote;
