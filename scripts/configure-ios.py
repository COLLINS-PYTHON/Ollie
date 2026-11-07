"""Apply repeatable iOS permissions and universal-device configuration after cap sync."""
import os, plistlib
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
