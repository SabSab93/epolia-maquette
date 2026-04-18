export const marketplaceFilters = [
  'Tout',
  'Web',
  'Design',
  'Cours',
  'Coiffure',
  'Cuisine',
  'Photo & Vidéo',
  'Rédaction',
  'Traduction',
  'Soutien scolaire',
  'Assistant virtuel',
  'Réseaux sociaux',
  'Montage vidéo',
  'Dépannage',
  'Événementiel'
]

export const etudeFormationsCatalog = [
  {
    id: 'cap',
    label: 'CAP',
    examples: ['CAP Coiffure', 'CAP Cuisine', 'CAP Esthétique']
  },
  {
    id: 'bep',
    label: 'BEP',
    examples: ['BEP Métiers de la relation clients', 'BEP Accompagnement']
  },
  {
    id: 'bac',
    label: 'Bac',
    examples: ['Bac Général', 'Bac Pro', 'Bac Technologique']
  },
  {
    id: 'bts',
    label: 'BTS',
    examples: ['BTS MCO', 'BTS NDRC', 'BTS Communication', 'BTS SIO']
  },
  {
    id: 'licence',
    label: 'Licence',
    examples: ['Licence Informatique', 'Licence LEA', 'Licence Design']
  },
  {
    id: 'master',
    label: 'Master',
    examples: ['Master Marketing Digital', 'Master Data', 'Master UX/UI']
  },
  {
    id: 'doctorat',
    label: 'Doctorat',
    examples: ['Doctorat Informatique', 'Doctorat Sciences de gestion']
  }
]

