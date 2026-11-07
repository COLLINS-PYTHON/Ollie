# Ollie iOS handoff

Code is prepared, not App Store certified. Browser checks passed at 390×844, 768×1024 and 1024×768 with no page errors. A signed iOS build has not been compiled or tested here.

## RevenueCat
1. Create an iOS app with bundle ID `com.ollie.learning` and connect the account owner's App Store Connect credentials.
2. Import `com.ollie.monthly` and `com.ollie.learning.yearly`; both belong to the same Apple subscription group and have a 7-day introductory trial for eligible accounts.
3. Attach both products to entitlement **`premium`**. Put their monthly and annual packages in the current offering.
4. Configure restore/transfer behavior for the parent-account model. Purchases before signup use an anonymous identifier; the app calls `logIn` with the authenticated parent UUID afterward. Test linking and restoring across devices/accounts. Never treat a local flag as proof of payment.
5. Add Cloud secrets `REVENUECAT_APPLE_PUBLIC_KEY` (the iOS `appl_` SDK key) and `REVENUECAT_SECRET_KEY` (a server API key allowed to read subscribers). Publish afterward.
6. AI requests require both a saved parent consent and verified `premium` entitlement. **Until RevenueCat is configured, live AI intentionally refuses access on web and iOS.** Cached/shared lessons do not prove entitlement or purchase completion. Web checkout is not implemented.

## Apple sign-in
Managed Apple OAuth remains the default; it is already enabled. Account deletion retains a **Disconnect Apple** action using the managed revocation page.

Optional direct native credential-sheet mode is implemented but off until configured. Add `com.ollie.learning` as an accepted native Apple audience in Cloud's own-credentials Apple configuration, using the same Apple identity grouping as existing web accounts. Enable Sign in with Apple for the App ID and regenerate the distribution profile. Configure `APPLE_NATIVE_CLIENT_SECRET` with a valid server-side client-secret JWT for that native client, then set `APPLE_NATIVE_AUTH_ENABLED=true`. Renew that secret before expiry. Test nonce verification and account identity continuity before enabling this in production. Native deletion reauthorizes and revokes before deleting data; managed mode uses the separate revocation action after deletion.

## GitHub signing
The owner supplies these repository Actions secrets, without sharing Apple ID passwords:
- `DEVELOPMENT_TEAM_ID`
- `BUILD_CERTIFICATE_BASE64`: Apple Distribution `.p12`, base64 encoded
- `P12_PASSWORD`
- `PROVISIONING_PROFILE_BASE64`: App Store distribution profile for `com.ollie.learning`, with Sign in with Apple enabled
- `APP_STORE_CONNECT_ISSUER_ID`
- `APP_STORE_CONNECT_KEY_ID`
- `APP_STORE_CONNECT_P8`: App Store Connect API private key, PEM or base64

Run **iOS build** from Actions and choose the marketing version. Its build number uses the workflow run number. It prepares the offline files, creates/syncs a CocoaPods iOS project, adds microphone/speech descriptions, required-reason privacy manifest and iPhone/iPad support, archives, signs and uploads to TestFlight. macOS compilation remains unverified until that run succeeds.

## Assets and review checks
- Supply the approved opaque 1024×1024 icon to the generated Xcode AppIcon asset set before the release archive. The previously generated standalone icon is not currently in this checkout; do not ship the default Capacitor icon.
- Test purchases on both plans, used/unused trial accounts, cancellation, pending payments, restore, anonymous-to-parent linking, expired subscriptions and account deletion.
- Test Apple/Google/email sign-in and callback return in the actual shell. Native direct Apple and managed OAuth are different configurations, not interchangeable identities.
- Test microphone denial, speech permissions, hold/release/cancel, keyboard and audio on real iPhone and iPad, portrait and landscape.
- Test offline first launch and reconnection. The app requires a network connection to open the hosted application; it does not bundle the full learning UI. Review minimum-functionality risk remains for a hosted shell.
- Provide a working reviewer account and explain microphone usage, AI safety/reporting and subscriptions in review notes. Make sure the account has consent and a valid test entitlement.
- Review App Privacy for names, emails, identifiers, questions/user content, interaction/progress, speech provider processing, diagnostics and RevenueCat purchase data. Do not retain earlier “no purchase history” answers once billing is connected without reviewing the actual SDK data collected.
- Add privacy, support and Apple Standard EULA links to the listing. Verify public URLs after publication; this work did not change the deployment slug.
- Review incoming `content_reports` regularly in Cloud. Submission is persisted; it does not promise automatic email delivery or immediate human review.
- Complete Education-category metadata, accurate content rating, screenshots, export-compliance declaration and privacy disclosures. No automated audit guarantees Apple approval or child-privacy legal compliance.