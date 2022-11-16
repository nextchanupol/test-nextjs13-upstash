import React, { FC } from "react";
import Image from "next/image";
import { Message } from "../typings";

type MessageComponentProps = {
  key: string;
  message: Message;
};

const MessageComponent: FC<MessageComponentProps> = ({ message }) => {
  const isUser = true;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"} `}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          src={message.profilePic}
          alt="Profile Picture"
          width={50}
          height={10}
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] py-[2px]  ${
            isUser ? "text-blue-400 text-right" : "text-neutral-500 text-left"
          }`}
        >
          {message.username}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? " bg-blue-500 ml-auto order-2" : " bg-neutral-500"
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser && "text-right"
            }`}
          >
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
