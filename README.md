# SmartDrop — Frontend

**Angular application for intelligent water and liquid-resource management.**

**Frontend implementation:** Francisco Javier Uribe Linares
**Project type:** Independent software development / Full-Stack portfolio project

## Overview

SmartDrop is a software project focused on monitoring and managing water and liquid resources. This repository contains the **Angular frontend**, including the user interface for monitoring, alerts, account management, reporting, and other administrative workflows.

The frontend was implemented independently by **Francisco Javier Uribe Linares**. Backend services and the public landing page are maintained in separate repositories.

## Application modules

The codebase includes interfaces and components for:

- **Dashboards and monitoring:** views for resource-monitoring information.
- **Alerts:** screens for reviewing alerts.
- **Identity and access management:** login, registration, password recovery and reset, and two-factor authentication setup and verification screens.
- **User administration:** administrative user-management views.
- **Reports and billing:** dedicated reporting and billing modules.
- **Business and profile views:** related user and business interfaces.
- **Internationalization:** translation tooling based on `@ngx-translate`.

> These items describe modules and screens present in the repository. Backend-dependent operations require the corresponding services and configuration.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Angular 21 |
| Language | TypeScript 5.9 |
| UI | Angular Material and Angular CDK |
| Reactive programming | RxJS |
| Localization | `@ngx-translate/core` and `@ngx-translate/http-loader` |
| Testing | Angular test command with Vitest in development dependencies |
| Package manager | npm |

## Project structure

```text
src/app/
├── admin-users/          # User administration
├── alerts/               # Alerts interface
├── billing/              # Billing interface
├── business/             # Business interface
├── dashboard/            # Dashboard views
├── iam/                  # Authentication and account-access screens
├── monitoring/           # Monitoring views
├── profile/              # User profile
├── reports/              # Reports interface
├── app.config.ts         # Application configuration
└── app.routes.ts         # Application routing
```

## Local setup

**Prerequisites:** a Node.js version supported by Angular 21 and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/FranciscoLinaresDev/SmartDrop-Frontend.git
   cd SmartDrop-Frontend
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Verify the local API proxy configuration. The `npm start` script references `proxy.conf.json`; ensure it exists and points to the appropriate development backend.

4. Start the development server:

   ```bash
   npm start
   ```

   Angular typically serves the application at `http://localhost:4200/` unless another port is configured.

### Build and tests

```bash
npm run build
npm test
```

Do not commit API secrets, credentials, or machine-specific configuration.

## Related repositories

- [SmartDrop Backend](https://github.com/FranciscoLinaresDev/SmartDrop-Backend)
- [SmartDrop Landing](https://github.com/FranciscoLinaresDev/SmartDrop-Landing)

## Development and attribution

**Frontend software implementation:** Francisco Javier Uribe Linares — independent development.

The original academic project documentation is preserved at [`docs/academic-project-report.md`](docs/academic-project-report.md), including its recorded group activities and acknowledgements. That document is retained as an archival record; this README describes the software implementation represented in this repository. Existing Git commit authorship is preserved.
