
"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, User, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: string;
  timestamp: Date;
}

interface ChatSectionProps {
  persona?: string;
  initialMessage?: string;
}

export default function ChatSection({ persona = "default", initialMessage }: ChatSectionProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        initialMessage ||
        "Hi! I'm SaiyanAI. Ask me anything about Dragon Ball sagas, transformations, techniques, or lore!",
      timestamp: new Date(),
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        message: userMsg.content,
        persona: persona // Pass the persona
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.data.response,
        source: response.data.source,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        console.error(error); // Log error for debugging
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, my ki is low right now… I couldn't reach the backend. Make sure `uvicorn` is running at `http://localhost:8000`!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="chat" className="py-20 bg-transparent min-h-screen border-t border-white/5 flex flex-col items-center">
      <div className="container relative max-w-4xl px-4 w-full h-[800px] flex flex-col bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Chat Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/background-chat.jpg" 
            alt="Chat Background" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Header */}
        <div className="relative z-10 p-6 border-b border-white/20 bg-zinc-900/80 backdrop-blur-md flex items-center gap-3">
          <div className="p-2 bg-orange-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">SaiyanAI - Capsule Chat</h2>
            <p className="text-xs text-orange-400">Llama-3.2 + Qdrant (knowledge base)</p>
          </div>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[80%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                  msg.role === "user" 
                    ? "bg-blue-600 border-blue-500 text-white" 
                    : "bg-orange-600 border-orange-500 text-white"
                )}>
                  {msg.role === "user" ? <User size={20} /> : <Sparkles size={20} />}
                </div>

                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm",
                  msg.role === "user"
                    ? "bg-blue-600/90 text-white rounded-tr-none border border-blue-500/30"
                    : "bg-zinc-800/90 text-gray-200 rounded-tl-none border border-white/10"
                )}>
                  <p>{msg.content}</p>
                  {msg.source && (
                     <div className="mt-2 text-xs opacity-50 border-t border-white/10 pt-1 flex items-center gap-1">
                        <span>Source: {msg.source === 'web' ? 'Web (DuckDuckGo)' : 'Knowledge Base'}</span>
                     </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-orange-600 border border-orange-500 flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
               </div>
               <div className="bg-zinc-800/90 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                  <span className="text-gray-400 text-sm">Gathering ki...</span>
               </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="relative z-10 p-4 bg-zinc-900/80 backdrop-blur-md border-t border-white/20">
          <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Goku, Vegeta, transformations, or sagas..."
              className="w-full bg-zinc-950/90 backdrop-blur-sm text-white placeholder-gray-400 rounded-full py-4 pl-6 pr-14 border border-white/20 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all font-medium"
            />
            <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
