import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface Module {
  id: string;
  code: string;
  name: string;
  abbreviation: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export function ModulesManagement() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      code: 'MOD001',
      name: 'Arbitraje Comercial',
      abbreviation: 'ARB-COM',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      code: 'MOD002',
      name: 'Contratación Pública',
      abbreviation: 'CONTR-PUB',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      code: 'MOD003',
      name: 'Resolución de Controversias',
      abbreviation: 'RES-CONT',
      status: 'active',
      createdAt: '2024-02-01'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newModule, setNewModule] = useState({
    code: '',
    name: '',
    abbreviation: '',
    status: 'active' as 'active' | 'inactive'
  });

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateModule = () => {
    if (!newModule.code || !newModule.name || !newModule.abbreviation) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const module: Module = {
      id: String(modules.length + 1),
      ...newModule,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setModules([...modules, module]);
    setNewModule({ code: '', name: '', abbreviation: '', status: 'active' });
    setShowCreateModal(false);
    toast.success('Módulo creado exitosamente');
  };

  const handleDeleteModule = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este módulo?')) {
      setModules(modules.filter(m => m.id !== id));
      toast.success('Módulo eliminado');
    }
  };

  const toggleStatus = (id: string) => {
    setModules(modules.map(m =>
      m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
    ));
    toast.success('Estado actualizado');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de módulos</h1>
          <p className="text-gray-600 mt-1">Administra los módulos del sistema educativo</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Crear módulo
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar módulos por nombre o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
        />
      </div>

      {/* Modules Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Código</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Abreviación</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fecha creación</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredModules.map((module) => (
                <tr key={module.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900">{module.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{module.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {module.abbreviation}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(module.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        module.status === 'active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {module.status === 'active' ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(module.createdAt).toLocaleDateString('es-PE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteModule(module.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron módulos</p>
          </div>
        )}
      </div>

      {/* Create Module Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Crear nuevo módulo</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newModule.code}
                  onChange={(e) => setNewModule({ ...newModule, code: e.target.value })}
                  placeholder="MOD001"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newModule.name}
                  onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                  placeholder="Arbitraje Comercial"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abreviación <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newModule.abbreviation}
                  onChange={(e) => setNewModule({ ...newModule, abbreviation: e.target.value })}
                  placeholder="ARB-COM"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={newModule.status}
                  onChange={(e) => setNewModule({ ...newModule, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0B95BA] focus:border-transparent"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateModule}
                className="flex-1 px-6 py-3 bg-[#0B95BA] hover:bg-[#087A98] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Crear módulo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
