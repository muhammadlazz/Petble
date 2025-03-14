import { useParams } from "react-router-dom";
import { useState } from "react";

interface Message {
  text: string;
  isSender: boolean;
}

const conversations: Record<number, Message[]> = {
  1: [
    { text: "Halo!", isSender: false },
    { text: "Hai! Apa kabar?", isSender: true },
  ],
  2: [
    { text: "ᗪOᗰIՏIᒪI ᗰᗩᑎᗩ", isSender: false },
    { text: "jkt", isSender: true },
    { text: "ᒍᗩᑌᕼ ᗩKᑌ ᒍᗩTIᗰ", isSender: false },
  ],
  3: [
    { text: "Aku punya 5 gecko!", isSender: false },
    { text: "Wah, keren!", isSender: true },
  ],
};

const conversationNames: Record<number, string> = {
  1: "Firdaus",
  2: "Najwa",
  3: "Firdaus",
};

const Chat = () => {
  const { id } = useParams<{ id: string }>(); // Pastikan id bertipe string
  const conversationId = id ? parseInt(id) : null;
  
  const initialMessages: Message[] = conversationId && conversations[conversationId] ? conversations[conversationId] : [];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, isSender: true }]);
      setInput("");
    }
  };

  return (
    // <div className="flex flex-col h-screen bg-gray-100">
    //   {/* Header */}
    //   <div className="p-4 bg-white shadow-md text-lg font-semibold text-black">
    <div className="w-full max-w-3xl mx-auto flex flex-col h-screen bg-gray-100">
    {/* Header */}
    <div className="flex justify-between items-center p-4 bg-teal-700 text-white shadow-md">
        {conversationId && conversationNames[conversationId]
          ? conversationNames[conversationId]
          : "Chat"}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 max-w-xs rounded-lg ${
                msg.isSender
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Pesan */}
      <div className="p-4 bg-white flex items-center border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg text-black"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default Chat;