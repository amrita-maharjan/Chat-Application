"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import db from "../utils/fireStore";
import { arrayUnion, doc, setDoc, onSnapshot } from "firebase/firestore";
import DeleteItem from "./deleteItem";
import { Navbar } from "./navbar";

type Message = {
  sender: string | null;
  text: string;
};

const ChatPage = () => {
  const [name, setName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    setName(storedName);
  }, []);

  useEffect(() => {
    const chatRef = doc(db, "messages", "chat1");

    const unsubscribe = onSnapshot(chatRef, (docSnap) => {
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages || []);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAdd = async () => {
    if (!inputValue.trim() || !name) return;

    const newMessage = { sender: name, text: inputValue };
    setInputValue("");

    try {
      const chatRef = doc(db, "messages", "chat1");
      await setDoc(
        chatRef,
        { messages: arrayUnion(newMessage) },
        { merge: true }
      );
      console.log("Message added:", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  return (
    <div className="flex flex-col w-full mt-auto mx-auto border rounded-lg bg-gray-100 h-[100vh]">
      <Navbar user={name} />
      <div className="flex flex-col gap-2 border p-2 h-[90vh] overflow-y-auto">
        {messages.map((msg, i) =>
          msg.sender === name ? (
            <div
              key={i}
              className="p-2 rounded max-w-xs flex flex-row gap-2 self-end"
            >
              <div className="p-2 rounded max-w-xs bg-blue-200">{msg.text}</div>
              <DeleteItem index={i} />
              <Avatar>
                <AvatarFallback className="bg-white">
                  {msg.sender?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div
              key={i}
              className="p-2 rounded max-w-xs flex flex-row gap-2 self-start"
            >
              <Avatar>
                <AvatarFallback className="bg-white">
                  {msg.sender?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <DeleteItem index={i} />
              <div className="p-2 rounded max-w-xs bg-gray-200">{msg.text}</div>
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-row justify-end gap-2 p-2 border-t">
        <Input
          placeholder="Enter your message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="outline" onClick={handleAdd}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
