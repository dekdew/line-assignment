import Button from "components/Button";
import Image from "next/image";
import { useContext } from "react";
import { ModalContext } from "store/modalContext";
interface ISuccess {
  onClose?: () => void;
}

const Success = ({ onClose }: ISuccess) => {
  const { candidate } = useContext(ModalContext);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-center text-2xl font-semibold">
          Thanks for your VOTE
        </h1>

        <div className="w-[200px] h-[200px] mx-auto mt-10">
          <Image
            src="/assets/images/success.png"
            alt="error"
            width={1}
            height={1}
            layout="responsive"
            objectFit="contain"
          />
        </div>

        <p className="text-center text-gray-400 text-lg">
          {`#${candidate!.id} ${candidate!.name}`}{" "}
          <span className="font-light text-base">got the vote from you.</span>
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
};

export default Success;
