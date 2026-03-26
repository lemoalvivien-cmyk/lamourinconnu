import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Calendar, Clock, ChevronRight, Heart, ArrowRight } from 'lucide-react';
import { getBlogArticleBySlug, getSimilarArticles } from '../../lib/blog-data';
import { ROUTES } from '../../lib/constants';

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to={ROUTES.BLOG} replace />;
  }

  const article = getBlogArticleBySlug(slug);
  const similarArticles = getSimilarArticles(slug, 3);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article non trouvé</h1>
          <p className="text-gray-400 mb-8">Cet article n'existe pas ou a été supprimé.</p>
          <Link to={ROUTES.BLOG}>
            <Button variant="accent">Retour au blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const renderMarkdownContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        line = line.trim();

        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-3xl font-bold text-white mt-12 mb-6 first:mt-0">
              {line.replace('## ', '')}
            </h2>
          );
        }

        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
              {line.replace('### ', '')}
            </h3>
          );
        }

        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={index} className="text-lg text-white font-semibold mt-6 mb-3">
              {line.replace(/\*\*/g, '')}
            </p>
          );
        }

        if (line.startsWith('*') && line.endsWith('*') && !line.includes('**')) {
          return (
            <p key={index} className="text-gray-400 italic my-4 pl-4 border-l-2 border-accent/30">
              {line.replace(/\*/g, '')}
            </p>
          );
        }

        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-gray-300 leading-relaxed ml-6 my-2">
              {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
            </li>
          );
        }

        if (line === '') {
          return <div key={index} className="h-2" />;
        }

        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');

        return (
          <p
            key={index}
            className="text-gray-300 leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      });
  };

  return (
    <>
      <Helmet>
        <title>{`${article.title} | L'Amour Inconnu`}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} | L'Amour Inconnu`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://lamourinconnu.fr/blog/${slug}`} />
        <link rel="canonical" href={`https://lamourinconnu.fr/blog/${slug}`} />
      </Helmet>

      <div className="min-h-screen">
        <div className="bg-secondary/30 py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 max-w-4xl mx-auto">
            <Link to={ROUTES.HOME} className="hover:text-accent transition-colors">
              Accueil
            </Link>
            <ChevronRight size={16} />
            <Link to={ROUTES.BLOG} className="hover:text-accent transition-colors">
              Blog
            </Link>
            <ChevronRight size={16} />
            <Link
              to={`${ROUTES.BLOG}?category=${article.category}`}
              className="hover:text-accent transition-colors"
            >
              {article.category}
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-500 truncate">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <Badge variant="accent" className="mb-4">
              {article.category}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime} min de lecture</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Par {article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              {renderMarkdownContent(article.content)}
            </div>
          </Card>

          <div className="mt-12">
            <Card className="p-8 bg-gradient-to-br from-accent/10 via-secondary to-primary border-accent/30">
              <div className="text-center max-w-2xl mx-auto">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Tu veux tester L'Amour Inconnu ?
                </h3>
                <p className="text-gray-300 mb-6">
                  Rejoins des milliers de célibataires qui ont choisi l'authenticité.
                  Inscris-toi gratuitement et découvre une nouvelle façon de rencontrer.
                </p>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="accent" size="lg">
                    Créer mon compte gratuit
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {similarArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8">
                Articles similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarArticles.map((similarArticle) => (
                  <Link
                    key={similarArticle.slug}
                    to={`/blog/${similarArticle.slug}`}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={similarArticle.coverImage}
                          alt={similarArticle.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge variant="accent" className="text-xs">
                            {similarArticle.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {similarArticle.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{similarArticle.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to={ROUTES.BLOG}>
              <Button variant="outline" size="lg">
                Voir tous les articles
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
    </>
  );
}
