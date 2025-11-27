import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Se usuário cancelou ou houve erro
  if (error || !code) {
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }

  try {
    // Trocar código por token de acesso
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: `${request.nextUrl.origin}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Buscar informações do usuário
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await userResponse.json();

    // Criar URL de redirecionamento com dados do usuário
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('auth', 'success');
    redirectUrl.searchParams.set('provider', 'google');
    redirectUrl.searchParams.set('name', userData.name);
    redirectUrl.searchParams.set('email', userData.email);
    if (userData.picture) {
      redirectUrl.searchParams.set('picture', userData.picture);
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}
