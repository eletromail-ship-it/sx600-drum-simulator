import React, { useState, useEffect } from 'react';
import { RhythmController } from './services/rhythmController';
import { StyleParser } from './services/styleParser';
import type { RhythmState } from './types';
import StyleSelector from './components/StyleSelector';
import RhythmControlPanel from './components/RhythmControlPanel';
import TempoDisplay from './components/TempoDisplay';
import KeyboardListener from './components/KeyboardListener';
import HelpModal from './components/HelpModal';
import './App.css';

const App: React.FC = () => {
  const [rhythmController] = useState(() => new RhythmController());
  const [rhythmState, setRhythmState] = useState<RhythmState>(() =>
    rhythmController.getState()
  );
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    // Inicializa o controlador
    rhythmController.initialize();

    // Carrega estilo de demonstração
    const demoStyle = StyleParser.createDemoStyle();
    rhythmController.loadStyle(demoStyle);

    // Subscribe para mudanças de estado
    const unsubscribe = rhythmController.subscribe((newState) => {
      setRhythmState(newState);
    });

    return () => {
      unsubscribe();
      rhythmController.dispose();
    };
  }, [rhythmController]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setShowHelp(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleStyleLoad = async (file: File) => {
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const style = StyleParser.parse(buffer);
      rhythmController.loadStyle(style);
      setNotification({
        message: `✅ Ritmo "${style.name}" carregado com sucesso!`,
        type: 'success',
      });
    } catch (error) {
      setNotification({
        message: `❌ Erro ao carregar: ${error}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleControl = (control: any) => {
    rhythmController.handleControl(control);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🥁 Simulador SX600</h1>
            <p>Bateria Eletrônica Yamaha PSR-SX600</p>
          </div>
          <button
            className="help-button"
            onClick={() => setShowHelp(true)}
            title="? - Abrir ajuda"
          >
            ?
          </button>
        </div>
      </header>

      {/* Notificação */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <main className="app-main">
        <div className="container">
          {/* Seletor de Estilos */}
          <section className="section">
            <StyleSelector onStyleLoad={handleStyleLoad} loading={loading} />
          </section>

          {/* Display de Status */}
          <section className="section status-bar">
            <div className="status-item">
              <span className="label">Estilo:</span>
              <span className="value">
                {rhythmState.currentStyle?.name || 'Demo'}
              </span>
            </div>
            <div className="status-item">
              <span className="label">Gênero:</span>
              <span className="value">
                {rhythmState.currentStyle?.genre || '-'}
              </span>
            </div>
            <div className="status-item">
              <span className="label">Status:</span>
              <span className={`value ${rhythmState.isPlaying ? 'playing' : ''}`}>
                {rhythmState.isPlaying ? '▶ TOCANDO' : '⏹ PARADO'}
              </span>
            </div>
          </section>

          {/* Painel de Controle */}
          <section className="section">
            <RhythmControlPanel
              state={rhythmState}
              onControl={handleControl}
            />
          </section>

          {/* Display de Tempo */}
          <section className="section">
            <TempoDisplay bpm={rhythmState.bpm} />
          </section>
        </div>
      </main>

      {/* Listener de Teclado */}
      <KeyboardListener onKeyPress={handleControl} />

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <footer className="app-footer">
        <p>🎮 Use o teclado ou clique nos botões | 💡 Pressione <strong>?</strong> para ajuda | v0.1.0</p>
      </footer>
    </div>
  );
};

export default App;
