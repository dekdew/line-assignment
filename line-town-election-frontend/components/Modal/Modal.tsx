import Vote from "components/Modal/Vote";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useContext } from "react";
import { ModalContext } from "store/modalContext";
import Success from "components/Modal/Success";
import Voted from "components/Modal/Voted";
import Error from "components/Modal/Error";

const Modal = () => {
  const { isModalOpen, setIsModalOpen, modalType, setModalType } =
    useContext(ModalContext);

  const handleClose = useCallback(() => {
    if (modalType === "success") {
      setModalType("voted");
    }
    setIsModalOpen(false);
  }, [modalType, setIsModalOpen, setModalType]);

  return (
    <AnimatePresence>
      {isModalOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
          className="fixed top-0 left-0 w-screen h-[var(--app-height)] overflow-hidden bg-[#0009] z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring" }}
            className="bg-white rounded-lg p-5 sm:mx-3 w-full sm:w-[50vh] max-w-[600px] h-full sm:h-[90vh] max-h-[900px] relative"
          >
            {modalType === "vote" ? <Vote onClose={handleClose} /> : ""}
            {modalType === "success" ? <Success onClose={handleClose} /> : ""}
            {modalType === "voted" ? <Voted onClose={handleClose} /> : ""}
            {modalType === "error" ? <Error onClose={handleClose} /> : ""}
          </motion.div>
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default Modal;
