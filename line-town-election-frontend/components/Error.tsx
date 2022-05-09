import Image from "next/image";

const Error = () => {
  return (
    <div>
      <div className="w-[200px] h-[200px] mx-auto">
        <Image
          src="/assets/images/error.png"
          alt="error"
          width={1}
          height={1}
          layout="responsive"
          objectFit="contain"
        />
      </div>

      <p className="text-center text-gray-400 text-lg">
        Oops, something went wrong!
      </p>
    </div>
  );
};

export default Error;
