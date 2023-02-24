import { PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'


function NewChat() {
  return (
    <div className="border-gray-700 chat_row">
      <PlusIcon className="w-4 h-4"/>
      <p>New Chat</p>

    </div>
  )
}

export default NewChat