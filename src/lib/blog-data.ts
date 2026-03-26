export interface BlogArticle {
  slug: string;
  title: string;
  category: 'Conseils' | 'Témoignages' | 'Actualités';
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  author: string;
  content: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'pourquoi-le-swipe-ne-marche-plus',
    title: 'Pourquoi le swipe ne marche plus en 2024',
    category: 'Conseils',
    excerpt: 'Découvrez pourquoi les applications de rencontre traditionnelles échouent et comment L\'Amour Inconnu propose une alternative basée sur des rencontres authentiques.',
    coverImage: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1920',
    publishedAt: '2024-01-15',
    readTime: 5,
    author: 'Équipe L\'Amour Inconnu',
    content: `
## L'ère de la fatigue du swipe

Depuis l'apparition de Tinder en 2012, le swipe est devenu synonyme de rencontre en ligne. Un geste simple, répétitif, presque addictif : glisser son doigt vers la droite pour "liker" un profil, vers la gauche pour passer au suivant. Plus de dix ans après cette révolution, force est de constater que le système montre ses limites.

Selon une étude récente, **78% des utilisateurs d'applications de rencontre se disent épuisés par le processus**. La fatigue du swipe est devenue un phénomène documenté, avec des conséquences réelles sur la santé mentale et les chances de créer des connexions authentiques.

### Le problème de la superficialité

Le swipe repose sur un principe fondamental : le jugement instantané basé sur l'apparence physique. En quelques secondes, parfois moins, vous devez décider si une personne mérite votre attention. Cette approche pose plusieurs problèmes :

**L'apparence ne dit rien de la personnalité.** Une photo peut être flatteuse, retouchée, ou simplement ne pas rendre justice à la personne réelle. À l'inverse, quelqu'un de magnifique en photo peut ne pas correspondre à vos valeurs ou à votre vision de la vie.

**Le contexte est absent.** Sur une application classique, vous ne voyez pas comment la personne se comporte, rit, parle, interagit. Tout ce qui fait le charme d'une rencontre réelle disparaît derrière un écran.

**La pression esthétique augmente.** Les utilisateurs passent de plus en plus de temps à perfectionner leurs photos, à les retoucher, créant une version idéalisée d'eux-mêmes qui ne correspond pas à la réalité.

### La paralysie du choix

Un autre effet pervers du swipe : le paradoxe du choix. Quand vous avez accès à des centaines, voire des milliers de profils potentiels, comment choisir ? Cette abondance crée un phénomène bien documenté en psychologie :

**L'illusion du profil parfait.** Avec autant d'options, il est tentant de se dire qu'il existe forcément quelqu'un de "mieux" au prochain swipe. Cette mentalité sabote les chances de créer une vraie connexion.

**Le ghosting devient la norme.** Avec tant de matches potentiels, les gens n'hésitent plus à disparaître sans explication. Pourquoi investir du temps dans une conversation quand dix autres matches attendent ?

**La conversation ne décolle jamais.** Même quand il y a match, les conversations restent superficielles. Le fameux "Salut ça va ?" qui ne mène nulle part, encore et encore.

### L'algorithme qui décide pour vous

Les applications de swipe utilisent des algorithmes de plus en plus sophistiqués pour déterminer qui vous verrez... ou pas. Le problème ? Ces algorithmes sont optimisés pour maximiser votre temps d'utilisation de l'application, pas pour vous aider à trouver l'amour.

Résultat : vous voyez les profils qui vous feront swiper plus, pas nécessairement ceux qui vous correspondent le mieux. Les applications ont tout intérêt à ce que vous restiez célibataire et actif sur leur plateforme.

### Une alternative : les rendez-vous réels

Face à ces constats, une question s'impose : et si on revenait à l'essentiel ? **L'Amour Inconnu propose une approche radicalement différente** :

**Pas de swipe, des matchs pensés.** Notre algorithme analyse votre personnalité, vos valeurs, vos centres d'intérêt pour vous proposer des profils vraiment compatibles. Pas des centaines d'options, mais quelques personnes soigneusement sélectionnées.

**Des rendez-vous organisés.** Avec le Pass Inconnu, nous organisons 2 rendez-vous réels par mois minimum. Lieu choisi, horaire confirmé, il ne vous reste qu'à vous présenter et découvrir qui se cache derrière le profil.

**L'authenticité avant tout.** Pas besoin de photos retouchées ou de bios ultra-travaillées. Votre personnalité se révèle lors de la rencontre, pas sur un écran.

### Le retour de la sérendipité

Ce que les applications de swipe ont tué, c'est la magie de la rencontre inattendue. Cette personne que vous n'auriez jamais "likée" sur une photo mais qui, en vrai, vous fait rire aux éclats. Cette conversation qui démarre sur un malentendu et finit en connexion profonde.

**C'est cette magie que nous voulons restaurer.** En organisant des vraies rencontres, sans le filtre du jugement instantané, nous recréons les conditions d'une connexion authentique.

### Conclusion

Le swipe a été une révolution, mais comme toute révolution, elle a ses limites. En 2024, il est temps de reconnaître que l'amour ne se trouve pas en glissant son doigt sur un écran, mais en prenant le temps de vraiment rencontrer quelqu'un.

Prêt à tenter l'expérience ? Rejoignez L'Amour Inconnu et redécouvrez le plaisir d'une vraie rencontre.
    `
  },
  {
    slug: 'premier-rendez-vous-reussi-conseils',
    title: '10 conseils pour un premier rendez-vous réussi',
    category: 'Conseils',
    excerpt: 'Du choix du lieu à la conversation, découvrez nos meilleurs conseils pour transformer votre premier rendez-vous en début d\'une belle histoire.',
    coverImage: 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=1920',
    publishedAt: '2024-02-10',
    readTime: 7,
    author: 'Équipe L\'Amour Inconnu',
    content: `
## L'art du premier rendez-vous

Le premier rendez-vous est un moment unique, rempli d'excitation et d'appréhension. Comment faire bonne impression sans en faire trop ? Comment être soi-même tout en montrant sa meilleure version ? Voici nos 10 conseils pour transformer ce moment en début d'une belle histoire.

### 1. Choisissez un lieu neutre et confortable

Le choix du lieu est crucial pour un premier rendez-vous. Évitez les endroits trop bruyants où vous ne pourrez pas discuter, ou trop intimidants comme un restaurant gastronomique étoilé.

**Les bons choix :**
- Un café cosy en journée
- Un bar à vin tranquille en soirée
- Une promenade dans un parc si le temps le permet
- Un brunch le weekend

**À éviter :**
- Le cinéma (vous ne pourrez pas parler !)
- Les boîtes de nuit bruyantes
- Les restaurants trop guindés
- Chez vous ou chez l'autre (gardez ça pour plus tard)

### 2. Arrivez à l'heure (voire 5 minutes en avance)

Rien ne commence plus mal qu'un retard le jour J. Arriver à l'heure montre que vous respectez l'autre personne et que ce rendez-vous compte pour vous. Si vous êtes en avance, prenez le temps de respirer, de vous détendre et d'observer les lieux.

**En cas de retard imprévu :** Prévenez immédiatement par message avec une explication honnête et une excuse sincère. Les imprévus arrivent, mais le silence est impardonnable.

### 3. Soignez votre apparence sans en faire trop

Vous n'avez qu'une chance de faire une première impression. Prenez le temps de choisir une tenue dans laquelle vous vous sentez bien et confiant.

**Le bon équilibre :**
- Propre et soigné (mais évident, non ?)
- Une tenue qui vous ressemble
- Un parfum discret (pas d'overdose !)
- Des vêtements confortables dans lesquels vous êtes à l'aise

**L'erreur à éviter :** Se déguiser en quelqu'un d'autre. Si vous portez un costume cravate alors que vous êtes plutôt jean-baskets, ça se verra.

### 4. Éteignez votre téléphone (vraiment)

C'est le conseil le plus simple et pourtant l'un des moins suivis. Votre téléphone doit être en mode silencieux, rangé dans votre poche ou votre sac. **Pas sur la table.**

Chaque fois que vous regardez votre téléphone, vous envoyez le message : "Il y a des choses plus importantes que toi." Même si c'est juste par réflexe, l'autre personne le ressentira.

**Exception :** Si vous attendez vraiment un appel urgent (urgence familiale, etc.), expliquez-le dès le début.

### 5. Posez des questions ouvertes

L'art de la conversation commence par savoir poser les bonnes questions. Les questions fermées (oui/non) tuent la discussion. Les questions ouvertes l'enrichissent.

**Mauvais exemple :** "Tu aimes ton travail ?"
**Bon exemple :** "Qu'est-ce qui te passionne dans ton travail ?"

**Mauvais exemple :** "Tu aimes voyager ?"
**Bon exemple :** "Quel est le voyage qui t'a le plus marqué et pourquoi ?"

Les questions ouvertes montrent que vous vous intéressez vraiment à la personne, pas juste à cocher des cases de compatibilité.

### 6. Écoutez vraiment (pas seulement pour répondre)

Il y a une différence énorme entre entendre et écouter. Quand l'autre parle, ne préparez pas mentalement votre prochaine anecdote. **Écoutez vraiment.**

**Signes d'une bonne écoute :**
- Vous posez des questions de suivi sur ce qui vient d'être dit
- Vous vous souvenez des détails mentionnés
- Votre langage corporel montre l'attention (contact visuel, posture ouverte)
- Vous laissez des silences sans les combler immédiatement

### 7. Soyez authentique, pas parfait

L'objectif n'est pas de faire semblant d'être quelqu'un d'autre, mais de montrer qui vous êtes vraiment. Les petites imperfections, les maladresses, les rires nerveux font partie du charme d'une première rencontre.

**N'ayez pas peur de :**
- Admettre que vous êtes nerveux (l'autre aussi !)
- Partager vos vraies passions, même si elles sont décalées
- Rire de vous-même
- Montrer votre vulnérabilité

**Ce qui est rebutant :** Se vanter, exagérer ses accomplissements, mentir sur qui vous êtes.

### 8. Évitez les sujets sensibles... au début

Certains sujets peuvent attendre le deuxième ou troisième rendez-vous. Le premier date n'est pas le moment de déballer tous vos problèmes ou de lancer un débat politique houleux.

**Sujets à éviter au premier rendez-vous :**
- Votre ex (surtout ne pas en dire du mal !)
- Vos problèmes de santé ou personnels profonds
- La politique et la religion (sauf si ça vient naturellement)
- L'argent et vos finances
- Le mariage et les enfants (trop tôt !)

**Sujets parfaits :**
- Passions et hobbies
- Voyages et expériences marquantes
- Ambitions et projets
- Culture (films, livres, musique)
- Anecdotes amusantes

### 9. Partagez l'addition

En 2024, la question de l'addition au premier rendez-vous reste délicate. Notre conseil ? **Proposez de partager.**

C'est un geste qui montre l'égalité et le respect mutuel. Si l'autre personne insiste pour payer, vous pourrez proposer de payer la prochaine fois (ce qui sous-entend qu'il y aura une prochaine fois !).

**À éviter absolument :** Le débat interminable sur qui paie. Proposez, acceptez ou refusez poliment, et passez à autre chose.

### 10. Terminez sur une note claire

À la fin du rendez-vous, soyez honnête sur vos intentions. Si ça s'est bien passé et que vous voulez revoir la personne, dites-le !

**Si c'était génial :** "J'ai passé un super moment, j'aimerais beaucoup te revoir. On pourrait [activité] la semaine prochaine ?"

**Si vous n'êtes pas sûr :** "Merci pour ce moment, je te recontacterai bientôt."

**Si ce n'est pas le bon match :** Soyez poli mais honnête. Un message gentil le lendemain vaut mieux que le ghosting.

## Le conseil bonus : Amusez-vous !

Un premier rendez-vous n'est pas un entretien d'embauche. L'objectif n'est pas de cocher toutes les cases d'une liste de compatibilité, mais de passer un bon moment avec quelqu'un de nouveau.

**Détendez-vous, riez, profitez de l'instant.** Si ça fonctionne, tant mieux. Sinon, vous aurez au moins vécu une belle expérience et peut-être fait une nouvelle connaissance.

Et rappelez-vous : même les couples les plus solides ont connu des premiers rendez-vous maladroits. L'important n'est pas d'être parfait, mais d'être vrai.

**Prêt à mettre ces conseils en pratique ?** Avec L'Amour Inconnu, nous organisons vos rendez-vous pour que vous n'ayez qu'à vous concentrer sur l'essentiel : la rencontre.
    `
  },
  {
    slug: 'temoignage-marie-et-thomas',
    title: 'Marie et Thomas : leur histoire avec L\'Amour Inconnu',
    category: 'Témoignages',
    excerpt: 'Découvrez comment Marie et Thomas se sont rencontrés grâce à L\'Amour Inconnu après des années d\'échecs sur les applications de rencontre classiques.',
    coverImage: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1920',
    publishedAt: '2024-03-05',
    readTime: 6,
    author: 'Équipe L\'Amour Inconnu',
    content: `
## Une histoire d'amour moderne

*Les prénoms ont été changés pour préserver la vie privée de nos membres, mais cette histoire est bien réelle.*

Marie, 29 ans, professeure de français à Lyon. Thomas, 31 ans, architecte dans la même ville. Deux personnes qui auraient pu se croiser des dizaines de fois sans jamais se parler. C'est L'Amour Inconnu qui les a réunis, et aujourd'hui, six mois plus tard, ils sont inséparables.

Voici leur histoire.

### Marie : "J'en avais marre du swipe"

"J'ai passé trois ans sur les applications de rencontre classiques", nous confie Marie. "Tinder, Bumble, Hinge... J'ai tout essayé. Au début, c'était excitant. Plein de matches, plein de conversations. Mais ça ne menait jamais nulle part."

Ce que Marie décrit, c'est la fameuse "fatigue du swipe" dont souffrent de nombreux célibataires :

**Le cycle infernal :**
- Match
- Conversation qui démarre bien
- Messages qui s'espacent
- Plus de nouvelles ou rendez-vous décevant
- Recommencer

"Le pire, c'était les rendez-vous qui ne ressemblaient à rien", poursuit-elle. "Des gars qui n'avaient rien à voir avec leurs photos, des conversations qui tombaient à plat après 10 minutes, des personnes visiblement encore amoureuses de leur ex..."

**Ce qui a changé avec L'Amour Inconnu ?**

"Quand une amie m'a parlé de L'Amour Inconnu, j'étais sceptique. Encore une application ? Mais le concept était différent : pas de swipe, pas de photos ultra-retouchées, juste un vrai travail sur ton profil et tes attentes."

Marie a pris le temps de remplir son profil en détail, répondant honnêtement aux questions sur ses valeurs, sa personnalité, ce qu'elle cherche vraiment.

"La différence, c'est qu'on ne te propose pas 200 profils. On t'en propose quelques-uns, mais vraiment compatibles. Et surtout, avec le Pass Inconnu, les rendez-vous sont organisés. Pas de 'on se voit quand ?', pas de ghosting de dernière minute. Une date, une heure, un lieu. Simple."

### Thomas : "Je ne croyais plus aux sites de rencontre"

De son côté, Thomas avait depuis longtemps abandonné l'idée de rencontrer quelqu'un en ligne.

"J'avais testé plusieurs apps il y a quelques années, et ça m'avait gavé. Trop superficiel, trop chronophage, et au final, jamais la bonne personne en face."

Thomas privilégiait les rencontres "dans la vraie vie" - à travers ses amis, ses hobbies, son travail. Mais à 31 ans, avec un cercle social déjà bien établi, les occasions se faisaient rares.

"Un collègue m'a parlé de L'Amour Inconnu en insistant sur le fait que c'était différent. 'Pas de swipe, des vrais rendez-vous'. Ça m'a plu. Je me suis dit : pourquoi pas tenter une dernière fois ?"

**Le premier rendez-vous**

Marie et Thomas ont été matchés après que l'algorithme ait identifié de nombreux points communs : mêmes valeurs, même vision de la vie, centres d'intérêt compatibles, et surtout, une recherche d'authenticité.

Le rendez-vous a été organisé dans un café cosy du quartier de la Croix-Rousse, un dimanche après-midi de janvier.

### Le jour J

"J'étais super stressée", se souvient Marie. "J'arrive au café, et je le vois déjà installé à une table. Premier point positif : il est à l'heure ! Et surtout, il ressemble vraiment à sa photo. Pas de mauvaise surprise."

Thomas : "Je l'ai vue entrer et j'ai tout de suite trouvé qu'elle avait un beau sourire. On s'est serré la main un peu maladroitement, et puis on a commandé nos cafés."

Les premières minutes sont toujours délicates, mais la conversation a vite décollé :

"On a commencé par parler de Lyon, de nos quartiers préférés, et puis c'est parti naturellement sur nos boulots, nos passions... Elle m'a parlé de sa collection de plantes, j'ai parlé de ma passion pour la photo argentique. Le temps a filé à une vitesse folle."

**Deux heures plus tard**, ils étaient toujours en pleine conversation, le café étant passé à un chocolat chaud, puis à un thé.

"Ce qui m'a marqué, c'est qu'on riait beaucoup", dit Thomas. "Pas de silences gênants, pas de tentatives désespérées de relancer la conversation. C'était naturel, fluide."

### Et après ?

Marie : "À la fin du rendez-vous, on est sortis ensemble du café et il m'a dit texto : 'J'ai passé un super moment, est-ce que tu serais d'accord pour qu'on se revoie ?' J'ai trouvé ça génial. Pas de messages ambigus le lendemain, pas de 'on reste en contact'. Direct et honnête."

Ils se sont revus la semaine suivante, puis encore la semaine d'après. Un mois plus tard, ils étaient en couple.

**Six mois plus tard**

Aujourd'hui, Marie et Thomas sont heureux ensemble. Ils ont même adopté un chien (un Golden Retriever prénommé Biscuit) et parlent déjà d'emménager ensemble.

"Je ne dis pas que c'est parfait, aucun couple ne l'est", nuance Marie. "Mais on a tellement de choses en commun, les mêmes valeurs, la même vision de l'avenir. Je n'aurais jamais trouvé ça en swipant à l'infini."

Thomas : "Ce qui est fou, c'est qu'on habitait à 10 minutes l'un de l'autre, on fréquentait les mêmes endroits, et on ne s'était jamais croisés. Ou peut-être qu'on s'était croisés sans se remarquer. Il a fallu L'Amour Inconnu pour qu'on se rencontre vraiment."

### Leurs conseils aux célibataires

Nous avons demandé à Marie et Thomas leurs conseils pour ceux qui hésitent encore à tenter l'expérience :

**Marie :** "Prenez le temps de bien remplir votre profil. C'est tentant de passer vite fait, mais plus vous serez honnête et précis, meilleurs seront vos matchs. Et surtout, soyez vous-même au rendez-vous. Si ça ne fonctionne pas, au moins vous saurez que ce n'était pas le bon match."

**Thomas :** "Lancez-vous. Même si vous êtes sceptiques comme je l'étais, donnez-vous une chance. Le concept des rendez-vous organisés change vraiment la donne. Vous n'avez pas à vous soucier de la logistique, juste à vous concentrer sur la rencontre."

### L'importance d'une plateforme différente

Ce qui ressort de leur témoignage, c'est que **le format compte** autant que les personnes.

Sur les applications traditionnelles, Marie et Thomas ne se seraient probablement jamais rencontrés :
- Leurs profils se seraient perdus dans la masse
- Le jugement rapide basé sur une photo aurait pu jouer contre eux
- La lassitude du processus les aurait peut-être fait abandonner avant même de se croiser

**Avec L'Amour Inconnu :**
- Matchs soigneusement sélectionnés
- Rendez-vous organisés = pas d'excuse pour ne pas se voir vraiment
- Focus sur la compatibilité réelle, pas sur l'apparence seule

### Conclusion

L'histoire de Marie et Thomas n'est pas unique. Chaque jour, des personnes se rencontrent et créent des connexions authentiques grâce à une approche différente de la rencontre.

Leur message est simple : **si les applications classiques ne fonctionnent pas pour vous, ce n'est pas vous le problème, c'est le système.**

Il existe une autre façon de rencontrer quelqu'un. Une façon qui privilégie l'authenticité sur la superficialité, les vraies rencontres sur les matches sans lendemain, la qualité sur la quantité.

**Vous aussi, vous avez peut-être votre Marie ou votre Thomas qui vous attend quelque part dans votre ville.** Il suffit parfois juste d'une plateforme qui sait créer la bonne rencontre au bon moment.

---

*Vous avez rencontré quelqu'un grâce à L'Amour Inconnu et vous souhaitez partager votre histoire ? Contactez-nous à contact@lamourinconnu.fr*
    `
  }
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug);
}

export function getBlogArticlesByCategory(category: string): BlogArticle[] {
  if (category === 'Tous') {
    return blogArticles;
  }
  return blogArticles.filter(article => article.category === category);
}

export function getSimilarArticles(currentSlug: string, limit: number = 3): BlogArticle[] {
  const currentArticle = getBlogArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  return blogArticles
    .filter(article =>
      article.slug !== currentSlug &&
      article.category === currentArticle.category
    )
    .slice(0, limit)
    .concat(
      blogArticles
        .filter(article =>
          article.slug !== currentSlug &&
          article.category !== currentArticle.category
        )
        .slice(0, Math.max(0, limit - blogArticles.filter(a =>
          a.slug !== currentSlug &&
          a.category === currentArticle.category
        ).length))
    )
    .slice(0, limit);
}
