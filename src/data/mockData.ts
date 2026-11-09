import { Archetype, UserProfile, Story, Post, Reel, ChatConversation, NotificationItem, TribeCommunity } from '../types';

export const ARCHETYPES: Record<string, Archetype> = {
  tech_cyber: {
    id: 'tech_cyber',
    name: 'Cyberpunk & Tech Hacker',
    tagline: 'Futurismo, código abierto & realidad aumentada',
    icon: '⚡',
    color: '#06b6d4', // Cyan 500
    bgGradient: 'from-cyan-500/20 via-blue-600/10 to-transparent',
    borderColor: 'border-cyan-500/40',
    vibePillColor: 'text-cyan-400 border-cyan-500/30',
    popularTags: ['#Cyberpunk', '#AI', '#Web3', '#TokyoTech', '#DevLife'],
    description: 'Amantes del hardware futurista, inteligencia artificial, synthwave y terminales oscuros.',
    memberCount: '142K miembros'
  },
  streetwear: {
    id: 'streetwear',
    name: 'Streetwear Hypebeast',
    tagline: 'Cultura sneaker, siluetas oversize y drops exclusivos',
    icon: '👟',
    color: '#3b82f6', // Blue 500
    bgGradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
    borderColor: 'border-blue-500/40',
    vibePillColor: 'text-blue-400 border-blue-500/30',
    popularTags: ['#Streetwear', '#Sneakers', '#FitCheck', '#OOTD', '#DropArchive'],
    description: 'Estética urbana brutalista, coleccionismo de calzado, alta costura callejera y diseño utilitario.',
    memberCount: '210K miembros'
  },
  minimalist: {
    id: 'minimalist',
    name: 'Aesthetic Minimalist',
    tagline: 'Luz natural, editorial nórdico y calma visual',
    icon: '☕',
    color: '#e2e8f0', // Neutral / Slate
    bgGradient: 'from-stone-500/20 via-zinc-600/10 to-transparent',
    borderColor: 'border-stone-400/40',
    vibePillColor: 'text-stone-300 border-stone-400/30',
    popularTags: ['#Minimalist', '#CoffeeCulture', '#Architecture', '#Editorial', '#InteriorDesign'],
    description: 'Espacios ordenados, tipografía pura, fotografía con luz difusa y filosofía slow living.',
    memberCount: '98K miembros'
  },
  fitness: {
    id: 'fitness',
    name: 'Iron Gymrat & Hybrid Athlete',
    tagline: 'Disciplina pura, récords personales & longevidad',
    icon: '🏋️',
    color: '#ef4444', // Red 500
    bgGradient: 'from-red-500/20 via-orange-600/10 to-transparent',
    borderColor: 'border-red-500/40',
    vibePillColor: 'text-red-400 border-red-500/30',
    popularTags: ['#Gymrat', '#NoExcuses', '#Hyrox', '#Powerlifting', '#CleanEats'],
    description: 'Pasión por el entrenamiento funcional, levantamiento pesado, nutrición y superación diaria.',
    memberCount: '320K miembros'
  },
  dark_academia: {
    id: 'dark_academia',
    name: 'Dark Academia & Intellect',
    tagline: 'Literatura clásica, filosofía, vinilos y tweed',
    icon: '📚',
    color: '#10b981', // Emerald 500
    bgGradient: 'from-emerald-700/20 via-stone-800/10 to-transparent',
    borderColor: 'border-emerald-500/40',
    vibePillColor: 'text-emerald-400 border-emerald-500/30',
    popularTags: ['#DarkAcademia', '#Books', '#Philosophy', '#Poetry', '#VintageAesthetic'],
    description: 'Amor por la historia del arte, bibliotecas góticas, escritura reflexiva y debates filosóficos.',
    memberCount: '87K miembros'
  },
  boho_nomad: {
    id: 'boho_nomad',
    name: 'Boho Nomad & Wanderlust',
    tagline: 'Viajes sin billete de vuelta, atardeceres y trabajo remoto',
    icon: '🌿',
    color: '#f59e0b', // Amber 500
    bgGradient: 'from-amber-500/20 via-yellow-600/10 to-transparent',
    borderColor: 'border-amber-500/40',
    vibePillColor: 'text-amber-400 border-amber-500/30',
    popularTags: ['#VanLife', '#NomadWork', '#Sunsets', '#Mindfulness', '#Backpacking'],
    description: 'Exploradores del mundo, surfistas, nómadas digitales y conexión con la naturaleza.',
    memberCount: '164K miembros'
  },
  lofi_gamer: {
    id: 'lofi_gamer',
    name: 'Lo-Fi Gamer & Otaku',
    tagline: 'Setups RGB pastel, anime de culto, chill beats y streaming',
    icon: '🎧',
    color: '#a855f7', // Purple 500
    bgGradient: 'from-purple-500/20 via-pink-600/10 to-transparent',
    borderColor: 'border-purple-500/40',
    vibePillColor: 'text-purple-400 border-purple-500/30',
    popularTags: ['#LoFiBeats', '#GamerSetup', '#IndieGames', '#Anime', '#StreamVibes'],
    description: 'Noches acogedoras con lluvia virtual, colecciones de manga y partidas cooperativas.',
    memberCount: '185K miembros'
  }
};

