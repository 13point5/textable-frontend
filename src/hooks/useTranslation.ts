import { axiosInstance } from "@/api/axios";
import { APIResponse } from "@/api/types";
import { useState } from "react";

export const useTranslation = () => {
  const [translation, setTranslation] = useState<APIResponse<string>>({
    loading: false,
    error: null,
    data: null,
  });

  const translate = async () => {
    if (!translation.data || translation.loading) {
      try {
        setTranslation({
          loading: true,
          error: null,
          data: null,
        });

        const res = await axiosInstance.post("/translate", {
          text: "La vie est belle",
        });

        setTranslation({
          loading: false,
          error: null,
          data: res.data.translatedText,
        });
      } catch (error) {
        console.error(error);

        setTranslation({
          loading: false,
          error: "Something went wrong",
          data: null,
        });
      }
    }
  };

  return { translation, translate };
};
