"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Send, Bot, User } from "lucide-react";
import "@dialectlabs/blinks/index.css";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to clean API response
  const cleanText = (text: string) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ").trim();
  };

  // Function to format lists properly
  const formatList = (text: string) => {
    return text.replace(/\d+\./g, "<br><b>$&</b>");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/generate", {
        prompt: input,
      });

      const cleanedResponse = formatList(cleanText(response.data.response));

      const botMessage: Message = {
        text: cleanedResponse || "Sorry, I couldn't generate a response.",
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
      setInput("");
    } catch (error) {
      console.error("Error sending request to Flask API:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, there was an error processing your request.", isBot: true },
      ]);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "dark:bg-black" : "bg-gray-50"}`}>
      <div className="flex justify-between items-center mb-8 w-full p-4">
        <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <Bot className="w-8 h-8" /> AI E-commerce Assistant
        </h1>

        <div className="flex items-center gap-2">
          <Button onClick={() => signOut()}>Log Out</Button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white dark:bg-black rounded-lg shadow-lg h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center`}>
                  {message.isBot ? <Bot size={30} /> : <User size={30} />}
                </div>
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.isBot
                      ? "bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border dark:border-b-gray-900 p-4 focus:outline-white focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
              />
              <button type="submit" className="bg-white text-black rounded-lg px-4 py-2 transition-colors flex items-center gap-2 dark:bg-black dark:text-white">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
