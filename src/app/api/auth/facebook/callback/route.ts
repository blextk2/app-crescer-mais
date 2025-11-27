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
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...{
        params: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
          client_secret: process.env.FACEBOOK_APP_SECRET || '',
          redirect_uri: `${request.nextUrl.origin}/api/auth/facebook/callback`,
          code,
        }),
      },
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Buscar informações do usuário
    const userResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await userResponse.json();

    // Criar URL de redirecionamento com dados do usuário
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('auth', 'success');
    redirectUrl.searchParams.set('provider', 'facebook');
    redirectUrl.searchParams.set('name', userData.name);
    redirectUrl.searchParams.set('email', userData.email || '');
    if (userData.picture?.data?.url) {
      redirectUrl.searchParams.set('picture', userData.picture.data.url);
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Facebook auth error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}
