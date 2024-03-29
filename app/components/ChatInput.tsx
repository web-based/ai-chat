"use client";
import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import ModelSelection from './ModelSelection';
import useSWR from 'swr';

type Props = {
  chatId: string;
};


function ChatInput({ chatId }: Props) {

  const [prompt, setPrompt] = useState("")
  const { data: session } = useSession();
   const { data: model } = useSWR('model', {
    fallbackData: 'text-davinchi-001'
  });


  
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatar.com/api/?name=${session?.user?.name}`
      }
    }

    await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      message
    )
    // toast notification to say loading 

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch('/api/askQuestion', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // toast notification to say successful
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-[#35363f] h-[170px]">
      <div className="bg-[#42424d] text-gray-400 rounded-lg text-sm mr-2 ml-2">
        <form
          onSubmit={sendMessage}
          className="p-5 space-x-5 flex mt-[2.8rem] "
        >
          <input
            className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            value={prompt}
            type="text"
            onFocus={focus}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message here..."
          />
          <button
            disabled={!prompt || !session}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300
          disabled:cursor-not-allowed"
            type="submit"
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </button>
        </form>
        <div className="md:hidden">
          <ModelSelection />
        </div>
      </div>
    </div>
  );
}

export default ChatInput