export const marketplaceProfiles = [
  {
    id: 1,
    name: 'Lucas Martin',
    rating: 4.9,
    skill: 'Développeur app mobile',
    location: 'Grenoble',
    distance: 2.1,
    price: 26,
    category: 'Web',
    skills: ['App React Native', 'UI mobile', 'MVP'],
    studentDescription:
      "J'aime transformer des idées du quotidien en applications utiles et faciles à utiliser. J'avance étape par étape, avec des retours réguliers pour livrer un résultat concret et fiable.",
    quality: 'Réactif',
    availability: 'Disponible',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80',
    isFavorite: false,
    portfolioImages: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
    ],
    portfolioProjects: [
      {
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
        title: 'Application de réservation locale',
        description: 'Prototype mobile pour aider un particulier à gérer ses rendez-vous hebdomadaires.',
        date: '12 février 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
        title: 'Refonte interface service à domicile',
        description: 'UI mobile simplifiée avec parcours de demande de mission plus fluide.',
        date: '28 janvier 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
        title: 'MVP suivi de tâches',
        description: 'Mini application React Native pour le suivi de tâches quotidiennes.',
        date: '9 décembre 2025'
      }
    ],
    clientReviews: [
      {
        reviewerName: 'Sabrina D.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
        rating: 5,
        comment: 'Très bonne communication, Lucas a livré une app claire et simple à utiliser.',
        date: '15 mars 2026'
      },
      {
        reviewerName: 'Nadia L.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        rating: 4.8,
        comment: 'Super accompagnement du début à la fin, le résultat correspond exactement à mon besoin.',
        date: '2 mars 2026'
      }
    ],
    lat: 45.1912,
    lng: 5.7165
  },
  {
    id: 2,
    name: 'Chloé Renaud',
    rating: 4.9,
    skill: 'Créatrice faire-part',
    location: 'Grenoble',
    distance: 1.6,
    price: 22,
    category: 'Design',
    skills: ['Carte mariage', 'Invitation', 'Illustration'],
    studentDescription:
      "J'aime créer des univers visuels élégants pour les événements de vie. Je travaille chaque détail avec soin pour que le rendu final ressemble vraiment à votre histoire.",
    quality: 'Top qualité',
    availability: 'Disponible',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    isFavorite: true,
    portfolioImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    portfolioProjects: [
      {
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
        title: 'Faire-part mariage floral',
        description: 'Création d’une identité visuelle complète pour un mariage civil et laïque.',
        date: '3 mars 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
        title: 'Invitations anniversaire',
        description: 'Série de cartes personnalisées avec déclinaisons print et version numérique.',
        date: '17 février 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        title: 'Papeterie événement',
        description: 'Design de menu, plan de table et cartons de remerciement assortis.',
        date: '22 novembre 2025'
      }
    ],
    clientReviews: [
      {
        reviewerName: 'Camille R.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        rating: 5,
        comment: 'Les faire-part étaient magnifiques, très élégants et livrés dans les temps.',
        date: '11 mars 2026'
      },
      {
        reviewerName: 'Amina K.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
        rating: 4.9,
        comment: 'Excellente créativité, Chloé a parfaitement compris notre thème.',
        date: '26 février 2026'
      }
    ],
    lat: 45.186,
    lng: 5.7318
  },
  {
    id: 3,
    name: 'Léa Johnson',
    rating: 4.8,
    skill: "Cours d'anglais",
    location: 'Grenoble',
    distance: 3.2,
    price: 21,
    category: 'Cours',
    skills: ['Conversation', 'Aide devoirs', 'Prépa oral'],
    studentDescription:
      "J'aime rendre l'anglais plus naturel et moins stressant au quotidien. Mes cours sont simples, pratiques et adaptés à votre niveau pour progresser vite à l'oral.",
    quality: 'Pédagogue',
    availability: 'Ce week-end',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
    isFavorite: true,
    portfolioImages: [
      'https://images.unsplash.com/photo-1456324463128-7ff6903988d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80'
    ],
    portfolioProjects: [
      {
        image: 'https://images.unsplash.com/photo-1456324463128-7ff6903988d8?auto=format&fit=crop&w=1200&q=80',
        title: 'Programme conversation anglais',
        description: 'Séances orientées situations réelles pour améliorer la fluidité orale.',
        date: '5 mars 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        title: 'Aide devoirs collège',
        description: 'Accompagnement hebdomadaire pour un élève en difficulté en anglais.',
        date: '14 janvier 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        title: 'Préparation oral de stage',
        description: 'Coaching anglais professionnel sur vocabulaire et prononciation.',
        date: '30 octobre 2025'
      }
    ],
    clientReviews: [
      {
        reviewerName: 'Mehdi T.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        rating: 4.9,
        comment: 'Cours très utiles, je me sens beaucoup plus à l’aise à l’oral.',
        date: '9 mars 2026'
      },
      {
        reviewerName: 'Julie M.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        rating: 4.7,
        comment: 'Pédagogue et patiente, Léa a aidé ma fille à progresser rapidement.',
        date: '20 février 2026'
      }
    ],
    lat: 45.1738,
    lng: 5.7491
  },
  {
    id: 4,
    name: 'Yassine Morel',
    rating: 4.7,
    skill: 'Cours maths & sciences',
    location: "Saint-Martin-d'Hères",
    distance: 4.4,
    price: 23,
    category: 'Cours',
    skills: ['Maths collège/lycée', 'Physique', 'Méthodologie'],
    studentDescription:
      "J'aime expliquer les notions difficiles de façon claire et progressive. Mon objectif est de redonner confiance avec une méthode structurée et des exercices ciblés.",
    quality: 'Scientifique',
    availability: 'Soirée',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    isFavorite: false,
    portfolioImages: [
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80'
    ],
    portfolioProjects: [
      {
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
        title: 'Remise à niveau mathématiques',
        description: 'Plan de progression sur 8 semaines pour consolider les bases lycée.',
        date: '7 mars 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80',
        title: 'Atelier sciences brevet',
        description: 'Série de séances de révision avec exercices types examen.',
        date: '18 décembre 2025'
      },
      {
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
        title: 'Méthodologie fiches de cours',
        description: 'Création de fiches synthèse pour mémoriser rapidement les formules.',
        date: '2 novembre 2025'
      }
    ],
    clientReviews: [
      {
        reviewerName: 'Thomas B.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        rating: 4.8,
        comment: 'Méthode claire et efficace, mon fils a repris confiance en maths.',
        date: '13 mars 2026'
      },
      {
        reviewerName: 'Claire P.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        rating: 4.6,
        comment: 'Très sérieux, les explications sont simples et bien structurées.',
        date: '1 mars 2026'
      }
    ],
    lat: 45.1688,
    lng: 5.7688
  },
  {
    id: 5,
    name: 'Inès Boudet',
    rating: 4.8,
    skill: 'Coiffure à domicile (CAP)',
    location: 'Échirolles',
    distance: 5.5,
    price: 25,
    category: 'Coiffure',
    skills: ['Brushing', 'Tresses', 'Coupe femme'],
    studentDescription:
      "J'aime proposer des coiffures soignées à domicile, dans une ambiance simple et agréable. Je prends le temps d'écouter vos envies avant chaque prestation.",
    quality: 'Soignée',
    availability: 'Disponible',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    isFavorite: true,
    portfolioImages: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80'
    ],
    portfolioProjects: [
      {
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        title: 'Coupe & brushing événement',
        description: 'Prestation à domicile pour une cérémonie avec finition naturelle.',
        date: '10 mars 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=1200&q=80',
        title: 'Tresses protectrices',
        description: 'Réalisation de tresses sur cheveux longs avec conseils entretien.',
        date: '25 février 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
        title: 'Relooking coupe mi-longue',
        description: 'Diagnostic visagisme et coupe adaptée au style quotidien.',
        date: '8 janvier 2026'
      }
    ],
    clientReviews: [
      {
        reviewerName: 'Elodie V.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
        rating: 4.9,
        comment: 'Coupe très réussie, prestation pro et ambiance agréable à domicile.',
        date: '8 mars 2026'
      },
      {
        reviewerName: 'Sara N.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=300&q=80',
        rating: 4.8,
        comment: 'Inès est ponctuelle et attentive, je recommande sans hésiter.',
        date: '24 février 2026'
      }
    ],
    lat: 45.1443,
    lng: 5.7197
  },
  {
    id: 6,
    name: 'Hugo Perrin',
    rating: 4.9,
    skill: 'Cuisine à domicile (CAP)',
    location: 'Grenoble',
    distance: 2.8,
    price: 29,
    category: 'Cuisine',
    skills: ['Batch cooking', 'Menu famille', 'Dressage'],
    studentDescription:
      "J'aime cuisiner des repas maison généreux et équilibrés pour faciliter votre semaine. Je m'adapte à vos goûts et à vos contraintes pour une prestation utile au quotidien.",
    quality: 'Organisé',
    availability: 'Midi & soir',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=500&q=80',
    isFavorite: false,
    portfolioImages: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=80'
    ],
    portfolioProjects: [
      {
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
        title: 'Menu famille semaine',
        description: 'Préparation de repas équilibrés pour 5 jours, adaptés aux enfants.',
        date: '1 mars 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
        title: 'Brunch maison complet',
        description: 'Organisation d’un brunch convivial avec options végétariennes.',
        date: '16 février 2026'
      },
      {
        image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=80',
        title: 'Atelier batch cooking',
        description: 'Session de cuisine à domicile pour optimiser les repas de la semaine.',
        date: '21 novembre 2025'
      }
    ],
    clientReviews: [
      {
        reviewerName: 'Karim A.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        rating: 5,
        comment: 'Repas excellents et très bien organisés, toute la famille a adoré.',
        date: '12 mars 2026'
      },
      {
        reviewerName: 'Valérie C.',
        reviewerPhoto: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=300&q=80',
        rating: 4.9,
        comment: 'Cuisine maison de qualité, service fiable et très pro.',
        date: '27 février 2026'
      }
    ],
    lat: 45.1805,
    lng: 5.7012
  }
]

