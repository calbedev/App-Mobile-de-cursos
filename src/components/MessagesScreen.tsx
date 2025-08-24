import { useState } from 'react';
import { Search, Send, Phone, Video, MoreHorizontal, Paperclip, Smile } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

export function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      mentor: {
        name: 'Carlos Mendes',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        specialty: 'React Native',
        online: true
      },
      lastMessage: 'Perfeito! Você está no caminho certo. Continue praticando.',
      time: '10:30',
      unread: 0,
      messages: [
        {
          id: 1,
          text: 'Olá! Estou com dúvida sobre navegação no React Native.',
          sender: 'student',
          time: '10:15'
        },
        {
          id: 2,
          text: 'Oi! Claro, vou te ajudar. Qual é especificamente a sua dúvida?',
          sender: 'mentor',
          time: '10:16'
        },
        {
          id: 3,
          text: 'Como faço para passar parâmetros entre telas?',
          sender: 'student',
          time: '10:17'
        },
        {
          id: 4,
          text: 'Existem algumas formas. A mais comum é usando route.params. Vou te mandar um exemplo.',
          sender: 'mentor',
          time: '10:20'
        },
        {
          id: 5,
          text: 'Perfeito! Você está no caminho certo. Continue praticando.',
          sender: 'mentor',
          time: '10:30'
        }
      ]
    },
    {
      id: 2,
      mentor: {
        name: 'Ana Costa',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c9dc?w=40&h=40&fit=crop&crop=face',
        specialty: 'UI/UX Design',
        online: false
      },
      lastMessage: 'Vou revisar seu projeto e te dou um feedback.',
      time: 'Ontem',
      unread: 2,
      messages: [
        {
          id: 1,
          text: 'Terminei o primeiro protótipo do app',
          sender: 'student',
          time: 'Ontem 14:30'
        },
        {
          id: 2,
          text: 'Que legal! Pode me mandar o link?',
          sender: 'mentor',
          time: 'Ontem 14:45'
        },
        {
          id: 3,
          text: 'Vou revisar seu projeto e te dou um feedback.',
          sender: 'mentor',
          time: 'Ontem 15:20'
        }
      ]
    },
    {
      id: 3,
      mentor: {
        name: 'Roberto Silva',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        specialty: 'Marketing Digital',
        online: true
      },
      lastMessage: 'Obrigado pela explicação!',
      time: '2 dias',
      unread: 0,
      messages: [
        {
          id: 1,
          text: 'Como posso melhorar a conversão do meu funil?',
          sender: 'student',
          time: '2 dias atrás'
        },
        {
          id: 2,
          text: 'Vamos analisar seus dados primeiro. Pode me mandar os números?',
          sender: 'mentor',
          time: '2 dias atrás'
        },
        {
          id: 3,
          text: 'Obrigado pela explicação!',
          sender: 'student',
          time: '2 dias atrás'
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.mentor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // Simulate sending message
      const newMsg = {
        id: Date.now(),
        text: newMessage,
        sender: 'student',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      selectedChat.messages.push(newMsg);
      selectedChat.lastMessage = newMessage;
      setNewMessage('');
    }
  };

  if (selectedChat) {
    return (
      <div className="flex flex-col h-screen bg-white">
        {/* Chat Header */}
        <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedChat(null)}
              className="lg:hidden"
            >
              ←
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedChat.mentor.avatar} />
              <AvatarFallback>{selectedChat.mentor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-800">{selectedChat.mentor.name}</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  selectedChat.mentor.online ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span className="text-sm text-gray-600">
                  {selectedChat.mentor.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {selectedChat.messages.map((message: any) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.sender === 'student'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'student' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1"
              >
                <Smile className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-green-500 hover:bg-green-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Mensagens</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 focus:border-green-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="p-4 space-y-3">
        {filteredConversations.map((conversation) => (
          <Card 
            key={conversation.id}
            className="cursor-pointer border-0 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => setSelectedChat(conversation)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.mentor.avatar} />
                    <AvatarFallback>
                      {conversation.mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.mentor.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-800 truncate">
                      {conversation.mentor.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {conversation.unread > 0 && (
                        <Badge className="bg-green-500 text-white text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{conversation.mentor.specialty}</p>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredConversations.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">💬</div>
            <p className="text-gray-600">Nenhuma conversa encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}