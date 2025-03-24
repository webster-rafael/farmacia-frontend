"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importando framer-motion
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageProps } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMessageStore } from "@/src/store/useStore";

export function Header() {
  const { messages, fetchMessages } = useMessageStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const [prevMessages, setPrevMessages] = useState<MessageProps[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [notificationRead, setNotificationRead] = useState(false);

  const [readMessages, setReadMessages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    if (prevMessages.length > 0 && messages.length > prevMessages.length) {
      setUnreadCount(unreadCount + (messages.length - prevMessages.length));
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
    }

    setPrevMessages(messages);
  }, [messages, prevMessages, unreadCount]);

  useEffect(() => {
    const savedReadMessages = localStorage.getItem("readMessages");
    if (savedReadMessages) {
      setReadMessages(new Set(JSON.parse(savedReadMessages)));
    }
  }, []);

  useEffect(() => {
    if (readMessages.size > 0) {
      localStorage.setItem(
        "readMessages",
        JSON.stringify(Array.from(readMessages)),
      );
    }
  }, [readMessages]);

  const handleNotificationClick = (messageId: number) => {
    setReadMessages((prev) => new Set(prev.add(messageId)));

    setNotificationRead(true);
    setShowAlert(true);
    setUnreadCount(0);
  };

  const CloseNotificationClick = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="fixed bottom-2 right-2 z-20">
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert
                onClick={CloseNotificationClick}
                className="h-20 w-96 border bg-primary text-primary-foreground"
              >
                <Bell color="white" className="h-4 w-4 animate-bounce" />
                <AlertTitle className="text-zinc-200">
                  Você recebeu uma nova mensagem!
                </AlertTitle>
                <AlertDescription className="flex items-center gap-2 pt-2 text-zinc-400">
                  <span className="truncate">
                    {messages[0]?.notifyName || "Sem nome"}:
                  </span>
                  <span className="truncate">
                    {messages[0]?.body || "Sem mensagens"}
                  </span>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <Popover>
              <PopoverTrigger className="relative h-10 w-7">
                {unreadCount > 0 && (
                  <span className="absolute right-[0.25rem] top-1 text-xs font-bold text-zinc-600">
                    {unreadCount}
                  </span>
                )}
                <Bell
                  className={`h-5 w-5 ${unreadCount > 0 ? "animate-pulse" : ""}`}
                />
              </PopoverTrigger>
              <PopoverContent className="w-96">
                <ul className="space-y-2">
                  {messages.slice(0, 7).map((message, index) => (
                    <li
                      onClick={() => handleNotificationClick(message.id)}
                      key={message.id}
                      className={`rounded-md border ${
                        readMessages.has(message.id)
                          ? "bg-zinc-50"
                          : "bg-zinc-500"
                      } p-2`}
                    >
                      <h1
                        className={`text-sm font-semibold ${
                          readMessages.has(message.id)
                            ? "text-zinc-700"
                            : "text-zinc-100"
                        }`}
                      >
                        {readMessages.has(message.id)
                          ? "Mensagem lida"
                          : "Você recebeu uma nova mensagem"}
                      </h1>
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className={`truncate text-xs font-semibold ${
                            readMessages.has(message.id)
                              ? "text-zinc-600"
                              : "text-zinc-300"
                          }`}
                        >
                          {message.notifyName}:
                        </span>
                        <span
                          className={`truncate text-xs ${
                            readMessages.has(message.id)
                              ? "text-zinc-600"
                              : "text-zinc-300"
                          }`}
                        >
                          {message.body}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
