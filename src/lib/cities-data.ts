export interface City {
  slug: string;
  name: string;
  region: string;
  memberCount: number;
  description: string;
  metaTitle: string;
  metaDescription: string;
  coverImage: string;
  neighborhoods: {
    name: string;
    description: string;
  }[];
  testimonials: {
    name: string;
    age: number;
    district: string;
    quote: string;
  }[];
}

export const cities: City[] = [
  {
    slug: 'paris',
    name: 'Paris',
    region: 'Île-de-France',
    memberCount: 1250,
    description: 'Paris, la ville de l\'amour par excellence, est l\'endroit idéal pour créer des rencontres authentiques. Avec ses cafés romantiques, ses parcs enchanteurs et ses quartiers historiques, chaque rendez-vous devient une expérience unique.',
    metaTitle: 'Rencontres à Paris | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires parisiens avec L\'Amour Inconnu. Des rendez-vous réels organisés dans les plus beaux quartiers de Paris. Rejoins 1250+ membres.',
    coverImage: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Le Marais',
        description: 'Cafés intimistes, boutiques vintage et ruelles pavées romantiques. L\'ambiance parfaite pour un premier rendez-vous décontracté.'
      },
      {
        name: 'Montmartre',
        description: 'Vue panoramique sur Paris, artistes de rue et ambiance village. Idéal pour une balade suivie d\'un verre en terrasse.'
      },
      {
        name: 'Canal Saint-Martin',
        description: 'Terrasses au bord de l\'eau, atmosphere bohème et jeune. Parfait pour un café ou un apéro au coucher du soleil.'
      },
      {
        name: 'Quartier Latin',
        description: 'Librairies historiques, cinémas d\'art et essai et restaurants internationaux. Pour les rencontres intellectuelles et culturelles.'
      },
      {
        name: 'Saint-Germain-des-Prés',
        description: 'Cafés légendaires, galeries d\'art et élégance parisienne. Une ambiance sophistiquée pour un rendez-vous mémorable.'
      }
    ],
    testimonials: [
      {
        name: 'Sophie',
        age: 28,
        district: 'Paris 11e',
        quote: 'J\'ai rencontré mon copain lors d\'un rendez-vous organisé dans un café du Canal Saint-Martin. On se promène maintenant tous les dimanches le long du canal !'
      },
      {
        name: 'Alexandre',
        age: 32,
        district: 'Paris 18e',
        quote: 'Après 2 ans sur Tinder sans succès, L\'Amour Inconnu m\'a permis de rencontrer quelqu\'un qui partage vraiment mes valeurs. Notre premier rendez-vous à Montmartre était magique.'
      },
      {
        name: 'Camille',
        age: 26,
        district: 'Paris 3e',
        quote: 'Ce que j\'adore, c\'est que les lieux sont choisis en fonction de nos préférences. Mon rendez-vous dans le Marais était exactement ce que j\'espérais : authentique et convivial.'
      }
    ]
  },
  {
    slug: 'lyon',
    name: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    memberCount: 680,
    description: 'Lyon, capitale de la gastronomie française, offre un cadre exceptionnel pour des rencontres authentiques. Entre les bouchons lyonnais, les berges du Rhône et les traboules du Vieux-Lyon, chaque rendez-vous est une découverte.',
    metaTitle: 'Rencontres à Lyon | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires lyonnais avec L\'Amour Inconnu. Des rendez-vous organisés dans les meilleurs quartiers de Lyon. 680+ membres actifs.',
    coverImage: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Vieux-Lyon',
        description: 'Traboules mystérieuses, architecture Renaissance et restaurants traditionnels. Une atmosphère historique et romantique.'
      },
      {
        name: 'Presqu\'île',
        description: 'Cœur vibrant de Lyon avec ses places animées, boutiques et cafés. L\'endroit idéal pour un rendez-vous dynamique.'
      },
      {
        name: 'Croix-Rousse',
        description: 'Village dans la ville, terrasses ensoleillées et marché coloré. Parfait pour les âmes bohèmes et créatives.'
      },
      {
        name: 'Confluence',
        description: 'Quartier moderne au bord des fleuves, musées et espaces verts. Pour un rendez-vous contemporain et original.'
      },
      {
        name: 'Berges du Rhône',
        description: 'Promenade le long du fleuve, guinguettes et péniches. Idéal pour une balade romantique ou un verre en bord de l\'eau.'
      }
    ],
    testimonials: [
      {
        name: 'Emma',
        age: 29,
        district: 'Lyon 1er',
        quote: 'Notre premier rendez-vous dans un bouchon lyonnais était parfait. On a découvert qu\'on adorait tous les deux la gastronomie locale !'
      },
      {
        name: 'Thomas',
        age: 31,
        district: 'Lyon 4e',
        quote: 'L\'Amour Inconnu m\'a permis de sortir de ma zone de confort. Le rendez-vous organisé à la Croix-Rousse m\'a fait découvrir un nouveau quartier et une personne formidable.'
      },
      {
        name: 'Léa',
        age: 27,
        district: 'Lyon 2e',
        quote: 'Fini les conversations sans fin qui ne mènent nulle part. Avec L\'Amour Inconnu, on se voit directement et c\'est tellement mieux !'
      }
    ]
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    memberCount: 590,
    description: 'Marseille, ville méditerranéenne ensoleillée, est parfaite pour des rencontres au grand air. Entre le Vieux-Port, les calanques et les terrasses face à la mer, l\'amour a toutes les chances de s\'épanouir.',
    metaTitle: 'Rencontres à Marseille | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires marseillais avec L\'Amour Inconnu. Des rendez-vous en bord de mer et dans les quartiers authentiques. 590+ membres.',
    coverImage: 'https://images.pexels.com/photos/2412609/pexels-photo-2412609.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Vieux-Port',
        description: 'Cœur historique de Marseille, terrasses animées et vue sur les bateaux. L\'ambiance marseillaise authentique.'
      },
      {
        name: 'Le Panier',
        description: 'Ruelles colorées, street art et petites places ombragées. Le quartier le plus charmant pour un rendez-vous romantique.'
      },
      {
        name: 'Prado-Plages',
        description: 'Bord de mer, plages urbaines et restaurants avec vue. Parfait pour un rendez-vous les pieds dans l\'eau.'
      },
      {
        name: 'Cours Julien',
        description: 'Quartier artistique, bars alternatifs et ambiance bohème. Pour les rencontres décalées et créatives.'
      },
      {
        name: 'Malmousque',
        description: 'Petit port de pêche, criques secrètes et calme absolu. Un écrin de tranquillité pour se découvrir.'
      }
    ],
    testimonials: [
      {
        name: 'Julie',
        age: 30,
        district: 'Marseille 7e',
        quote: 'Mon rendez-vous au bord de la mer était magique. On a marché le long de la corniche et on ne s\'est pas quittés depuis !'
      },
      {
        name: 'Lucas',
        age: 28,
        district: 'Marseille 1er',
        quote: 'L\'Amour Inconnu comprend vraiment Marseille. Notre rendez-vous au Panier était dépaysant et romantique à la fois.'
      },
      {
        name: 'Inès',
        age: 26,
        district: 'Marseille 8e',
        quote: 'Enfin une appli qui privilégie les vraies rencontres ! Notre premier rendez-vous sur le Vieux-Port était exactement ce que je cherchais.'
      }
    ]
  },
  {
    slug: 'lille',
    name: 'Lille',
    region: 'Hauts-de-France',
    memberCount: 520,
    description: 'Lille, ville chaleureuse du Nord, combine patrimoine flamand et dynamisme moderne. Ses brasseries accueillantes, son Vieux-Lille pittoresque et son ambiance conviviale en font un terrain idéal pour des rencontres sincères.',
    metaTitle: 'Rencontres à Lille | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires lillois avec L\'Amour Inconnu. Des rendez-vous dans les estaminets et quartiers typiques de Lille. 520+ membres.',
    coverImage: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Vieux-Lille',
        description: 'Pavés flamands, facades colorées et boutiques de charme. L\'âme historique de la ville pour un rendez-vous authentique.'
      },
      {
        name: 'Wazemmes',
        description: 'Marché animé, bars multiculturels et ambiance populaire. Un quartier vivant et chaleureux.'
      },
      {
        name: 'Euralille',
        description: 'Quartier moderne, centres culturels et restaurants contemporains. Pour un rendez-vous dans la Lille d\'aujourd\'hui.'
      },
      {
        name: 'République Beaux-Arts',
        description: 'Musées, cafés étudiants et librairies. Le quartier intellectuel et culturel de Lille.'
      },
      {
        name: 'Citadelle',
        description: 'Parc Vauban, jogging et pique-niques au vert. Idéal pour un rendez-vous sportif ou décontracté en plein air.'
      }
    ],
    testimonials: [
      {
        name: 'Marie',
        age: 27,
        district: 'Lille Centre',
        quote: 'La convivialité du Nord, ça existe vraiment ! Mon rendez-vous dans le Vieux-Lille était chaleureux et sans prise de tête.'
      },
      {
        name: 'Antoine',
        age: 33,
        district: 'Lille Vauban',
        quote: 'Après plusieurs déceptions sur les apps classiques, L\'Amour Inconnu m\'a redonné confiance. Le concept des rendez-vous organisés change tout.'
      },
      {
        name: 'Clara',
        age: 25,
        district: 'Lille Wazemmes',
        quote: 'J\'adore le fait que les lieux soient choisis pour nous. Notre rendez-vous près du marché de Wazemmes était vivant et spontané !'
      }
    ]
  },
  {
    slug: 'toulouse',
    name: 'Toulouse',
    region: 'Occitanie',
    memberCount: 610,
    description: 'Toulouse, la ville rose, brille par sa douceur de vivre et son dynamisme étudiant. Entre les bords de Garonne, les places animées et les briques roses qui rougissent au soleil, c\'est une ville faite pour tomber amoureux.',
    metaTitle: 'Rencontres à Toulouse | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires toulousains avec L\'Amour Inconnu. Des rendez-vous dans la ville rose. 610+ membres actifs.',
    coverImage: 'https://images.pexels.com/photos/1534815/pexels-photo-1534815.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Capitole - Esquirol',
        description: 'Cœur historique avec la place du Capitole, terrasses animées et restaurants. L\'épicentre de la vie toulousaine.'
      },
      {
        name: 'Saint-Cyprien',
        description: 'Quartier branché rive gauche, brocantes et bars alternatifs. L\'ambiance bohème de Toulouse.'
      },
      {
        name: 'Carmes - Daurade',
        description: 'Quais de Garonne, marché bio et ambiance familiale. Parfait pour un rendez-vous au bord de l\'eau.'
      },
      {
        name: 'Saint-Étienne',
        description: 'Quartier étudiant, librairies indépendantes et cafés littéraires. Pour les rencontres intellectuelles.'
      },
      {
        name: 'Compans-Caffarelli',
        description: 'Jardin japonais, Canal du Midi et espaces verts. Un havre de paix pour se découvrir tranquillement.'
      }
    ],
    testimonials: [
      {
        name: 'Pauline',
        age: 26,
        district: 'Toulouse Centre',
        quote: 'Notre balade le long de la Garonne était magnifique. L\'Amour Inconnu a vraiment compris l\'essence de Toulouse !'
      },
      {
        name: 'Hugo',
        age: 29,
        district: 'Toulouse Saint-Cyprien',
        quote: 'Le système de rendez-vous organisés est génial. Plus besoin de négocier pendant des jours pour trouver un lieu et une heure !'
      },
      {
        name: 'Sarah',
        age: 31,
        district: 'Toulouse Carmes',
        quote: 'Sceptique au début, j\'ai été agréablement surprise. Mon rendez-vous au marché des Carmes était authentique et détendu.'
      }
    ]
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    memberCount: 550,
    description: 'Bordeaux, perle de l\'Aquitaine, séduit par son élégance et son art de vivre. Entre les quais rénovés, les places du XVIIIe siècle et les bars à vin, c\'est une ville où chaque rencontre peut devenir un moment d\'exception.',
    metaTitle: 'Rencontres à Bordeaux | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires bordelais avec L\'Amour Inconnu. Des rendez-vous dans les plus beaux quartiers de Bordeaux. 550+ membres.',
    coverImage: 'https://images.pexels.com/photos/2239403/pexels-photo-2239403.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Saint-Pierre',
        description: 'Vieux Bordeaux, ruelles médiévales et caves à vin. Le charme historique pour un rendez-vous raffiné.'
      },
      {
        name: 'Chartrons',
        description: 'Quartier des antiquaires, boutiques vintage et brunchs gourmands. L\'élégance bordelaise par excellence.'
      },
      {
        name: 'Quais de Garonne',
        description: 'Miroir d\'eau, promenade riveraine et terrasses face au fleuve. Un cadre romantique emblématique.'
      },
      {
        name: 'Saint-Michel',
        description: 'Marché multiculturel, bars éclectiques et ambiance populaire. Le Bordeaux authentique et vivant.'
      },
      {
        name: 'Victoire',
        description: 'Quartier étudiant, cafés animés et cinémas d\'art et essai. L\'énergie jeune de Bordeaux.'
      }
    ],
    testimonials: [
      {
        name: 'Charlotte',
        age: 28,
        district: 'Bordeaux Centre',
        quote: 'Le cadre des quais au coucher du soleil pour notre premier rendez-vous était juste parfait. Une rencontre dont je me souviendrai longtemps !'
      },
      {
        name: 'Julien',
        age: 30,
        district: 'Bordeaux Chartrons',
        quote: 'L\'Amour Inconnu m\'a fait rencontrer quelqu\'un qui partage ma passion pour le vin. Notre rendez-vous dans les Chartrons était idéal.'
      },
      {
        name: 'Anaïs',
        age: 27,
        district: 'Bordeaux Victoire',
        quote: 'Enfin une alternative au swipe ! Les rendez-vous sont bien pensés et les profils vraiment compatibles.'
      }
    ]
  },
  {
    slug: 'nantes',
    name: 'Nantes',
    region: 'Pays de la Loire',
    memberCount: 480,
    description: 'Nantes, ville d\'art et d\'innovation, propose un cadre unique pour des rencontres créatives. Entre les Machines de l\'île, les bords de Loire et l\'effervescence culturelle, c\'est une ville qui inspire les belles histoires.',
    metaTitle: 'Rencontres à Nantes | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires nantais avec L\'Amour Inconnu. Des rendez-vous dans les quartiers culturels de Nantes. 480+ membres.',
    coverImage: 'https://images.pexels.com/photos/1470408/pexels-photo-1470408.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Bouffay',
        description: 'Centre historique, ruelles pavées et terrasses animées. Le cœur battant de Nantes.'
      },
      {
        name: 'Île de Nantes',
        description: 'Machines de l\'île, lieux culturels et architecture contemporaine. Pour un rendez-vous original et créatif.'
      },
      {
        name: 'Talensac',
        description: 'Marché couvert, brasseries traditionnelles et ambiance conviviale. L\'âme commerçante de Nantes.'
      },
      {
        name: 'Graslin',
        description: 'Quartier élégant, théâtre et boutiques chics. La sophistication nantaise.'
      },
      {
        name: 'Trentemoult',
        description: 'Village de pêcheurs coloré au bord de Loire, guinguettes et tranquillité. Un écrin romantique à deux pas du centre.'
      }
    ],
    testimonials: [
      {
        name: 'Manon',
        age: 25,
        district: 'Nantes Centre',
        quote: 'Notre rendez-vous aux Machines de l\'île était ludique et différent. On a vraiment pu être nous-mêmes !'
      },
      {
        name: 'Maxime',
        age: 32,
        district: 'Nantes Île',
        quote: 'Après des mois de conversations fantômes sur les apps, L\'Amour Inconnu m\'a permis de vraiment rencontrer quelqu\'un. Et ça a matché !'
      },
      {
        name: 'Élodie',
        age: 29,
        district: 'Nantes Bouffay',
        quote: 'Le concept est brillant : des profils compatibles, des lieux bien choisis, et surtout des vraies rencontres. Je recommande à 100% !'
      }
    ]
  },
  {
    slug: 'nice',
    name: 'Nice',
    region: 'Provence-Alpes-Côte d\'Azur',
    memberCount: 460,
    description: 'Nice, perle de la Côte d\'Azur, offre un cadre exceptionnel avec son climat méditerranéen et sa douceur de vivre. Entre la Promenade des Anglais, le Vieux-Nice et les collines, l\'amour a le décor qu\'il mérite.',
    metaTitle: 'Rencontres à Nice | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires niçois avec L\'Amour Inconnu. Des rendez-vous au soleil sur la Côte d\'Azur. 460+ membres actifs.',
    coverImage: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Vieux-Nice',
        description: 'Ruelles étroites, facades ocres et marchés provençaux. L\'authenticité niçoise dans toute sa splendeur.'
      },
      {
        name: 'Promenade des Anglais',
        description: 'Bord de mer emblématique, plages et couchers de soleil sur la Baie des Anges. Le spot romantique par excellence.'
      },
      {
        name: 'Libération',
        description: 'Quartier animé, marché quotidien et bars branchés. L\'énergie jeune de Nice.'
      },
      {
        name: 'Cimiez',
        description: 'Colline bourgeoise, jardins du monastère et vue panoramique. Un havre de paix pour se découvrir.'
      },
      {
        name: 'Port Lympia',
        description: 'Port coloré, restaurants de poissons et ambiance maritime. Pour un rendez-vous les pieds dans l\'eau.'
      }
    ],
    testimonials: [
      {
        name: 'Laura',
        age: 27,
        district: 'Nice Centre',
        quote: 'Notre balade sur la Prom\' au coucher du soleil était magique. L\'Amour Inconnu sait créer des moments parfaits !'
      },
      {
        name: 'Nicolas',
        age: 30,
        district: 'Nice Libération',
        quote: 'Le soleil, la mer et une vraie rencontre. L\'Amour Inconnu a compris ce qui compte vraiment.'
      },
      {
        name: 'Chloé',
        age: 26,
        district: 'Nice Vieux-Nice',
        quote: 'Fini le swipe sans fin ! Ici, on se rencontre vraiment et c\'est tellement plus authentique.'
      }
    ]
  },
  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    region: 'Grand Est',
    memberCount: 420,
    description: 'Strasbourg, capitale européenne au charme alsacien, marie patrimoine historique et modernité. Entre la Petite France, les winstubs et les bords de l\'Ill, c\'est une ville romantique qui favorise les belles rencontres.',
    metaTitle: 'Rencontres à Strasbourg | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires strasbourgeois avec L\'Amour Inconnu. Des rendez-vous dans les quartiers typiques alsaciens. 420+ membres.',
    coverImage: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Petite France',
        description: 'Maisons à colombages, canaux romantiques et ponts couverts. Le quartier le plus pittoresque pour un rendez-vous féerique.'
      },
      {
        name: 'Grande Île',
        description: 'Centre historique, cathédrale majestueuse et places animées. Le cœur vibrant de Strasbourg.'
      },
      {
        name: 'Krutenau',
        description: 'Quartier étudiant, bars alternatifs et ambiance conviviale. L\'énergie jeune de Strasbourg.'
      },
      {
        name: 'Neudorf',
        description: 'Quartier multiculturel, restaurants du monde et esprit village. La diversité strasbourgeoise.'
      },
      {
        name: 'Parc de l\'Orangerie',
        description: 'Parc historique, lac et jardins. Pour un rendez-vous bucolique au cœur de la ville.'
      }
    ],
    testimonials: [
      {
        name: 'Amélie',
        age: 28,
        district: 'Strasbourg Centre',
        quote: 'Notre rendez-vous dans la Petite France était digne d\'un conte de fées. Les lieux choisis par L\'Amour Inconnu sont toujours parfaits !'
      },
      {
        name: 'Pierre',
        age: 31,
        district: 'Strasbourg Krutenau',
        quote: 'Le concept m\'a séduit immédiatement : pas de temps perdu, des profils compatibles et des vrais rendez-vous. Résultat : je suis en couple !'
      },
      {
        name: 'Margaux',
        age: 26,
        district: 'Strasbourg Neudorf',
        quote: 'L\'authenticité des rencontres change tout. Plus de photos trompeuses, juste des vraies personnes qui cherchent la même chose que toi.'
      }
    ]
  },
  {
    slug: 'montpellier',
    name: 'Montpellier',
    region: 'Occitanie',
    memberCount: 510,
    description: 'Montpellier, ville méditerranéenne ensoleillée et dynamique, séduit par sa jeunesse et son art de vivre. Entre l\'Écusson historique, les plages à proximité et l\'effervescence étudiante, c\'est un terrain parfait pour des rencontres spontanées.',
    metaTitle: 'Rencontres à Montpellier | L\'Amour Inconnu - Rendez-vous réels',
    metaDescription: 'Rencontre des célibataires montpelliérains avec L\'Amour Inconnu. Des rendez-vous au soleil dans le Sud. 510+ membres actifs.',
    coverImage: 'https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=1920',
    neighborhoods: [
      {
        name: 'Écusson',
        description: 'Centre historique piéton, ruelles médiévales et terrasses animées. Le cœur de Montpellier où tout se passe.'
      },
      {
        name: 'Antigone',
        description: 'Architecture néo-classique, esplanade et ambiance contemporaine. La modernité montpelliéraine.'
      },
      {
        name: 'Beaux-Arts',
        description: 'Quartier bohème, friperies et bars étudiants. L\'esprit jeune et alternatif.'
      },
      {
        name: 'Port Marianne',
        description: 'Quartier moderne au bord du Lez, restaurants et espaces verts. Pour un rendez-vous urbain et verdoyant.'
      },
      {
        name: 'Plan Cabanes',
        description: 'Bord de mer à 10 minutes, guinguettes et sports nautiques. Le rendez-vous plage parfait.'
      }
    ],
    testimonials: [
      {
        name: 'Lisa',
        age: 24,
        district: 'Montpellier Centre',
        quote: 'Le soleil, les terrasses et une vraie connexion. Notre rendez-vous sur la place de la Comédie était exactement ce que j\'attendais !'
      },
      {
        name: 'Théo',
        age: 27,
        district: 'Montpellier Beaux-Arts',
        quote: 'Plus besoin de passer des heures à chatter. Avec L\'Amour Inconnu, on se voit directement et c\'est tellement mieux !'
      },
      {
        name: 'Océane',
        age: 29,
        district: 'Montpellier Antigone',
        quote: 'J\'adore le concept des rendez-vous organisés. Pas de prise de tête, juste l\'excitation de découvrir quelqu\'un de nouveau.'
      }
    ]
  }
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug);
}

export function getAllCities(): City[] {
  return cities.sort((a, b) => b.memberCount - a.memberCount);
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter(city => city.region === region);
}
