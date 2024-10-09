import { FC } from "react";
import Image from "next/image";

const HomePage: FC = () => {
  return (
    <section className="flex flex-col bg-[#FAF4E1] h-screen min-w-[375px] max-w-[430px] p-[24px]">
      <Image
        className="mb-[18px]"
        src="/images/emojilogy-logo.svg"
        alt="Emojilogy logo"
        width={100}
        height={26}
      />
      <div className="flex flex-col justify-evenly items-center bg-[#F8DD84] h-full rounded-[2px]">
        <div className="text-[#4C9BB9] text-[40px] font-bold text-center w-[300px]">
          What&#39;s your <span className="text-[#1C5469]">emoji</span> today?
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="italic text-[#4A7582] text-[20px] font-[400px] leading=[26px] mb-[14px]">
            Click it!
          </span>
          <button>
            <Image
              className="w-auto h-[160px]"
              src="/images/pleading-face.svg"
              alt="Pleading face img"
              width={160}
              height={160}
            />
          </button>
        </div>
        <span className="text-[#4A7582] text-[14px] w-[180px] text-center italic">
          You&#39;re sad and you know it. just give up, don&#39;t try.
        </span>
      </div>
    </section>
  );
};

export default HomePage;
