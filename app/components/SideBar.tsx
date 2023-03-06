'use client'
import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase.js";
import ChatRow from "./ChatRow";
import { collection, orderBy, query } from "firebase/firestore";
import ModelSelection from "./ModelSelection";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session && query(
      collection(db, 'users', session?.user?.email!, 'chats'),
      orderBy('createdAt', 'asc'))
  );
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1 ">
        <div>
          <NewChat />

          <div className="hidden sm:inline">
          <ModelSelection />
          </div>
          <div className="flex flex-col space-y-2 my-2">

            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Charts...</p>
              </div>
            )}
          {/* Map through the Chat rows*/}
          {chats?.docs.map(chat => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}

          </div>

        </div>
      </div>

      {session && (
        <abbr title="Sign Out">
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="profile"
          className="h-12 w-12 rouded-full cursor-pointer mx-auto mb-2 hover:opacity-50 " />
          </abbr>
      )}
    </div>
  );
}

export default SideBar;
