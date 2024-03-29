import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline';
import { usePathname,useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { db } from "@/firebase.js";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useCollection} from 'react-firebase-hooks/firestore';
import { query } from 'firebase/firestore';

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id,
      "messages")
  ));

  
  useEffect(() => {
    if (!pathname) return;
    
    setActive(pathname.includes(id));
  },[pathname])

  const removeChat = async () => { 
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id))
    router.replace('/');
  }

  return (
    <Link href={`/chat/${id}`} className={`chat_row justify-center ${active && 'bg-gray-700/50'}`}>
 <ChatBubbleLeftIcon className="h-5 w-5"/>
      <p className='flex-1  hidden md:inline-flex truncate '>
        {messages?.docs[messages?.docs.length -1]?.data().text || "New Chat"}
      </p>
      <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-700 hover:text-red-700"/>
    </Link>
  )
}

export default ChatRow