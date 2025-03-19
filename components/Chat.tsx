"use client";
import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("/api/chat", { message });
      setResponse(res.data.reply);
    } catch (error) {
      setResponse("Error connecting to AI.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ask Sylvie (LLaMA 3 Chatbot)</h2>

      <div className="border p-4 mb-4 min-h-[100px]">
        {response ? (
          <p>
            <strong>Bot:</strong> {response}
          </p>
        ) : null}
      </div>

      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Ask me something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
