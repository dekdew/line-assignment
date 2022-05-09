import { faBookmark, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { subscribeVoteUpdated } from "apollo/voteUpdatedSubscription";
import Button from "components/Button";
import ProgressBar from "components/PregressBar";
import { motion, MotionConfig, useAnimation } from "framer-motion";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ICandidate } from "interface/candidate";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { ModalContext } from "store/modalContext";
import useSWR from "swr";
import formatLargeNumber from "utils/formatLargeNumber";

interface ICandidateCard extends ICandidate {
  isOpen: boolean;
}

const CandidateCard = ({
  id,
  name,
  policy,
  bioLink,
  imageURL,
  votedCount,
  dob,
  isOpen,
}: ICandidateCard) => {
  const [isHover, setIsHover] = useState(false);
  const { width } = useWindowDimensions();
  const { setIsModalOpen, setCandidate, totalVoted } = useContext(ModalContext);
  const { data: voteUpdated } = useSWR<any>(
    "subscription",
    subscribeVoteUpdated
  );
  const [votedCountSubscribe, setVotedCountSubscribe] = useState(votedCount);
  const voteUpdatedControls = useAnimation();

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
    setCandidate({
      id,
      name,
      policy,
      bioLink,
      imageURL,
      votedCount,
      dob,
    });
  }, [
    setIsModalOpen,
    setCandidate,
    id,
    name,
    policy,
    bioLink,
    imageURL,
    votedCount,
    dob,
  ]);

  useEffect(() => {
    if (voteUpdated?.voteUpdated?.id === id) {
      setVotedCountSubscribe(voteUpdated.voteUpdated.votedCount);
      voteUpdatedControls.start({ scale: [0.9, 1.1, 1] });
    }
  }, [id, voteUpdated, voteUpdatedControls]);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      // viewport={{ once: true }}
      transition={{
        type: "spring",
        duration: 1,
      }}
      layout
      className="bg-gray-100 shadow-sm p-3 md:p-5 rounded-lg relative w-full h-full flex flex-col justify-between"
      onMouseEnter={() => {
        if (isMobile) return null;
        setIsHover(true);
      }}
      onMouseLeave={() => {
        if (isMobile) return null;
        setIsHover(false);
      }}
    >
      <div>
        <div className="absolute top-2 right-2 z-10 text-[#fff]">
          <FontAwesomeIcon
            icon={faBookmark}
            size={width >= 768 ? "6x" : "4x"}
            style={{ filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.05))" }}
          />
          <span className="text-gray-400 absolute left-2 top-0 text-sm md:text-base">
            no.
          </span>
          <span className="text-red-500 font-black text-[1.5rem] md:text-[2.75rem] absolute left-[50%] translate-x-[-50%] top-[40%] translate-y-[-40%]">
            {id}
          </span>
        </div>

        <MotionConfig transition={{ type: "spring" }}>
          <div className="flex flex-row md:flex-col">
            {/* profile image */}
            <a href={bioLink} target="_blank" rel="noopener noreferrer">
              <div className="relative min-w-[6rem] mr-3 md:mr-0">
                <motion.div
                  className="overflow-hidden rounded relative cursor-pointer"
                  initial={{ scale: 1 }}
                  animate={{ scale: isHover ? 0.95 : 1 }}
                  layout
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: isHover ? 1.5 : 1 }}
                    layout
                  >
                    <Image
                      src={imageURL}
                      alt={name}
                      width={1}
                      height={0.9}
                      layout="responsive"
                      objectFit="cover"
                      className="rounded"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHover ? 1 : 0 }}
                    className="bg-[#000a] w-full h-full absolute top-0 left-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 2 }}
                      animate={{
                        opacity: isHover ? 1 : 0,
                        scale: isHover ? 1 : 2,
                      }}
                      className="flex flex-col items-center justify-center gap-2 text-white h-full w-full"
                    >
                      <FontAwesomeIcon
                        icon={faLink}
                        size={width >= 768 ? "2x" : "lg"}
                      />
                      <p>Bio</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </a>

            {/* profile detail */}
            <div className="flex flex-col md:flex-row md:mt-2 justify-between items-start md:items-end">
              <div className="flex flex-col items-start">
                <a
                  href={bioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold"
                >
                  {name}
                </a>
                <p className="text-sm font-light text-gray-400">{dob}</p>
              </div>

              <div className="flex flex-row md:flex-col items-start md:items-center gap-1 md:gap-0">
                <motion.div
                  animate={voteUpdatedControls}
                  transition={{ type: "spring", duration: 0.3 }}
                  className="text-xl md:text-3xl font-semibold text-primary leading-[1rem] md:leading-[1.5rem!important]"
                >
                  {formatLargeNumber(votedCountSubscribe)}
                </motion.div>
                <p className="text-sm font-light text-gray-400">
                  vote{votedCountSubscribe > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* policy */}
          <h2 className="italic text-gray-600 text-center text-lg mt-5 md:mt-3">
            {policy}
          </h2>
        </MotionConfig>
      </div>

      {isOpen ? (
        <Button onClick={handleOpenModal} disabled={!isOpen}>
          Vote
        </Button>
      ) : (
        <div className="mt-3">
          <ProgressBar
            percentage={((votedCountSubscribe || 0) / (totalVoted || 1)) * 100}
          />
        </div>
      )}
    </motion.div>
  );
};

export default CandidateCard;
