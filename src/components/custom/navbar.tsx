"use client";

import { Baby, Home, BookOpen, TrendingUp, User, Crown } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar se usuário está logado
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const isActive = (path: string) => pathname === path;

  // Função para verificar autenticação antes de navegar
  const handleProtectedNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Páginas que requerem autenticação
    const protectedPaths = ['/activities', '/progresso', '/subscription', '/profile'];
    
    if (protectedPaths.includes(path) && !isLoggedIn) {
      e.preventDefault();
      router.push('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Crescer+
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5" />
              Início
            </Link>
            <Link
              href="/activities"
              onClick={(e) => handleProtectedNavigation(e, '/activities')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/activities')
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Atividades
            </Link>
            <Link
              href="/progresso"
              onClick={(e) => handleProtectedNavigation(e, '/progresso')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/progresso')
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Progresso
            </Link>
            <Link
              href="/subscription"
              onClick={(e) => handleProtectedNavigation(e, '/subscription')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/subscription')
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Crown className="w-5 h-5" />
              Premium
            </Link>
            <Link
              href="/profile"
              onClick={(e) => handleProtectedNavigation(e, '/profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/profile')
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-5 h-5" />
              Perfil
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              isActive('/') 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105' 
                : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link
            href="/activities"
            onClick={(e) => handleProtectedNavigation(e, '/activities')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              isActive('/activities') 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105' 
                : 'text-gray-500'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-medium">Atividades</span>
          </Link>
          <Link
            href="/progresso"
            onClick={(e) => handleProtectedNavigation(e, '/progresso')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              isActive('/progresso') 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105' 
                : 'text-gray-500'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-medium">Progresso</span>
          </Link>
          <Link
            href="/subscription"
            onClick={(e) => handleProtectedNavigation(e, '/subscription')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              isActive('/subscription') 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105' 
                : 'text-gray-500'
            }`}
          >
            <Crown className="w-5 h-5" />
            <span className="text-xs font-medium">Premium</span>
          </Link>
          <Link
            href="/profile"
            onClick={(e) => handleProtectedNavigation(e, '/profile')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              isActive('/profile') 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105' 
                : 'text-gray-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
