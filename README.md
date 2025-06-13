# PrettierJet ⚡

## Sublime Text's Fastest Prettier Formatter

**Stop waiting for your code to format.** PrettierJet delivers **instant Prettier formatting** without freezing your editor - especially crucial on older machines.

- **20-30x faster** than JsPrettier on single-core CPUs
- **Real-time formatting** - no more 2-3 second delays
- **Lightweight** - won't spike your CPU to 100%

## Benchmarks: PrettierJet vs JsPrettier

Tested on a 2GHz single-core laptop with 100-line JavaScript files

| Metric              | PrettierJet |   JsPrettier |
| :------------------ | :---------: | -----------: |
| Average Format Time |    80ms     |       2000ms |
| Worst Case          |    100ms    |      3000ms+ |
| UI Freezing         |  ❌ Never   |  ✅ Frequent |
| CPU Usage           |   Minimal   | Heavy spikes |

### Real-world difference:

- With JsPrettier: Type → Wait 2 seconds → See formatted code

- With PrettierJet: Type → **Code formats instantly as you work**

## Why PrettierJet?

### For Developers on Older Machines

- Formats code **30x faster** on single-core CPUs

- Uses **1/10th the CPU** of traditional Prettier plugins

- Never locks up Sublime Text during formatting

### Technical Superiority

- **Persistent Server** - Prettier stays loaded in memory
- **Efficient IPC** - HTTP communication vs CLI spawning
- **Auto-Config** - Respects your project's .prettierrc

## Installation

### 1. Install Prettier Globally

```bash
npm install -g prettier
```

### 2. Install PrettierJet

#### Option A: Clone (Recommended)

```bash

# Linux/macOS

git clone https://github.com/mebrahtomkg/PrettierJet.git ~/.config/sublime-text/Packages/PrettierJet

# Windows

git clone https://github.com/mebrahtomkg/PrettierJet.git "$env:APPDATA\Sublime Text\Packages\PrettierJet"
```

#### Option B: Download ZIP

1. Download Latest Release

2. Extract to Sublime's Packages folder

- Windows: `%APPDATA%\Sublime Text\Packages\`

- macOS: `~/Library/Application Support/Sublime Text/Packages/`

## Usage

1. Open any supported file (.js, .ts, .css, .html, etc.)

2. Format with:

- Command Palette: `Ctrl+Shift+P` → "PrettierJet: Format Document"

- Keyboard Shortcut: Add to key bindings:

```json
{ "keys": ["ctrl+alt+f"], "command": "prettier_jet_format" }
```

## Technical Highlights

### How It Achieves 30x Speed

### 1. No CLI Overhead

- Traditional plugins spawn new Node.js processes (2000ms+)

- PrettierJet maintains one persistent process (80ms)

### 2. Non-Blocking Architecture

- Formatting runs in background

- Never freezes your editor UI

### 3. Smart Caching

- Keeps Prettier warm for subsequent faster requests

## Contributing

We welcome improvements! Here's how to help:

### For Developers

1. Fork the repository

2. Create a feature branch:

```bash
git checkout -b feature/your-improvement
```

3. Submit a pull request with:

- Clear description of changes

- Supporting benchmarks if applicable

### For All Users

1. Report bugs via GitHub Issues

2. Share your experience in Discussions

## Why Choose PrettierJet?

- **✅ Proven Performance** - 30x faster in real-world tests
- **✅ Reliable** - No more editor freezes
- **✅ Transparent** - View the code
- **✅ MIT Licensed** - Free forever

**Transform your formatting experience today!**
