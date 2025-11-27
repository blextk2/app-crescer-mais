import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API_BASE = process.env.PAYPAL_SANDBOX 
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com';

// Função para obter token de acesso do PayPal
async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Cancelar assinatura
export async function POST(request: NextRequest) {
  try {
    const { subscriptionId, reason } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${PAYPAL_API_BASE}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: reason || 'Customer requested cancellation',
        }),
      }
    );

    if (response.status === 204) {
      return NextResponse.json({
        success: true,
        message: 'Subscription cancelled successfully',
      });
    }

    const error = await response.json();
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
