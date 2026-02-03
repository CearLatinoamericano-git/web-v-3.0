import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Search,
  ThumbsUp,
  MessageCircle,
  Pin,
  Clock,
  TrendingUp,
  Filter,
  Paperclip,
  Video,
  FileText,
  X,
  Download,
  Send,
  BookOpen,
  Layers,
  Flag,
  AlertTriangle,
  Bell,
  BellOff,
  Calendar,
  Lock,
  LockOpen,
} from "lucide-react";
import { toast } from 'sonner';

interface ForumAttachment {
  id: string;
  name: string;
  type: "document" | "video" | "image";
  size: string;
  url: string;
}

interface ForumThread {
  id: string;
  title: string;
  author: string;
  authorRole: "student" | "teacher" | "admin";
  courseCode: string;
  courseName: string;
  module: string;
  content: string;
  timestamp: string;
  replies: number;
  likes: number;
  isResolved: boolean;
  attachments?: ForumAttachment[];
}

interface ForumReply {
  id: string;
  author: string;
  authorRole: "student" | "teacher" | "admin";
  content: string;
  timestamp: string;
  likes: number;
  attachments?: ForumAttachment[];
}

interface ForumViewProps {
  forumId?: string;
  onBack?: () => void;
  courseCode?: string;
  courseName?: string;
  moduleName?: string;
  userRole?: 'student' | 'teacher' | 'admin' | 'superadmin' | 'administration';
}

