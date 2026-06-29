// ─────────────────────────────────────────────────────────────────────────────
// Portfolio Data — Kailany Ribeiro | b.inside | Marketing Digital Estratégico
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

// CircularTestimonials format (matches src/components/ui/circular-testimonials.tsx)
export interface CircularTestimonialItem {
  quote:       string
  name:        string
  designation: string
  src:         string
}

export interface SocialLink {
  platform: 'linkedin' | 'instagram' | 'tiktok' | 'email' | 'whatsapp'
  label:    string
  url:      string
  handle:   string
}

export interface Profile {
  name:         string
  fullName:     string
  handle:       string
  title:        string
  tagline:      string
  bio:          string
  location:     string
  availability: string
  avatar:       string
  socials:      SocialLink[]
  stats:        { label: string; value: string }[]
}

export interface Service {
  id:           string
  name:         string
  icon:         string
  description:  string
  deliverables: string[]
  highlight?:   boolean
}

export interface Testimonial {
  id:            string
  clientName:    string
  clientRole:    string
  clientCompany: string
  clientAvatar:  string
  text:          string
  rating:        number
  projectRef?:   string
}

// ── Profile ───────────────────────────────────────────────────────────────────

export const profile: Profile = {
  name:     'Kailany',
  fullName: 'Kailany Ribeiro',
  handle:   'b.inside',
  title:    'Marketing de Conteúdo & Direção Visual · b.inside',
  tagline:  'Transformando narrativas de marcas através do olhar estratégico e audiovisual de Kailany. Storymaking, Fotografia e Social Media em Santa Catarina.',
  bio:      'Por trás da b.inside está Kailany, especialista em capturar a essência de negócios e transformá-la em conteúdo premium que conecta, engaja e vende.',
  location:     'Santa Catarina, Brasil',
  availability: 'Disponível para novos projetos',
  avatar:       '/images/imagensReais/FotoProfissional.jpeg',
  socials: [
    {
      platform: 'linkedin',
      label:    'LinkedIn',
      url:      'https://linkedin.com/in/ed-kaii',
      handle:   '/in/ed-kaii',
    },
    {
      platform: 'instagram',
      label:    'Instagram',
      url:      'https://www.instagram.com/b.insidee/',
      handle:   '@b.insidee',
    },
    {
      platform: 'email',
      label:    'E-mail',
      url:      'mailto:ed.kailany@gmail.com',
      handle:   'ed.kailany@gmail.com',
    },
    {
      platform: 'whatsapp',
      label:    'WhatsApp',
      url:      'https://wa.me/554792794147?text=Ol%C3%A1!%20Vi%20o%20portf%C3%B3lio%20da%20b.inside%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80',
      handle:   '+55 (47) 92794-147',
    },
  ],
  stats: [
    { label: 'Anos de experiência',       value: '3+' },
    { label: 'Projetos entregues',         value: '20+' },
    { label: 'Em tráfego gerenciado',      value: 'R$ 100k+' },
    { label: 'Crescimento médio de leads', value: '3×' },
  ],
}

