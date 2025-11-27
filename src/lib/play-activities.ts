export interface PlayActivity {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  duration: string;
  materials: string[];
  instructions: string[];
  benefits: string[];
  category: 'brincadeira' | 'cognitivo' | 'linguagem';
  imageUrl: string;
}

// Atividades semanais de brincadeira
const weeklyPlayActivities: PlayActivity[] = [
  {
    id: 'play-1',
    title: '🎵 Música e Movimento',
    description: 'Dance com seu bebê ao som de músicas alegres',
    ageRange: '6-12 meses',
    duration: '10-15 min',
    materials: ['Música', 'Espaço livre'],
    instructions: [
      'Coloque uma música animada',
      'Segure o bebê no colo',
      'Balance suavemente seguindo o ritmo',
      'Faça movimentos variados (girar, pular levemente)',
      'Observe as reações do bebê'
    ],
    benefits: [
      'Desenvolve coordenação motora',
      'Estimula o ritmo e musicalidade',
      'Fortalece vínculo afetivo'
    ],
    category: 'brincadeira',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
  },
  {
    id: 'play-2',
    title: '🧩 Empilhar Blocos',
    description: 'Construa torres simples com blocos macios',
    ageRange: '6-12 meses',
    duration: '10 min',
    materials: ['Blocos macios', 'Tapete'],
    instructions: [
      'Sente-se no chão com o bebê',
      'Mostre como empilhar 2-3 blocos',
      'Deixe o bebê derrubar a torre',
      'Comemore cada tentativa',
      'Repita várias vezes'
    ],
    benefits: [
      'Coordenação olho-mão',
      'Noção de causa e efeito',
      'Concentração'
    ],
    category: 'brincadeira',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop'
  },
  {
    id: 'play-3',
    title: '🫧 Bolhas de Sabão',
    description: 'Faça bolhas para o bebê observar e tentar pegar',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['Bolhas de sabão'],
    instructions: [
      'Sente o bebê em posição confortável',
      'Faça bolhas lentamente',
      'Incentive o bebê a seguir com os olhos',
      'Deixe-o tentar pegar as bolhas',
      'Comemore cada tentativa'
    ],
    benefits: [
      'Rastreamento visual',
      'Coordenação motora',
      'Diversão e alegria'
    ],
    category: 'brincadeira',
    imageUrl: 'https://images.unsplash.com/photo-1587070163945-b8fcbef6d8b0?w=800&h=600&fit=crop'
  },
  {
    id: 'play-4',
    title: '📚 Hora do Livro',
    description: 'Leia livros coloridos com texturas diferentes',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['Livros de pano/cartão'],
    instructions: [
      'Escolha um livro com figuras grandes',
      'Sente com o bebê no colo',
      'Aponte para as figuras',
      'Faça sons relacionados às imagens',
      'Deixe o bebê tocar e explorar'
    ],
    benefits: [
      'Estímulo à linguagem',
      'Reconhecimento visual',
      'Vínculo afetivo'
    ],
    category: 'brincadeira',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop'
  },
  {
    id: 'play-5',
    title: '🪀 Rolar a Bola',
    description: 'Role uma bola suave para o bebê pegar',
    ageRange: '6-12 meses',
    duration: '10 min',
    materials: ['Bola macia'],
    instructions: [
      'Sente-se de frente para o bebê',
      'Role a bola devagar em direção a ele',
      'Incentive-o a pegar',
      'Ajude-o a rolar de volta',
      'Comemore cada interação'
    ],
    benefits: [
      'Coordenação motora',
      'Antecipação',
      'Interação social'
    ],
    category: 'brincadeira',
    imageUrl: 'https://images.unsplash.com/photo-1551927336-574c6b1e6d0a?w=800&h=600&fit=crop'
  },
  {
    id: 'play-6',
    title: '🎨 Exploração Sensorial',
    description: 'Deixe o bebê explorar diferentes texturas',
    ageRange: '6-12 meses',
    duration: '10-15 min',
    materials: ['Tecidos variados', 'Objetos seguros'],
    instructions: [
      'Reúna objetos de texturas diferentes',
      'Apresente um de cada vez',
      'Deixe o bebê tocar e explorar',
      'Descreva as sensações (macio, áspero)',
      'Observe as reações'
    ],
    benefits: [
      'Desenvolvimento sensorial',
      'Curiosidade',
      'Vocabulário tátil'
    ],
    category: 'brincadeira',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=600&fit=crop'
  },
  {
    id: 'play-7',
    title: '🪞 Brincadeira no Espelho',
    description: 'Explore expressões faciais no espelho',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['Espelho seguro'],
    instructions: [
      'Sente com o bebê em frente ao espelho',
      'Faça caretas e expressões',
      'Aponte para o reflexo',
      'Diga "Quem é esse?"',
      'Incentive o bebê a tocar o espelho'
    ],
    benefits: [
      'Autorreconhecimento',
      'Imitação',
      'Cognição social'
    ],
    category: 'brincadeira',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
  }
];

