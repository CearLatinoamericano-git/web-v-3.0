import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Paperclip, Smile, Plus, Search, Users, User as UserIcon, MoreVertical, UserPlus, Check, Flag, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  role: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar?: string;
  type: 'individual' | 'group';
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  members?: Contact[];
  isOnline?: boolean;
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showContactsList, setShowContactsList] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [groupName, setGroupName] = useState('');
  const [currentConversationId, setCurrentConversationId] = useState<number>(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({ messageId: 0, sender: '', reportReason: '' });

  const handleReportMessage = (messageId: number, sender: string) => {
    setReportData({ messageId, sender, reportReason: '' });
    setShowReportModal(true);
  };

  const submitReport = () => {
    if (reportData.reportReason.trim() === '') {
      toast.error('Por favor ingrese el motivo del reporte');
      return;
    }
    toast.success(`Mensaje de ${reportData.sender} reportado al Área Académica`);
    setShowReportModal(false);
    setReportData({ messageId: 0, sender: '', reportReason: '' });
  };

  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'María González',
      avatar: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      status: 'online',
      role: 'Administración'
    },
    {
      id: 2,
      name: 'Carlos Méndez',
      avatar: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      status: 'online',
      role: 'Finanzas'
    },
    {
      id: 3,
      name: 'Ana Torres',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      status: 'away',
      role: 'Docente'
    },
    {
      id: 4,
      name: 'Jorge Ramírez',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      status: 'online',
      role: 'Soporte Técnico'
    },
    {
      id: 5,
      name: 'Patricia López',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      status: 'offline',
      role: 'Marketing'
    }
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: 'María González',
      avatar: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      type: 'individual',
      lastMessage: '¿Ya revisaste los pagos pendientes?',
      timestamp: '10:35 AM',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      name: 'Equipo de Finanzas',
      type: 'group',
      lastMessage: 'Carlos: Perfecto, mañana lo revisamos',
      timestamp: 'Ayer',
      unreadCount: 0,
      members: []
    },
    {
      id: 3,
      name: 'Ana Torres',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      type: 'individual',
      lastMessage: 'Gracias por la información',
      timestamp: '15/11',
      unreadCount: 0,
      isOnline: false
    }
  ]);

  const [messagesByConversation] = useState<{ [key: number]: Message[] }>({
    1: [
      {
        id: 1,
        sender: 'María González',
        avatar: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: '¿Ya revisaste los pagos pendientes de esta semana?',
        timestamp: '10:30 AM',
        isOwn: false
      },
      {
        id: 2,
        sender: 'Tú',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'Sí, hay 3 pagos que vencen mañana. Ya envié las notificaciones.',
        timestamp: '10:32 AM',
        isOwn: true
      }
    ],
    2: [
      {
        id: 1,
        sender: 'Carlos Méndez',
        avatar: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'Equipo, necesitamos revisar el reporte mensual',
        timestamp: 'Ayer 14:20',
        isOwn: false
      },
      {
        id: 2,
        sender: 'María González',
        avatar: 'https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'Perfecto, mañana lo revisamos',
        timestamp: 'Ayer 14:25',
        isOwn: false
      }
    ],
    3: [
      {
        id: 1,
        sender: 'Ana Torres',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
        content: 'Gracias por la información sobre los nuevos cursos',
        timestamp: '15/11 09:15',
        isOwn: false
      }
    ]
  });

  const [unreadCount, setUnreadCount] = useState(2);

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const currentMessages = messagesByConversation[currentConversationId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    toast.success('Mensaje enviado');
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() === '' || selectedMembers.length < 2) {
      toast.error('Ingresa un nombre y selecciona al menos 2 miembros');
      return;
    }

    const newGroup: Conversation = {
      id: conversations.length + 1,
      name: groupName,
      type: 'group',
      lastMessage: 'Grupo creado',
      timestamp: 'Ahora',
      unreadCount: 0,
      members: contacts.filter(c => selectedMembers.includes(c.id))
    };

    setConversations([newGroup, ...conversations]);
    setGroupName('');
    setSelectedMembers([]);
    setShowNewGroupModal(false);
    setCurrentConversationId(newGroup.id);
    toast.success(`Grupo "${groupName}" creado exitosamente`);
  };

  const handleStartIndividualChat = (contact: Contact) => {
    const existingConversation = conversations.find(
      c => c.type === 'individual' && c.name === contact.name
    );

    if (existingConversation) {
      setCurrentConversationId(existingConversation.id);
      setShowContactsList(false);
    } else {
      const newConversation: Conversation = {
        id: conversations.length + 1,
        name: contact.name,
        avatar: contact.avatar,
        type: 'individual',
        lastMessage: '',
        timestamp: 'Ahora',
        unreadCount: 0,
        isOnline: contact.status === 'online'
      };
      setConversations([newConversation, ...conversations]);
      setCurrentConversationId(newConversation.id);
      setShowContactsList(false);
    }
    toast.success(`Chat con ${contact.name} iniciado`);
  };

  const toggleMemberSelection = (contactId: number) => {
    setSelectedMembers(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={handleOpen}
          className="relative w-16 h-16 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white text-xs font-bold">{unreadCount}</span>
            </div>
          )}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#0B95BA] rounded-full animate-ping opacity-75"></div>
        </button>
        <div className="absolute bottom-20 left-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Chat del equipo
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`fixed bottom-6 left-6 z-50 transition-all`}>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex" style={{ width: isMinimized ? '320px' : '800px', height: isMinimized ? '64px' : '600px' }}>
          {/* Sidebar de conversaciones */}
          {!isMinimized && (
            <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
              {/* Header Sidebar */}
              <div className="p-4 bg-gradient-to-r from-[#0B95BA] to-[#087A98]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white">Mensajes</h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowContactsList(!showContactsList)}
                      className="w-8 h-8 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                      title="Nueva conversación"
                    >
                      <UserPlus className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => setShowNewGroupModal(true)}
                      className="w-8 h-8 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                      title="Nuevo grupo"
                    >
                      <Users className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                {/* Buscador */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar conversación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/50 rounded-lg text-white placeholder-white/70 text-sm focus:outline-none focus:bg-white/20 focus:border-white/70"
                  />
                </div>
              </div>

              {/* Lista de conversaciones o contactos */}
              <div className="flex-1 overflow-y-auto">
                {showContactsList ? (
                  // Lista de contactos
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                      Contactos del equipo
                    </div>
                    {filteredContacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => handleStartIndividualChat(contact)}
                        className="w-full p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-3 text-left"
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            contact.status === 'online' ? 'bg-green-500' :
                            contact.status === 'away' ? 'bg-yellow-500' :
                            'bg-gray-400'
                          }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
                          <p className="text-sm text-gray-500 truncate">{contact.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  // Lista de conversaciones
                  <div className="p-2">
                    {filteredConversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setCurrentConversationId(conv.id)}
                        className={`w-full p-3 rounded-lg transition-colors flex items-center gap-3 text-left mb-1 ${
                          currentConversationId === conv.id
                            ? 'bg-[#0B95BA]/10 border border-[#0B95BA]/30'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="relative">
                          {conv.type === 'group' ? (
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                          ) : (
                            <>
                              <ImageWithFallback
                                src={conv.avatar || ''}
                                alt={conv.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              {conv.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 truncate">{conv.name}</h4>
                            <span className="text-xs text-gray-500 ml-2">{conv.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-[#0B95BA] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{conv.unreadCount}</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Área de chat principal */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {currentConversation?.type === 'group' ? (
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <>
                      <ImageWithFallback
                        src={currentConversation?.avatar || ''}
                        alt={currentConversation?.name || ''}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {currentConversation?.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">{currentConversation?.name}</h3>
                  <p className="text-xs text-white/80">
                    {currentConversation?.type === 'group' 
                      ? `${currentConversation.members?.length || 0} miembros`
                      : currentConversation?.isOnline ? 'En línea' : 'Desconectado'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 group ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {!msg.isOwn && (
                        <ImageWithFallback
                          src={msg.avatar}
                          alt={msg.sender}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      )}
                      <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                        {!msg.isOwn && (
                          <span className="text-xs text-gray-500 mb-1 px-2">{msg.sender}</span>
                        )}
                        <div className="relative">
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              msg.isOwn
                                ? 'bg-[#0B95BA] text-white rounded-br-sm'
                                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          {!msg.isOwn && (
                            <button
                              onClick={() => handleReportMessage(msg.id, msg.sender)}
                              className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                              title="Reportar mensaje"
                            >
                              <Flag className="w-4 h-4 text-gray-400 hover:text-red-600" />
                            </button>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 mt-1 px-2">{msg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-end gap-2">
                    <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#0B95BA] transition-colors rounded-lg hover:bg-gray-100">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escribe un mensaje..."
                        rows={1}
                        className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent text-sm"
                        style={{ minHeight: '40px', maxHeight: '100px' }}
                      />
                      <button className="absolute right-2 bottom-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#0B95BA] transition-colors">
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="w-9 h-9 bg-[#0B95BA] hover:bg-[#087A98] rounded-xl flex items-center justify-center transition-colors"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Presiona Enter para enviar • Shift + Enter para nueva línea
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal de nuevo grupo */}
        {showNewGroupModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl shadow-2xl w-[500px] max-h-[600px] flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Crear grupo de trabajo</h3>
                  <button
                    onClick={() => {
                      setShowNewGroupModal(false);
                      setGroupName('');
                      setSelectedMembers([]);
                    }}
                    className="w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del grupo
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Ej: Equipo de Finanzas"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar miembros ({selectedMembers.length})
                  </label>
                  <div className="space-y-2">
                    {contacts.map((contact) => {
                      const isSelected = selectedMembers.includes(contact.id);
                      return (
                        <button
                          key={contact.id}
                          onClick={() => toggleMemberSelection(contact.id)}
                          className={`w-full p-3 rounded-lg transition-colors flex items-center gap-3 text-left border-2 ${
                            isSelected
                              ? 'bg-[#0B95BA]/10 border-[#0B95BA]'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="relative">
                            <ImageWithFallback
                              src={contact.avatar}
                              alt={contact.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0B95BA] rounded-full flex items-center justify-center border-2 border-white">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{contact.name}</h4>
                            <p className="text-sm text-gray-500">{contact.role}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setShowNewGroupModal(false);
                    setGroupName('');
                    setSelectedMembers([]);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="flex-1 px-4 py-2 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors"
                >
                  Crear grupo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de reporte */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Flag className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Reportar mensaje</h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowReportModal(false);
                      setReportData({ messageId: 0, sender: '', reportReason: '' });
                    }}
                    className="w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-800 font-medium mb-1">
                        Está reportando el mensaje de: <span className="font-bold">{reportData.sender}</span>
                      </p>
                      <p className="text-xs text-amber-700">
                        El Área Académica revisará este reporte en un plazo de 24-48 horas.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo del reporte *
                  </label>
                  <textarea
                    value={reportData.reportReason}
                    onChange={(e) => setReportData({ ...reportData, reportReason: e.target.value })}
                    placeholder="Describa el motivo por el cual reporta este mensaje..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows={5}
                    autoFocus
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setReportData({ messageId: 0, sender: '', reportReason: '' });
                  }}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitReport}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
                >
                  Enviar reporte
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}