"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Search,
  ArrowLeft,
  Check,
  CheckCheck,
  Smile,
  Image as ImageIcon,
  FileText,
  Mic,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";

// ...

export default function ChatPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const myId = session?.user?._id || searchParams.get("myId");

  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [contacts, setContacts] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const [isLoadingContacts, setIsLoadingContacts] = useState(true);

  // 1. Fetch Contacts on Mount
  useEffect(() => {
    async function fetchContacts() {
      if (!myId) return;
      try {
        const res = await fetch("/api/chat/contacts");
        const json = await res.json();
        if (json.success) {
          setContacts(json.data);
        }
      } catch (error) {
        console.error("Failed to load contacts", error);
      } finally {
        setIsLoadingContacts(false);
      }
    }
    fetchContacts();
  }, [myId]);

  useEffect(() => {
    if (isLoadingContacts) return;

    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (id && name) {
      const existing = contacts.find((c) => c.id === id);
      if (existing) {
        setActiveChat(existing);
      } else {
        const newContact = {
          id: id,
          name: name,
          role: searchParams.get("role") || "Recruiter",
          avatar:
            searchParams.get("avatar") ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          status: "online",
          lastMessage: "Start a conversation...",
          time: "Just now",
          unread: 0,
        };
        setContacts((prev) => [newContact, ...prev]);
        setActiveChat(newContact);
      }
    }
  }, [searchParams, isLoadingContacts]);

  useEffect(() => {
    if (!activeChat || !myId) return;

    const generateRoomId = (id1, id2) => {
      return [String(id1), String(id2)].sort().join("-");
    };

    const roomId = generateRoomId(myId, activeChat.id);

    async function fetchMessages() {
      try {
        const res = await fetch(`/api/messages?roomId=chat-${roomId}`);
        const json = await res.json();
        if (json.success) {
          setMessages(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch messages", e);
      }
    }
    fetchMessages();
  }, [activeChat, myId]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const newSocket = io();

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io server", newSocket.id);
    });

    newSocket.on("receive_message", (data) => {
      console.log("Received message:", data);
      setMessages((prev) => {
        const isDuplicate = prev.some((m) => {
          if (m._id && data._id && m._id === data._id) return true;
          if (m.tempId && data.tempId && m.tempId === data.tempId) return true;
          return false;
        });
        if (isDuplicate) return prev;
        return [...prev, data];
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !activeChat || !myId) return;

    const roomId = `chat-${[String(myId), String(activeChat.id)].sort().join("-")}`;

    const joinRoom = () => {
      console.log(`[Client] Joining room: ${roomId}`);
      socket.emit("join_room", roomId);
    };

    if (socket.connected) {
      joinRoom();
    }
    socket.on("connect", joinRoom);

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [activeChat, socket, myId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !myId) return;

    console.log("Sending message...", { myId, activeChat: activeChat.id });

    const valRoomId = `chat-${[String(myId), String(activeChat.id)].sort().join("-")}`;

    const messageData = {
      tempId: Date.now().toString(),
      senderId: myId,
      recipientId: activeChat.id,
      text: newMessage,
      roomId: valRoomId,
      createdAt: new Date().toISOString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");

    if (socket) {
      socket.emit("send_message", messageData);
    }

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: myId,
          recipientId: activeChat.id,
          text: messageData.text,
          roomId: valRoomId,
        }),
      });
    } catch (err) {
      console.error("Failed to save message", err);
    }
  };

  if (!session) {
    return (
      <div
        className={`min-h-screen pt-20 flex items-center justify-center p-4 ${isDark ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="mb-4">You need to be logged in to use the chat.</p>
          <a
            href="/sign-in"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-16 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto h-[calc(100vh-5rem)] p-4">
        <div
          className={`flex h-full rounded-2xl overflow-hidden border backdrop-blur-xl shadow-2xl ${
            isDark
              ? "bg-slate-900/80 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          {/* Sidebar - Contacts List */}
          <div
            className={`${
              isSidebarOpen ? "flex" : "hidden"
            } md:flex flex-col w-full md:w-80 lg:w-96 border-r ${
              isDark ? "border-purple-500/20" : "border-purple-300/20"
            }`}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-purple-500/10">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20 text-white placeholder-gray-400"
                      : "bg-gray-50 border-purple-300/20 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    setActiveChat(contact);
                    setIsSidebarOpen(false);
                  }}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-purple-500/10 ${
                    activeChat?.id === contact.id
                      ? isDark
                        ? "bg-purple-500/20"
                        : "bg-purple-100"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full bg-purple-100"
                    />
                    {contact.status === "online" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold truncate">{contact.name}</h3>
                      <span
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {contact.time}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="w-5 h-5 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {contact.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={`${
              !isSidebarOpen ? "flex" : "hidden"
            } md:flex flex-col flex-1 bg-opacity-50`}
          >
            {!activeChat ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div
                  className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center ${
                    isDark ? "bg-purple-500/10" : "bg-purple-100"
                  }`}
                >
                  <Send
                    className={`w-10 h-10 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                  />
                </div>
                <h2 className="text-xl font-bold mb-2">
                  Select a conversation
                </h2>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Choose a contact from the sidebar to start chatting
                </p>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div
                  className={`p-4 border-b flex items-center justify-between ${
                    isDark
                      ? "bg-slate-900/50 border-purple-500/20"
                      : "bg-white/50 border-purple-300/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="md:hidden p-2 hover:bg-purple-500/10 rounded-full"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="w-10 h-10 rounded-full bg-purple-100"
                      />
                      {activeChat.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{activeChat.name}</h3>
                      <p
                        className={`text-xs ${
                          isDark ? "text-purple-300" : "text-purple-600"
                        }`}
                      >
                        {activeChat.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className={`p-2 rounded-full transition-colors ${
                        isDark
                          ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 rounded-full transition-colors ${
                        isDark
                          ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Video className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 rounded-full transition-colors ${
                        isDark
                          ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((msg, index) => {
                    const isMe = msg.senderId === myId;
                    return (
                      <div
                        key={msg._id || msg.tempId || index}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] sm:max-w-[60%] rounded-2xl p-4 shadow-sm ${
                            isMe
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none"
                              : isDark
                                ? "bg-slate-800 text-white rounded-tl-none border border-purple-500/20"
                                : "bg-white text-gray-900 rounded-tl-none border border-purple-100"
                          }`}
                        >
                          <p className="text-sm sm:text-base leading-relaxed">
                            {msg.text}
                          </p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1 text-[10px] sm:text-xs ${
                              isMe ? "text-purple-100" : "text-gray-400"
                            }`}
                          >
                            <span>{msg.time}</span>
                            {isMe && (
                              <span>
                                {msg.status === "read" ? (
                                  <CheckCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                                ) : (
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div
                  className={`p-4 border-t ${
                    isDark
                      ? "bg-slate-900/50 border-purple-500/20"
                      : "bg-white/50 border-purple-300/20"
                  }`}
                >
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-end gap-2"
                  >
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className={`p-2 rounded-full transition-colors ${
                          isDark
                            ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className={`hidden sm:block p-2 rounded-full transition-colors ${
                          isDark
                            ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <ImageIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 relative">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                        placeholder="Type a message..."
                        rows="1"
                        className={`w-full pl-4 pr-10 py-3 rounded-xl border resize-none focus:ring-2 focus:ring-purple-500/50 outline-none transition-all custom-scrollbar ${
                          isDark
                            ? "bg-slate-800/50 border-purple-500/20 text-white placeholder-gray-400"
                            : "bg-gray-50 border-purple-300/20 text-gray-900 placeholder-gray-500"
                        }`}
                        style={{ minHeight: "48px", maxHeight: "120px" }}
                      />
                      <button
                        type="button"
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                          isDark
                            ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                            : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
