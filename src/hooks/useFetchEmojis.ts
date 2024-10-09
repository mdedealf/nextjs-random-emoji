import { EMOJI_API_ALL } from "@/constant/apiRoutes";
import { Emojis } from "@/types/emojisType";
import { useEffect, useState } from "react";

const useFetchEmojis = () => {
  const [emojis, setEmojis] = useState<Emojis[]>([]);
  const [currentEmoji, setCurrentEmoji] = useState<string>("&#129402;");
  const [currentCaption, setCurrentCaption] = useState<string>(
    "You're sad and you know it. just give up, don't try."
  );

  const shuffleEmojis = () => {
    if (emojis.length > 0) {
      const randomIdx = Math.floor(Math.random() * emojis.length);
      const randomEmoji = emojis[randomIdx];

      // Set interval to show shuffeled emojis before the selected one
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
        const response = await fetch(EMOJI_API_ALL);
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

  return {
    currentEmoji,
    currentCaption,
    shuffleEmojis,
  };
};

export default useFetchEmojis;
