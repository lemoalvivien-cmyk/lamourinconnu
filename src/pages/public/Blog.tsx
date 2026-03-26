import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock } from 'lucide-react';
import { getBlogArticlesByCategory } from '../../lib/blog-data';

const CATEGORIES = ['Tous', 'Conseils', 'Témoignages', 'Actualités'] as const;

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const filteredArticles = getBlogArticlesByCategory(selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <>
      <Helmet>
        <title>Blog - L'Amour Inconnu | Conseils rencontres et témoignages</title>
        <meta name="description" content="Découvrez nos articles sur les rencontres authentiques, des conseils pour trouver l'amour et des témoignages inspirants." />
        <meta property="og:title" content="Blog - L'Amour Inconnu | Conseils rencontres et témoignages" />
        <meta property="og:description" content="Découvrez nos articles sur les rencontres authentiques, des conseils pour trouver l'amour et des témoignages inspirants." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lamourinconnu.fr/blog" />
        <link rel="canonical" href="https://lamourinconnu.fr/blog" />
      </Helmet>

      <div className="min-h-screen">
        <div className="bg-gradient-to-b from-secondary/50 to-transparent py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Le Blog de L'Amour Inconnu
            </h1>
            <p className="text-xl text-gray-300">
              Conseils, témoignages et actualités pour des rencontres réussies
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'bg-secondary text-gray-300 hover:bg-secondary/80 border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="accent">{article.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readTime} min</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                Aucun article dans cette catégorie pour le moment.
              </p>
            </div>
          )}

          <div className="mt-16 text-center">
            <Card className="inline-block p-8 bg-gradient-to-br from-accent/10 via-secondary to-primary border-accent/30">
              <h3 className="text-2xl font-bold text-white mb-3">
                Envie de partager votre histoire ?
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Vous avez rencontré quelqu'un grâce à L'Amour Inconnu ?
                Nous serions ravis de partager votre témoignage.
              </p>
              <a
                href="mailto:contact@lamourinconnu.fr?subject=Témoignage pour le blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Contactez-nous
              </a>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
