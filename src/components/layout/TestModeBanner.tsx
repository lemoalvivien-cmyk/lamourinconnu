export function TestModeBanner() {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-3 px-4">
      <p className="text-sm md:text-base">
        🧪 <strong>Version Test Gratuite</strong> — La plateforme est 100% gratuite pendant les premières semaines.
        Aidez-nous à l'améliorer en partageant vos retours à{' '}
        <a
          href="mailto:contact@vlmconsulting.fr"
          className="underline font-bold hover:text-gold transition-colors"
        >
          contact@vlmconsulting.fr
        </a>
      </p>
    </div>
  );
}
