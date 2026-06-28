# Security and Data Protection

Book Nook is currently a local prototype. The app now includes baseline defensive controls, but it should not be used with real personal data until a production data store, deployment, and privacy process are in place.

## Implemented Controls

- Passwords are validated server-side and stored with salted PBKDF2 hashes.
- Bearer sessions are stored server-side as SHA-256 digests, not raw tokens.
- Sessions expire after `BOOKNOOK_SESSION_TTL_MINUTES` and can be revoked with `POST /auth/logout`.
- Login attempts are rate-limited and locked after repeated failures.
- API requests are rate-limited by client, method, and path.
- Request bodies are size-limited with `BOOKNOOK_MAX_REQUEST_BYTES`.
- CORS and trusted hosts are restricted by environment variables.
- API responses include defensive security headers and `Cache-Control: no-store`.
- Location is normalized to city-level data during registration.
- Frontend auth tokens are kept in `sessionStorage`, with cleanup of older `localStorage` tokens.
- Account export and deletion endpoints are implemented for the prototype data store.
- Signup legal summaries were reviewed against implementation: controller contact, categories, purposes, lawful basis, rights, retention, no third-party AI sharing, no optional analytics, no remember-me cookie, and city-level location only.
- A pre-signup age gate blocks under-13 account creation because verifiable parental consent is not implemented.

## Environment Controls

Use these settings in production-like environments:

```text
BOOKNOOK_ALLOWED_ORIGINS=https://your-frontend.example
BOOKNOOK_ALLOWED_HOSTS=api.your-domain.example
BOOKNOOK_SESSION_TTL_MINUTES=120
BOOKNOOK_MAX_REQUEST_BYTES=65536
BOOKNOOK_RATE_LIMIT_MAX=90
BOOKNOOK_AUTH_RATE_LIMIT_MAX=10
BOOKNOOK_FAILED_LOGIN_LIMIT=5
BOOKNOOK_LOGIN_LOCKOUT_SECONDS=900
BOOKNOOK_ENABLE_DOCS=0
```

## Required Before Real Users

- Replace in-memory data with a managed database using encryption at rest, migrations, backups, and least-privilege credentials.
- Serve only over HTTPS and put secure proxy headers in front of the API.
- Move browser auth to secure, httpOnly, SameSite cookies or another reviewed auth pattern.
- Add CSRF protection if cookie auth is introduced.
- Add structured audit logging for auth, reports, moderation, and data export/deletion actions.
- Add production-grade data deletion, data export, retention, and moderation workflows.
- Replace the prototype legal summaries with reviewed production legal documents before launch.
- Complete a jurisdiction-specific legal review for UK GDPR/Data Protection Act, PECR, ICO Children's Code, COPPA, US state privacy laws where applicable, consumer terms, and online safety obligations before real users.
- Store secrets outside the repo using a secret manager or deployment environment.
- Add dependency scanning and periodic security updates.
- Add automated API tests for auth, rate limits, authorization, and validation.
