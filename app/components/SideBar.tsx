"use client";
import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase.js";
import ChatRow from "./ChatRow";
import { collection, orderBy, query } from "firebase/firestore";
import ModelSelection from "./ModelSelection";

import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


function SideBar() {

  const [showSidebar, setShowSidebar] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

    const handleToggle = () => {
      setShowSidebar(!showSidebar);
    };


  return (
    <>
      <div className="p-2 flex-1 flex-col h-screen">
        <button className="z-1000" onClick={handleToggle}>
          <BiChevronRight
            className={` ${
              showSidebar ? " rotate-90 bg-green-400/80 " : ""
            } text-2xl  transition-all fill-white  rounded-md bg-blue-600/80 duration-300`}
          />
        </button>
        {showSidebar ? (
          <div className="flex-1 flex flex-col h-screen">
            <div className="flex-1 ">
              <NewChat />
              <div className="hidden sm:inline">
                <ModelSelection />
              </div>
              <div className="flex flex-col space-y-2 my-2 ">
                {loading && (
                  <div className="animate-pulse text-center text-white">
                    <p>Loading Charts...</p>
                  </div>
                )}

                {chats?.docs.map((chat) => (
                  <ChatRow key={chat.id} id={chat.id} />
                ))}
              </div>
            </div>

            <hr className="mt-4 text-gray-600" />
            <div className="mt-4">
              {session && (
                <span className="p-2.5 mt-2 flex items-center rounded-md duration-300 cursor-pointer  hover:bg-blue-600/80">
                  <img
                    onClick={() => signOut()}
                    src={session.user?.image!}
                    alt="profile"
                    className="h-12 w-12 max-sm:h-8  max-sm:w-8 rouded-full cursor-pointer mx-auto hover:opacity-50 "
                  />
                </span>
              )}
            </div>

          </div>
        ) : (
          <></>
          )}
          </div>
    </>
  );
}

export default SideBar;
