import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome: _outcome } = await deferredPrompt.userChoice;

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch {
      // Installation failed silently
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed === 'true') {
      setShowPrompt(false);
    }
  }, []);

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-slide-up">
      <Card className="relative bg-gradient-to-br from-secondary to-primary border-2 border-accent/30 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Download className="text-white" size={24} />
          </div>

          <div className="flex-1 pr-6">
            <h3 className="text-white font-semibold mb-1">
              Installe L'Amour Inconnu
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Accède rapidement à l'app depuis ton écran d'accueil
            </p>

            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                variant="primary"
                size="sm"
                className="flex-1 bg-accent hover:bg-accent/90"
              >
                <Download size={16} className="mr-2" />
                Installer
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                size="sm"
              >
                Plus tard
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
