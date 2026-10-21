# SmartDrop — Frontend

**Water and liquid-resource monitoring dashboard built with Angular and TypeScript.**

[**Live application**](https://smartdrop-portfolio.netlify.app/) · [**Backend repository**](https://github.com/FranciscoLinaresDev/SmartDrop-Backend)

## Overview

SmartDrop is a full-stack portfolio project for viewing sensor information and managing water or other liquid resources. This repository contains the Angular client, integrated with a Java/Spring Boot REST API and a persistent MySQL database.

The production site is deployed on **Netlify** and uses a same-origin `/api/*` reverse proxy to reach the backend hosted on **Railway**.

## Implemented functionality

- **Authentication:** login backed by the REST API, JWT handling, protected Angular routes, and session management.
- **Device monitoring:** view persisted sensor records, status, location, flow, daily usage, and battery level; authorized users can use device-management forms.
- **Tank management:** view stored tanks, capacities, current levels, and fill percentages; management actions are available to appropriately authorized users.
- **Read-only portfolio demo:** the account `demo@smartdrop.io` can view supported inventory data, while create, update, delete, and replenish controls are hidden. The API independently enforces these restrictions with `ROLE_DEMO`.
- **Dashboard metrics:** summary cards computed from available device data.
- **Localization:** Spanish and English user-interface options.
- **Additional interfaces:** screens for alerts, reports, support, billing, profile, and account administration. Their presence in the UI does **not** imply that every related backend workflow is enabled in the public deployment.

### Demo limitations and data transparency

- The consumption chart is **illustrative**: it is derived from recorded daily consumption and is **not** real hourly telemetry.
- Water temperature is shown as unavailable when no measurement is supplied.
- Irrigation control is **not connected to physical IoT hardware** and is explicitly marked unavailable.
- The demo is designed for exploration without modifying shared production records.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Angular 21, TypeScript 5.9 |
| UI | Angular Material, Angular CDK, SCSS |
| HTTP and reactive APIs | Angular HttpClient, RxJS |
| Localization support | `@ngx-translate` packages and application language service |
| Hosting | Netlify |
| Backend | Spring Boot REST API deployed on Railway |
| Database | MySQL (managed by the backend) |

## Public demonstration

**URL:** https://smartdrop-portfolio.netlify.app/

**Read-only account:** `demo@smartdrop.io`

For security, the demo password is not stored in this repository. Share demo credentials separately when granting access to reviewers. The public demo permits reading supported tank and device data only.

## Running locally

**Requirements:** Node.js compatible with Angular 21, npm, and access to a configured backend.

```bash
git clone https://github.com/FranciscoLinaresDev/SmartDrop-Frontend.git
cd SmartDrop-Frontend
npm ci
npm start
```

The development server normally runs at `http://localhost:4200/`. The `npm start` script uses `proxy.conf.json` to proxy API requests; configure a reachable development backend before testing authenticated workflows.

To create a production build:

```bash
npm run build
```

To run the configured frontend test command:

```bash
npm test
```

## Production deployment

The production branch is **`main`**. Netlify builds the application using:

```text
Build command: npm run build
Publish directory: dist/SmartDrop/browser
```

`netlify.toml` forwards `/api/*` to the backend on Railway and provides an SPA fallback for Angular routing. API tokens are attached by the Angular authentication interceptor; no database credentials belong in the frontend.

## Source organization

```text
src/app/
├── dashboard/   # Device monitoring and dashboard
├── business/    # Tank management
├── iam/         # Authentication and account access
├── alerts/      # Alerts interface
├── reports/     # Reports interface
├── billing/     # Billing interface
├── support/     # Support interface
├── profile/     # Profile interface
└── shared/      # Layout and shared services
```

## Security approach

UI controls are conditionally hidden for the dedicated demo account to improve the experience. **Frontend visibility checks are not an authorization boundary**: Spring Security validates JWT authentication and enforces role-based restrictions server-side.

Do not commit access tokens, credentials, or production environment secrets.

## Related repositories

- [SmartDrop Backend](https://github.com/FranciscoLinaresDev/SmartDrop-Backend)
- [SmartDrop Landing](https://github.com/FranciscoLinaresDev/SmartDrop-Landing)

## Development and project context

**Frontend implementation:** Francisco Javier Uribe Linares.

The archived academic-project documentation is preserved under [`docs/academic-project-report.md`](docs/academic-project-report.md), with original group activities and acknowledgments. This README describes the implementation and current public demonstration; Git history retains its original authorship.
