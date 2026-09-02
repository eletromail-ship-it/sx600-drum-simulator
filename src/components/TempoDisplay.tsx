import React, { useState, useEffect } from 'react';
import './TempoDisplay.css';

interface TempoDisplayProps {
  bpm: number;
}

const TempoDisplay: React.FC<TempoDisplayProps> = ({ bpm }) => {
  const [beatPulse, setBeatPulse] = useState(false);
  const [beatCount, setBeatCount] = useState(0);

  useEffect(() => {
    const msPerBeat = 60000 / bpm;
    let beatCounter = 0;
    
    const pulseInterval = setInterval(() => {
      setBeatPulse(true);
      beatCounter = (beatCounter + 1) % 4;
      setBeatCount(beatCounter);
      
      setTimeout(() => setBeatPulse(false), 150);
    }, msPerBeat);

    return () => clearInterval(pulseInterval);
  }, [bpm]);

  return (
    <div className="tempo-display">
      <h2>\ud83c\udfb5 Tempo</h2>
      
      <div className="tempo-content">
        {/* BPM Display */}
        <div className={`bpm-display ${beatPulse ? 'pulse' : ''}`}>
          <div className="bpm-number">{Math.round(bpm)}</div>
          <div className="bpm-label">BPM</div>
        </div>

        {/* Beat Indicator */}
        <div className="beat-indicator">
          {[0, 1, 2, 3].map((beat) => (
            <div
              key={beat}
              className={`beat ${beatCount === beat && beatPulse ? 'active' : ''}`}
              title={`Beat ${beat + 1}`}
            >
              {beat + 1}
            </div>
          ))}
        </div>

        {/* Keyboard Info */}
        <div className="tempo-keyboard-info">
          <span className="key-hint">, (v\u00edrgula)</span>
          <span className="key-hint">. (ponto)</span>
          <span className="key-hint">/ (barra)</span>
        </div>
      </div>
    </div>
  );
};

export default TempoDisplay;
