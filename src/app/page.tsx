"use client";
import { FC } from "react";
import Image from "next/image";
import useFetchEmojis from "@/hooks/useFetchEmojis";

const HomePage: FC = () => {
  const { currentEmoji, currentCaption, shuffleEmojis } = useFetchEmojis();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${currentEmoji} ${currentCaption}`);
      alert("Emoji and caption are copied to clipboard!");
    } catch (error) {
      alert("Failed to copy!");
      throw new Error("Failed to copy!");
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col bg-[#FAF4E1] h-screen min-w-[375px] max-w-[430px] p-[24px]">
      <Image
        className="mb-[18px] object-cover"
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
          <button onClick={shuffleEmojis} className="h-[160px] w-[160px]">
            <span
              className="text-[120px] max-h-[120px] max-w-[120px]"
              dangerouslySetInnerHTML={{ __html: currentEmoji }}
            />
          </button>
        </div>

        <span
          onClick={copyToClipboard}
          className="text-[#4A7582] text-[16px] w-[180px] text-center italic cursor-pointer"
        >
          {currentCaption}
        </span>
      </div>
    </section>
  );
};

export default HomePage;
