
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Olá! Eu sou o Gabriel, seu assistente virtual. Como posso ajudar você hoje?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (inputText.trim()) {
      // Adiciona a mensagem do usuário
      const newUserMessage: ChatMessage = {
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages([...messages, newUserMessage]);
      setInputText("");
      setIsLoading(true);
      
      // Simulação de resposta da IA após um pequeno delay
      setTimeout(() => {
        const botResponses = [
          "Posso ajudar você a entender melhor sobre holdings familiares. O que gostaria de saber?",
          "Para criar uma holding familiar, você precisará reunir documentação e seguir algumas etapas. Quer que eu explique o processo?",
          "O planejamento sucessório é fundamental para preservar seu patrimônio. Podemos discutir estratégias personalizadas.",
          "Entendi sua dúvida. Vou conectá-lo com um de nossos especialistas para um atendimento mais personalizado.",
          "A W1 Consultoria Patrimonial oferece soluções completas para gestão de patrimônio. Como posso explicar melhor?",
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const botReply: ChatMessage = {
          text: randomResponse,
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botReply]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <div className="bg-w1-mint/20 p-1.5 rounded-full">
            <Bot className="h-5 w-5 text-w1-teal" />
          </div>
          <h3 className="font-medium">Gabriel - Assistente Virtual</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Fechar
        </Button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.isUser 
                  ? 'bg-w1-teal text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className={`text-xs mt-1 block ${message.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800 flex items-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button 
            size="icon" 
            className="bg-w1-teal hover:bg-w1-teal/90" 
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