export const studentProfiles = [
  {
    id: 'lea-m',
    firstName: 'Léa',
    title: 'Aide aux devoirs & organisation',
    description:
      "J'accompagne les familles avec une approche bienveillante et structurée. J'aide les élèves à progresser avec méthode tout en gardant confiance.",
    city: 'Grenoble',
    distanceKm: 2.4,
    pricePerHour: 18,
    rating: 4.9,
    reviews: 22,
    verified: true,
    formation: 'Master communication digitale',
    availability: ['Mercredi 18h-20h', 'Samedi matin'],
    skills: ['Aide aux devoirs', 'Canva', 'Organisation'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'yanis-b',
    firstName: 'Yanis',
    title: 'Montage vidéo & mini shooting',
    description:
      'Je réalise des contenus visuels modernes pour particuliers et petits projets locaux. Je travaille vite et j’ajuste chaque rendu selon vos retours.',
    city: 'Échirolles',
    distanceKm: 6.1,
    pricePerHour: 24,
    rating: 4.8,
    reviews: 16,
    verified: true,
    formation: 'BUT MMI',
    availability: ['Vendredi soir', 'Dimanche après-midi'],
    skills: ['Montage vidéo', 'Photo', 'Réseaux sociaux'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ines-r',
    firstName: 'Inès',
    title: 'Soutien bureautique & administratif',
    description:
      "Je simplifie vos tâches administratives du quotidien avec rigueur et clarté. J'interviens avec patience pour remettre de l'ordre dans vos documents.",
    city: 'Saint-Martin-d\'Hères',
    distanceKm: 4.3,
    pricePerHour: 16,
    rating: 4.7,
    reviews: 31,
    verified: false,
    formation: 'Licence AES',
    availability: ['Lundi 17h-19h', 'Jeudi 18h-21h'],
    skills: ['Excel', 'Word', 'Classement'],
    photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80'
  }
]

export const messages = [
  {
    id: 'm-1',
    from: 'Lucas T.',
    preview: 'Bonjour, je suis dispo samedi pour vous aider.',
    time: '11:45',
    unread: true
  },
  {
    id: 'm-2',
    from: 'Léa M.',
    preview: 'Merci pour votre retour 🌷',
    time: '09:20',
    unread: false
  }
]

export const authCopy = {
  welcomeTitle: 'Connexion à Epolia',
  welcomeSubtitle:
    'Trouvez rapidement un étudiant de confiance près de chez vous, puis échangez et réservez en toute sécurité.',
  registerTitle: 'Créer votre compte particulier',
  registerSubtitle: '3 champs pour commencer, le reste viendra plus tard.'
}