// ── Services ──────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id:          'svc-001',
    name:        'Gestão de Redes Sociais',
    icon:        'LayoutGrid',
    description: 'Estratégia editorial, produção de conteúdo e gestão completa do perfil — para uma presença digital consistente, com identidade forte e crescimento orgânico real.',
    deliverables: [
      'Planejamento editorial mensal',
      'Criação de legendas e roteiros',
      'Briefing para designer/videomaker',
      'Gestão de DMs e comentários',
      'Relatório de desempenho quinzenal',
      'Estratégia de Stories e Reels',
    ],
    highlight: false,
  },
  {
    id:          'svc-002',
    name:        'Tráfego Pago',
    icon:        'TrendingUp',
    description: 'Estruturação, gestão e otimização de campanhas no Meta Ads e Google Ads focadas em performance — ROAS, CAC e volume de leads controlados por dados.',
    deliverables: [
      'Auditoria da conta existente',
      'Estrutura de campanhas por funil',
      'Produção de briefings de criativos',
      'Otimização semanal de lances e segmentação',
      'Testes A/B de criativos e copies',
      'Relatório de performance mensal',
    ],
    highlight: true,
  },
  {
    id:          'svc-003',
    name:        'Estratégia de Conteúdo',
    icon:        'FileText',
    description: 'Diagnóstico completo do posicionamento digital e construção de uma estratégia de conteúdo orientada a atrair, engajar e converter o público ideal.',
    deliverables: [
      'Definição e análise de ICP',
      'Mapeamento da jornada de compra',
      'Calendário editorial estratégico (90 dias)',
      'Guia de voz e tom de marca',
      'Pautas prontas para conteúdo',
      'Framework de pilares de conteúdo',
    ],
    highlight: false,
  },
  {
    id:          'svc-004',
    name:        'Consultoria & Mentoria',
    icon:        'Lightbulb',
    description: 'Sessão estratégica 1:1 para diagnóstico do marketing digital do seu negócio, com plano de ação personalizado e priorizações claras para os próximos 90 dias.',
    deliverables: [
      'Diagnóstico do marketing atual',
      'Análise da concorrência',
      'Plano de ação priorizado (90 dias)',
      'Definição de KPIs e metas',
      'Gravação da sessão',
      '15 dias de suporte por e-mail',
    ],
    highlight: false,
  },
  {
    id:          'svc-005',
    name:        'Lançamentos Digitais',
    icon:        'Rocket',
    description: 'Planejamento e execução completos de lançamentos PLT ou perpétuos — da captação de leads à abertura de carrinho, com funil, e-mails e mídia paga integrados.',
    deliverables: [
      'Estratégia completa de lançamento',
      'Funil de captação com tráfego pago',
      'Sequência de e-mails (pré + lançamento)',
      'Copywriting de página de vendas',
      'Campanhas de retargeting',
      'Análise pós-lançamento',
    ],
    highlight: false,
  },
]

// ── Testimonials ──────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id:            'tst-001',
    clientName:    'Fernanda Rocha',
    clientRole:    'Fundadora',
    clientCompany: 'Conjuntos do Brasil',
    clientAvatar:  '/images/testimonials/imagem dos conjuntos do brasil.jpg',
    text: 'Nossa marca vendia só em feiras. A Kailany transformou nosso Instagram em uma máquina de vendas — hoje faturamos R$ 85k por mês no digital sem precisar de ads. Ela entendeu a alma patriótica da nossa marca e traduziu isso em conteúdo que o brasileiro se identifica.',
    rating:     5,
    projectRef: 'prj-001',
  },
  {
    id:            'tst-002',
    clientName:    'Clara Mendes',
    clientRole:    'Criadora de Conteúdo',
    clientCompany: 'Lifestyle Creator',
    clientAvatar:  '/images/testimonials/imagem camera.jpg',
    text: 'Eu tinha talento mas não tinha estratégia. A Kailany me ajudou a entender meu nicho, criar uma identidade visual consistente e transformar meu hobby em negócio. 52k seguidores e três contratos de embaixadora depois, minha vida profissional mudou completamente.',
    rating:     5,
    projectRef: 'prj-002',
  },
  {
    id:            'tst-003',
    clientName:    'Diego Alves',
    clientRole:    'Fundador',
    clientCompany: 'Arte Urbana SP',
    clientAvatar:  '/images/testimonials/imagem batiman.jpg',
    text: 'A Kailany entendeu que arte urbana tem alma — e não pode parecer corporativo. Ela criou uma estratégia que respeita nossa linguagem e ao mesmo tempo nos conectou com marcas e espaços que nunca chegaríamos sem o digital. Os bastidores viraram nosso maior diferencial.',
    rating:     5,
    projectRef: 'prj-003',
  },
  {
    id:            'tst-004',
    clientName:    'Bruno Namook',
    clientRole:    'Fundador',
    clientCompany: 'Namook',
    clientAvatar:  '/images/testimonials/prancha.jpg',
    text: 'O maior desafio era mostrar a atmosfera da Namook para quem nunca veio. A Kailany conseguiu capturar a vibe do espaço em conteúdo — hoje recebo mensagens de pessoas que me seguem há meses antes de vir pessoalmente. Virou o nosso melhor canal de captação.',
    rating:     5,
    projectRef: 'prj-004',
  },
]

// ── Circular Testimonials — formato para o componente premium ────────────────
// Usa todas as 6 imagens reais da pasta /images/testimonials/ (exceto o avatar)

