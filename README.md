# SX600 Drum Simulator

Simulador de bateria eletrônica baseado no Yamaha PSR-SX600 com suporte a ritmos em formato .STY.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📋 Recursos

- ✅ Carregamento de arquivos .STY (Yamaha Style Format)
- ✅ Variações A, B, C, D
- ✅ Intro, Fill, Ending, Break
- ✅ Controle de tempo (BPM)
- ✅ Tap Tempo
- ✅ Controle via teclado do PC
- ⏳ Suporte VST (em desenvolvimento)
- ⏳ General MIDI (em desenvolvimento)

## 🎹 Mapeamento de Teclado

| Tecla | Função |
|-------|--------|
| P | START/STOP |
| O | SYNC START |
| I | SYNC STOP |
| U | INTRO |
| J | Variação A |
| K | Variação B |
| L | Variação C |
| ; | Variação D |
| M | FILL |
| ' | ENDING |
| N | BREAK |
| , | Tempo - |
| . | Tempo + |
| / | Tap Tempo |

## 📁 Estrutura de Projeto

```
src/
├── components/         # Componentes React
├── services/          # Lógica de negócio
├── types/             # Tipos TypeScript
├── App.tsx            # Componente principal
└── index.tsx          # Entry point
```

## 🎵 Formato de Arquivo .STY

Atualmente suporta JSON:

```json
{
  "name": "Meu Ritmo",
  "bpm": 120,
  "timeSignature": [4, 4],
  "genre": "Pop",
  "patterns": {
    "intro": [...],
    "mainA": [...],
    "mainB": [...],
    "mainC": [...],
    "mainD": [...],
    "fill": [...],
    "ending": [...]
  }
}
```

## 🛠️ Desenvolvimento

### Próximos Passos

1. **VST Host** - Integração com plugins VST
2. **SFF Parser** - Parser nativo do formato Yamaha SFF
3. **MIDI Output** - Saída MIDI para DAWs externas
4. **Adição de Sons** - Library de samples de bateria

## 📝 Licença

MIT
