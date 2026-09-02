import React, { useState, useEffect } from 'react';
import './TempoDisplay.css';

interface TempoDisplayProps {
  bpm: number;
}

const TempoDisplay: React.FC<TempoDisplayProps> = ({ bpm }) => {
  const [beatPulse, setBeatPulse] = useState(false);

  useEffect(() => {
    // Cria um visual de "batida" sincronizado com o BPM
    const msPerBeat = (60000 / bpm);
    const pulseInterval = setInterval(() => {
      setBeatPulse(true);
      setTimeout(() => setBeatPulse(false), 100);
    }, msPerBeat);

    return () => clearInterval(pulseInterval);
  }, [bpm]);

  return (
    <div className="tempo-display">
      <h2>🎵 Tempo</h2>
      
      <div className="tempo-content">
        <div className={`bpm-display ${beatPulse ? 'pulse' : ''}`}>
          <div className="bpm-number">{Math.round(bpm)}</div>
          <div className="bpm-label">BPM</div>
        </div>

        <div className="tempo-controls">
          <button className="tempo-btn tempo-minus" title=", (vírgula)">
            ◀ Diminuir
          </button>
          <button className="tempo-btn tempo-tap" title="/ (barra)">
            🎯 Tap Tempo
          </button>
          <button className="tempo-btn tempo-plus" title=". (ponto)">
            Aumentar ▶
          </button>
        </div>

        <div className="tempo-range">
          <div className="range-label">30</div>
          <div className="range-bar">
            <div
              className="range-fill"
              style={{
                width: `${((bpm - 30) / (300 - 30)) * 100}%`,
              }}
            ></div>
          </div>
          <div className="range-label">300</div>
        </div>
      </div>
    </div>
  );
};

export default TempoDisplay;
