import sublime
import sublime_plugin
import os


class PrettierJetEventListener(sublime_plugin.EventListener):
    def on_pre_save(self, view):
        settings = sublime.load_settings("PrettierJet.sublime-settings")
        format_on_save_enabled = settings.get("format_on_save", False)

        if not format_on_save_enabled:
            return

        file_path = view.file_name()
        if not file_path:
            return

        # Do not format scratch buffers or untitled files
        if view.is_scratch() or (view.is_dirty() and not view.file_name()):
            return

        _, ext = os.path.splitext(file_path)
        ext = ext.lower()

        supported_extensions = [
            ".js",
            ".jsx",
            ".mjs",
            ".cjs",
            ".ts",
            ".tsx",
            ".mts",
            ".cts",
            ".json",
            ".json5",
            ".jsonc",
            ".html",
            ".htm",
            ".xml",
            ".svg",
            ".css",
            ".scss",
            ".less",
            ".md",
            ".markdown",
            ".mdx",
            ".yaml",
            ".yml",
            ".toml",
            ".graphql",
            ".gql",
            ".vue",
            ".svelte",
            ".sublime-menu",
            ".sublime-keymap",
            ".sublime-commands",
        ]

        if ext in supported_extensions:
            view.run_command("prettier_jet_format")
