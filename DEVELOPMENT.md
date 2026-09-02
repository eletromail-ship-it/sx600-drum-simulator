# Guia de Desenvolvimento

## 🏗️ Arquitetura

### Camadas

```
┌──────────────────────────────────────────┐
│         React Components (UI)            │
├──────────────────────────────────────────┤
│         RhythmController (State)         │
├──────────────────────────────────────────┤
│   StyleParser | MIDIGenerator | Etc     │
├──────────────────────────────────────────┤
│   AudioEngine (Web Audio API / Tone.js) │
├──────────────────────────────────────────┤
│   VST Host (Electron) [TODO]            │
└──────────────────────────────────────────┘
```

### Fluxo de Dados

```
Arquivo .STY
    ↓
[StyleParser] → Parse JSON
    ↓
[RhythmController] → Gerencia estado
    ↓
[MIDIGenerator] → Converte para MIDI
    ↓
[AudioEngine] → Reproduz som
    ↓
Web Audio API / VST / DAW
```

## 📦 Serviços

### `StyleParser`

Responsável por fazer parse de arquivos `.STY`.

```typescript
// Parse um arquivo
const style = StyleParser.parse(arrayBuffer);

// Criar demo
const demo = StyleParser.createDemoStyle();
```

### `MIDIGenerator`

Converte padrões de bateria em notas MIDI.

```typescript
// Converter patterns para MIDI
const midiNotes = MIDIGenerator.patternsToMIDI(
  patterns,
  120, // BPM
  [4, 4] // Time signature
);
```

### `AudioEngine`

Motor de áudio usando Web Audio API/Tone.js.

```typescript
// Inicializar
await audioEngine.initialize();

// Tocar nota MIDI
audioEngine.playNote(midiNote);

// Tocar sequência
audioEngine.playSequence(midiNotes);
```

### `RhythmController`

Controlador central que gerencia estado e eventos.

```typescript
// Carregar estilo
controller.loadStyle(style);

// Processar comando
controller.handleControl('START_STOP');

// Subscribe para mudanças
controller.subscribe((state) => {
  console.log(state);
});
```

## 🎯 Tipos TypeScript

### `StyleFile`

```typescript
interface StyleFile {
  name: string;
  bpm: number;
  timeSignature: [number, number];
  genre: string;
  patterns: StylePattern;
}
```

### `DrumPattern`

```typescript
interface DrumPattern {
  beat: number;           // Posição em beats
  instrument: DrumInstrument;
  velocity: number;       // 0-127
  duration: number;       // milliseconds
}
```

### `MIDINote`

```typescript
interface MIDINote {
  note: number;           // 0-127
  velocity: number;       // 0-127
  duration: number;       // milliseconds
  timestamp: number;      // milliseconds from start
}
```

## 🔄 Fluxo de Eventos

### 1. Usuário pressiona tecla

```
KeyboardListener.handleKeyDown('p')
  ↓
APP.handleControl('START_STOP')
  ↓
RhythmController.handleControl('START_STOP')
  ↓
RhythmController.togglePlayback()
  ↓
RhythmController.playPattern('mainA')
  ↓
AudioEngine.playSequence(midiNotes)
  ↓
Tone.js dispara notas
```

### 2. Mudança de Estado

```
RhythmController.state → muda
  ↓
RhythmController.notifyObservers()
  ↓
App.setRhythmState(newState)
  ↓
Componentes React re-renderizam
```

## 🧪 Testando

### Teste Manual

1. Abra `http://localhost:5173`
2. Clique em "Escolher Arquivo" (demo automática)
3. Pressione `P` para START
4. Pressione `J`, `K`, `L`, `;` para variar
5. Pressione `,` e `.` para ajustar tempo

## 🚀 Implementações Futuras

### VST Host (Electron)

```typescript
// electron/vst-host.ts
class VSTHost {
  async loadPlugin(path: string): Promise<void> {
    // Carrega VST usando JUCE ou RackAFX
  }

  sendMIDI(event: MIDIEvent): void {
    // Envia evento MIDI para VST
  }
}
```

### SFF Parser (Formato Nativo Yamaha)

```typescript
// services/sffParser.ts
class SFFParser {
  static parse(buffer: ArrayBuffer): StyleFile {
    // Parse do formato binário SFF
  }
}
```

### MIDI Output

```typescript
// services/midiOutput.ts
class MIDIOutput {
  async sendToDAW(midiNotes: MIDINote[]): Promise<void> {
    // Usa Web MIDI API para enviar para DAW
  }
}
```

## 📚 Recursos

- [Yamaha PSR-SX600 Manual](https://usa.yamaha.com/products/keyboards/arranger/psr-sx600/)
- [General MIDI Spec](https://en.wikipedia.org/wiki/General_MIDI)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Tone.js Documentation](https://tonejs.org/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Dicas

- Use o DevTools do navegador para debugar (F12)
- Verifique o Console para mensagens de erro
- Teste com o arquivo demo primeiro (`StyleParser.createDemoStyle()`)
- Use TypeScript strict mode para encontrar erros mais cedo

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub!
