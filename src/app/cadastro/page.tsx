"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Baby, Mail, Lock, User, Calendar, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function CadastroPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    nomeBebe: '',
    dataNascimento: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    if (!formData.nomeBebe.trim()) {
      newErrors.nomeBebe = 'Nome do bebê é obrigatório';
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Salvar dados do cadastro no localStorage (simulação de banco de dados)
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      const novoUsuario = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        nomeBebe: formData.nomeBebe,
        dataNascimento: formData.dataNascimento,
      };
      
      usuarios.push(novoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      // Fazer login automático
      localStorage.setItem('user', JSON.stringify(novoUsuario));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('showWelcome', 'true');
      
      // Redirecionar para a página de progresso
      setTimeout(() => {
        setIsLoading(false);
        router.push('/progresso');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Botão Voltar */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar</span>
        </button>

        {/* Card de Cadastro */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
            <p className="text-gray-600">Comece sua jornada no Crescer+</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">
                Seu Nome
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.nome ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Maria Silva"
                />
              </div>
              {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.senha ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.confirmarSenha ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmarSenha && <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>}
            </div>

            {/* Divisor */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500 font-medium">
                  Informações do Bebê
                </span>
              </div>
            </div>

            {/* Nome do Bebê */}
            <div>
              <label htmlFor="nomeBebe" className="block text-sm font-semibold text-gray-700 mb-2">
                Nome do Bebê
              </label>
              <div className="relative">
                <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="nomeBebe"
                  name="nomeBebe"
                  value={formData.nomeBebe}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.nomeBebe ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="João"
                />
              </div>
              {errors.nomeBebe && <p className="text-red-500 text-sm mt-1">{errors.nomeBebe}</p>}
            </div>

            {/* Data de Nascimento */}
            <div>
              <label htmlFor="dataNascimento" className="block text-sm font-semibold text-gray-700 mb-2">
                Data de Nascimento
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.dataNascimento ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.dataNascimento && <p className="text-red-500 text-sm mt-1">{errors.dataNascimento}</p>}
            </div>

            {/* Botão de Cadastro */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta Grátis'}
            </button>
          </form>

          {/* Link para Login */}
          <p className="text-center text-gray-600 mt-6">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-purple-600 font-semibold hover:text-purple-700">
              Entrar
            </Link>
          </p>
        </div>

        {/* Termos */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Ao criar uma conta, você concorda com nossos{' '}
          <a href="#" className="text-purple-600 hover:underline">
            Termos de Uso
          </a>
          {' '}
          e{' '}
          <a href="#" className="text-purple-600 hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
