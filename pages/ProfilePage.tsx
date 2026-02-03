import { User, Mail, Phone, Briefcase, Building, Edit2, Save, LogOut, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProfileProps {
  userName: string;
  onLogout?: () => void;
}

export function Profile({ userName, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userName,
    email: 'usuario@email.com',
    phone: '+51 999 999 999',
    profession: 'Abogado especializado en contratación pública',
    institution: 'Gobierno Regional de Lima',
    dni: '12345678'
  });

  // Estados para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Información personal actualizada correctamente');
  };

  // Validar fortaleza de contraseña
  const validatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  // Validar contraseña al cambiar
  const handlePasswordChange = (field: 'currentPassword' | 'newPassword' | 'confirmPassword', value: string) => {
    setPasswordData({ ...passwordData, [field]: value });
    
    if (field === 'newPassword') {
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength);
      
      const errors: string[] = [];
      if (value.length > 0 && value.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
      }
      if (value.length > 0 && !/[A-Z]/.test(value)) {
        errors.push('Debe incluir al menos una letra mayúscula');
      }
      if (value.length > 0 && !/[a-z]/.test(value)) {
        errors.push('Debe incluir al menos una letra minúscula');
      }
      if (value.length > 0 && !/\d/.test(value)) {
        errors.push('Debe incluir al menos un número');
      }
      setPasswordErrors(errors);
    }
  };

  // Actualizar contraseña
  const handlePasswordUpdate = () => {
    if (!passwordData.currentPassword) {
      toast.error('Ingrese su contraseña actual');
      return;
    }
    
    if (!passwordData.newPassword) {
      toast.error('Ingrese una nueva contraseña');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (passwordErrors.length > 0) {
      toast.error('La contraseña no cumple con los requisitos de seguridad');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordData.currentPassword === passwordData.newPassword) {
      toast.error('La nueva contraseña debe ser diferente a la actual');
      return;
    }

    // Simular actualización de contraseña
    toast.success('Contraseña actualizada correctamente');
    
    // Limpiar campos
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors([]);
    setPasswordStrength(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0B95BA] to-[#087A98] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-2">Mi perfil</h1>
          <p className="text-xl text-white/90">
            Gestiona tu información personal y preferencias
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-[#0B95BA] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-3xl">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <h3 className="text-gray-900 mb-1">{userName}</h3>
              <p className="text-sm text-gray-600 mb-4">{formData.profession}</p>
              <div className="text-xs text-gray-500">
                Miembro desde febrero 2024
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="text-gray-900 mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Cursos completados</span>
                    <span className="text-gray-900">3</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Cursos en progreso</span>
                    <span className="text-gray-900">2</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Certificados obtenidos</span>
                    <span className="text-gray-900">3</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Horas de estudio</span>
                    <span className="text-gray-900">156</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-gray-900">Información personal</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 text-[#0B95BA] border border-[#0B95BA] rounded-lg hover:bg-[#0B95BA]/5 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      DNI / Documento
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.dni}
                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Correo
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Profesión / Ocupación
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Institución / Empresa
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#0B95BA]" />
                </div>
                <h2 className="text-gray-900">Seguridad de la cuenta</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Actualice su contraseña periódicamente para mantener su cuenta segura</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña actual
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Indicador de fortaleza de contraseña */}
                  {passwordData.newPassword && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength
                                ? passwordStrength <= 2
                                  ? 'bg-red-500'
                                  : passwordStrength === 3
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs font-medium ${
                        passwordStrength <= 2
                          ? 'text-red-600'
                          : passwordStrength === 3
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}>
                        {passwordStrength === 0 && 'Contraseña muy débil'}
                        {passwordStrength === 1 && 'Contraseña débil'}
                        {passwordStrength === 2 && 'Contraseña moderada'}
                        {passwordStrength === 3 && 'Contraseña fuerte'}
                        {passwordStrength >= 4 && 'Contraseña muy fuerte'}
                      </p>
                    </div>
                  )}
                  
                  {/* Errores de validación */}
                  {passwordErrors.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {passwordErrors.map((error, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-red-600">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Requisitos de contraseña */}
                  {!passwordData.newPassword && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700 mb-2">La contraseña debe contener:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          Al menos 8 caracteres
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          Una letra mayúscula
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          Una letra minúscula
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          Un número
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar nueva contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                    <div className="mt-2 flex items-start gap-2 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>Las contraseñas no coinciden</span>
                    </div>
                  )}
                  {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                    <div className="mt-2 flex items-start gap-2 text-xs text-green-600">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>Las contraseñas coinciden</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handlePasswordUpdate}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors font-medium"
                  >
                    <Lock className="w-4 h-4" />
                    Actualizar contraseña
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-gray-900 mb-6">Preferencias de notificaciones</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 text-[#0B95BA] rounded border-gray-300 focus:ring-[#0B95BA]"
                  />
                  <div>
                    <div className="text-sm text-gray-900">Notificaciones por email</div>
                    <div className="text-xs text-gray-600">Recibe actualizaciones sobre sus cursos</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 text-[#0B95BA] rounded border-gray-300 focus:ring-[#0B95BA]"
                  />
                  <div>
                    <div className="text-sm text-gray-900">Recordatorios de clases</div>
                    <div className="text-xs text-gray-600">Le avisaremos antes de cada clase en vivo</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-[#0B95BA] rounded border-gray-300 focus:ring-[#0B95BA]"
                  />
                  <div>
                    <div className="text-sm text-gray-900">Novedades y promociones</div>
                    <div className="text-xs text-gray-600">Entérese de nuevos cursos y ofertas especiales</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-gray-900 mb-6">Sesión</h2>
              <p className="text-sm text-gray-600 mb-4">
                Cierre su sesión si desea salir de la plataforma o cambiar de cuenta.
              </p>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-6 py-3 bg-[#0B95BA] text-white rounded-lg hover:bg-[#087A98] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}