import { useAuthToken, useLogout } from "apollo/auth";
import Button from "components/Button";
import Image from "next/image";
import { useContext, useCallback } from "react";
import { ModalContext } from "store/modalContext";
import NumberFormat from "react-number-format";

interface IVoted {
  onClose?: () => void;
}

const Voted = ({ onClose }: IVoted) => {
  const { setModalType, setIsModalOpen } = useContext(ModalContext);
  const { authToken } = useAuthToken();
  const logout = useLogout();

  const handleLogout = useCallback(async () => {
    await logout();

    setIsModalOpen(false);
    setModalType("vote");
    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);
  }, [logout, setIsModalOpen, setModalType]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-center text-2xl font-semibold">
          You've already VOTED!
        </h1>

        <div className="w-[200px] h-[200px] mx-auto mt-10">
          <Image
            src="/assets/images/voted.png"
            alt="error"
            width={1}
            height={1}
            layout="responsive"
            objectFit="contain"
          />
        </div>

        <p className="text-center text-gray-400 mb-5">
          National ID
          <NumberFormat
            value={authToken}
            displayType={"text"}
            format="# #### ##### ## #"
            className="text-xl mx-1 font-bold"
          />
          was used.
        </p>

        <button
          onClick={handleLogout}
          className="text-center text-primary cursor-pointer w-full"
        >
          Not you?
        </button>
      </div>

      <div className="flex gap-3">
        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
};

export default Voted;
