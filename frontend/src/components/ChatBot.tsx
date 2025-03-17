import React, { useState } from "react";
import axios from "axios";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatResponse {
  reply: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post<ChatResponse>(
        "http://localhost:5000/chat",
        { message: input }
      );
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Error saat mengirim pesan:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Maaf, terjadi kesalahan." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 max-w-2xl mx-auto">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl bg-blue-700 text-white font-bold text-center mb-4 p-3 rounded-lg shadow-md">
        Chatbot CS
      </h2>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto border bg-white p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex my-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-xs sm:max-w-md rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-gray-500 text-sm text-center">
            Bot sedang mengetik...
          </p>
        )}
      </div>

      {/* Input dan Button */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-3 border rounded-lg text-black focus:outline-none text-sm sm:text-base"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
          onClick={sendMessage}
          disabled={loading}
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default App;
