"use client";

import { useChatContext } from "./ChatProvider";

const ChatTitle = () => {
  const { activeConversationData } = useChatContext();

  return (
    <div className="flex items-center p-4 border-b">
      <div>
        <h2 className="text-xl font-semibold">
          {activeConversationData ? activeConversationData.title : "Conversation Title"}
        </h2>
      </div>
    </div>
  );
};

export default ChatTitle;
