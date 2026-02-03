import { UserCheck, CheckCircle, XCircle, Timer, Users, AlertCircle, Calendar, Clock } from 'lucide-react';

// Mock data de asistencias - En producción vendría de la API
const mockAttendanceData = {
  totalSessions: 9,
  attended: 8,
  absent: 1,
  late: 0,
  justified: 0,
  attendancePercentage: 89  // (8/9) * 100
};

// Mock data de detalle de asistencias por sesión
const mockSessionsAttendance = [
  {
    id: '1',
    moduleName: 'Módulo 1: Fundamentos del Arbitraje',
    sessionName: 'Sesión 1: Introducción al Arbitraje',
    date: '2024-10-15',
    time: '18:00 - 20:00',
    status: 'attended' as const,
    duration: '2h 05min',
    connectionTime: '17:58'
  },
  {
    id: '2',
    moduleName: 'Módulo 1: Fundamentos del Arbitraje',
    sessionName: 'Sesión 2: Marco Legal',
    date: '2024-10-22',
    time: '18:00 - 20:00',
    status: 'attended' as const,
    duration: '2h 03min',
    connectionTime: '18:02'
  },
  {
    id: '3',
    moduleName: 'Módulo 1: Fundamentos del Arbitraje',
    sessionName: 'Sesión 3: Tipos de Arbitraje',
    date: '2024-10-29',
    time: '18:00 - 20:00',
    status: 'attended' as const,
    duration: '2h 00min',
    connectionTime: '18:00'
  },
  {
    id: '4',
    moduleName: 'Módulo 2: Procedimiento Arbitral',
    sessionName: 'Sesión 4: Inicio del Procedimiento',
    date: '2024-11-05',
    time: '18:00 - 20:00',
    status: 'attended' as const,
    duration: '2h 10min',
    connectionTime: '17:55'
  },
  {
    id: '5',
    moduleName: 'Módulo 2: Procedimiento Arbitral',
    sessionName: 'Sesión 5: Etapa Probatoria',
    date: '2024-11-12',
    time: '18:00 - 20:00',
    status: 'absent' as const
  },
  {
    id: '6',
    moduleName: 'Módulo 2: Procedimiento Arbitral',
    sessionName: 'Sesión 6: Laudos Arbitrales',
    date: '2024-11-19',
    time: '18:00 - 20:00',
    status: 'attended' as const,
    duration: '2h 08min',
    connectionTime: '18:01'
  },
  {
    id: '7',
    moduleName: 'Módulo 3: Arbitraje Internacional',
    sessionName: 'Sesión 7: Convenios Internacionales',
    date: '2024-11-26',
    time: '18:00 - 20:00',
    status: 'attended' as const,
    duration: '2h 15min',
    connectionTime: '17:59'
  },
  {
    id: '8',
    moduleName: 'Módulo 3: Arbitraje Internacional',
    sessionName: 'Sesión 8: Casos Internacionales',
    date: '2024-12-03',
    time: '18:00 - 20:00',
    status: 'attended' as const,
    duration: '2h 12min',
    connectionTime: '18:00'
  },
  {
    id: '9',
    moduleName: 'Módulo 3: Arbitraje Internacional',
    sessionName: 'Sesión 9: Reconocimiento y Ejecución',
    date: '2024-12-10',
    time: '18:00 - 20:00',
    status: 'attended' as const,
    duration: '2h 07min',
    connectionTime: '17:57'
  }
];

