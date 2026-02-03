import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image as ImageIcon, X, Download, Users, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: Date;
  attachments?: Array<{
    name: string;
    type: string;
    url: string;
    size: string;
  }>;
}

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  online: boolean;
}

interface GroupActivityChatProps {
  activityId: string;
  activityTitle: string;
  groupId: string;
  groupName: string;
  currentUserId: string;
  currentUserName: string;
}

export function GroupActivityChat({ 
  activityId, 
  activityTitle, 
  groupId, 
  groupName,
  currentUserId,
  currentUserName 
}: GroupActivityChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: '2',
      userName: 'María González',
      message: 'Hola equipo! ¿Cómo vamos con el análisis del caso?',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      userId: '3',
      userName: 'Carlos Pérez',
      message: 'Ya revisé la primera parte. Creo que deberíamos enfocarnos en el marco legal.',
      timestamp: new Date(Date.now() - 3000000)
    },
    {
      id: '3',
      userId: currentUserId,
      userName: currentUserName,
      message: 'De acuerdo. Les comparto el documento que encontré.',
      timestamp: new Date(Date.now() - 2400000),
      attachments: [
        {
          name: 'Marco_Legal_Arbitraje.pdf',
          type: 'PDF',
          url: '#',
          size: '2.4 MB'
        }
      ]
    }
  ]);

  const [groupMembers] = useState<GroupMember[]>([
    {
      id: currentUserId,
      name: currentUserName,
      email: 'yo@cear.edu.pe',
      online: true
    },
    {
      id: '2',
      name: 'María González',
      email: 'maria.gonzalez@cear.edu.pe',
      online: true
    },
    {
      id: '3',
      name: 'Carlos Pérez',
      email: 'carlos.perez@cear.edu.pe',
      online: false
    },
    {
      id: '4',
      name: 'Ana Torres',
      email: 'ana.torres@cear.edu.pe',
      online: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<Array<{
    name: string;
    type: string;
    url: string;
    size: string;
  }>>([]);
  const [showMembers, setShowMembers] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) {
      toast.error('Escribe un mensaje o adjunta un archivo');
      return;
    }

    const message: Message = {
      id: String(Date.now()),
      userId: currentUserId,
      userName: currentUserName,
      message: newMessage,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setAttachments([]);
    toast.success('Mensaje enviado');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = files.map(file => ({
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      url: URL.createObjectURL(file),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    }));

    setAttachments([...attachments, ...newAttachments]);
    toast.success(`${files.length} archivo(s) agregado(s)`);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Hoy';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    }
    
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(messageDate);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-bold">{groupName}</h3>
            </div>
            <p className="text-sm opacity-90">{activityTitle}</p>
          </div>
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>

        {/* Members Panel */}
        {showMembers && (
          <div className="mt-4 p-4 bg-white rounded-xl shadow-lg">
            <h4 className="font-medium mb-3 text-gray-900">Miembros del grupo ({groupMembers.length})</h4>
            <div className="space-y-2">
              {groupMembers.map(member => (
                <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#0B95BA] rounded-full flex items-center justify-center">
                      <span className="font-medium text-white">{member.name.charAt(0)}</span>
                    </div>
                    {member.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    member.online ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-200 text-gray-700 border border-gray-300'
                  }`}>
                    {member.online ? 'En línea' : 'Offline'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
          const isOwnMessage = message.userId === currentUserId;

          return (
            <div key={message.id}>
              {showDate && (
                <div className="flex items-center justify-center my-4">
                  <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}

              <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                  {!isOwnMessage && (
                    <p className="text-xs font-medium text-gray-600 mb-1 ml-2">
                      {message.userName}
                    </p>
                  )}
                  
                  <div className={`p-3 rounded-2xl ${
                    isOwnMessage 
                      ? 'bg-[#0B95BA] text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.message && (
                      <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                    )}
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment, idx) => (
                          <a
                            key={idx}
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                              isOwnMessage
                                ? 'bg-white/10 hover:bg-white/20'
                                : 'bg-white hover:bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <Paperclip className="w-4 h-4" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{attachment.name}</p>
                              <p className={`text-xs ${isOwnMessage ? 'opacity-75' : 'text-gray-500'}`}>
                                {attachment.size}
                              </p>
                            </div>
                            <Download className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right mr-2' : 'ml-2'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200"
              >
                <Paperclip className="w-4 h-4 text-gray-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate max-w-[150px]">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-gray-500">{attachment.size}</p>
                </div>
                <button
                  onClick={() => removeAttachment(index)}
                  className="p-1 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-end gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Adjuntar archivo"
          >
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Escribe un mensaje..."
              rows={1}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={handleSendMessage}
            className="p-2 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-lg transition-colors"
            title="Enviar mensaje"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}