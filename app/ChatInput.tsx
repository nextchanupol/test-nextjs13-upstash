"use client";

import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("api/getMessages", fetcher);

  console.log("messages ", messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Ouu Naja",
      profilePic:
        "https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/280468020_5168982013168484_6694334168656875037_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHTZt-ruhrTXbBR9DOvOaSXgbjbY8et0fWBuNtjx63R9VI3z_Nz33ZVm1Kk5hbx58N5Q8tYOQWWRLoGBHNPQZQz&_nc_ohc=GJlXz_rZAG0AX9SfzU2&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&oh=00_AfDLkKdieA_1uR7Y5btKlJK3ogbcwixzJzc81Vy8OkE94Q&oe=6379F2F3",
      email: "nextchanupol@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      //   const data = await res.json();
      //   console.log("Message Added ==>", data);
      return [data.message, ...messages!];
    };

    // uploadMessageToUpstash();
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none
        focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3
         disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
         disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