// Atividades cognitivas (Premium)
const cognitiveActivities: PlayActivity[] = [
  {
    id: 'cog-1',
    title: '🔍 Cadê? Achou!',
    description: 'Esconda um brinquedo embaixo de um paninho e deixe o bebê puxar',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['Brinquedo favorito', 'Paninho'],
    instructions: [
      'Mostre o brinquedo ao bebê',
      'Cubra-o com o paninho enquanto ele observa',
      'Pergunte "Cadê?"',
      'Incentive-o a puxar o pano',
      'Comemore quando encontrar: "Achou!"'
    ],
    benefits: [
      'Permanência do objeto',
      'Memória',
      'Atenção',
      'Causa e efeito'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-2',
    title: '🏗️ Torre de Copinhos',
    description: 'Empilhe copinhos e deixe o bebê derrubar',
    ageRange: '6-12 meses',
    duration: '10 min',
    materials: ['Copinhos plásticos'],
    instructions: [
      'Empilhe 2-3 copinhos',
      'Deixe o bebê derrubar',
      'Comemore a derrubada',
      'Empilhe novamente',
      'Incentive-o a tentar empilhar'
    ],
    benefits: [
      'Causa e efeito',
      'Coordenação visão-mão',
      'Resolução de problemas'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-3',
    title: '🎒 Sacola das Descobertas',
    description: 'Coloque objetos seguros de diferentes texturas dentro de uma sacola',
    ageRange: '6-12 meses',
    duration: '10-15 min',
    materials: ['Sacola de pano', 'Objetos variados seguros'],
    instructions: [
      'Coloque 3-4 objetos na sacola',
      'Deixe o bebê tirar um por vez',
      'Nomeie cada objeto',
      'Deixe-o explorar',
      'Incentive a colocar de volta'
    ],
    benefits: [
      'Exploração sensorial',
      'Categorização',
      'Curiosidade'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-4',
    title: '🥣 Brincar de Transferir',
    description: 'Duas tigelinhas + bloquinhos. O bebê passa de um pote para o outro',
    ageRange: '6-12 meses',
    duration: '10 min',
    materials: ['2 tigelas', 'Blocos pequenos ou macarrão grande'],
    instructions: [
      'Coloque blocos em uma tigela',
      'Mostre como transferir para a outra',
      'Deixe o bebê tentar',
      'Incentive cada movimento',
      'Comemore as conquistas'
    ],
    benefits: [
      'Foco',
      'Lógica',
      'Coordenação fina'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1587070163945-b8fcbef6d8b0?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-5',
    title: '🎵 Sons e Mais Sons',
    description: 'Dê chocalhos e potes com grãos dentro. Faça ritmos simples',
    ageRange: '6-12 meses',
    duration: '10 min',
    materials: ['Chocalhos', 'Potes com grãos'],
    instructions: [
      'Apresente os instrumentos',
      'Faça um ritmo simples',
      'Deixe o bebê imitar',
      'Varie os sons',
      'Comemore as tentativas'
    ],
    benefits: [
      'Atenção auditiva',
      'Reconhecimento de padrões',
      'Coordenação motora'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-6',
    title: '📖 Livrinhos de Pano/Cartão',
    description: 'Leia apontando para as figuras. Peça para o bebê "achar" algo simples',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['Livros de pano ou cartão'],
    instructions: [
      'Abra o livro',
      'Aponte para figuras',
      'Nomeie cada uma',
      'Peça: "Cadê o cachorro?"',
      'Comemore quando achar'
    ],
    benefits: [
      'Linguagem',
      'Memória visual',
      'Associação'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-7',
    title: '🪞 Brincadeira do Espelho',
    description: 'Sente com o bebê no espelho e faça expressões',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['Espelho seguro'],
    instructions: [
      'Sente em frente ao espelho',
      'Faça expressões variadas',
      'Espere o bebê imitar',
      'Aponte para o reflexo',
      'Diga "Esse é você!"'
    ],
    benefits: [
      'Autorreconhecimento',
      'Imitação',
      'Cognição social'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-8',
    title: '⚽ Rolou, Pegou!',
    description: 'Role uma bolinha suave para perto dele e incentive a pegar',
    ageRange: '6-12 meses',
    duration: '10 min',
    materials: ['Bola macia'],
    instructions: [
      'Sente de frente para o bebê',
      'Role a bola devagar',
      'Incentive-o a pegar',
      'Ajude-o a rolar de volta',
      'Repita várias vezes'
    ],
    benefits: [
      'Planejamento motor',
      'Antecipação do movimento',
      'Coordenação'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1551927336-574c6b1e6d0a?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-9',
    title: '📱 Telefonezinho Imaginário',
    description: 'Use um brinquedo/objeto como telefone e faça "alô"',
    ageRange: '6-12 meses',
    duration: '5 min',
    materials: ['Brinquedo que pareça telefone'],
    instructions: [
      'Pegue o "telefone"',
      'Diga "Alô!" com entusiasmo',
      'Ofereça ao bebê',
      'Incentive-o a imitar',
      'Faça uma "conversa"'
    ],
    benefits: [
      'Imitação',
      'Comunicação inicial',
      'Simbolização'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-10',
    title: '📏 Classificar Grande x Pequeno',
    description: 'Dê dois objetos de tamanhos diferentes e peça: "pega o maior"',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['2 objetos similares de tamanhos diferentes'],
    instructions: [
      'Mostre os dois objetos',
      'Nomeie: "grande" e "pequeno"',
      'Peça: "Pega o grande"',
      'Ajude se necessário',
      'Comemore os acertos'
    ],
    benefits: [
      'Comparação',
      'Início do raciocínio lógico',
      'Vocabulário'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-11',
    title: '🔘 Causa e Efeito com Botões',
    description: 'Brinquedos que fazem som ao apertar, ou até uma luz de toque',
    ageRange: '6-12 meses',
    duration: '10 min',
    materials: ['Brinquedos com botões', 'Luz de toque'],
    instructions: [
      'Apresente o brinquedo',
      'Mostre como apertar',
      'Deixe o bebê tentar',
      'Comemore cada som/luz',
      'Varie os brinquedos'
    ],
    benefits: [
      'Relação ação-reação',
      'Atenção sustentada',
      'Coordenação'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1587070163945-b8fcbef6d8b0?w=800&h=600&fit=crop'
  },
  {
    id: 'cog-12',
    title: '💧 Exploração na Água',
    description: 'Copinhos, esponjas, brinquedos que afundam e flutuam (supervisionado)',
    ageRange: '6-12 meses',
    duration: '15 min',
    materials: ['Bacia com água', 'Copinhos', 'Esponjas', 'Brinquedos'],
    instructions: [
      'Prepare bacia com pouca água',
      'Sente o bebê com segurança',
      'Ofereça os objetos',
      'Mostre afundar e flutuar',
      'SEMPRE supervisione'
    ],
    benefits: [
      'Noção de volume',
      'Física básica',
      'Curiosidade'
    ],
    category: 'cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&h=600&fit=crop'
  }
];

// Atividades de linguagem (Premium)
const languageActivities: PlayActivity[] = [
  // 6-12 meses
  {
    id: 'lang-1',
    title: '💬 Conversar com o Bebê',
    description: 'Narre o que está fazendo: "Agora mamãe pega a fralda…"',
    ageRange: '6-12 meses',
    duration: 'Durante o dia',
    materials: ['Nenhum'],
    instructions: [
      'Durante as rotinas, fale constantemente',
      'Descreva suas ações',
      'Use frases simples',
      'Faça pausas para "respostas"',
      'Mantenha contato visual'
    ],
    benefits: [
      'Vocabulário passivo',
      'Atenção à fala',
      'Vínculo'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-2',
    title: '🐶 Sons de Animais',
    description: 'Mostre brinquedos ou figuras e diga: "O cachorro faz au-au!"',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['Brinquedos de animais', 'Livros com animais'],
    instructions: [
      'Mostre um animal',
      'Faça o som característico',
      'Repita várias vezes',
      'Incentive imitação',
      'Comemore tentativas'
    ],
    benefits: [
      'Associação som-imagem',
      'Imitação vocal',
      'Vocabulário'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-3',
    title: '🎶 Música com Gestos',
    description: 'Cantigas com movimentos ("A dona aranha") incentivam a prever e imitar',
    ageRange: '6-12 meses',
    duration: '5-10 min',
    materials: ['Nenhum'],
    instructions: [
      'Escolha uma cantiga conhecida',
      'Faça gestos claros',
      'Cante devagar',
      'Repita várias vezes',
      'Incentive imitação'
    ],
    benefits: [
      'Prosódia',
      'Ritmo',
      'Intenção comunicativa'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-4',
    title: '🪞 Jogo do Espelho',
    description: 'Faça expressões e sons, incentive o bebê a repetir',
    ageRange: '6-12 meses',
    duration: '5 min',
    materials: ['Espelho'],
    instructions: [
      'Sente em frente ao espelho',
      'Faça sons variados',
      'Faça expressões faciais',
      'Espere imitação',
      'Comemore tentativas'
    ],
    benefits: [
      'Comunicação social',
      'Imitação',
      'Expressão facial'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
  },
  // 12-18 meses
  {
    id: 'lang-5',
    title: '🔍 "Ache o…"',
    description: 'Peça: "Cadê a bola?"',
    ageRange: '12-18 meses',
    duration: '5-10 min',
    materials: ['Objetos variados'],
    instructions: [
      'Coloque 3-4 objetos visíveis',
      'Peça: "Cadê o [objeto]?"',
      'Espere a criança apontar/pegar',
      'Comemore: "Isso! É a bola!"',
      'Varie os objetos'
    ],
    benefits: [
      'Identificação de objetos',
      'Vocabulário receptivo',
      'Atenção'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-6',
    title: '🥤 Nomes e Escolhas',
    description: 'Ofereça dois objetos: "Quer água ou suco?"',
    ageRange: '12-18 meses',
    duration: 'Durante o dia',
    materials: ['Objetos do cotidiano'],
    instructions: [
      'Mostre duas opções',
      'Nomeie cada uma claramente',
      'Espere a escolha',
      'Confirme: "Você quer água!"',
      'Repita em várias situações'
    ],
    benefits: [
      'Intenção comunicativa',
      'Escolha verbal',
      'Autonomia'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-7',
    title: '💬 Expanda a Fala',
    description: 'Se a criança diz "au!", você responde: "Sim, o cachorro faz au-au!"',
    ageRange: '12-18 meses',
    duration: 'Durante o dia',
    materials: ['Nenhum'],
    instructions: [
      'Escute a tentativa da criança',
      'Repita expandindo',
      'Use frase completa',
      'Mantenha naturalidade',
      'Não corrija, expanda'
    ],
    benefits: [
      'Construção de frases',
      'Vocabulário',
      'Confiança'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-8',
    title: '🚗 Sons Onomatopaicos',
    description: 'Carros: "vruuumm", patos: "quá-quá"',
    ageRange: '12-18 meses',
    duration: '5-10 min',
    materials: ['Brinquedos', 'Livros'],
    instructions: [
      'Mostre o objeto',
      'Faça o som característico',
      'Exagere a entonação',
      'Incentive imitação',
      'Varie os sons'
    ],
    benefits: [
      'Transição do som para palavra',
      'Imitação vocal',
      'Diversão'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1551927336-574c6b1e6d0a?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-9',
    title: '📚 Livros de Apontar',
    description: 'Incentive a criança a apontar e você nomeia',
    ageRange: '12-18 meses',
    duration: '5-10 min',
    materials: ['Livros ilustrados'],
    instructions: [
      'Abra o livro',
      'Pergunte: "O que é isso?"',
      'Espere apontar',
      'Nomeie o objeto',
      'Comemore'
    ],
    benefits: [
      'Atenção conjunta',
      'Vocabulário',
      'Predictor de linguagem forte'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-10',
    title: '📱 Brincar de Telefone',
    description: 'Faça um "alô!" e entregue o telefone',
    ageRange: '12-18 meses',
    duration: '5 min',
    materials: ['Telefone de brinquedo'],
    instructions: [
      'Pegue o telefone',
      'Diga "Alô!"',
      'Entregue à criança',
      'Espere resposta',
      'Continue a "conversa"'
    ],
    benefits: [
      'Turn-taking (troca de turnos)',
      'Base da conversação',
      'Imitação social'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
  },
  // 18-24 meses
  {
    id: 'lang-11',
    title: '🏃 Nomear Ações',
    description: '"O gato está pulando." "O papai está comendo."',
    ageRange: '18-24 meses',
    duration: 'Durante o dia',
    materials: ['Nenhum'],
    instructions: [
      'Observe ações ao redor',
      'Descreva com verbos',
      'Use frases simples',
      'Incentive repetição',
      'Varie as ações'
    ],
    benefits: [
      'Verbos',
      'Construção frasal',
      'Compreensão de ações'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-12',
    title: '✌️ Frases de 2 Palavras',
    description: 'Incentive: "mais água", "mamãe vem", "bola grande"',
    ageRange: '18-24 meses',
    duration: 'Durante o dia',
    materials: ['Nenhum'],
    instructions: [
      'Modele frases de 2 palavras',
      'Espere imitação',
      'Não force, incentive',
      'Comemore tentativas',
      'Use em contextos reais'
    ],
    benefits: [
      'Sintaxe inicial',
      'Combinação de palavras',
      'Expressão'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-13',
    title: '📖 Histórias Rápidas',
    description: 'Fale mini-histórias de 10 segundos com começo-meio-fim',
    ageRange: '18-24 meses',
    duration: '5 min',
    materials: ['Nenhum ou brinquedos'],
    instructions: [
      'Crie história simples',
      'Use 3-4 frases',
      'Tenha início, meio e fim',
      'Use entonação',
      'Repita se pedir'
    ],
    benefits: [
      'Memória verbal',
      'Narrativa',
      'Sequência lógica'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-14',
    title: '🗂️ Categorias Simples',
    description: 'Brinque de separar: "coisas de comer", "brinquedos vermelhos"',
    ageRange: '18-24 meses',
    duration: '10 min',
    materials: ['Objetos variados'],
    instructions: [
      'Escolha uma categoria',
      'Mostre exemplos',
      'Peça para separar',
      'Nomeie cada item',
      'Comemore acertos'
    ],
    benefits: [
      'Organização mental do vocabulário',
      'Categorização',
      'Raciocínio'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-15',
    title: '😊 Descrever Emoções',
    description: '"Você está feliz!" "Está bravo?"',
    ageRange: '18-24 meses',
    duration: 'Durante o dia',
    materials: ['Nenhum'],
    instructions: [
      'Observe expressões da criança',
      'Nomeie a emoção',
      'Use tom apropriado',
      'Valide sentimentos',
      'Ensine vocabulário emocional'
    ],
    benefits: [
      'Linguagem social',
      'Autorregulação',
      'Inteligência emocional'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-16',
    title: '🎵 Cantar com Pausas',
    description: 'Pare no meio da música para ver se a criança completa',
    ageRange: '18-24 meses',
    duration: '5 min',
    materials: ['Nenhum'],
    instructions: [
      'Escolha música conhecida',
      'Cante normalmente',
      'Pause em palavra-chave',
      'Espere completar',
      'Comemore tentativa'
    ],
    benefits: [
      'Antecipação',
      'Produção ativa',
      'Memória'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
  },
  {
    id: 'lang-17',
    title: '🔄 Rotinas Faladas',
    description: 'Sempre com as mesmas frases: "Hora do banho!", "Vamos trocar a fralda"',
    ageRange: '18-24 meses',
    duration: 'Durante o dia',
    materials: ['Nenhum'],
    instructions: [
      'Use frases fixas para rotinas',
      'Seja consistente',
      'Use tom alegre',
      'Incentive repetição',
      'Crie previsibilidade'
    ],
    benefits: [
      'Previsibilidade',
      'Compreensão rápida',
      'Segurança'
    ],
    category: 'linguagem',
    imageUrl: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&h=600&fit=crop'
  }
];

export function getTodayPlayActivity(): PlayActivity {
  const dayOfWeek = new Date().getDay();
  return weeklyPlayActivities[dayOfWeek % weeklyPlayActivities.length];
}

export function getWeeklyPlayActivities(): PlayActivity[] {
  return weeklyPlayActivities;
}

export function getCognitiveActivities(): PlayActivity[] {
  return cognitiveActivities;
}

export function getLanguageActivities(): PlayActivity[] {
  return languageActivities;
}
