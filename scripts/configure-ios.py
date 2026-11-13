"""Apply repeatable iOS permissions and universal-device configuration after cap sync."""
import os, plistlib
import json, shutil, struct
from pathlib import Path
app = Path('ios/App/App')
plist = app / 'Info.plist'
with plist.open('rb') as f: info = plistlib.load(f)
info.update({
 'NSMicrophoneUsageDescription': 'Ollie uses the microphone only when you choose voice input to ask a question or describe a picture.',
 'NSSpeechRecognitionUsageDescription': 'Ollie turns spoken words into text for questions and picture ideas using Apple speech recognition.',
 'ITSAppUsesNonExemptEncryption': False,
 'CFBundleShortVersionString': os.environ.get('IOS_VERSION', '1.0.0'),
 'CFBundleVersion': os.environ.get('IOS_BUILD_NUMBER', '1'),
 'UISupportedInterfaceOrientations': ['UIInterfaceOrientationPortrait','UIInterfaceOrientationLandscapeLeft','UIInterfaceOrientationLandscapeRight'],
 'UISupportedInterfaceOrientations~ipad': ['UIInterfaceOrientationPortrait','UIInterfaceOrientationPortraitUpsideDown','UIInterfaceOrientationLandscapeLeft','UIInterfaceOrientationLandscapeRight'],
})
with plist.open('wb') as f: plistlib.dump(info, f)
# Required-reason APIs used by the native shell and plugin storage. SDKs also ship their own manifests.
manifest = {'NSPrivacyTracking': False, 'NSPrivacyTrackingDomains': [], 'NSPrivacyCollectedDataTypes': [], 'NSPrivacyAccessedAPITypes': [
 {'NSPrivacyAccessedAPIType':'NSPrivacyAccessedAPICategoryUserDefaults','NSPrivacyAccessedAPITypeReasons':['CA92.1']},
]}
with (app/'PrivacyInfo.xcprivacy').open('wb') as f: plistlib.dump(manifest, f)

entitlements = {'com.apple.developer.applesignin': ['Default']}
with (app/'App.entitlements').open('wb') as f: plistlib.dump(entitlements, f)

# Preserve the approved original pixels; never generate a replacement at build time.
icon = Path('native-shell/ollie-app-icon.png')
header = icon.read_bytes()[:33]
if header[:8] != b'\x89PNG\r\n\x1a\n' or struct.unpack('>II', header[16:24]) != (1024, 1024) or header[25] != 2:
 raise SystemExit('App icon must be a 1024 x 1024 opaque RGB PNG')
catalog = app / 'Assets.xcassets' / 'AppIcon.appiconset'
catalog.mkdir(parents=True, exist_ok=True)
shutil.copyfile(icon, catalog / 'AppIcon-1024.png')
(catalog / 'Contents.json').write_text(json.dumps({
 'images': [{'filename': 'AppIcon-1024.png', 'idiom': 'universal', 'platform': 'ios', 'size': '1024x1024'}],
 'info': {'author': 'xcode', 'version': 1}
}, indent=2))
