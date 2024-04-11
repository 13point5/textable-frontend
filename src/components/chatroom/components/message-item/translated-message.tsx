import { APIResponse } from "@/api/types";
import { Loader2Icon } from "lucide-react";

export const TranslatedMessage = ({ data }: { data: APIResponse<string> }) => {
  return (
    <>
      {data.loading && <Loader2Icon className="animate-spin" />}

      {data.data && (
        <div className="p-2 bg-yellow-100 rounded-b-lg">
          <p
            className="text-sm"
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              overflow: "hidden",
              maxWidth: "100%",
            }}
            dangerouslySetInnerHTML={{ __html: data.data }}
          />
        </div>
      )}

      {data.error && (
        <div className="p-2 bg-red-100 text-red-500 rounded-b-lg">
          <p className="text-sm">{data.error}</p>
        </div>
      )}
    </>
  );
};