export const INITIAL_USER: UserProfile = {
  id: 'user_current',
  name: 'Alejandro Cruz',
  handle: 'alex_pulse',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  coverImage: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg',
  bio: 'Diseñador interactivo & explorador de interfaces visuales. Creando el futuro de las redes descentralizadas 🌐⚡',
  archetypeId: 'tech_cyber',
  themeAura: 'cyan',
  pronouns: 'él/he',
  website: 'https://pulse.network/alex',
  anthem: {
    title: 'Resonance // Neo-Tokyo',
    artist: 'HOME & Lorn',
  },
  stats: {
    posts: 42,
    followers: 12840,
    following: 489,
    tribeRep: 940
  },
  verified: true
};

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story_user',
    userId: 'user_current',
    userName: 'Tu Historia',
    userHandle: 'alex_pulse',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    archetypeId: 'tech_cyber',
    mediaUrl: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg',
    caption: 'Trabajando en el nuevo protocolo de hilos nocturnos 💻',
    timestamp: 'Hace 1h',
    viewed: false,
    type: 'image'
  },
  {
    id: 'story_1',
    userId: 'user_valeria',
    userName: 'Valeria Chen',
    userHandle: 'val_cyber',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    archetypeId: 'tech_cyber',
    mediaUrl: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg',
    caption: 'Akihabara bajo la lluvia. Los hologramas hoy lucen irreales ✨',
    timestamp: 'Hace 2h',
    viewed: false,
    type: 'image'
  },
  {
    id: 'story_2',
    userId: 'user_malik',
    userName: 'Malik Vance',
    userHandle: 'malik_drips',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    archetypeId: 'streetwear',
    mediaUrl: '/src/assets/images/feed_streetwear_urban_1794234354462.jpg',
    caption: 'Acaban de llegar los sample kicks para la próxima temporada 👟🔥',
    timestamp: 'Hace 3h',
    viewed: false,
    type: 'image'
  },
  {
    id: 'story_3',
    userId: 'user_clara',
    userName: 'Clara Lindqvist',
    userHandle: 'clara_minimal',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    archetypeId: 'minimalist',
    mediaUrl: '/src/assets/images/feed_minimal_aesthetic_1794234354724.jpg',
    caption: 'Mañanas de café filtrado y diseño tipográfico en silencio.',
    timestamp: 'Hace 4h',
    viewed: false,
    type: 'image'
  },
  {
    id: 'story_4',
    userId: 'user_marcos',
    userName: 'Marcos Ruiz',
    userHandle: 'marcos_iron',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    archetypeId: 'fitness',
    mediaUrl: '/src/assets/images/feed_fitness_athlete_1794234355691.jpg',
    caption: '5:30 AM pista libre. La consistencia le gana al talento.',
    timestamp: 'Hace 5h',
    viewed: false,
    type: 'image'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    author: {
      id: 'user_valeria',
      name: 'Valeria Chen',
      handle: 'val_cyber',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'tech_cyber',
      verified: true
    },
    type: 'photo',
    content: 'Probando el nuevo módulo de visualización neuronal en las calles de Shibuya. La fluidez de renderizado a 120 FPS en un visor ligero por fin es una realidad tangible. ¿Listos para la próxima ola de interfaces ambientales?',
    mediaUrl: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg',
    tags: ['#Cyberpunk', '#AI', '#NextGen', '#TokyoDev'],
    timestamp: 'Hace 28 min',
    likes: 842,
    reposts: 129,
    commentsCount: 47,
    isLiked: false,
    isReposted: false,
    isSaved: false,
    comments: [
      {
        id: 'c1',
        userId: 'user_alex',
        userName: 'Alejandro Cruz',
        userHandle: 'alex_pulse',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        content: 'Esa calibración de HUD se ve impecable Valeria. ¿Qué latencia tienes en exteriores?',
        timestamp: 'Hace 15 min',
        likes: 12
      },
      {
        id: 'c2',
        userId: 'user_marcos',
        userName: 'Marcos Ruiz',
        userHandle: 'marcos_iron',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        content: 'Increíble toma. Parece sacado de 2077.',
        timestamp: 'Hace 8 min',
        likes: 4
      }
    ]
  },
  {
    id: 'post_2',
    author: {
      id: 'user_diego_dev',
      name: 'Diego Morales',
      handle: 'diego_code',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'tech_cyber',
      verified: true
    },
    type: 'thread',
    content: 'Reflexión rápida de ingeniería para 2026: Las mejores aplicaciones ya no son las que tienen más funciones, sino las que respetan la atención del usuario. Una navegación fluida de 60fps con transiciones de compositor y estados predecibles supera a cualquier UI sobrecargada. Hilo de arquitectura abajo 🧵👇',
    tags: ['#SoftwareEngineering', '#DesignSystems', '#WebDev', '#UX'],
    timestamp: 'Hace 1 hora',
    likes: 1420,
    reposts: 318,
    commentsCount: 92,
    isLiked: true,
    isReposted: false,
    isSaved: true,
    comments: [
      {
        id: 'c3',
        userId: 'user_clara',
        userName: 'Clara Lindqvist',
        userHandle: 'clara_minimal',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        content: 'Totalmente de acuerdo. Menos ruido visual = más foco en la conexión humana.',
        timestamp: 'Hace 45 min',
        likes: 29
      }
    ]
  },
  {
    id: 'post_3',
    author: {
      id: 'user_malik',
      name: 'Malik Vance',
      handle: 'malik_drips',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'streetwear',
      verified: true
    },
    type: 'photo',
    content: 'Arquitectura brutalista y silueta oversize técnica. El contraste entre texturas de nylon impermeable y hormigón crudo define la dirección de la cápsula de otoño. ¿Qué opinan del fit?',
    mediaUrl: '/src/assets/images/feed_streetwear_urban_1794234354462.jpg',
    tags: ['#Streetwear', '#Brutalism', '#FashionTech', '#TokyoDrip'],
    timestamp: 'Hace 2 horas',
    likes: 1950,
    reposts: 240,
    commentsCount: 78,
    isLiked: false,
    isReposted: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'post_4',
    author: {
      id: 'user_marcos',
      name: 'Marcos Ruiz',
      handle: 'marcos_iron',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'fitness',
      verified: false
    },
    type: 'poll',
    content: 'Encuesta de la Tribu Iron: Para entrenamientos de resistencia aeróbica y series de velocidad matutina, ¿cuál es tu combustible primordial antes de salir?',
    tags: ['#Fitness', '#Encuesta', '#Running', '#Nutricion'],
    timestamp: 'Hace 3 horas',
    likes: 620,
    reposts: 55,
    commentsCount: 84,
    isLiked: false,
    isReposted: false,
    isSaved: false,
    poll: {
      question: '¿Qué tomas antes de tu sesión de pista a primera hora?',
      options: [
        { text: 'Café solo + electrolitos', votes: 312 },
        { text: 'Avena con proteína y plátano', votes: 198 },
        { text: 'Entreno totalmente en ayunas', votes: 245 },
        { text: 'Batido pre-entreno con carbohidratos', votes: 89 }
      ],
      totalVotes: 844,
      userVote: 0
    },
    comments: []
  },
  {
    id: 'post_5',
    author: {
      id: 'user_clara',
      name: 'Clara Lindqvist',
      handle: 'clara_minimal',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'minimalist',
      verified: true
    },
    type: 'photo',
    content: 'La mesa de trabajo para este trimestre. Luz lateral suave, cerámica artesanal y libreta de bocetos. Nada de distracciones innecesarias antes del mediodía.',
    mediaUrl: '/src/assets/images/feed_minimal_aesthetic_1794234354724.jpg',
    tags: ['#Minimalist', '#Workspace', '#Coffee', '#Design'],
    timestamp: 'Hace 4 horas',
    likes: 2410,
    reposts: 184,
    commentsCount: 63,
    isLiked: false,
    isReposted: false,
    isSaved: true,
    comments: []
  },
  {
    id: 'post_6',
    author: {
      id: 'user_sofia_runner',
      name: 'Elena Rostova',
      handle: 'elena_pace',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'fitness',
      verified: true
    },
    type: 'photo',
    content: 'Sensaciones del amanecer en pista. Cuando la niebla todavía cubre las gradas y el único sonido son tus pasos y respiración. 10x400m completados.',
    mediaUrl: '/src/assets/images/feed_fitness_athlete_1794234355691.jpg',
    tags: ['#Pista', '#Athletics', '#SunriseRun', '#TrackAndField'],
    timestamp: 'Hace 5 horas',
    likes: 3120,
    reposts: 421,
    commentsCount: 112,
    isLiked: true,
    isReposted: false,
    isSaved: false,
    comments: []
  }
];

