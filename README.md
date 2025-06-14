# PrettierJet ⚡

## The Fastest Prettier Formatter Plugin for Sublime Text

Experience **instant code formatting** without editor freezes. PrettierJet uses a persistent Node.js server to eliminate Prettier's startup overhead.

## ✨ Key Features

- **Blazing fast** - 20-30x faster than traditional Prettier plugins
- **Real-time formatting** - no more 2-3 second delays especially on older machines
- **Non-blocking** - Never freezes your editor UI
- **Context Menu** - Right-click → "Format With Prettier"
- **Smart config** - Auto-detects `.prettierrc` and `.prettierignore` of any project
- **Cross-platform** - Works on Windows, macOS, and Linux
- **Lightweight** - Minimal CPU/memory usage

## Benchmarks: PrettierJet vs JsPrettier

Tested on a 2GHz single-core older laptop with 100-line JavaScript files:

| Metric              | PrettierJet |   JsPrettier |
| :------------------ | :---------: | -----------: |
| Average Format Time |    80ms     |       2000ms |
| Worst Case          |    100ms    |      3000ms+ |
| UI freezing         |  ❌ Never   |  ✅ Frequent |
| CPU usage           |   Minimal   | Heavy spikes |

### Real-world difference:

- With **JsPrettier**: Type → Wait 2 seconds(noticeable on old machines) → See formatted code
- With **PrettierJet**: Type → **Code formats instantly as you work**
- Never locks up Sublime Text during formatting

## Installation

### 1. Install [Prettier](https://prettier.io/) Globally (Required global installation)

```bash
npm install -g prettier
```

### 2. Install PrettierJet

1. Open Sublime Text
2. Go to:  
   **`Preferences → Browse Packages...`**  
   _(This opens your correct Packages folder automatically)_

3. In that folder:

   - **Right-click → Open Terminal** (or `cd` manually to that folder)
   - Run:
     ```bash
     git clone https://github.com/mebrahtomkg/PrettierJet.git
     ```

4. **Restart Sublime Text**

✅ Works on Windows/macOS/Linux

## Usage

### Method 1: Context Menu (Easiest)

1. Right-click in any supported file

2. Select "Format With Prettier"

### Method 2: Keyboard Shortcut

Add to your key bindings (Preferences > Key Bindings):

```json
{ "keys": ["ctrl+alt+f"], "command": "prettier_jet_format" }
```

### Method 3: Command Palette

Press `Ctrl+Shift+P` (Win/Linux) or `Cmd+Shift+P` (Mac)

Type **"PrettierJet: Format Document"**

## Technical Highlights

### How It Achieves 30x Speed

### 1. No CLI Overhead

- Traditional plugins spawn new Node.js processes (2000ms+) for every format action

- PrettierJet maintains one persistent process (80ms)

### 2. Non-Blocking Architecture

- Formatting runs in background

- Never freezes your editor UI

### 3. Smart Caching

- Keeps Prettier warm for subsequent faster requests

## Contributing

We welcome improvements!

## FAQ

**Q: How do I configure Prettier formatting rules?**  
**A:** Follow the [official Prettier configuration docs](https://prettier.io/docs/en/configuration.html). PrettierJet automatically detects and applies:

- `.prettierrc` or `prettier.config.js` in your project root
- `.prettierignore` files
- `prettier` key in `package.json`

**Q: Can I use a local Prettier installation?**  
**A:** Currently PrettierJet requires **global Prettier installation** (`npm install -g prettier`). Local `node_modules` installations are not yet supported.

**Q: Why is this faster than other plugins?**  
**A:** Three architectural advantages:

1. **Persistent process** - No Node.js startup penalty
2. **In-memory caching** - Prettier stays loaded between uses
3. **HTTP communication** - Faster than spawning CLI processes
