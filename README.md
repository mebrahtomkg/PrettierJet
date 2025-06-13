# PrettierJet - A Fast Prettier Plugin for Sublime Text

PrettierJet is a Sublime Text plugin designed to format your code quickly and efficiently using Prettier. By leveraging a dedicated server process, PrettierJet avoids the overhead of running Prettier through the command line for each format request, making it faster than traditional Prettier plugins.

# Installation

### 1. Clone the Repository:

```bash
git clone https://github.com/mebrahtomkg/PrettierJet.git
```

### 2. Install Prettier Globally:

PrettierJet requires Prettier to be installed globally. Install it using npm:

```bash
npm install -g prettier
```

### 3. Install the Plugin in Sublime Text:

Open Sublime Text.
Navigate to Preferences > Browse Packages...
Copy the cloned repository into the Sublime Text Packages directory.

## Usage

### 1. Format a Document:

Open a file supported by Prettier (e.g., `.js`, `.ts`, `.css`, etc.).
Use the command palette or keyboard shortcut to run PrettierJet: Format Document.

### 2. Customize Prettier Options:

PrettierJet uses your global Prettier configuration. Edit your Prettier config file to customize formatting options.

## Configuration

PrettierJet supports all standard Prettier configuration options. You can customize Prettier's behavior by creating a `.prettierrc` configuration file in your project root or home directory.

Supported File Extensions
PrettierJet supports formatting for the following file extensions:

- `.js`, `.jsx`, `.mjs`, `.cjs`
- `.ts`, `.tsx`, `.mts`, `.cts`
- `.json`, `.json5`, `.jsonc`
- `.html`, `.htm`, `.xml`, `.svg`
- `.css`, `.scss`, `.less`
- `.md`, `.markdown`, `.mdx`
- `.yaml`, `.yml`, `.toml`
- `.graphql`, `.gql`
- `.vue`, `.svelte`

## Troubleshooting

### 1. Prettier Not Found

If you encounter an error indicating that Prettier is not found, ensure that:

Prettier is installed globally: `bash 
npm install -g prettier`
Your system's PATH environment variable includes the directory where Prettier is installed.

### 2. Server Not Starting

If the server fails to start:

Check the console for error messages.
Ensure no other applications are using port `5050`.
Restart Sublime Text and try again.

### 3. Formatting Issues

If formatting doesn't work as expected:

Verify that your file type is supported.
Check your Prettier configuration file for any invalid settings.

## Contributing

Contributions are welcome! If you'd like to improve PrettierJet, please fork the repository and submit a pull request. Ensure that your changes are well-tested and maintain the existing code style.

## License

PrettierJet is released under the MIT License. See the LICENSE file for details.

PrettierJet is designed to provide a seamless and efficient code formatting experience within Sublime Text. By leveraging a dedicated server and Prettier's powerful formatting capabilities, it offers faster formatting than traditional CLI-based approaches.
