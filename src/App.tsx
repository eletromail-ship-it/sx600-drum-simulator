import React, { useState, useEffect } from 'react';
import { RhythmController } from './services/rhythmController';
import { StyleParser } from './services/styleParser';
import type { RhythmState } from './types';
import StyleSelector from './components/StyleSelector';
import RhythmControlPanel from './components/RhythmControlPanel';
import TempoDisplay from './components/TempoDisplay';
import KeyboardListener from './components/KeyboardListener';
import './App.css';

const App: React.FC = () => {
  const [rhythmController] = useState(() => new RhythmController());
  const [rhythmState, setRhythmState] = useState<RhythmState>(() =>
    rhythmController.getState()
  );
  const [loading, setLoading] = useState(false);

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

  const handleStyleLoad = async (file: File) => {
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const style = StyleParser.parse(buffer);
      rhythmController.loadStyle(style);
    } catch (error) {
      alert(`Erro ao carregar arquivo: ${error}`);
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
        <h1>🥁 Simulador SX600</h1>
        <p>Bateria Eletrônica Yamaha PSR-SX600</p>
      </header>

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
                {rhythmState.currentStyle?.name || 'Nenhum carregado'}
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

      <footer className="app-footer">
        <p>Use o teclado ou clique nos botões para controlar | Dica: Aperte ? para ajuda</p>
      </footer>
    </div>
  );
};

export default App;
