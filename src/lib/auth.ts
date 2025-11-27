// Configuração de autenticação social

export interface SocialAuthProvider {
  name: 'google' | 'facebook';
  clientId: string;
}

// Configuração do Google OAuth
export const googleAuth = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '285113855288-gq89d99j1okm8liikssgnor57i5nprbu.apps.googleusercontent.com',
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/api/auth/google/callback` : '',
  scope: 'email profile',
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
};

// Configuração do Facebook OAuth
export const facebookAuth = {
  appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/api/auth/facebook/callback` : '',
  scope: 'email,public_profile',
  authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
};

// Iniciar login com Google
export const loginWithGoogle = () => {
  const params = new URLSearchParams({
    client_id: googleAuth.clientId,
    redirect_uri: googleAuth.redirectUri,
    response_type: 'code',
    scope: googleAuth.scope,
    access_type: 'offline',
    prompt: 'consent',
  });

  window.location.href = `${googleAuth.authUrl}?${params.toString()}`;
};

// Iniciar login com Facebook
export const loginWithFacebook = () => {
  const params = new URLSearchParams({
    client_id: facebookAuth.appId,
    redirect_uri: facebookAuth.redirectUri,
    scope: facebookAuth.scope,
    response_type: 'code',
    auth_type: 'rerequest',
  });

  window.location.href = `${facebookAuth.authUrl}?${params.toString()}`;
};

// Verificar se usuário está autenticado
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Fazer logout
export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  localStorage.removeItem('authProvider');
  window.location.href = '/';
};

// Salvar dados do usuário após autenticação social
export const saveUserFromSocialAuth = (userData: {
  name: string;
  email: string;
  picture?: string;
  provider: 'google' | 'facebook';
}) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('user', JSON.stringify({
    nome: userData.name,
    email: userData.email,
    picture: userData.picture,
  }));
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('authProvider', userData.provider);
};
