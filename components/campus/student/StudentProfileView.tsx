import { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Globe,
  FileText,
  Building,
  Edit,
  Save,
  X,
  Camera,
  Upload,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';

interface StudentProfileData {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nacionalidad: string;
  dni: string;
  fechaNacimiento: string;
  profesion: string;
  trabajoActual: string;
  cargo: string;
  telefono: string;
  celular: string;
  correo: string;
  direccion: string;
  distrito: string;
  provincia: string;
  departamento: string;
  pais: string;
  photoUrl?: string;
}

export function StudentProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock data - En producción vendría de la API
  const [studentData, setStudentData] = useState<StudentProfileData>({
    nombres: 'Alex Segundo',
    apellidoPaterno: 'Díaz',
    apellidoMaterno: 'Guevara',
    nacionalidad: 'Peruana',
    dni: '16705621',
    fechaNacimiento: '28/08/1972',
    profesion: 'Ingeniero civil',
    trabajoActual: 'Urci Consultores S.L. Sucursal del Perú',
    cargo: 'Director de Producción',
    telefono: '4371841',
    celular: '966330139',
    correo: 'asdiazg@yahoo.com',
    direccion: 'Calle Severini 174 Interior 402 - San Borja',
    distrito: 'San Borja',
    provincia: 'Lima',
    departamento: 'Lima',
    pais: 'Perú',
    photoUrl: undefined
  });

  const [editedData, setEditedData] = useState<StudentProfileData>(studentData);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(studentData.photoUrl);

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

  // Estados para notificaciones
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    classReminders: true,
    newsAndOffers: false
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(studentData);
    setPhotoPreview(studentData.photoUrl);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(studentData);
    setPhotoPreview(studentData.photoUrl);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simular guardado en API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStudentData(editedData);
    setIsEditing(false);
    setIsSaving(false);
    
    toast.success('Perfil actualizado correctamente', {
      description: 'Sus datos han sido guardados exitosamente'
    });
  };

  const handlePhotoClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen es demasiado grande', {
          description: 'El tamaño máximo permitido es 5MB'
        });
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        toast.error('Formato no válido', {
          description: 'Solo se permiten archivos de imagen'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setEditedData({ ...editedData, photoUrl: result });
        toast.success('Foto cargada correctamente', {
          description: 'Recuerde guardar los cambios'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof StudentProfileData, value: string) => {
    setEditedData({ ...editedData, [field]: value });
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
  const handlePasswordUpdate = async () => {
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.success('Contraseña actualizada correctamente', {
      description: 'Su contraseña ha sido cambiada exitosamente'
    });
    
    // Limpiar campos
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors([]);
    setPasswordStrength(0);
  };

  // Actualizar preferencias de notificaciones
  const handleNotificationChange = async (setting: keyof typeof notificationSettings) => {
    const newSettings = {
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    };
    setNotificationSettings(newSettings);
    
    // Simular guardado en API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    toast.success('Preferencia actualizada', {
      description: 'Sus preferencias de notificaciones han sido guardadas'
    });
  };

  const renderField = (
    label: string,
    field: keyof StudentProfileData,
    icon?: React.ReactNode,
    type: string = 'text'
  ) => {
    const value = isEditing ? editedData[field] : studentData[field];
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          {label}
        </label>
        {isEditing ? (
          <input
            type={type}
            value={value as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-4 py-3 border-2 border-[#0B95BA]/30 rounded-xl focus:outline-none focus:border-[#0B95BA] transition-colors"
          />
        ) : (
          <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2">
            {icon}
            <p className="text-gray-900 font-medium">{value}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header con foto */}
      <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Foto de perfil */}
            <div className="relative group">
              <div 
                className={`w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden ${
                  isEditing ? 'cursor-pointer' : ''
                } ${photoPreview ? 'bg-white' : 'bg-white/20'}`}
                onClick={handlePhotoClick}
              >
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>
              {isEditing && (
                <div 
                  className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handlePhotoClick}
                >
                  <Camera className="w-8 h-8 text-white" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {studentData.nombres} {studentData.apellidoPaterno} {studentData.apellidoMaterno}
              </h1>
              <p className="text-lg opacity-90">{studentData.profesion}</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-white text-[#0B95BA] rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Editar perfil
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-3 bg-white text-[#0B95BA] rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0B95BA] border-t-transparent rounded-full animate-spin"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Guardar cambios
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
        
        {isEditing && (
          <div className="mt-4 bg-white/10 rounded-xl p-4 flex items-start gap-3">
            <Upload className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Actualice su foto de perfil</p>
              <p className="text-sm opacity-90 mt-1">
                Haga clic en la foto para cargar una nueva imagen (máximo 5MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Información Personal */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900">Información personal</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderField('Nombre(s)', 'nombres')}
            {renderField('Apellido paterno', 'apellidoPaterno')}
            {renderField('Apellido materno', 'apellidoMaterno')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {renderField('Nacionalidad', 'nacionalidad', <Globe className="w-5 h-5 text-gray-400" />)}
            {renderField('DNI / C.E.', 'dni', <FileText className="w-5 h-5 text-gray-400" />)}
            {renderField('Fecha de nacimiento', 'fechaNacimiento', <Calendar className="w-5 h-5 text-gray-400" />, 'date')}
          </div>
        </div>
      </div>

      {/* Información Profesional */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900">Información profesional</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderField('Profesión', 'profesion', <Briefcase className="w-5 h-5 text-gray-400" />)}
            {renderField('Trabajo actual', 'trabajoActual', <Building className="w-5 h-5 text-gray-400" />)}
            {renderField('Cargo / puesto', 'cargo', <Briefcase className="w-5 h-5 text-gray-400" />)}
          </div>
        </div>
      </div>

      {/* Información de Contacto */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900">Información de contacto</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderField('Teléfono', 'telefono', <Phone className="w-5 h-5 text-gray-400" />, 'tel')}
            {renderField('Celular', 'celular', <Phone className="w-5 h-5 text-gray-400" />, 'tel')}
            {renderField('Correo', 'correo', <Mail className="w-5 h-5 text-gray-400" />, 'email')}
          </div>
        </div>
      </div>

      {/* Información de Domicilio */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900">Información de domicilio</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Dirección actual
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.direccion}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#0B95BA]/30 rounded-xl focus:outline-none focus:border-[#0B95BA] transition-colors"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <p className="text-gray-900 font-medium">{studentData.direccion}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderField('Distrito', 'distrito')}
            {renderField('Provincia', 'provincia')}
            {renderField('Departamento', 'departamento')}
            {renderField('País', 'pais', <Globe className="w-5 h-5 text-gray-400" />)}
          </div>
        </div>
      </div>

      {/* Seguridad de la cuenta */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0B95BA] rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Seguridad de la cuenta</h2>
            <p className="text-sm text-gray-600">Actualice su contraseña periódicamente para mantener la cuenta segura</p>
          </div>
        </div>
        <div className="p-6">
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
                  className="w-full pl-10 pr-12 py-3 border-2 border-[#0B95BA]/30 rounded-xl focus:outline-none focus:border-[#0B95BA] transition-colors"
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
                  className="w-full pl-10 pr-12 py-3 border-2 border-[#0B95BA]/30 rounded-xl focus:outline-none focus:border-[#0B95BA] transition-colors"
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
                  className="w-full pl-10 pr-12 py-3 border-2 border-[#0B95BA]/30 rounded-xl focus:outline-none focus:border-[#0B95BA] transition-colors"
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
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-colors font-medium"
              >
                <Lock className="w-4 h-4" />
                Actualizar contrase��a
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferencias de notificaciones */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#0B95BA]" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Preferencias de notificaciones</h2>
            <p className="text-sm text-gray-600">Configure cómo desea recibir las notificaciones</p>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={() => handleNotificationChange('emailNotifications')}
                  className="w-5 h-5 text-[#0B95BA] rounded border-gray-300 focus:ring-[#0B95BA] cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 group-hover:text-[#0B95BA] transition-colors">
                  Notificaciones por email
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  Reciba actualizaciones sobre sus programas y actividades pendientes
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.classReminders}
                  onChange={() => handleNotificationChange('classReminders')}
                  className="w-5 h-5 text-[#0B95BA] rounded border-gray-300 focus:ring-[#0B95BA] cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 group-hover:text-[#0B95BA] transition-colors">
                  Recordatorios de clases
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  Le avisaremos antes de cada clase en vivo programada
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.newsAndOffers}
                  onChange={() => handleNotificationChange('newsAndOffers')}
                  className="w-5 h-5 text-[#0B95BA] rounded border-gray-300 focus:ring-[#0B95BA] cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 group-hover:text-[#0B95BA] transition-colors">
                  Novedades y promociones
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  Entérese de nuevos programas, ofertas especiales y eventos académicos
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}