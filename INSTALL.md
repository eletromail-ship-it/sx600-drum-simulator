# Instalação e Configuração

## Pré-requisitos

- Node.js 16+ 
- npm ou yarn

## 1️⃣ Instalação

```bash
# Clone o repositório
git clone https://github.com/eletromail-ship-it/sx600-drum-simulator.git
cd sx600-drum-simulator

# Instale as dependências
npm install
```

## 2️⃣ Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Abra no navegador: http://localhost:5173
```

## 3️⃣ Build para Produção

```bash
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura de Projeto

```
sx600-drum-simulator/
├── src/
│   ├── components/
│   │   ├── KeyboardListener.tsx      # Listener de teclado
│   │   ├── RhythmControlPanel.tsx    # Painel de controle
│   │   ├── StyleSelector.tsx         # Seletor de arquivos
│   │   ├── TempoDisplay.tsx          # Display de BPM
│   │   ├── RhythmControlPanel.css
│   │   ├── StyleSelector.css
│   │   └── TempoDisplay.css
│   ├── services/
│   │   ├── audioEngine.ts            # Motor de áudio (Web Audio API)
│   │   ├── gmMapping.ts              # Mapeamento General MIDI
│   │   ├── midiGenerator.ts          # Gerador de MIDI
│   │   ├── rhythmController.ts       # Controlador de ritmos
│   │   └── styleParser.ts            # Parser de .STY
│   ├── types/
│   │   └── index.ts                  # Tipos TypeScript
│   ├── App.tsx                       # Componente raiz
│   ├── App.css                       # Estilos globais
│   ├── index.tsx                     # Entry point React
│   └── index.css                     # Estilos base
├── index.html                        # HTML principal
├── package.json                      # Dependências
├── tsconfig.json                     # Configuração TypeScript
├── vite.config.ts                    # Configuração Vite
├── .gitignore
└── README.md
```

## 🎵 Como Usar

### 1. Carregar um Ritmo

1. Clique no botão "📥 Escolher Arquivo .STY"
2. Selecione um arquivo em formato `.STY` ou `.JSON`
3. O ritmo será carregado e exibido na interface

### 2. Controlar o Ritmo

**Via Botões:**
- Clique em START/STOP para iniciar/parar
- Use os botões A, B, C, D para variar o ritmo
- Use INTRO, FILL, ENDING para padrões especiais

**Via Teclado:**

```
[P]     = START/STOP
[O]     = SYNC START
[I]     = SYNC STOP
[U]     = INTRO
[J]     = VARIAÇÃO A
[K]     = VARIAÇÃO B
[L]     = VARIAÇÃO C
[;]     = VARIAÇÃO D
[M]     = FILL
[']     = ENDING
[N]     = BREAK
[,]     = TEMPO -
[.]     = TEMPO +
[/]     = TAP TEMPO
```

### 3. Ajustar o Tempo

- Use os botões `◀ Diminuir` e `Aumentar ▶`
- Ou pressione as teclas `,` (diminuir) e `.` (aumentar)
- Use "Tap Tempo" para bater o tempo desejado (tecla `/`)

## 📄 Formato de Arquivo .STY

### Exemplo de Arquivo JSON

```json
{
  "name": "Meu Ritmo Pop",
  "bpm": 120,
  "timeSignature": [4, 4],
  "genre": "Pop",
  "patterns": {
    "intro": [
      { "beat": 0, "instrument": "kick", "velocity": 100, "duration": 100 },
      { "beat": 2, "instrument": "snare", "velocity": 80, "duration": 100 }
    ],
    "mainA": [
      { "beat": 0, "instrument": "kick", "velocity": 100, "duration": 100 },
      { "beat": 0.5, "instrument": "hihat-closed", "velocity": 60, "duration": 50 },
      { "beat": 1, "instrument": "hihat-closed", "velocity": 60, "duration": 50 },
      { "beat": 2, "instrument": "snare", "velocity": 90, "duration": 100 }
    ],
    "mainB": [...],
    "mainC": [...],
    "mainD": [...],
    "fill": [...],
    "ending": [...]
  }
}
```

### Instrumentos Disponíveis

- `kick` - Bumbo (General MIDI: 36)
- `snare` - Caixa (GM: 38)
- `hihat-closed` - Chimbal Fechado (GM: 42)
- `hihat-open` - Chimbal Aberto (GM: 46)
- `tom-hi` - Tom Alto (GM: 50)
- `tom-mid` - Tom Médio (GM: 47)
- `tom-low` - Tom Grave (GM: 45)
- `crash` - Crash (GM: 49)
- `ride` - Ride (GM: 51)
- `cowbell` - Cowbell (GM: 56)
- `clap` - Palma (GM: 39)
- `perc` - Percussão (GM: 37)

## 🚀 Próximas Implementações

- [ ] Suporte a VST plugins (Addictive Drums, Roland)
- [ ] Parser nativo do formato SFF
- [ ] Saída MIDI para DAWs externas
- [ ] Library de samples profissionais
- [ ] Electron wrapper para desktop
- [ ] Presets salvos localmente
- [ ] Visualizador de waveform

## 🐛 Troubleshooting

### Erro: "AudioEngine não inicializado"

Clique em um botão para iniciar o contexto de áudio (requerimento do navegador).

### Arquivo não carrega

Verifique se o arquivo está em formato JSON válido com a estrutura correta.

## 📝 Licença

MIT

## 👨‍💻 Desenvolvimento

Veja [DEVELOPMENT.md](DEVELOPMENT.md) para mais detalhes sobre arquitetura e contribuição.
