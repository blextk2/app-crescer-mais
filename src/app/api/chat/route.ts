import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensagem não fornecida' },
        { status: 400 }
      );
    }

    // Respostas inteligentes baseadas em palavras-chave
    const responses = getSmartResponse(message.toLowerCase());

    return NextResponse.json({ response: responses });
  } catch (error) {
    console.error('Erro no chat:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}

function getSmartResponse(message: string): string {
  // Saudações
  if (message.match(/\b(oi|olá|ola|hey|opa|bom dia|boa tarde|boa noite)\b/)) {
    return 'Olá! 😊 Seja bem-vindo ao Crescer+! Como posso ajudar você hoje? Posso tirar dúvidas sobre atividades, planos premium, funcionalidades ou qualquer outra coisa!';
  }

  // Atividades
  if (message.match(/\b(atividade|atividades|exercício|exercicios|brincadeira|brincar)\b/)) {
    return 'Temos mais de 500 atividades personalizadas para cada fase do desenvolvimento do seu bebê! 🎯 Elas são divididas em categorias como motora, cognitiva, sensorial e social. Você pode acessá-las na seção "Atividades" do app. Quer saber mais sobre alguma categoria específica?';
  }

  // Premium
  if (message.match(/\b(premium|plano|preço|preco|pagar|pagamento|assinatura|valor)\b/)) {
    return 'Nosso plano Premium oferece acesso ilimitado a todas as atividades, vídeos de evolução, relatórios avançados e suporte prioritário! 👑 Você pode começar com 7 dias grátis. Acesse a seção "Premium" para ver todos os benefícios e valores. Vale muito a pena!';
  }

  // Progresso
  if (message.match(/\b(progresso|acompanhar|evolução|evolucao|desenvolvimento|crescimento)\b/)) {
    return 'Você pode acompanhar o progresso do seu bebê na seção "Progresso"! 📊 Lá você encontra gráficos detalhados, marcos de desenvolvimento alcançados e estatísticas de atividades realizadas. É muito legal ver a evolução do seu pequeno!';
  }

  // Cadastro/Login
  if (message.match(/\b(cadastro|cadastrar|criar conta|registrar|login|entrar|senha)\b/)) {
    return 'Para criar sua conta, clique em "Começar Grátis" ou "Cadastro" no topo da página! 🚀 É super rápido e você já pode começar a usar gratuitamente. Se já tem conta, é só clicar em "Entrar". Precisa de ajuda com login?';
  }

  // Vídeos
  if (message.match(/\b(video|vídeo|videos|vídeos|gravar|gravação|momento)\b/)) {
    return 'A funcionalidade de vídeos permite que você grave e salve momentos especiais do desenvolvimento do seu bebê! 🎥 É um recurso exclusivo do plano Premium. Você pode criar uma linha do tempo visual da evolução do seu pequeno!';
  }

  // Idade do bebê
  if (message.match(/\b(idade|meses|anos|bebê|bebe|filho|filha|criança|crianca)\b/)) {
    return 'O Crescer+ é ideal para bebês de 0 a 36 meses! 👶 Nossas atividades são personalizadas de acordo com a idade e fase de desenvolvimento do seu pequeno. Quanto mais você usa, mais personalizadas ficam as recomendações!';
  }

  // Suporte/Ajuda
  if (message.match(/\b(ajuda|ajudar|suporte|problema|erro|dúvida|duvida|não funciona|nao funciona)\b/)) {
    return 'Estou aqui para ajudar! 💪 Pode me contar qual é o problema ou dúvida? Se preferir falar com nossa equipe humana, você pode enviar um email para suporte@crescermais.com.br ou usar o chat prioritário se for Premium.';
  }

  // Grátis/Gratuito
  if (message.match(/\b(gratis|grátis|gratuito|free|teste)\b/)) {
    return 'Sim! Você pode usar o Crescer+ gratuitamente! 🎉 A versão gratuita já inclui muitas atividades e funcionalidades básicas. Se quiser desbloquear tudo, temos o plano Premium com 7 dias de teste grátis. Sem compromisso!';
  }

  // Segurança/Privacidade
  if (message.match(/\b(seguro|segurança|seguranca|privacidade|dados|informação|informacao)\b/)) {
    return 'Sua privacidade e segurança são nossa prioridade! 🔒 Todos os dados são criptografados e armazenados com segurança. Nunca compartilhamos suas informações com terceiros. Você pode ler nossa política de privacidade completa no rodapé do site.';
  }

  // Comunidade
  if (message.match(/\b(comunidade|pais|mães|maes|grupo|compartilhar|outros)\b/)) {
    return 'Temos uma comunidade incrível de pais e mães! 👨‍👩‍👧‍👦 Você pode compartilhar experiências, conquistas e tirar dúvidas com outros pais. É um espaço acolhedor e cheio de apoio mútuo. Acesse na seção "Comunidade"!';
  }

  // Especialistas
  if (message.match(/\b(especialista|pediatra|médico|medico|profissional|validado)\b/)) {
    return 'Todo nosso conteúdo é validado por pediatras e especialistas em desenvolvimento infantil! 👨‍⚕️👩‍⚕️ Trabalhamos com profissionais renomados para garantir que as atividades e dicas sejam seguras e eficazes para o desenvolvimento do seu bebê.';
  }

  // Agradecimento
  if (message.match(/\b(obrigado|obrigada|valeu|thanks|agradeço|agradeco)\b/)) {
    return 'Por nada! 😊 Fico feliz em ajudar! Se tiver mais alguma dúvida, é só chamar. Estou sempre por aqui! 💜';
  }

  // Despedida
  if (message.match(/\b(tchau|adeus|até logo|ate logo|bye|falou)\b/)) {
    return 'Até logo! 👋 Foi um prazer ajudar você! Qualquer dúvida, é só voltar aqui. Bom desenvolvimento para o seu pequeno! 💜';
  }

  // Resposta padrão
  return `Entendi sua pergunta sobre "${message.substring(0, 50)}...". 

Posso ajudar com:
• Informações sobre atividades e funcionalidades
• Detalhes sobre planos e preços
• Dúvidas sobre cadastro e uso do app
• Suporte técnico básico

O que você gostaria de saber especificamente? 😊`;
}
