import React, { useRef } from 'react';
import './StyleSelector.css';

interface StyleSelectorProps {
  onStyleLoad: (file: File) => void;
  loading: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ onStyleLoad, loading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onStyleLoad(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="style-selector">
      <h2>\ud83d\udcc2 Carregar Estilo</h2>
      
      <div className="selector-content">
        <div className="file-input-wrapper">
          <input
            ref={fileInputRef}
            type="file"
            accept=".sty,.json"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden-input"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="load-button"
          >
            {loading ? '\u23f3 Carregando...' : '\ud83d\udce5 Escolher Arquivo .STY'}
          </button>
        </div>
        
        <p className="hint">
          Formatos suportados: <strong>.STY</strong> (Yamaha Style) ou <strong>.JSON</strong>
        </p>
      </div>
    </div>
  );
};

export default StyleSelector;
