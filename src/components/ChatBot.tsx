import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Здравствуйте! Я помогу вам с вопросами о здоровье вашего питомца. Что вас беспокоит?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    "Срочная консультация",
    "Записаться на прием", 
    "Цены на услуги",
    "Работаете ли вы круглосуточно?",
    "Что делать при отравлении?"
  ];

  const responses: Record<string, string> = {
    "срочная консультация": "Для срочной консультации звоните по телефону +7 (495) 123-45-67. Мы работаем 24/7!",
    "записаться на прием": "Отлично! Заполните форму записи или позвоните нам. Ближайшее свободное время - сегодня в 15:30.",
    "цены на услуги": "Первичная консультация - 1500₽. Сейчас действует скидка 50% при записи через сайт!",
    "работаете ли вы круглосуточно": "Да, мы работаем 24/7. Экстренные случаи принимаем в любое время суток.",
    "что делать при отравлении": "1. Не давайте еду и воду 2. Немедленно везите к врачу 3. Захватите образец того, чем отравился питомец"
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const lowerText = messageText.toLowerCase();
      let response = responses[lowerText] || 
        Object.entries(responses).find(([key]) => lowerText.includes(key))?.[1] ||
        "Спасибо за вопрос! Для детальной консультации лучше записаться на прием. Могу помочь с записью?";

      const botMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${
            isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90 animate-pulse'
          }`}
        >
          <Icon name={isOpen ? "X" : "MessageCircle"} size={24} className="text-white" />
        </Button>
        
        {!isOpen && (
          <div className="absolute -top-12 right-0 bg-white rounded-lg shadow-lg p-3 whitespace-nowrap animate-bounce">
            <p className="text-sm font-semibold text-gray-800">Есть вопросы? Спросите меня! 💬</p>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 z-40 animate-slide-up">
          <Card className="w-full h-full shadow-2xl border-2 border-primary/20">
            <div className="bg-primary text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                    <Icon name="Stethoscope" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Ветеринарный помощник</p>
                    <p className="text-xs opacity-80">Онлайн • Отвечу через 1 мин</p>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70 ${message.isUser ? 'text-white' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString('ru', { timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Questions */}
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Быстрые вопросы:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 px-2"
                      onClick={() => handleSend(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Напишите ваш вопрос..."
                    className="text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button onClick={() => handleSend()} size="sm">
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;