export const INITIAL_REELS: Reel[] = [
  {
    id: 'reel_1',
    creator: {
      id: 'user_valeria',
      name: 'Valeria Chen',
      handle: 'val_cyber',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'tech_cyber',
      verified: true
    },
    caption: 'Proyectando hologramas interactivos en vivo durante el festival nocturno de Tokyo ⚡️🇯🇵',
    mediaUrl: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg',
    musicTrack: 'CyberCity 2099 · Synthwave Collective',
    likes: 18400,
    commentsCount: 654,
    shares: 1200,
    isLiked: true,
    tags: ['#Reels', '#TokyoTech', '#AR', '#Cyberpunk']
  },
  {
    id: 'reel_2',
    creator: {
      id: 'user_malik',
      name: 'Malik Vance',
      handle: 'malik_drips',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'streetwear',
      verified: true
    },
    caption: 'Cómo estilizar prendas utilitarias oversize sin perder proporciones limpias. Look breakdown.',
    mediaUrl: '/src/assets/images/feed_streetwear_urban_1794234354462.jpg',
    musicTrack: 'Metro Boomin · Trance Instrumental',
    likes: 34200,
    commentsCount: 1420,
    shares: 4890,
    isLiked: false,
    tags: ['#Streetwear', '#FashionTips', '#OOTD']
  },
  {
    id: 'reel_3',
    creator: {
      id: 'user_sofia_runner',
      name: 'Elena Rostova',
      handle: 'elena_pace',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'fitness',
      verified: true
    },
    caption: 'Rutina de movilidad articular de 7 minutos antes de series de velocidad en pista 🏃‍♀️🔥',
    mediaUrl: '/src/assets/images/feed_fitness_athlete_1794234355691.jpg',
    musicTrack: 'Peggy Gou · (It Goes Like) Nanana',
    likes: 29800,
    commentsCount: 890,
    shares: 3120,
    isLiked: false,
    tags: ['#RunningTips', '#Mobility', '#Athlete']
  }
];

