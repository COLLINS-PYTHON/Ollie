"""Verify the generated icon catalog without requiring Xcode or modifying ios/."""
import json
import plistlib
from pathlib import Path
import subprocess
import tempfile

project = Path(__file__).resolve().parent.parent
with tempfile.TemporaryDirectory() as directory:
    root = Path(directory)
    app = root / 'ios/App/App'
    app.mkdir(parents=True)
    (root / 'native-shell').mkdir()
    approved = (project / 'native-shell/ollie-app-icon.png').read_bytes()
    (root / 'native-shell/ollie-app-icon.png').write_bytes(approved)
    with (app / 'Info.plist').open('wb') as handle:
        plistlib.dump({}, handle)
    subprocess.run(['python3', str(project / 'scripts/configure-ios.py')], cwd=root, check=True)
    catalog = app / 'Assets.xcassets/AppIcon.appiconset'
    assert (catalog / 'AppIcon-1024.png').read_bytes() == approved
    assert json.loads((catalog / 'Contents.json').read_text())['images'] == [
        {'filename': 'AppIcon-1024.png', 'idiom': 'universal', 'platform': 'ios', 'size': '1024x1024'}
    ]
print('Approved icon and generated universal iOS catalog verified.')