export function ForumView({
  forumId,
  onBack,
  courseCode,
  courseName,
  moduleName,
  userRole = 'student',
}: ForumViewProps = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedThread, setSelectedThread] = useState<
    string | null
  >(null);
  const [filterBy, setFilterBy] = useState<
    "all" | "my-posts" | "unanswered" | "resolved"
  >("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showNewThreadForm, setShowNewThreadForm] =
    useState(false);
  const [newThread, setNewThread] = useState({
    title: "",
    courseCode: courseCode || "",
    courseName: courseName || "",
    module: moduleName || "",
    content: "",
    attachments: [] as ForumAttachment[],
  });
  const [newReply, setNewReply] = useState("");
  const [replyAttachments, setReplyAttachments] = useState<
    ForumAttachment[]
  >([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({ commentId: '', commentAuthor: '', reportReason: '' });
  const [notificationsEnabled, setNotificationsEnabled] = useState<Record<string, boolean>>({});
  const [closedThreads, setClosedThreads] = useState<Record<string, boolean>>({});

  const toggleThreadClosed = (threadId: string) => {
    const isClosed = !closedThreads[threadId];
    setClosedThreads({ ...closedThreads, [threadId]: isClosed });
    
    if (isClosed) {
      toast.success('Foro cerrado exitosamente. Los estudiantes no podrán agregar nuevas respuestas');
    } else {
      toast.success('Foro abierto exitosamente. Los estudiantes pueden agregar respuestas');
    }
  };

  const toggleNotifications = (threadId: string, threadTitle: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent thread opening
    const isEnabled = !notificationsEnabled[threadId];
    setNotificationsEnabled({ ...notificationsEnabled, [threadId]: isEnabled });
    
    if (isEnabled) {
      toast.success(`Notificaciones activadas para "${threadTitle}"`);
    } else {
      toast.success(`Notificaciones desactivadas para "${threadTitle}"`);
    }
  };

  const handleReportComment = (commentId: string, commentAuthor: string) => {
    setReportData({ commentId, commentAuthor, reportReason: '' });
    setShowReportModal(true);
  };

  const submitReport = () => {
    if (reportData.reportReason.trim() === '') {
      toast.error('Por favor ingrese el motivo del reporte');
      return;
    }
    toast.success(`Comentario de ${reportData.commentAuthor} reportado al Área Académica`);
    setShowReportModal(false);
    setReportData({ commentId: '', commentAuthor: '', reportReason: '' });
  };

  const threads: ForumThread[] = [
    {
      id: "1",
      title:
        "¿Cómo se aplica el principio de autonomía de la voluntad en el arbitraje internacional?",
      author: "Juan Pérez García",
      authorRole: "student",
      courseCode: "DIPARB-2024-V1",
      courseName:
        "Diplomado en Arbitraje Comercial Internacional",
      module: "Módulo 1: Fundamentos del Arbitraje",
      content:
        "He estado estudiando el material del módulo 1 y me surge la duda sobre cómo funciona exactamente el principio de autonomía de la voluntad en casos de arbitraje internacional. ¿Podría alguien explicarme con ejemplos prácticos?",
      timestamp: "2024-11-30T14:30:00",
      replies: 5,
      likes: 12,
      isResolved: true,
      attachments: [] as ForumAttachment[],
    },
    {
      id: "2",
      title: "Consulta sobre el caso práctico #3 del módulo 2",
      author: "María González",
      authorRole: "student",
      courseCode: "CONTPUB-2024-V1",
      courseName: "Contratación Pública",
      module: "Módulo 2: Marco Legal",
      content:
        "Tengo dudas sobre el desarrollo del caso práctico #3. Específicamente sobre la aplicación de la normativa en el punto 2.3. ¿Alguien más tiene esta duda?",
      timestamp: "2024-11-29T16:45:00",
      replies: 3,
      likes: 8,
      isResolved: false,
      attachments: [] as ForumAttachment[],
    },
    {
      id: "3",
      title:
        "Importante: Materiales adicionales para el examen final",
      author: "Área Académica",
      authorRole: "teacher",
      courseCode: "DIPARB-2024-V1",
      courseName:
        "Diplomado en Arbitraje Comercial Internacional",
      module: "General",
      content:
        "Estimados estudiantes, he subido materiales adicionales de lectura recomendada para el examen final. Los encontrarán en la biblioteca del curso.",
      timestamp: "2024-11-28T10:00:00",
      replies: 15,
      likes: 45,
      isResolved: false,
      attachments: [] as ForumAttachment[],
    },
    {
      id: "4",
      title: "Diferencias entre mediación y conciliación",
      author: "Carlos Ramírez",
      authorRole: "student",
      courseCode: "RESCONT-2024-V1",
      courseName: "Resolución de Controversias",
      module: "Módulo 1: Métodos Alternativos",
      content:
        "¿Alguien podría explicarme las principales diferencias entre mediación y conciliación en el contexto latinoamericano?",
      timestamp: "2024-11-27T18:20:00",
      replies: 7,
      likes: 18,
      isResolved: true,
      attachments: [] as ForumAttachment[],
    },
  ];

  const replies: { [threadId: string]: ForumReply[] } = {
    "1": [
      {
        id: "r1",
        author: "Área Académica",
        authorRole: "teacher",
        content:
          "Excelente pregunta Juan. El principio de autonomía de la voluntad es fundamental en el arbitraje. Significa que las partes tienen libertad para diseñar el proceso arbitral según sus necesidades. Por ejemplo, pueden elegir: 1) El número de árbitros, 2) Las reglas aplicables, 3) La sede del arbitraje, 4) El idioma del procedimiento.",
        timestamp: "2024-11-30T15:00:00",
        likes: 8,
      },
      {
        id: "r2",
        author: "Ana Martínez",
        authorRole: "student",
        content:
          "Complementando la respuesta del Área Académica, un ejemplo práctico sería cuando una empresa peruana y una brasileña acuerdan un arbitraje en Lima, bajo las reglas de la CCI, con 3 árbitros y en español.",
        timestamp: "2024-11-30T15:30:00",
        likes: 5,
      },
    ],
    "2": [
      {
        id: "r3",
        author: "Luis Fernández",
        authorRole: "student",
        content:
          "Yo también tuve esa duda. Revisé nuevamente el material y creo que la clave está en el artículo 52 de la ley.",
        timestamp: "2024-11-29T17:00:00",
        likes: 3,
      },
    ],
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tema creado exitosamente");
    setShowNewThreadForm(false);
    setNewThread({
      title: "",
      courseCode: "",
      module: "",
      content: "",
      attachments: [],
    });
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Respuesta publicada");
    setNewReply("");
    setReplyAttachments([]);
  };

  const filteredThreads = threads.filter((thread) => {
    const matchesSearch =
      thread.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      thread.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCourse = courseFilter === "all" || thread.courseCode === courseFilter;

    const matchesDateRange = !dateFrom || !dateTo || (new Date(thread.timestamp) >= new Date(dateFrom) && new Date(thread.timestamp) <= new Date(dateTo));

    return matchesSearch && matchesCourse && matchesDateRange;
  });

  const getRoleBadge = (role: string) => {
    const badges = {
      student: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "Estudiante",
      },
      teacher: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        label: "Área Académica",
      },
      admin: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Admin",
      },
    };
    return (
      badges[role as keyof typeof badges] || badges.student
    );
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Hace menos de 1 hora";
    if (diffInHours < 24)
      return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;
  };

  if (selectedThread) {
    const thread = threads.find((t) => t.id === selectedThread);
    if (!thread) return null;

    const threadReplies = replies[selectedThread] || [];
    const roleBadge = getRoleBadge(thread.authorRole);

    return (
      <>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
          <button
            onClick={() => setSelectedThread(null)}
            className="text-white/90 hover:text-white mb-4 transition-colors"
          >
            ← Volver a foros
          </button>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-10 h-10" />
            <h1 className="text-4xl font-bold">
              Foro de discusión
            </h1>
          </div>
          <p className="text-xl opacity-90">
            {thread.courseName}
          </p>
        </div>

        {/* Thread */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
          {/* Thread Header */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {thread.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900">
                    {thread.author}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge.bg} ${roleBadge.text}`}
                  >
                    {roleBadge.label}
                  </span>
                  {thread.isResolved && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      ✓ Resuelto
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {thread.module}
                </p>
                <p className="text-xs text-gray-500">
                  {getTimeAgo(thread.timestamp)}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-3">
              {thread.title}
            </h2>
            <p className="text-gray-700 mb-4">
              {thread.content}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <button className="flex items-center gap-1 hover:text-[#0B95BA] transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>{thread.likes}</span>
              </button>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{thread.replies} respuestas</span>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="p-6 space-y-4">
            <h3 className="font-bold text-gray-900 mb-4">
              Respuestas ({threadReplies.length})
            </h3>

            {threadReplies.map((reply) => {
              const replyBadge = getRoleBadge(reply.authorRole);
              return (
                <div
                  key={reply.id}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {reply.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">
                          {reply.author}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${replyBadge.bg} ${replyBadge.text}`}
                        >
                          {replyBadge.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {getTimeAgo(reply.timestamp)}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {reply.content}
                      </p>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#0B95BA] transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{reply.likes}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleReportComment(reply.id, reply.author)
                          }
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                          title="Reportar comentario"
                        >
                          <Flag className="w-4 h-4" />
                          <span className="text-xs">Reportar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* New Reply Form */}
            <form
              onSubmit={handleReply}
              className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200"
            >
              <h4 className="font-bold text-gray-900 mb-3">
                Escribe tu respuesta
              </h4>
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Comparte tu opinión o responde a la pregunta..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent resize-none"
                rows={4}
                required
              />

              {/* Reply Attachments */}
              <div className="mt-3">
                <input
                  type="file"
                  id="reply-file-upload"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,image/*"
                  onChange={(e) => {
                    const files = Array.from(
                      e.target.files || [],
                    );
                    const attachments = files.map((file) => {
                      const fileType = file.type.startsWith(
                        "video/",
                      )
                        ? "video"
                        : file.type.startsWith("image/")
                          ? "image"
                          : "document";
                      return {
                        id: String(Date.now() + Math.random()),
                        name: file.name,
                        type: fileType as
                          | "document"
                          | "video"
                          | "image",
                        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                        url: URL.createObjectURL(file),
                      };
                    });
                    setReplyAttachments([
                      ...replyAttachments,
                      ...attachments,
                    ]);
                    toast.success(
                      `${files.length} archivo(s) agregado(s)`,
                    );
                  }}
                  className="hidden"
                />

                {replyAttachments.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {replyAttachments.map((file, index) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded flex items-center justify-center ${
                              file.type === "video"
                                ? "bg-red-100"
                                : file.type === "image"
                                  ? "bg-green-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            {file.type === "video" && (
                              <Video className="w-4 h-4 text-red-600" />
                            )}
                            {file.type === "image" && (
                              <FileText className="w-4 h-4 text-green-600" />
                            )}
                            {file.type === "document" && (
                              <FileText className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.size}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setReplyAttachments(
                              replyAttachments.filter(
                                (_, i) => i !== index,
                              ),
                            );
                            toast.success("Archivo eliminado");
                          }}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center gap-3 mt-3">
                <label
                  htmlFor="reply-file-upload"
                  className="cursor-pointer px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2 border-2 border-gray-300"
                >
                  <Paperclip className="w-4 h-4" />
                  Adjuntar archivo
                </label>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Publicar Respuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de reporte - Vista detalle thread */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Flag className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Reportar comentario</h3>
                </div>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setReportData({ commentId: '', commentAuthor: '', reportReason: '' });
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
                      Está reportando el comentario de: <span className="font-bold">{reportData.commentAuthor}</span>
                    </p>
                    <p className="text-xs text-amber-700">
                      El Área Académica revisará este reporte en un plazo de 2 días.
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
                  placeholder="Describa el motivo por el cual reporta este comentario..."
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
                  setReportData({ commentId: '', commentAuthor: '', reportReason: '' });
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
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-10 h-10" />
            <h1 className="text-4xl font-bold">
              Foros de discusión
            </h1>
          </div>
          <p className="text-xl opacity-90">
            Participa en debates académicos con tus compañeros y el Área Académica
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative w-full lg:w-64">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Todos los programas</option>
                  <option value="DIP-CONTPUB-32069">Diplomado en Contratación Pública bajo la Ley 32069 y su Reglamento</option>
                  <option value="DIP-ARB-CONTPUB">Diplomado de Posgrado en Arbitraje en Contratación Pública</option>
                  <option value="DIP-DERADM-ARB">Diplomado de Posgrado en Derecho Administrativo para Árbitros</option>
                  <option value="CURSO-CONTROV-EJEC">Curso de Especialidad de Controversias en la Ejecución Contractual</option>
                </select>
              </div>
              
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por tema o contenido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-40">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="Desde"
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
                <div className="relative flex-1 lg:w-40">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="Hasta"
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() =>
                  setShowNewThreadForm(!showNewThreadForm)
                }
                className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                Nuevo tema
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterBy("all")}
              className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
                filterBy === "all"
                  ? "bg-[#0B95BA] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterBy("my-posts")}
              className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
                filterBy === "my-posts"
                  ? "bg-[#0B95BA] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Mis publicaciones
            </button>
            <button
              onClick={() => setFilterBy("unanswered")}
              className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
                filterBy === "unanswered"
                  ? "bg-[#0B95BA] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Sin responder
            </button>
            <button
              onClick={() => setFilterBy("resolved")}
              className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
                filterBy === "resolved"
                  ? "bg-[#0B95BA] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Resueltos
            </button>
          </div>
        </div>

        {/* New Thread Form */}
        {showNewThreadForm && (
          <form
            onSubmit={handleCreateThread}
            className="bg-white rounded-2xl p-6 border-2 border-blue-200"
          >
            <h3 className="font-bold text-gray-900 mb-4">
              Crear nuevo tema
            </h3>

            <div className="space-y-4">
              {/* Show course and module info if provided from context */}
              {courseCode && courseName && moduleName && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      {courseName}
                    </span>
                    <span className="text-gray-500">•</span>
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">
                      {moduleName}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del tema *
                </label>
                <input
                  type="text"
                  required
                  value={newThread.title}
                  onChange={(e) =>
                    setNewThread({
                      ...newThread,
                      title: e.target.value,
                    })
                  }
                  placeholder="Escribe un título descriptivo..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

              {/* Only show course and module selectors if not provided from context */}
              {!courseCode && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Programa *
                    </label>
                    <select
                      required
                      value={newThread.programId}
                      onChange={(e) => setNewThread({ ...newThread, programId: e.target.value })}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent transition-all"
                    >
                      <option value="">Seleccione un programa</option>
                      <option value="DIP-ARB-CONTPUB">Diplomado de Posgrado en Arbitraje en Contratación Pública</option>
                      <option value="DIP-DERADM-ARB">Diplomado de Posgrado en Derecho Administrativo para Árbitros</option>
                      <option value="CURSO-CONTROV-EJEC">Curso de Especialidad de Controversias en la Ejecución Contractual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Módulo *
                    </label>
                    <input
                      type="text"
                      required
                      value={newThread.module}
                      onChange={(e) =>
                        setNewThread({
                          ...newThread,
                          module: e.target.value,
                        })
                      }
                      placeholder="Ej: Módulo 1: Fundamentos"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenido *
                </label>
                <textarea
                  required
                  value={newThread.content}
                  onChange={(e) =>
                    setNewThread({
                      ...newThread,
                      content: e.target.value,
                    })
                  }
                  placeholder="Describe tu pregunta o tema de discusión..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent resize-none"
                  rows={6}
                />
              </div>

              {/* Attachments Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Archivos o Videos Adjuntos (opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#0B95BA] transition-colors">
                  <input
                    type="file"
                    id="thread-file-upload"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,image/*"
                    onChange={(e) => {
                      const files = Array.from(
                        e.target.files || [],
                      );
                      const attachments = files.map((file) => {
                        const fileType = file.type.startsWith(
                          "video/",
                        )
                          ? "video"
                          : file.type.startsWith("image/")
                            ? "image"
                            : "document";
                        return {
                          id: String(Date.now() + Math.random()),
                          name: file.name,
                          type: fileType as
                            | "document"
                            | "video"
                            | "image",
                          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                          url: URL.createObjectURL(file),
                        };
                      });
                      setNewThread({
                        ...newThread,
                        attachments: [
                          ...newThread.attachments,
                          ...attachments,
                        ],
                      });
                      toast.success(
                        `${files.length} archivo(s) agregado(s)`,
                      );
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="thread-file-upload"
                    className="cursor-pointer inline-flex flex-col items-center"
                  >
                    <Paperclip className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700 mb-1">
                      Click para adjuntar archivos o videos
                    </span>
                    <span className="text-xs text-gray-500">
                      PDF, Word, PowerPoint, MP4, Imágenes (máx.
                      50MB por archivo)
                    </span>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {newThread.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {newThread.attachments.map((file, index) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              file.type === "video"
                                ? "bg-red-100"
                                : file.type === "image"
                                  ? "bg-green-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            {file.type === "video" && (
                              <Video className="w-5 h-5 text-red-600" />
                            )}
                            {file.type === "image" && (
                              <FileText className="w-5 h-5 text-green-600" />
                            )}
                            {file.type === "document" && (
                              <FileText className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.size} • {file.type}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setNewThread({
                              ...newThread,
                              attachments:
                                newThread.attachments.filter(
                                  (_, i) => i !== index,
                                ),
                            });
                            toast.success("Archivo eliminado");
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-lg transition-colors"
                >
                  Publicar Tema
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewThreadForm(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Threads List */}
        <div className="space-y-4">
          {filteredThreads.map((thread) => {
            const roleBadge = getRoleBadge(thread.authorRole);
            const isNotificationEnabled = notificationsEnabled[thread.id] || false;
            const isThreadClosed = closedThreads[thread.id] || false;

            return (
              <div
                key={thread.id}
                className="w-full bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#0B95BA] transition-all"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => setSelectedThread(thread.id)}
                    className="w-12 h-12 bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 hover:scale-105 transition-transform"
                  >
                    {thread.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">
                        {thread.author}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge.bg} ${roleBadge.text}`}
                      >
                        {roleBadge.label}
                      </span>
                      {thread.isResolved && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          ✓ Resuelto
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedThread(thread.id)}
                      className="w-full text-left"
                    >
                      <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#0B95BA] transition-colors">
                        {thread.title}
                      </h2>
                      <p className="text-gray-700 mb-3 line-clamp-2">
                        {thread.content}
                      </p>
                    </button>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-[12px] mt-[0px] mr-[0px] ml-[-22px]">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-gray-900" />
                        <span className="font-medium">{thread.courseCode}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-gray-900" />
                        <span>{thread.module}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-900" />
                        <span>
                          {getTimeAgo(thread.timestamp)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-5 text-sm">
                        <div className="flex items-center gap-1.5">
                          <ThumbsUp className="w-4 h-4" style={{ stroke: '#0B95BA', strokeWidth: 2.5, fill: 'none' }} />
                          <span className="font-medium text-gray-900">{thread.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4" style={{ stroke: '#0B95BA', strokeWidth: 2.5, fill: 'none' }} />
                          <span className="font-medium text-gray-900">{thread.replies} respuestas</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => toggleNotifications(thread.id, thread.title, e)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                          isNotificationEnabled
                            ? 'bg-[#0B95BA] text-white hover:bg-[#087A98] shadow-md'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-300'
                        }`}
                        title={isNotificationEnabled ? 'Desactivar notificaciones' : 'Activar notificaciones'}
                      >
                        {isNotificationEnabled ? (
                          <>
                            <Bell className="w-4 h-4" style={{ stroke: '#ffffff', strokeWidth: 2.5, fill: 'none' }} />
                            <span className="hidden sm:inline">Notificaciones activadas</span>
                            <span className="sm:hidden">Activadas</span>
                          </>
                        ) : (
                          <>
                            <BellOff className="w-4 h-4" style={{ stroke: '#1F2937', strokeWidth: 2.5, fill: 'none' }} />
                            <span className="hidden sm:inline">Recibir notificaciones</span>
                            <span className="sm:hidden">Notificar</span>
                          </>
                        )}
                      </button>

                      {userRole === 'teacher' && (
                        <button
                          onClick={() => toggleThreadClosed(thread.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                            isThreadClosed
                              ? 'bg-red-500 text-white hover:bg-red-600 shadow-md'
                              : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                          }`}
                          title={isThreadClosed ? 'Click para abrir foro' : 'Click para cerrar foro'}
                        >
                          {isThreadClosed ? (
                            <>
                              <Lock className="w-4 h-4" />
                              <span className="hidden sm:inline">Foro cerrado</span>
                              <span className="sm:hidden">Cerrado</span>
                            </>
                          ) : (
                            <>
                              <LockOpen className="w-4 h-4" />
                              <span className="hidden sm:inline">Foro abierto</span>
                              <span className="sm:hidden">Abierto</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredThreads.length === 0 && (
          <div className="bg-white rounded-2xl p-12 border-2 border-gray-200 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No se encontraron temas
            </p>
          </div>
        )}
      </div>
    </>
  );
}