"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";

interface Emojis {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
}

const HomePage: FC = () => {
  const [emojis, setEmojis] = useState<Emojis[]>([]);
  const [currentEmoji, setCurrentEmoji] = useState<string>("&#129402;");
  const [currentCaption, setCurrentCaption] = useState<string>(
    "You're sad and you know it. just give up, don't try."
  );

  const shuffleEmojis = () => {
    if (emojis.length > 0) {
      const randomIdx = Math.floor(Math.random() * emojis.length);
      const randomEmoji = emojis[randomIdx];

      const shuffleInterval = setInterval(() => {
        const randomShuffleIdx = Math.floor(Math.random() * emojis.length);
        setCurrentEmoji(emojis[randomShuffleIdx].htmlCode[0]);
      }, 100);

      setTimeout(() => {
        clearInterval(shuffleInterval);

        setCurrentEmoji(randomEmoji.htmlCode[0]);
        setCurrentCaption(`${randomEmoji.category} ${randomEmoji.name}`);
      }, 2000);
    }
  };

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch(
          "https://emojihub-1001447344924.asia-southeast2.run.app/api/all"
        );
        const data = (await response.json()) as Emojis[];
        setEmojis(data);

        // Shuffle emoji when emoji fetched
        shuffleEmojis();
      } catch (error) {
        throw new Error("Something went wrong");
        console.log(error);
      }
    };

    fetchEmojis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${currentEmoji} ${currentCaption}`);
      alert("Emoji and caption are copied to clipboard!");
    } catch (error) {
      alert("Failed to copy!");
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