export const circularTestimonials: CircularTestimonialItem[] = [
  {
    quote:       'Que lindo muito obrigada\nAmei',
    name:        'Cliente 1',
    designation: 'Ensaio Casual',
    src:         '/images/feedbacks/ensaioCasual.jpg',
  },
  {
    quote:       'Ficou muito bom Kai, maravilhoso\nEu TB amei esse vídeo 🥰🥰',
    name:        'Cliente 2',
    designation: 'Produção de Vídeo',
    src:         '/images/feedbacks/producaoVideo.jpg',
  },
  {
    quote:       'Amei a sessão de fotos! O ambiente, o profissionalismo e a experiência foi sensacional. Me senti super à vontade e o resultado ficou incrível. Obrigada pelo trabalho e dedicação!!',
    name:        'Cliente 3',
    designation: 'Sessão Fotográfica Studio',
    src:         '/images/feedbacks/fotoEstudio.jpg',
  },
  {
    quote:       'Ficou lindo Kay!!\nMuito muito obrigado 👏\nGratidão ❤️\nFicaram lindas 😍',
    name:        'Cliente 4',
    designation: 'Ensaio Externo',
    src:         '/images/feedbacks/ensaioExterno.jpg',
  },
  {
    quote:       'Oi, passando para dizer que amei o seu trabalho, superou todas as minhas expectativas, conseguimos transformar uma simples ideia em uma produção incrível, parabéns pelo profissionalismo e pretendo seguir com a produção para os meus próximos conteúdos, obrigada!! 🥰❤️',
    name:        'Cliente 5',
    designation: 'Produção de Conteúdo / Brand',
    src:         '/images/feedbacks/produtorConteudo.jpg',
  },
  {
    quote:       'Só recebi elogios do video e fotos, muitooooo lindas!!! Obrigada por entrar nessa loucura de ir pra outra cidade e acordar as 4h da manhã, foi muito divertido e mágico 💕\nJá estou ansiosa pelos videos do casamento em si\nvocê é topppp',
    name:        'Noiva',
    designation: 'Pré-Wedding',
    src:         '/images/feedbacks/noiva.jpg',
  },
  {
    quote:       'coisa linda, feliz demais por você! que o senhor se faça presente nesse momento e abençoe vocês pelo resto de suas vidas! 🤍✨\nMeu Deus to chorando, que coisa mais linda 🥺😭😍\nque lindoooooo 🥺🥺😍😍😭😭😭\nmostrei ate pro meu pai\nQue lindo 🥺🥺😍😍😭😭',
    name:        'Cliente 7',
    designation: 'Casamento / Cerimônia',
    src:         '/images/feedbacks/casamento.jpeg',
  },
  {
    quote:       'Oiii! ✨\nTudo bem? 🥰❤️\nQueremos te agradecer, você faz um excelente trabalho, cada vídeo ficou simplesmente incrível!!!\nParabéns, você fez muito além do que esperávamos Kai, obrigado do fundo do nosso coração. ❤️',
    name:        'Cliente 8',
    designation: 'Vídeo Clipe Premium',
    src:         '/images/feedbacks/casamentoDois.jpeg',
  },
  {
    quote:       'Oii quero agradecer por tudo , pela sua presença,seu trabalho é maravilhoso as fotos, vídeos, tudo ficou perfeito 🙏 gratidão 🙏 que Deus abençoe sua carreira e continue sendo essa fotógrafa maravilhosa que através de você , podemos recordar e guardar cada momento especial do primeiro aninho da nossa princesa 😍🙏❤️',
    name:        'Mãe da Princesa',
    designation: 'Aniversário Infantil',
    src:         '/images/feedbacks/aniverInfantil.jpg',
  },
  {
    quote:       'Oi Kailany\nPassando para te agradecer e parabenizar pelo trabalho realizado Sem dúvidas um acerto nas nossas decisões e a tranquilidade de poder aproveitar cada momento do evento sabendo que você está registrando tudo\nCada vídeo e foto registrado ficou incrível e certamente iremos guardar para sempre\nObrigado pelo carinho 👏🏻🤍',
    name:        'Cliente 10',
    designation: 'Cobertura de Evento / Festa',
    src:         '/images/feedbacks/festa.jpg',
  },
]
