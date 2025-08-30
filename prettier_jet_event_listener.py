import sublime
import sublime_plugin
import os
import json


class PrettierJetEventListener(sublime_plugin.EventListener):
    _supported_extensions = []

    def __init__(self):
        super().__init__()
        # Load extensions when the plugin is initialized
        self._load_supported_extensions()

    def _load_supported_extensions(self):
        plugin_dir = os.path.dirname(__file__)
        service_dir = os.path.join(plugin_dir, "prettier-jet-service")
        config_file_path = os.path.join(service_dir, "config.json")

        try:
            with open(config_file_path, "r") as f:
                config_data = json.load(f)
                self._supported_extensions = config_data.get("supportedExtensions", [])
        except Exception as e:
            print(f"[PrettierJet] Error occurred while loading config.json: {e}")

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

        if ext in self._supported_extensions:
            view.run_command("prettier_jet_format")
