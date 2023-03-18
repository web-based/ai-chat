import { DocumentData } from "firebase/firestore"

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";
  return (
    <div className={`py-5 max-sm:p-3 sm:text-sm text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex max-sm:p-2 space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="user_profile" className="h-8 w-8" />
        <p className=" pt-1 text-sm  max-sm:text-xs">{message.text}</p>
      </div>
    </div>
  )
}

export default Message;