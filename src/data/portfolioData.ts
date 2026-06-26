// ─────────────────────────────────────────────────────────────────────────────
// Portfolio Data — Kailane | ed.kaii | Marketing Digital Estratégico
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

// CircularTestimonials format (matches src/components/ui/circular-testimonials.tsx)
export interface CircularTestimonialItem {
  quote:       string
  name:        string
  designation: string
  src:         string
}

export type MediaType   = 'image' | 'video'
export type MediaAspect = 'landscape' | 'portrait' | 'square'

export interface MediaItem {
  type:     MediaType
  url:      string
  poster?:  string
  caption?: string
  aspect?:  MediaAspect
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

export interface ProjectMetric {
  label:  string
  value:  string
  delta?: string
}

export interface Project {
  id:       string
  slug:     string
  title:    string
  client:   string
  category: string
  year:     string
  tags:     string[]
  type:     MediaType
  mediaUrl: string
  poster?:  string
  gallery:  MediaItem[]
  summary:  string
  challenge: string
  solution:  string
  results:   string
  metrics:   ProjectMetric[]
  featured:  boolean
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
  name:     'Kailane',
  fullName: 'Kailane Freitas',
  handle:   'b.inside',
  title:    'Marketing de Conteúdo & Direção Visual · b.inside',
  tagline:  'Transformando narrativas de marcas através do olhar estratégico e audiovisual de Kailane. Storymaking, Fotografia e Social Media em Santa Catarina.',
  bio:      'Por trás da b.inside está Kailane, especialista em capturar a essência de negócios e transformá-la em conteúdo premium que conecta, engaja e vende.',
  location:     'Santa Catarina, Brasil',
  availability: 'Disponível para novos projetos',
  avatar:       '/images/testimonials/imagem kaii.jpg',
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
      url:      'mailto:contato@edkaii.com.br',
      handle:   'contato@edkaii.com.br',
    },
    {
      platform: 'whatsapp',
      label:    'WhatsApp',
      url:      'https://wa.me/5511999999999',
      handle:   '+55 (11) 99999-9999',
    },
  ],
  stats: [
    { label: 'Anos de experiência',       value: '5+' },
    { label: 'Projetos entregues',         value: '40+' },
    { label: 'Em tráfego gerenciado',      value: 'R$ 500k+' },
    { label: 'Crescimento médio de leads', value: '3×' },
  ],
}

// ── Projects ──────────────────────────────────────────────────────────────────