export function StudentAttendanceView() {
  const getStatusBadge = (status: 'attended' | 'absent' | 'late' | 'justified') => {
    switch (status) {
      case 'attended':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold border-2 border-green-300">
            Presente
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold border-2 border-red-300">
            Ausente
          </span>
        );
      case 'late':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border-2 border-amber-300">
            Tardanza
          </span>
        );
      case 'justified':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold border-2 border-blue-300">
            Justificado
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Attendance Summary Card */}
      <div className="bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6">
          <div className="flex items-stretch justify-between gap-8">
            {/* Left: Icon and Title */}
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                mockAttendanceData.attendancePercentage >= 70
                  ? 'bg-green-600'
                  : mockAttendanceData.attendancePercentage >= 65
                  ? 'bg-amber-600'
                  : 'bg-red-600'
              }`}>
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-white mb-1">Resumen de asistencias</h3>
                <p className="text-sm text-white/80">Criterio de aprobación: 70% mínimo</p>
              </div>
            </div>

            {/* Center: Percentage */}
            <div className="flex flex-col items-center justify-center px-8 py-5 bg-white/20 rounded-2xl border-2 border-white/30 flex-shrink-0">
              <div className={`text-6xl font-bold text-white leading-none mb-2`}>
                {mockAttendanceData.attendancePercentage}%
              </div>
              <div className="text-sm text-white font-medium mb-3">
                {mockAttendanceData.attended} de {mockAttendanceData.totalSessions} sesiones
              </div>
              {/* Progress Bar */}
              <div className="w-48 h-3 bg-white/30 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all bg-white`}
                  style={{ width: `${mockAttendanceData.attendancePercentage}%` }}
                />
              </div>
            </div>

            {/* Right: Status Badge and Details */}
            <div className="flex flex-col justify-center flex-1">
              {/* Attendance Details Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-white/20 rounded-xl p-3 border-2 border-white/30 text-center">
                  <div className="flex items-center gap-1.5 justify-center mb-1.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span className="text-xs text-white/90 font-medium">Presente</span>
                  </div>
                  <div className="font-bold text-2xl text-white">{mockAttendanceData.attended}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-3 border-2 border-white/30 text-center">
                  <div className="flex items-center gap-1.5 justify-center mb-1.5">
                    <XCircle className="w-4 h-4 text-white" />
                    <span className="text-xs text-white/90 font-medium">Ausente</span>
                  </div>
                  <div className="font-bold text-2xl text-white">{mockAttendanceData.absent}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-3 border-2 border-white/30 text-center">
                  <div className="flex items-center gap-1.5 justify-center mb-1.5">
                    <Timer className="w-4 h-4 text-white" />
                    <span className="text-xs text-white/90 font-medium">Tardanza</span>
                  </div>
                  <div className="font-bold text-2xl text-white">{mockAttendanceData.late}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-3 border-2 border-white/30 text-center">
                  <div className="flex items-center gap-1.5 justify-center mb-1.5">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-xs text-white/90 font-medium">Justificado</span>
                  </div>
                  <div className="font-bold text-2xl text-white">{mockAttendanceData.justified}</div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center">
                {mockAttendanceData.attendancePercentage >= 70 ? (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 rounded-xl shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                    <span className="font-bold text-white text-lg">Aprobado</span>
                  </div>
                ) : mockAttendanceData.attendancePercentage >= 65 ? (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 rounded-xl shadow-lg">
                    <AlertCircle className="w-6 h-6 text-white" />
                    <span className="font-bold text-white text-lg">En riesgo</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 rounded-xl shadow-lg">
                    <XCircle className="w-6 h-6 text-white" />
                    <span className="font-bold text-white text-lg">Reprobado</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Attendance Records */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-[#0B95BA] px-6 py-4">
          <h3 className="font-bold text-xl text-white">Detalle de asistencias por sesión</h3>
          <p className="text-sm text-white/80 mt-1">Historial completo de asistencia a clases en vivo</p>
        </div>

        <div className="divide-y divide-gray-200">
          {mockSessionsAttendance.map((session) => (
            <div key={session.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between gap-4">
                {/* Session Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#0B95BA]/10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[rgb(255,255,255)]">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{session.sessionName}</h4>
                      <p className="text-sm text-gray-600 mb-2">{session.moduleName}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{session.time}</span>
                        </div>
                        {session.status === 'attended' && session.duration && (
                          <>
                            <div className="flex items-center gap-1">
                              <Timer className="w-3 h-3" />
                              <span>Duración: {session.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              <span>Conexión: {session.connectionTime}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex-shrink-0">
                  {getStatusBadge(session.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">Criterios de asistencia</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Se requiere un <strong>70% de asistencia mínima</strong> para obtener el diploma del programa</p>
              <p>• La asistencia se registra automáticamente al conectarse a la clase en vivo</p>
              <p>• Las tardanzas (conexión después de 10 minutos) pueden afectar su registro de asistencia</p>
              <p>• Las ausencias justificadas deben presentarse con 48 horas de anticipación mediante el formulario de solicitudes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}