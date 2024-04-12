import { axiosInstance } from "@/api/axios";
import { APIResponse } from "@/api/types";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import useTranslationsStore from "@/lib/translations-store";

type Props = {
  word: string;
};

export const TranslatedWord = ({ word }: Props) => {
  const { translatedWord, setTranslation } = useTranslationsStore((state) => ({
    translatedWord: state.getTranslation(word),
    setTranslation: state.setTranslation,
  }));

  const [translationData, setTranslationData] = useState<APIResponse<string>>({
    loading: false,
    error: null,
    data: translatedWord,
  });

  const getTranslation = async () => {
    if (translationData.data || translationData.loading) return;

    try {
      setTranslationData({
        loading: true,
        error: null,
        data: null,
      });

      const res = await axiosInstance.post("/translate", {
        text: "La vie est belle",
      });

      setTranslationData({
        loading: false,
        error: null,
        data: res.data.translatedText,
      });

      setTranslation(word, res.data.translatedText);
    } catch (error) {
      console.error(error);

      setTranslationData({
        loading: false,
        error: "Something went wrong",
        data: null,
      });
    }
  };

  useEffect(() => {
    // 1. Get translation
    if (!translationData.data || translationData.loading) {
      getTranslation();
    }
  }, [word, translationData.data, translationData.loading]);

  if (translationData.loading)
    return (
      <div className="flex items-center gap-1">
        <Loader2Icon className="w-3 h-3 animate-spin" />
        <span className="text-xs font-thin">Translating</span>
      </div>
    );

  if (translationData.error)
    return (
      <span className="text-xs text-red-500 font-medium">
        {translationData.error}
      </span>
    );

  return <span className="text-xs">{translationData.data}</span>;
};