export const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'chat_valeria',
    contact: {
      id: 'user_valeria',
      name: 'Valeria Chen',
      handle: 'val_cyber',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'tech_cyber',
      online: true
    },
    lastMessage: '¿Viste la demo que te envié sobre la sincronización en vivo?',
    lastMessageTime: '14:22',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'user_valeria',
        text: '¡Hola Alex! Ya subí el nuevo componente de visualización al repo de la tribu.',
        timestamp: '14:18',
        status: 'read'
      },
      {
        id: 'm2',
        senderId: 'user_current',
        text: '¡Genial! Lo estoy revisando ahora mismo en el simulador móvil.',
        timestamp: '14:20',
        status: 'read'
      },
      {
        id: 'm3',
        senderId: 'user_valeria',
        text: '¿Viste la demo que te envié sobre la sincronización en vivo?',
        timestamp: '14:22',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat_malik',
    contact: {
      id: 'user_malik',
      name: 'Malik Vance',
      handle: 'malik_drips',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'streetwear',
      online: false,
      lastSeen: 'hace 18 min'
    },
    lastMessage: '🎙️ Mensaje de voz (0:24)',
    lastMessageTime: '13:05',
    unreadCount: 0,
    messages: [
      {
        id: 'm_aud',
        senderId: 'user_malik',
        timestamp: '13:05',
        status: 'read',
        isAudio: true,
        audioDuration: '0:24',
        text: 'Te dejé las medidas del drop nuevo en el canal de discord de la tribu urbana.'
      }
    ]
  },
  {
    id: 'chat_clara',
    contact: {
      id: 'user_clara',
      name: 'Clara Lindqvist',
      handle: 'clara_minimal',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'minimalist',
      online: true
    },
    lastMessage: 'Me encanta la tipografía Plus Jakarta Sans para los titulares.',
    lastMessageTime: 'Ayer',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'user_clara',
        text: 'Me encanta la tipografía Plus Jakarta Sans para los titulares.',
        timestamp: 'Ayer 18:30',
        status: 'read'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'like',
    actor: {
      name: 'Valeria Chen',
      handle: 'val_cyber',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'tech_cyber'
    },
    targetContent: 'le dio Me Gusta a tu publicación sobre interfaces neuronales',
    timestamp: 'Hace 5 min',
    read: false
  },
  {
    id: 'notif_2',
    type: 'mention',
    actor: {
      name: 'Diego Morales',
      handle: 'diego_code',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'tech_cyber'
    },
    targetContent: 'te mencionó en un hilo: "@alex_pulse diseñó la nueva paleta"',
    timestamp: 'Hace 22 min',
    read: false
  },
  {
    id: 'notif_3',
    type: 'repost',
    actor: {
      name: 'Elena Rostova',
      handle: 'elena_pace',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'fitness'
    },
    targetContent: 'reposteó tu historia en su perfil',
    timestamp: 'Hace 1 hora',
    read: true
  },
  {
    id: 'notif_4',
    type: 'tribe',
    actor: {
      name: 'Tribu Cyberpunk',
      handle: 'tribe_cyber',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      archetypeId: 'tech_cyber'
    },
    targetContent: 'inició una nueva sala de debate en vivo: "Sistemas Descentralizados 2026"',
    timestamp: 'Hace 2 horas',
    read: true
  }
];

