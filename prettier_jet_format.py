import sublime
import sublime_plugin
import urllib.request
import urllib.error
import os 
import tempfile

class PrettierJetFormatCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        port_file = os.path.join(tempfile.gettempdir(), 'prettierjet.port')
        try:
            with open(port_file, 'r') as f:
                port = f.read().strip()
            url = f"http://localhost:{port}/"
        except:
            sublime.error_message("PrettierJet service not running!")
            return

        region = sublime.Region(0, self.view.size())
        code = self.view.substr(region)

        file_path = self.view.file_name()

        headers = {
            "Content-Type": "text/plain",
            "x-file-path": file_path
        }

        try:
            req = urllib.request.Request(
                url,
                data=code.encode("utf-8"),
                headers=headers,
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                if response.status == 200:
                    formatted = response.read().decode("utf-8")
                    self.view.replace(edit, region, formatted)
                    print("[PrettierJet] File formatted successfully.")
                else:
                    error_content = response.read().decode("utf-8")
                    sublime.error_message(error_content)

        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8") if hasattr(e, "read") else str(e)
            sublime.error_message("HTTP " + str(e.code) + "\n\n" + body)

        except urllib.error.URLError as e:
            sublime.error_message(str(e))

        except Exception as e:
            sublime.error_message(str(e))