export const projects: Project[] = [

  // ── 001 · Conjuntos do Brasil — Branding & Social Media ───────────────────
  {
    id:       'prj-001',
    slug:     'conjuntos-do-brasil-social-media',
    title:    'De banca de feira a loja online: como a Conjuntos do Brasil conquistou o digital',
    client:   'Conjuntos do Brasil',
    category: 'Branding & Social Media',
    year:     '2025',
    tags:     ['Branding', 'Instagram', 'Social Commerce', 'Moda Patriótica', 'UGC'],

    type:     'image',
    mediaUrl: '/images/testimonials/imagem dos conjuntos do brasil.jpg',
    gallery: [
      {
        type:    'image',
        url:     '/images/testimonials/imagem dos conjuntos do brasil.jpg',
        caption: 'Coleção Seleção — campanha visual para Copa e datas patrióticas',
        aspect:  'portrait',
      },
    ],

    summary:
      'Marca de moda patriótica com forte presença em feiras físicas mas zero estratégia digital. Em 5 meses, transformamos o perfil em canal de vendas gerando R$ 85k/mês online.',
    challenge:
      'Produto com enorme apelo emocional — uniformes da Seleção Brasileira — mas vendas 100% dependentes de feiras e eventos presenciais. A marca não existia no digital e perdia vendas fora da temporada de Copa.',
    solution:
      'Estratégia de conteúdo patriótico com calendário editorial baseado em datas simbólicas (Copa, Independência, jogos da Seleção), curadoria de UGC de torcedores e Stories com funil direto para WhatsApp. Criamos uma identidade visual digital que preservava o espírito popular da marca.',
    results:
      'Em 5 meses, o perfil saiu do zero para 22k seguidores com engajamento acima de 8%. As vendas online chegaram a R$ 85k/mês — sem nenhum investimento em tráfego pago.',
    metrics: [
      { label: 'Crescimento de seguidores', value: '22k',   delta: 'orgânico'   },
      { label: 'Vendas online/mês',          value: 'R$ 85k'                    },
      { label: 'Engajamento médio',          value: '+8.2%'                     },
      { label: 'Alcance mensal',             value: '47k',  delta: 'sem ads'    },
    ],
    featured: true,
  },

  // ── 002 · Criadora de Lifestyle — Estratégia de Conteúdo ─────────────────
  {
    id:       'prj-002',
    slug:     'marca-pessoal-criadora-lifestyle',
    title:    'Marca pessoal de 0 a 52k: estratégia de conteúdo para criadora de lifestyle',
    client:   'Clara Mendes (nome fictício)',
    category: 'Estratégia de Conteúdo',
    year:     '2025',
    tags:     ['Marca Pessoal', 'Lifestyle', 'Instagram', 'Reels', 'Monetização'],

    type:     'image',
    mediaUrl: '/images/testimonials/imagem camera.jpg',
    gallery: [
      {
        type:    'image',
        url:     '/images/testimonials/imagem camera.jpg',
        caption: 'Identidade visual da criadora — estética urbana e autenticidade no processo',
        aspect:  'portrait',
      },
    ],

    summary:
      'Criadora de conteúdo com talento mas sem estratégia — posts irregulares, nicho indefinido e zero monetização. Em 8 meses: 52k seguidores e R$ 18k em publis no primeiro ano.',
    challenge:
      'Apesar de ter olhar fotográfico e personalidade forte, a criadora postava de forma inconsistente sem nicho definido. O resultado: alcance baixo, engajamento irregular e nenhuma abordagem de marca.',
    solution:
      'Definimos o nicho como "lifestyle urbano + produtividade criativa para mulheres". Criamos um calendário editorial com 4 pilares de conteúdo, guia de estética visual e estratégia de Reels com ganchos para viralização. Estruturamos o media kit e iniciamos prospecção ativa de marcas.',
    results:
      '52k seguidores em 8 meses com taxa de engajamento de 8.4% — acima da média do nicho. Três contratos de embaixadora fechados e R$ 18k em publis no primeiro ano de estratégia.',
    metrics: [
      { label: 'Seguidores em 8 meses',    value: '52k'              },
      { label: 'Taxa de engajamento',       value: '8.4%'             },
      { label: 'Publis no 1º ano',          value: 'R$ 18k'           },
      { label: 'Contratos de embaixadora',  value: '3',  delta: 'marcas' },
    ],
    featured: true,
  },

  // ── 003 · Arte Urbana SP — Branding & Social Media ───────────────────────
  {
    id:       'prj-003',
    slug:     'coletivo-arte-urbana-sp',
    title:    'Coletivo de arte urbana que ganhou 28k seguidores sem investir um real em ads',
    client:   'Arte Urbana SP (nome fictício)',
    category: 'Branding & Social Media',
    year:     '2024',
    tags:     ['Arte Urbana', 'Orgânico', 'Instagram', 'Branding Cultural', 'Bastidores'],

    type:     'image',
    mediaUrl: '/images/testimonials/imagem batiman.jpg',
    gallery: [
      {
        type:    'image',
        url:     '/images/testimonials/imagem batiman.jpg',
        caption: 'Processo de criação — documentação de bastidores que gerou maior engajamento',
        aspect:  'portrait',
      },
    ],

    summary:
      'Coletivo de street art com obras incríveis nas ruas de SP mas invisível no digital. Estratégia orgânica de bastidores gerou 28k seguidores e R$ 95k em projetos corporativos captados via Instagram.',
    challenge:
      'Os murais e intervenções morriam nas paredes — sem registro profissional, sem narrativa e sem presença digital organizada. O coletivo dependia de indicações presenciais para conseguir projetos pagos.',
    solution:
      'Estratégia de conteúdo focada em documentar o processo criativo: time-lapses de pintura, bastidores com os artistas, narrativas sobre as mensagens das obras. Criamos identidade visual digital coerente com o universo street art e ativamos parcerias com marcas urbanas e espaços culturais.',
    results:
      '28k seguidores orgânicos em 7 meses com 12.6% de engajamento — um dos maiores do nicho cultural. Quatro projetos corporativos de grande porte captados diretamente pelo Instagram, totalizando R$ 95k no ano.',
    metrics: [
      { label: 'Seguidores orgânicos',      value: '28k'                   },
      { label: 'Taxa de engajamento',        value: '12.6%'                 },
      { label: 'Projetos corporativos',      value: '4', delta: 'via IG'   },
      { label: 'Faturamento captado',        value: 'R$ 95k'               },
    ],
    featured: false,
  },

  // ── 004 · Namook — Branding & Social Media ───────────────────────────────
  {
    id:       'prj-004',
    slug:     'namook-concept-store-surf',
    title:    'Namook: posicionamento digital para concept store de surf & lifestyle',
    client:   'Namook',
    category: 'Branding & Social Media',
    year:     '2024',
    tags:     ['Lifestyle', 'Surf Culture', 'Instagram', 'Branding Local', 'Eventos'],

    type:     'image',
    mediaUrl: '/images/testimonials/prancha.jpg',
    gallery: [
      {
        type:    'image',
        url:     '/images/testimonials/prancha.jpg',
        caption: 'Interior da Namook — concept store, surf bar e galeria de arte em um só espaço',
        aspect:  'portrait',
      },
    ],

    summary:
      'Espaço físico único que reunia surf bar, concept store e galeria — mas sem presença digital que traduzisse a experiência. Estratégia de conteúdo gerou 3.2× em seguidores e R$ 42k em eventos captados.',
    challenge:
      'A Namook tinha um diferencial incomparável: pranchas decorativas, arte local e gastronomia em um ambiente singular. Mas o diferencial ficava só para quem já conhecia o espaço — sem captação digital de novos públicos.',
    solution:
      'Estratégia editorial focada em estética e atmosfera: conteúdo de ambientação (luz, textura, detalhe), registro de eventos ao vivo, showcases de artistas locais e curadoria de UGC dos frequentadores. Criamos um feed que fazia o seguidor sentir o espaço antes de entrar.',
    results:
      'Em 6 meses: 3.2× crescimento de seguidores, visitas ao espaço aumentaram 65% com origem declarada no Instagram, e R$ 42k em eventos privados contratados via perfil.',
    metrics: [
      { label: 'Crescimento de seguidores', value: '3.2×'                 },
      { label: 'Visitas vindas do Instagram', value: '+65%'               },
      { label: 'Eventos captados via IG',     value: 'R$ 42k'             },
      { label: 'Engajamento médio',           value: '9.1%'               },
    ],
    featured: true,
  },

  // ── 005 · Formalize Eventos — Lançamentos Digitais ────────────────────────
  {
    id:       'prj-005',
    slug:     'formalize-lancamento-eventos-formatura',
    title:    'Lançamento digital para empresa de bailes de formatura: R$ 210k em contratos',
    client:   'Formalize Eventos (nome fictício)',
    category: 'Lançamentos Digitais',
    year:     '2024',
    tags:     ['Eventos', 'Meta Ads', 'Funil', 'Copywriting', 'Sazonalidade'],

    type:     'image',
    mediaUrl: '/images/testimonials/formatura.jpg',
    gallery: [
      {
        type:    'image',
        url:     '/images/testimonials/formatura.jpg',
        caption: 'Baile de formatura — o momento emocional que mais converte em orçamento',
        aspect:  'portrait',
      },
    ],

    summary:
      'Empresa nova em mercado altamente competitivo e sazonal. Estratégia de lançamento digital com tráfego pago, funil de e-mails e conteúdo aspiracional gerou R$ 210k em contratos assinados antes da alta temporada.',
    challenge:
      'Empresa estreante no mercado de eventos de formatura — setor dominado por players consolidados que operavam 100% por indicação. Prazo apertado: precisava captar turmas antes da temporada de formação.',
    solution:
      'Lançamento com campanha de Meta Ads segmentada para líderes de turma e comissões de formatura, landing page com copywriting emocional focado no "grande momento" e sequência de 8 e-mails de nutrição. Retargeting agressivo nos 15 dias finais de captação.',
    results:
      'R$ 210k em contratos assinados antes do pico da temporada. Taxa de conversão de leads de 8.7% — acima da média do setor. CPA 42% menor que concorrentes diretos.',
    metrics: [
      { label: 'Contratos assinados',     value: 'R$ 210k'           },
      { label: 'Conversão de leads',      value: '8.7%'              },
      { label: 'Redução do CPA',          value: '-42%', delta: 'vs. setor' },
      { label: 'Leads captados',          value: '1.800'             },
    ],
    featured: true,
  },

  // ── 006 · Rio Autêntico — Estratégia de Conteúdo ─────────────────────────
  {
    id:       'prj-006',
    slug:     'rio-autentico-turismo-conteudo',
    title:    'Estratégia de conteúdo que posicionou guia turístico como referência no RJ',
    client:   'Rio Autêntico (nome fictício)',
    category: 'Estratégia de Conteúdo',
    year:     '2024',
    tags:     ['Turismo', 'Rio de Janeiro', 'Instagram', 'TikTok', 'Conteúdo Local'],

    type:     'image',
    mediaUrl: '/images/testimonials/rio de janeiro.jpg',
    gallery: [
      {
        type:    'image',
        url:     '/images/testimonials/rio de janeiro.jpg',
        caption: 'Pão de Açúcar — perspectiva exclusiva usada como conteúdo de alto alcance',
        aspect:  'portrait',
      },
    ],

    summary:
      'Guia turístico com experiências únicas no Rio mas invisível no digital — dependia de grupos de WhatsApp e recomendações presenciais. Em 6 meses: 34k seguidores e +210% em reservas online.',
    challenge:
      'Guia com acesso a perspectivas e roteiros que turistas jamais encontrariam sozinhos, mas sem estratégia para mostrar isso digitalmente. O negócio era limitado pela capacidade de indicações pessoais.',
    solution:
      'Estratégia de conteúdo no Instagram e TikTok com roteiros exclusivos, pontos fora do circuito turístico tradicional (pontos de vista secretos, horários especiais, histórias locais) e narrativas que vendiam a experiência antes da reserva.',
    results:
      'Em 6 meses: 34k seguidores com alto salvamento de conteúdo (indicador de intenção de viagem), +210% em reservas online e faturamento mensal de R$ 28k — tudo gerado organicamente.',
    metrics: [
      { label: 'Seguidores em 6 meses',  value: '34k'                    },
      { label: 'Crescimento em reservas', value: '+210%'                  },
      { label: 'Faturamento mensal',      value: 'R$ 28k'                 },
      { label: 'Avaliação Google',        value: '4.8★', delta: 'média'  },
    ],
    featured: false,
  },
]

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
    text: 'Nossa marca vendia só em feiras. A Kailane transformou nosso Instagram em uma máquina de vendas — hoje faturamos R$ 85k por mês no digital sem precisar de ads. Ela entendeu a alma patriótica da nossa marca e traduziu isso em conteúdo que o brasileiro se identifica.',
    rating:     5,
    projectRef: 'prj-001',
  },
  {
    id:            'tst-002',
    clientName:    'Clara Mendes',
    clientRole:    'Criadora de Conteúdo',
    clientCompany: 'Lifestyle Creator',
    clientAvatar:  '/images/testimonials/imagem camera.jpg',
    text: 'Eu tinha talento mas não tinha estratégia. A Kailane me ajudou a entender meu nicho, criar uma identidade visual consistente e transformar meu hobby em negócio. 52k seguidores e três contratos de embaixadora depois, minha vida profissional mudou completamente.',
    rating:     5,
    projectRef: 'prj-002',
  },
  {
    id:            'tst-003',
    clientName:    'Diego Alves',
    clientRole:    'Fundador',
    clientCompany: 'Arte Urbana SP',
    clientAvatar:  '/images/testimonials/imagem batiman.jpg',
    text: 'A Kailane entendeu que arte urbana tem alma — e não pode parecer corporativo. Ela criou uma estratégia que respeita nossa linguagem e ao mesmo tempo nos conectou com marcas e espaços que nunca chegaríamos sem o digital. Os bastidores viraram nosso maior diferencial.',
    rating:     5,
    projectRef: 'prj-003',
  },
  {
    id:            'tst-004',
    clientName:    'Bruno Namook',
    clientRole:    'Fundador',
    clientCompany: 'Namook',
    clientAvatar:  '/images/testimonials/prancha.jpg',
    text: 'O maior desafio era mostrar a atmosfera da Namook para quem nunca veio. A Kailane conseguiu capturar a vibe do espaço em conteúdo — hoje recebo mensagens de pessoas que me seguem há meses antes de vir pessoalmente. Virou o nosso melhor canal de captação.',
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
