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

// Webhook para receber notificações do PayPal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = body.event_type;

    console.log('PayPal Webhook Event:', eventType);

    // Processar diferentes tipos de eventos
    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.CREATED':
        // Assinatura criada
        console.log('Subscription created:', body.resource);
        // Aqui você pode salvar a assinatura no seu banco de dados
        break;

      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        // Assinatura ativada
        console.log('Subscription activated:', body.resource);
        // Atualizar status do usuário para premium
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        // Assinatura cancelada
        console.log('Subscription cancelled:', body.resource);
        // Remover acesso premium do usuário
        break;

      case 'BILLING.SUBSCRIPTION.EXPIRED':
        // Assinatura expirada
        console.log('Subscription expired:', body.resource);
        // Remover acesso premium do usuário
        break;

      case 'PAYMENT.SALE.COMPLETED':
        // Pagamento concluído
        console.log('Payment completed:', body.resource);
        // Confirmar pagamento e renovar assinatura
        break;

      default:
        console.log('Unhandled event type:', eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Endpoint para verificar status de assinatura
export async function GET(request: NextRequest) {
  try {
    const subscriptionId = request.nextUrl.searchParams.get('subscriptionId');

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${PAYPAL_API_BASE}/v1/billing/subscriptions/${subscriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const subscription = await response.json();

    return NextResponse.json({
      id: subscription.id,
      status: subscription.status,
      planId: subscription.plan_id,
      startTime: subscription.start_time,
      subscriber: subscription.subscriber,
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}