export const INITIAL_TRIBES: TribeCommunity[] = [
  {
    id: 'tribe_cyber',
    name: 'Cyberpunk & Synth Labs',
    archetypeId: 'tech_cyber',
    tagline: 'Desarrolladores, creativos de IA, hardware DIY y cultura retrofuturista.',
    description: 'Comunidad dedicada a explorar las fronteras entre código, diseño cyberpunk y nuevas tecnologías inmersivas.',
    bannerUrl: '/src/assets/images/feed_tech_cyberpunk_1794234353608.jpg',
    memberCount: 142800,
    isJoined: true,
    activeDiscussions: 84,
    rules: [
      'Comparte código y fuentes abiertas cuando sea posible.',
      'Respeto por todos los niveles de aprendizaje.',
      'Sin spam comercial no verificado.'
    ]
  },
  {
    id: 'tribe_street',
    name: 'Streetwear & Underground Kicks',
    archetypeId: 'streetwear',
    tagline: 'Coleccionismo, siluetas de autor, lanzamientos globales y diseño de moda.',
    description: 'Punto de encuentro para apasionados del calzado, la estética brutalista y la cultura de la calle.',
    bannerUrl: '/src/assets/images/feed_streetwear_urban_1794234354462.jpg',
    memberCount: 210500,
    isJoined: false,
    activeDiscussions: 128,
    rules: [
      'Solo autenticidad garantizada en las publicaciones.',
      'Prohibida la reventa abusiva dentro del muro general.',
      'Crítica constructiva a los fits.'
    ]
  },
  {
    id: 'tribe_minimal',
    name: 'Minimal Living & Architecture',
    archetypeId: 'minimalist',
    tagline: 'Menos pero mejor. Espacios zen, diseño industrial y calma mental.',
    description: 'Inspiración diaria para espacios monocromáticos, cafeterías de especialidad y fotografía pausada.',
    bannerUrl: '/src/assets/images/feed_minimal_aesthetic_1794234354724.jpg',
    memberCount: 98400,
    isJoined: true,
    activeDiscussions: 42,
    rules: [
      'Fotografía propia o con créditos obligatorios.',
      'Estética limpia: sin filtros excesivos.',
      'Fomentar el orden y la sostenibilidad.'
    ]
  },
  {
    id: 'tribe_fitness',
    name: 'Iron Forge & Hybrid Performance',
    archetypeId: 'fitness',
    tagline: 'Fuerza, atletismo híbrido, calistenia y disciplina inquebrantable.',
    description: 'Comparte tus marcas personales, rutinas de fuerza, entrenamientos de fondo y motivación diaria.',
    bannerUrl: '/src/assets/images/feed_fitness_athlete_1794234355691.jpg',
    memberCount: 320900,
    isJoined: false,
    activeDiscussions: 215,
    rules: [
      'Cero ego-lifting: priorizar la técnica biomecánica.',
      'Apoyar el progreso de cada atleta.',
      'Ciencia y evidencia en recomendaciones nutricionales.'
    ]
  }
];

export const TRENDING_TOPICS = [
  { tag: '#TokyoTech2026', category: 'Tecnología', postsCount: '48.2K', archetype: 'tech_cyber' },
  { tag: '#OversizeAutumn', category: 'Moda & Tribus', postsCount: '32.1K', archetype: 'streetwear' },
  { tag: '#MorningRoutineMinimal', category: 'Estilo de Vida', postsCount: '24.9K', archetype: 'minimalist' },
  { tag: '#MarathonTraining', category: 'Fitness', postsCount: '19.4K', archetype: 'fitness' },
  { tag: '#SynthwaveVibes', category: 'Música & LoFi', postsCount: '15.7K', archetype: 'lofi_gamer' }
];
