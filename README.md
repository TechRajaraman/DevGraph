# DevGraph — Graph-Powered Developer Knowledge Explorer

DevGraph is a small graph-first application for exploring how developers, skills, projects, technologies and career roles connect.

## Assignment fit

This project was designed against the Wexa AI CognoDB take-home requirements: a thoughtful labeled graph model, realistic seed data, multi-hop Cypher, parameterized queries through the official Neo4j driver, a usable web UI, environment-based credentials and graceful database error handling.

## Why a graph database?

A developer is connected to skills, projects and companies; projects connect to technologies; skills map to technologies and are required by roles; technologies relate to other technologies and support roles. The important product questions are therefore path questions:

- Which technologies did a developer reach through their projects?
- What technologies are related to React?
- Which roles are connected to a developer’s current skill?
- What graph path connects a current skill to a target role?

A relational model can represent this information, but the core traversal questions become increasingly dependent on bridge tables and multi-join queries. The graph model represents the domain in the same shape as the questions.

## Graph model

```text
Developer ──HAS_SKILL──────> Skill ──MAPS_TO──────> Technology
    │                          │                         │
    │                          └─REQUIRED_FOR─> Role    ├─RELATED_TO─> Technology
    │                                                    └─SUPPORTS──> Role
    ├─WORKED_ON──────> Project ──BUILT_WITH────────────> Technology
    │                    │
    │                    └─BELONGS_TO─> Domain
    └─WORKS_AT───────> Company
```

Relationship properties include skill level/years, project role/duration, technology importance/reason and requirement importance.

## Architecture

```text
React + Vite
     │
     │ HTTP / JSON
     ▼
Express API
     │
     ├── Routes
     ├── Controllers
     ├── Services
     └── Cypher Query Layer
              │
              ▼
       Official Neo4j Driver
              │ Bolt
              ▼
           CognoDB
```

## UI preview

A static design preview is available at `docs/ui-preview.svg`. Capture the live application screens after deployment for the final submission screenshots.

## Features

- Dashboard with live graph counts and technology signals
- Developer search and profile explorer
- Technology search and relationship explorer
- Career Explorer powered by graph traversal
- Loading, empty and error states
- Parameterized Cypher
- Idempotent seed script
- API separation by feature
- Graceful 503 behavior when the graph database is unavailable

## Repository structure

```text
client/             React + Vite application
server/             Express API and CognoDB integration
docs/               Architecture, query and interview documentation
render.yaml         Backend hosting template
```

## Setup

### 1. Create CognoDB

Create a CognoDB Cloud instance and copy the generated Bolt URI and password. The assignment specifies a URI like `bolt+s://<instance-id>.databases.cognodb.cloud` and username `cognodb`.

### 2. Configure server

```bash
cp server/.env.example server/.env
```

Set:

```env
COGNODB_URI=bolt+s://<instance-id>.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=<your-secret>
COGNODB_DATABASE=neo4j
CLIENT_ORIGIN=http://localhost:5173
```

Never commit `.env`.

### 3. Configure client

```bash
cp client/.env.example client/.env
```

Keep:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

### 4. Install

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 5. Seed

```bash
npm run seed --prefix server
```

The seed is repeatable because it uses `MERGE` for nodes and relationships.

### 6. Run

```bash
npm run dev
```

Open `http://localhost:5173`.

## Important API endpoints

- `GET /api/dashboard`
- `GET /api/developers?search=react`
- `GET /api/developers/DEV-001`
- `GET /api/technologies/TECH-001`
- `GET /api/career/options`
- `GET /api/career/path?skillId=SKILL-001&roleId=ROLE-004`
- `GET /api/graph/developers/DEV-001/technologies`

## Testing

Run:

```bash
npm test
npm run lint
```

The server tests specifically assert parameterization and multi-hop query structure without requiring a live database.

## Hosting

The frontend is Vercel-ready through `client/vercel.json`. The backend includes a Render blueprint in `render.yaml`. Add the CognoDB secrets in the hosting provider’s environment settings.

The final submission still needs the actual hosted URL and screen recording requested by the assignment; those require deploying the project with your own CognoDB credentials.