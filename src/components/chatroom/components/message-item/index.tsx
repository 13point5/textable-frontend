type Props = {
  message: string;
  sent: boolean;
};

export const MessageItem = ({ message, sent }: Props) => {
  const formattedMessage = message.replace("\\n", "<br />");
  console.log("formattedMessage", formattedMessage);

  const profileColor = sent ? "bg-green-300" : "bg-blue-300";

  return (
    <div className={`flex gap-2 ${!sent && "justify-end"}`}>
      <div className={`w-8 h-8 rounded-full ${profileColor}`} />

      <div className="p-2 bg-slate-100 rounded-lg max-w-[50%]">
        <p
          className="text-sm"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
            overflow: "hidden",
            maxWidth: "100%",
          }}
          dangerouslySetInnerHTML={{ __html: formattedMessage }}
        />
      </div>
    </div>
  );
};
