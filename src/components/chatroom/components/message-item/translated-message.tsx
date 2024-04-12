import { APIResponse } from "@/api/types";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type Props = {
  data: APIResponse<string>;
  className?: string;
};

export const TranslatedMessage = ({ data, className = "" }: Props) => {
  return (
    <>
      {data.loading && <Loader2Icon className="animate-spin" />}

      {data.data && (
        <div className={cn(`p-2 bg-yellow-100 rounded-b-lg`, className)}>
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
        <div
          className={cn(`p-2 bg-red-100 text-red-500 rounded-b-lg`, className)}
        >
          <p className="text-sm">{data.error}</p>
        </div>
      )}
    </>
  );
};
