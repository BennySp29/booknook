# Market Readiness Plan

Book Nook is moving from prototype toward a testable market-ready product. This checklist tracks what is done, what is in progress, and what still blocks real users.

## Done In This Pass

- Baseline API security controls: hashed passwords, expiring sessions, logout, rate limits, request size limits, CORS, trusted hosts, and security headers.
- Signup legal summaries aligned to implementation.
- Account export and deletion endpoints for prototype data.
- City-level-only location storage.
- Under-13 signup block because verifiable parental consent is not implemented.
- PWA/home-screen manifest and service worker update path for testers.
- Visible app version/test build marker.
- Persistent backend storage using SQL tables, with local SQLite for development and Postgres through `BOOKNOOK_DATABASE_URL`/`DATABASE_URL` for hosted environments.

## Before External Beta

- Choose a non-expiring production database plan/provider. Render Free Postgres expires after 30 days and is not suitable for real user data.
- Add database migrations, backup/restore testing, and deletion/retention jobs.
- Add automated backend tests for auth, access control, export/delete, rate limits, and validation.
- Add frontend flow tests for signup, consent, shelf, exchange, export/delete, and installed-app update behavior.
- Add production HTTPS deployment with managed secrets and environment-specific CORS/host values.
- Add structured audit logs for auth, reports, export/delete, moderation, and security events.
- Add a moderation queue for reports and unsafe exchange content.
- Add real account/profile edit flows.
- Add data retention jobs and account deletion confirmation windows.
- Replace prototype legal summaries with reviewed production legal documents.
- Complete a DPIA/privacy impact review and jurisdiction-specific legal review.

## Before Public Launch

- Add monitoring, alerting, uptime checks, and error reporting.
- Add dependency scanning and scheduled update process.
- Run accessibility review against WCAG 2.2 AA.
- Run performance review on low-end mobile devices.
- Run security review and penetration test of deployed environment.
- Prepare support/contact, takedown, dispute, and abuse workflows.
- Prepare app listing assets if distributing via app stores, or finalize PWA install instructions if web-only.

## Tester Release Process

1. Bump `APP_VERSION` in [src/release.js](src/release.js) and `CACHE_VERSION` in [public/sw.js](public/sw.js).
2. Run `npm.cmd run build` and `npm.cmd run lint`.
3. Run backend compile and API smoke tests.
4. Deploy backend with durable `BOOKNOOK_DATABASE_URL`/`DATABASE_URL` and production CORS/host settings.
5. Deploy frontend with `VITE_API_BASE_URL` pointing at the backend.
6. Ask testers with home-screen installs to open Book Nook once; the service worker checks for updates and reloads after the new version activates.
