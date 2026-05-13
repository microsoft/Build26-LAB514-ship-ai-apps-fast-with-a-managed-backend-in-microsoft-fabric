@lab.Title

# Get Started

> [!TIP]
> As you follow the instructions in this pane, whenever you see a `icon`, you can use it to copy text from the instruction pane into the virtual machine interface.

## Sign into Windows

In the virtual machine, sign into Windows using the following credentials:

- Username: `@lab.VirtualMachine(Win11-Pro-Base).Username`
- Password: `@lab.VirtualMachine(Win11-Pro-Base).Password`

## Lab Overview

This lab demonstrates how to go from zero to production with a full-stack enterprise app using Fabric Apps, the Rayfin SDK, and GitHub Copilot CLI. It shows how a managed backend in Microsoft Fabric can provide database, authentication, hosting, schema management, and deployment so builders can focus on product features instead of infrastructure plumbing.

The scenario centers on Contoso DIY, a home-improvement retailer expanding into home services. After customers choose products for projects like painting, hanging, or repairs, Contoso wants to connect them with qualified service pros who can complete the work in the field. To support this new business line, Contoso needs a work-order management app that allows:

- Managers to create work orders
- Managers to assign jobs to service pros
- Service pros to create profiles with their skills
- Service pros to accept and complete assigned jobs
- The business to track operational data and turn it into insights

Through the exercises, you'll explore how Contoso DIY:

- Bootstraps a production-ready field-services app from a template and uses Fabric Apps and Rayfin SDK to model service pros, work orders, authentication, data, and hosting declaratively
- Provisions a managed Fabric backend with a SQL database, authentication, and static hosting from day one — no infrastructure scripts, no migrations to write by hand
- Uses GitHub Copilot CLI and the Rayfin agent skill to add features across the schema and user interface, applying schema changes locally and in production without hand-writing migrations
- Seeds the deployed app with realistic data and uses Microsoft Fabric intelligence, semantic models, and data agents to ask natural-language questions about operational data

You'll walk in the Contoso DIY team's shoes to build, ship, evolve, and analyze a real enterprise app. The exercises are designed to be completed in order because each step builds on the app, data model, deployment, and resources created in the previous exercises, so make sure you complete each exercise before moving on to the next one.

Select **Next →** to go to start the lab.

===

# Setup & prerequisites

Before you can build, deploy, and explore the work-order app, you need to get your environment ready and sign in to GitHub, GitHub Copilot, and Microsoft Fabric.

## Prerequisites

Every tool and account needed is already installed in this guided lab, but here's what we'll use as a reference.

| | Guided lab | Your own environment |
|---|---|---|
| **Node.js 24+** | ✅ Pre-installed | Install from [nodejs.org](https://nodejs.org/) (LTS or current ≥ 24) |
| **npm** | ✅ Pre-installed | Bundled with Node.js |
| **Visual Studio Code** | ✅ Pre-installed | Install from [code.visualstudio.com](https://code.visualstudio.com/) |
| **GitHub Copilot CLI** | ✅ Pre-installed | Run `npm install -g @github/copilot` |
| **GitHub account with Copilot access** | Use the lab account | Use your own GitHub account with an active Copilot subscription |
| **Microsoft Fabric capacity** | Use the lab account | Bring your own Microsoft Fabric tenant |

> [!TIP]
> Even on the Skillable VM you still need to **sign in** to each service below.


## 1. Sign in to GitHub through the lab SSO portal

The lab uses a GitHub Enterprise SSO portal to grant access to GitHub Copilot.

1. Open a browser in the VM and go to:

   **[https://github.com/enterprises/skillable-events/sso](https://github.com/enterprises/skillable-events/sso)**

2. Sign in with these **Azure credentials**:
	- Username: `@lab.CloudPortalCredential(User1).Username`
    - Temporary Access Pass: `@lab.CloudPortalCredential(User1).AccessToken`

3. Once you're signed in, **keep this browser tab open** — Visual Studio Code will use this active session in the next step.

## 2. Sign in to GitHub Copilot in Visual Studio Code

1. Open Visual Studio Code.
2. Click the **Copilot** icon at the bottom-left of the window and choose **Sign in to use AI Features**.
    !image[copilot-sign-in.png ](instructions345417/copilot-sign-in.png "Screenshot showing how to sign in GitHub Copilot")
3. When prompted to choose a sign-in method, select **Continue with GitHub**.
4. Complete the browser flow using the SSO session you opened in the previous step.
5. Confirm the Copilot icon appears in the status bar with no error indicator.

## 3. Sign in to GitHub Copilot CLI

The GitHub Copilot CLI uses its own sign-in, separate from Visual Studio Code.

1. In Visual Studio Code, right-click in an empty space of the editor area's tabs bar and select **New Terminal** to open a terminal pane.
2. Start the Copilot CLI:

   ```sh
   copilot
   ```

3. When asked whether to trust the current folder, choose **Yes, and remember this folder for future sessions**.
4. At the Copilot CLI prompt, run:

   ```
   /login
   ```

5. When asked which account to sign in with, choose **GitHub.com**.
6. The CLI will display a device code and a URL. Copy the code, open the URL in your browser, paste the code, and complete the device authorization flow using the SSO session from Step 1.
7. *(Optional)* If the Copilot CLI prompts you that an update is available, run:

   ```
   /update
   ```

   to make sure you're on the latest version.
8. Once you see the signed-in confirmation in the CLI, type `/exit` (or press `Ctrl+C`) to leave the prompt. 

## 4. Sign in to Microsoft Fabric

1. In a browser, open [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com).
2. Sign in with these **Azure credentials**:
	- Username: `@lab.CloudPortalCredential(User1).Username`
    - Temporary Access Pass: `@lab.CloudPortalCredential(User1).AccessToken`
3. Confirm the Fabric portal loads.

## 5. Create a Fabric workspace and assign capacity

The lab deploys your app to a Microsoft Fabric workspace, which must be backed by a Fabric capacity.

1. In the Fabric portal, open **Workspaces** in the left navigation and click **+ New workspace**.
2. Give it a **unique** name (Fabric workspace names must be unique across the tenant). Add something distinctive like your initials or a random suffix, for example `lab514-workorders-<your-initials>`.
3. Expand **Advanced** → **Workspace type** and ensure **Fabric** is selected.
4. Pick the capacity:
   - **Guided lab:** Under **Details**, you should see a Fabric capacity already assigned to this workspace.
   - **Your own environment:** select your own Fabric capacity. If you don't have once, you can choose to activate a **Fabric trial**.
5. Click **Apply** to create the workspace.

You'll deploy into this workspace in later in the lab.

---

## ✅ Verify your setup

Back in the Visual Studio Code terminal you opened in Step 3, run these commands. All should succeed:

```sh
node --version          # v24.x.x
npm --version           # 10.x or newer
copilot --version       # GitHub Copilot CLI version
```

If any command fails, fix it before moving on. The rest of the lab assumes everything above is working.

Select **Next →** to start the first exercise.

===

# Bootstrap app from template

In this step you'll scaffold a brand-new project using Rayfin SDK using the **Field Services** template. Bootstrapping from a template saves time so we can focus on the interesting parts of the lab, but this app was originally generated using the **GitHub Copilot CLI template from the Rayfin CLI**. If you're curious, after the project is scaffolded you can look in the `/data` folder of the new project to see the original prompt and dataset that were used to generate it.

## What is Rayfin?
Rayfin is the SDK and CLI behind **Fabric Apps** — Microsoft Fabric's managed backend for full-stack apps. The **Rayfin SDK** is a set of TypeScript libraries: you describe your data model with decorators (`@entity`, `@uuid`, `@text`, `@one`…), and the SDK generates a typed client, a managed database schema, authentication, storage, and an HTTP/GraphQL API for you. The **Rayfin CLI** is the command-line tool that wires it all together: scaffold a project, provision a managed Fabric backend, apply schema changes, and deploy to a Fabric workspace. Together, they let you go from data model to a deployed full-stack app without writing infrastructure, migrations, or auth plumbing yourself.

---

## 1. Open a working folder

1. In Visual Studio Code, open the folder where you want your new project to live (for example, your home folder).
2. Open a terminal in Visual Studio Code (right-click in an empty space of the editor's area tabs bar → **New Terminal**).

## 2. Copy your Fabric workspace URL

You previously created a Fabric workspace. The bootstrap command needs that workspace's URL so the new project is wired to deploy into it.

1. Open [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com) in your browser.
2. From the left navigation, open **Workspaces** and click the workspace you created in Step 1 (for example, `lab514-workorders`).
3. Once the workspace page is open, copy the URL from the browser's address bar. It should look like:

   ```
   https://app.fabric.microsoft.com/groups/<workspace-id>
   ```

4. Keep this URL handy — you'll paste it into the next command.

## 3. Scaffold the project

In the Visual Studio Code terminal, create a new folder with:

```sh
mkdir field-services-app
cd field-services-app
```

Then run this command (replace `<workspace-uri>` with the URL you just copied):

```sh
npm create @microsoft/rayfin@latest -- --project-name field-services-app --template "C:/LabFiles/template/field-services-app" --workspace-uri <workspace-uri>
```

The CLI will:

- Copy the template files in the current directory
- Wire the project to your Fabric workspace using the `--workspace-uri` you provided
- Run `npm install` to pull dependencies (this can take a couple of minutes on first run)

## 4. Open the new project

Once the scaffolding finishes, open the new project in Visual Studio Code:

```sh
code .
```

You should see a folder structure that includes:

- `src/` — React + TypeScript frontend
- `rayfin/` — Rayfin backend configuration (`rayfin.yml`, data entities)
- `data/` — Seed data **and the original prompt + dataset used to generate this template** (worth a look if you're curious how it was built)
- `package.json` with `rayfin:dev`, `rayfin:db`, and `dev` scripts ready to go

We'll explore these folders in detail in the next page.

## 5. Initialize git and commit

Initialize a git repository so you can track changes and show clean diffs when we'll update the code.

In the Visual Studio Code terminal, from inside the new project folder, run:

```sh
# Set generic git user for the lab
git config --global user.email "lab@microsoft.com"
git config --global user.name "Build Lab"

# Initialize git, add files, and make the first commit
git init
git add .
git commit -m "Initial commit"
```

---

## ✅ Verify

- A new project folder was created and you can see it in the Visual Studio Code Explorer
- `npm install` completed without errors
- Running `npx rayfin --version` inside the new project prints a version number

Continue with **Next →** to explore the codebase.

===

# Explore the template

Before running the app, take a few minutes to look at what **rayfin** scaffolded for you. The Field Services template is a real, working full-stack app: a React + TypeScript frontend, a Rayfin-managed backend, authentication, and a starter data model. Knowing where things live will make the rest of the lab much easier.

> [!TIP]
> You don't need to fully understand every file, this is a guided tour. Skim, then move on.

## 1. Project layout

In Visual Studio Code, expand the project in the Explorer. The folders that matter for this lab:

| Folder / file | What it is |@lab.Activity(DataModelQuestion)

| --- | --- |
| `rayfin/rayfin.yml` | Rayfin app configuration — declares which managed services are turned on (auth, data, hosting…) |
| `rayfin/data/` | Backend data model — one TypeScript file per entity, plus a `schema.ts` that exports them |
| `src/` | React + TypeScript frontend |
| `src/services/` | Service layer that talks to the Rayfin backend (auth + data clients) |
| `src/pages/` | Page components — `Dashboard.tsx` (Service Pro + manager views), `AuthPage.tsx`, hidden `AdminPage.tsx` |
| `src/components/ui/` | Reusable UI components (Radix-based, styled with Tailwind CSS) |
| `data/` | The original spec (`SPEC.md`) and seed dataset (`work-orders.jsonc`) used to generate this template — informational only |
| `package.json` | Scripts: `dev`, `rayfin:dev`, `rayfin:db`, `dev:fabric`, `build`, `test` |
| `AGENTS.md` | High-level project guide intended for AI coding agents — useful reference for humans too |

You can ignore everything else for now (Vite/TypeScript/Tailwind config, generated files, etc.).

## 2. Open **rayfin/rayfin.yml**

This is the heart of the Rayfin app. It tells the platform which managed services to provision and how they're wired together.

Open `rayfin/rayfin.yml` and look at it:

```yaml
id: field-services-app
name: Field Services
version: 1.0.0
services:
  auth:
    enabled: true
    password:
      enabled: true
    fabric:
      enabled: true
    allowedRedirectUris:
      - http://localhost:5173
      - http://localhost:5173/auth/callback
  data:
    enabled: true
    dialect: mssql
  storage:
    enabled: false
  staticHosting:
    enabled: true
    folder: dist
    buildCommand: npm run build:fabric
    indexDocument: index.html
```

Notice:

- **`auth`** — the managed authentication service is on. Two providers are enabled: **password** (used for local development) and **fabric** (Microsoft Entra SSO, used when deployed to Microsoft Fabric).
- **`data`** — a managed SQL database is provisioned automatically; you don't need to set up any infrastructure.
- **`storage`** — turned off for this template, but available if your app needs blob storage.
- **`staticHosting`** — when you deploy with `rayfin up`, the frontend is built (`npm run build:fabric`) and the contents of `dist/` are served by Fabric.

You only declare *what* you need; the platform handles *how* to provision and wire it up.

## 3. Look at the data model in **rayfin/data/**

Open the `rayfin/data/` folder. You'll see three files: a per-entity file for each table, plus a `schema.ts` that aggregates them.

### **schema.ts**

```ts
import { ServicePro } from './ServicePro.js';
import { WorkOrder } from './WorkOrder.js';

export type FieldServiceSchema = {
  ServicePro: ServicePro;
  WorkOrder: WorkOrder;
};

export const schema = [ServicePro, WorkOrder];
```

Every entity you want in the database needs to be both imported and added to the `schema` array. You'll update this file later when you'll add a new entity through the GitHub Copilot CLI.

### **ServicePro.ts**

```ts
@entity()
@role('authenticated', '*')
export class ServicePro {
  @uuid() id!: string;
  @text({ min: 1, max: 100 }) name!: string;
  @text({ min: 1, max: 300 }) skills!: string;
  @text() user_id!: string;
  @date() createdAt!: Date;
  @date() updatedAt!: Date;
}
```

Notice the **decorators** (all imported from `@microsoft/rayfin-core`):

- `@entity()` — registers this class as a Rayfin entity (a database table).
- `@role('authenticated', '*')` — **any signed-in user** can perform **any** action (`'*'` = create, read, update, delete). For real-world data you'd usually narrow this with a `check: (claims, item) => claims.sub.eq(item.user_id)` row-level filter <!-- TODO: link to the Rayfin permissions guide on Microsoft Learn once it's published -->. For this lab the broad rule is fine.
- `@uuid()`, `@text({ min, max })`, `@date()` — type-safe column definitions with built-in validation. On MSSQL, always set a `max` on `@text` so DAB can generate an indexable column.

> [!help]
> **Why is `user_id` a `@text()` and not a `@uuid()` or a relationship?**
> `user_id` doesn't reference another Rayfin entity — it stores the JWT `sub` claim from whichever auth provider is active (Rayfin password locally, Microsoft Entra in Fabric). Entra `sub` values are opaque strings, not Rayfin-shaped UUIDs, and the signed-in user isn't exposed as a queryable Rayfin entity. So the convention is: **auth-derived identity fields use `@text()`; foreign keys to other Rayfin entities use `@uuid()`**.

### **WorkOrder.ts**

```ts
@entity()
@role('authenticated', '*')
export class WorkOrder {
  @uuid() id!: string;
  @text({ min: 1, max: 120 }) customer!: string;
  @text({ min: 1, max: 240 }) address!: string;
  @text({ min: 1, max: 240 }) task!: string;
  @date() scheduledAt!: Date;
  @set('pending', 'assigned', 'in_progress', 'completed', 'needs_followup', 'cancelled')
  status!: WorkOrderStatus;
  @uuid({ optional: true }) servicePro_id?: string;
  @one(() => ServicePro, { optional: true }) servicePro?: ServicePro;
  @text({ optional: true, max: 500 }) note?: string;
  @date() createdAt!: Date;
  @date() updatedAt!: Date;
}
```

Two new things to note:

- `@set(...)` defines an enum-like column constrained to a fixed list of string values. It compiles to a string column with a database `CHECK` constraint, so invalid values are rejected at the database layer.
- `@one(() => ServicePro, { optional: true })` declares a relationship to another entity. Rayfin auto-generates the foreign key column when you use `@one()` or `@many()`; the explicit `servicePro_id?: string` field above is included here only because the application code wants to read/write that ID directly.

These TypeScript classes are the **single source of truth** for the database schema. When you change them, Rayfin regenerates the database migration for you (you'll see this in the next pages).

## 4. (Optional) Peek at the frontend service layer

If you're curious how the frontend talks to the backend, open `src/services/`. The interesting files:

- `ServiceContainer.ts` — singleton that bootstraps the Rayfin client and auto-selects the right auth provider (password locally, Fabric Entra in production).
- `rayfin/RayfinFieldService.ts` — CRUD operations for `ServicePro` and `WorkOrder` using the typed Rayfin data API.

You don't need to understand the full implementation. Just notice that:

- The frontend uses a **typed client** generated from the schema you just looked at — so renaming a field in `rayfin/data/` shows up as a TypeScript error in the UI code right away.
- There's no hand-written REST client, no manual API plumbing.

---

## ✅ Knowledge check

@lab.Activity(DataModelQuestion)

@lab.Activity(ManagedServicesQuestion)

If any of those don't ring a bell, scroll back up before moving on.

---

Continue with **Next →** to run the app locally.

===

# Run the app

Now that you've toured the project, let's see it running. You'll **provision a Fabric backend** for the app with one command, then start the **frontend dev server**, and walk through the app's two views as a Service Pro and as a manager.

> [!NOTE]
> Rayfin can also run a full local backend in Docker, but for this lab we'll skip Docker entirely and use a Fabric-hosted backend from the start. The frontend still runs locally with Vite — only the database, auth, and API live remotely.

## 1. Provision the Fabric backend

In the Visual Studio Code terminal, from your project folder, run:

```sh
npx rayfin up --encryption-fallback-enabled
```

If this is the first time you run `rayfin up` on this machine, the CLI will open a browser to sign you in to Microsoft Entra (use the same account you used for the Fabric portal in the setup step). Then it will:

- **Create a Fabric App item** in the workspace you wired up at bootstrap.
- **Provision a managed SQL database** for your data model.
- **Apply your schema** (the `ServicePro` and `WorkOrder` entities) to that database.
- **Generate a publishable key** for the new backend.
- **Wire your frontend** to the new backend by writing the connection details and key into `.env.local` and `rayfin/.env`.

Watch the terminal for progress on each step. The first run takes a couple of minutes.

> [!TIP]
> The CLI saves the deployment details to `rayfin/.deployments.json` so subsequent `rayfin up` runs update the same deployment instead of creating a new one.

## 2. Start the frontend

In the same terminal, run:

```sh
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`. Because `rayfin up` already wrote the backend URL and publishable key into `.env.local`, Vite picks them up automatically — your locally-served frontend talks to the freshly provisioned Fabric backend with no extra configuration.

Open `http://localhost:5173` in your browser.

## 3. Sign up as a Service Pro

The auth page shows a **"Sign in with Microsoft Fabric"** button — the backend authenticates against Microsoft Entra (Fabric SSO).

1. Sign in with the same Microsoft account you used for Fabric.
2. After sign-in, you land on the **Service Pro view**. Fill in your name and a few skills (for example `painting, hanging, drilling`) and create your profile.
3. You'll see one pre-seeded work order ready to be assigned. **Accept it** and then **mark it complete**.

You can edit your profile later if needed in the profile view.

## 4. Switch to the manager view

The app also has a manager view at **/manager/**. It's not linked from the Service Pro UI on purpose. Go there directly by adding `/manager/` to the URL in the address bar.

In the manager view you can:

- Create new work orders (customer, address, task, scheduled date)
- Assign them to a Service Pro
- Track status across all jobs

Create a couple of new work orders and assign them to your Service Pro account. Click on **Jobs** in the nav bar to switch back to the Service Pro view and confirm they show up.

---

## ✅ Verify

- `rayfin up` finished without errors and printed a hosting URL and publishable key.
- `http://localhost:5173` loads the auth page with the **Sign in with Microsoft Fabric** button.
- You can sign up, create a Service Pro profile, accept the seeded work order, and create new ones from **/manager/**.

You're now running a real full-stack app — frontend on your machine, backend in the cloud — with no infrastructure to manage.

===

# Deploy to production

Surprise — your app is **already in production**. When you ran `npx rayfin up` to provision the backend in the previous step, the same command also packaged your frontend (`npm run build:fabric`), uploaded it to Fabric's managed static-hosting service, and deployed the schema. There is no separate "ship to prod" step in the Rayfin workflow: every `rayfin up` updates the live deployment.

What you've been testing locally with `npm run dev` is the same backend, same database, same schema as the live URL the CLI printed — just with the frontend served from your machine.

## 1. Open the live app

Look at the output of the previous `npx rayfin up` and find the **hosting URL** the CLI printed (it looks like `https://<random-prefix>.webapp.rayfin….com`).

If you missed it, run:

```sh
npx rayfin up status
```

to print the current deployment details, including the hosting URL.

Open the hosting URL in a browser tab where you're signed in to Microsoft Fabric. You'll see the same auth page as your local frontend — same **Sign in with Microsoft Fabric** button — because both are pointing at the same Fabric backend.

1. Sign in with the same Microsoft account.
2. You land in the Service Pro view, with the same profile and the same work orders you created from `localhost:5173` in the previous step. It's literally the same data, served from the same database.
3. Try creating a work order from `/manager/` on the live URL, then refresh `localhost:5173` — it shows up immediately.

That's it. There is no "deploy" gate to clear; the app you've been working on is already live for anyone with access to your Fabric workspace.

> [!TIP]
> **Want separate dev and prod environments?** Run `npx rayfin up` against a second Fabric workspace to create a separate deployment with its own backend, database, and frontend. Then switch between deployments anytime with `npx rayfin up switch`. Each deployment is tracked independently in `rayfin/.deployments.json`.

## 2. (Optional) Inspect the deployment in Fabric

To see your app item and its associated SQL Database in the Fabric portal:

1. Open [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com).
2. Open the workspace you created in the setup step.
3. You'll see your **Fabric data app** item alongside a **SQL Database** item — that's where your `ServicePro` and `WorkOrder` tables live.

You can also click the **Fabric portal link** that `rayfin up status` prints to jump straight to the deployment.

---

## ✅ Verify

- The hosting URL printed by `rayfin up` opens your live app and shows the **Sign in with Microsoft Fabric** button.
- After signing in, you see the same data you created locally in the previous step.
- The Fabric workspace contains a Fabric data app item and its associated SQL Database.

Continue with **Next →** to update the app with a new feature.

===

# Add a feature with Copilot CLI

So far you've built and shipped the template. Now let's **extend** it. You'll add a brand-new feature that touches both the data model and the UI: a **comments thread** on each work order, so service pros and the manager can communicate about a job over time.

The interesting part: you'll do this with the **GitHub Copilot CLI** as your software engineer. The **rayfin agent skill** teaches the agent how Rayfin entities, decorators, permissions, and the typed client work, so it can make changes that fit the project's conventions instead of guessing.

## 1. Install the rayfin agent skill

[**Agent skills**](https://agentskills.io/) are reusable bundles of instructions, conventions, and tooling that teach an AI coding agent how to work in a specific domain. The **rayfin agent skill** packages everything the Copilot CLI needs to know about Rayfin — entities, decorators, permissions, the typed client, the CLI workflow — so the agent generates code that fits Rayfin conventions instead of guessing. Under the hood, the skill talks to the **rayfin MCP server** (which ships in the template as the `@microsoft/rayfin-mcp` dev dependency), giving the agent live access to the official Rayfin docs while it works.

The rayfin agent skill is **installed automatically** when you scaffold the project from the template, so you're good to go. If you started from a blank slate or want to add it to an existing project, you can install it with the following command:

```sh
npx rayfin init ai-files install
```

This will install the necessary files in the project and configure the MCP server. These files can be committed to source control and shared across your team, so everyone has the same agent guidance.

On top of the skill, the template ships with an [**`AGENTS.md`**](https://agents.md/) file at the project root. `AGENTS.md` is a convention for project-level agent instructions: a single, predictable place where any AI coding agent looks for repo-specific guidance (architecture, key files, conventions). Open `AGENTS.md` and skim it: that's exactly the context the Copilot CLI will pick up when you start it in this project.

So once the skill is installed, the Copilot CLI has everything it needs: project-specific guidance from `AGENTS.md`, rayfin-wide best practices from the agent skill, and live Rayfin docs through the MCP server.

## 2. Open the Copilot CLI in your project

In Visual Studio Code, open a terminal at the **project root** and start the CLI:

```sh
copilot --yolo
```

When it asks whether to trust the workspace, choose **Always trust this workspace**.

> [!TIP]
> **What does --yolo do?** It auto-approves every tool call (file edits, terminal commands, MCP calls) without asking for confirmation each time. Great for an interactive lab where you want the agent to just *do the thing*, much slower without it. **Don't use --yolo against a repo with secrets, production data, or anything you can't easily revert**.

Once you're at the Copilot prompt, switch to a stronger model for this step. Run:

```
/model
```

Pick **GPT-5.4** with **low** reasoning effort. GPT-5.4 handles the multi-file refactor well, and "low" keeps responses fast enough for a live lab.

> [!TIP]
> The **/model** selection persists for the duration of this Copilot CLI session. If you exit and re-enter, set it again.

## 3. Prompt for the comments feature

At the Copilot prompt, paste:

```
Add comments to the work orders, with a history of interventions, so that service pros and the manager can communicate and ask questions about a work order. Comments must have: id, userId, createdAt, workOrderId, content. Keep the comments section folded by default in the UI. Only the service pro assigned to the work order and the manager can see the comments and add new ones. Don't apply the schema change yet on the backend, just generate the code.
```

The agent will:

- Plan the change and show you the files it intends to add or modify.
- Add a new **`Comment`** entity in `rayfin/data/`, with `@uuid`, `@text({ max: ... })`, `@date` decorators, and a `@one(() => WorkOrder)` relationship.
- Register the new entity in `rayfin/data/schema.ts`.
- Apply a `@role` rule so only the assigned service pro and the manager can read/create comments, using the row-level filter pattern you saw earlier during the code exploration.
- Update the React components for the work-order detail view to add a **collapsible "Comments" section**, fetch comments, and post new ones using the typed Rayfin data client.

## 4. Review what changed

Once the agent finishes, look through the changes in the Visual Studio Code Source Control view (or use `git status` / `git diff`).

Expect to see at least:

- A new file under `rayfin/data/` (e.g., `Comment.ts`)
- An updated `rayfin/data/schema.ts` exporting the new entity
- New or updated components under `src/components/` and/or `src/pages/`
- A new service or hook for talking to the comments API (e.g., extensions to `RayfinFieldService.ts` or `useFieldService.ts`)

> [!NOTE]
> **What you didn't have to do:** write a migration, hand-roll an API endpoint, build a REST client, wire up authorization middleware. The decorators + the typed client + the Copilot skill cover all of that for you.

## 5. Apply the schema and try it

We asked the agent **not** to run any database changes, so the new **Comment** entity exists only in TypeScript at this point. To actually try the feature in the browser, you need to push the schema to your Fabric backend.

In a terminal in your project folder, run:

```sh
npx rayfin up db apply
```

This compiles the decorators in `rayfin/data/` to a database migration and applies it to the Fabric SQL database. You should see a confirmation that the new `Comment` table was created.

> [!alert]
> If `rayfin up db apply` warns about destructive changes (dropping or renaming columns), review the listed operations carefully before re-running with `--force`. Adding a new entity or new optional fields should not trigger this warning.

You also need to update the backend APIs and redeploy the frontend with the new UI, so run:

```sh
npx rayfin up
```

Note that `rayfin up` runs the full deployment flow, which by default also includes applying any DB migrations (which we already did in the previous step). So it's not mandatory to run both `npx rayfin up db apply` and `npx rayfin up`, but sometimes it may be helpful to run them separately.

Now switch back to the frontend tab in your browser. If the new UI doesn't show up, restart the Vite dev server: in the terminal where `npm run dev` was running, stop it (`Ctrl+C`) and start it again:

```sh
npm run dev
```

In the browser:

- Sign in (as a service pro, then in another tab as the manager via `/manager/`).
- Open a work order that's assigned to you.
- Expand the new **Comments** section and post a couple of messages.
- Confirm the manager sees the same thread, and that an unrelated service pro does **not** (the `@role` filter the agent generated should hide them).

If anything is broken, head to the iterate step below.

## 6. (Optional) Iterate

If something looks off — wrong field name, missing validation, UI not folded by default or an error occurs, simply tell the agent. Examples:

```
This error appears in the UI, fix it: <paste error message or screenshot>
```

The agent applies refinements with the same project context, so you stay in flow without leaving the editor.

---

## ✅ Verify

- A new `Comment` entity exists in `rayfin/data/` and is exported from `schema.ts`.
- `npx rayfin up db apply` succeeded and the Fabric backend now includes the **Comment** table.
- `npx rayfin up` finished without errors and uploaded the updated frontend.
- The work-order UI has a **collapsible Comments section** (folded by default), and you can post comments end-to-end as a service pro and the manager — both at `localhost:5173` and at the live hosting URL.

You've shipped a real schema-backed feature end-to-end with two commands. 🎉 Next, let's seed the database with realistic data so we have something interesting to query in the next part.

===

# Seed test data

You shipped a real schema-backed feature in the previous step — schema applied to the Fabric backend, frontend redeployed, end-to-end working through the live URL. One thing remains before we move on to Fabric intelligence: **seed the database with a richer dataset** so the Fabric data agent in the next part has something interesting to work with.

## 1. Seed the database

The template ships with a hidden authenticated admin page at `/_admin/` that can:

- **Seed** the database with a large generated dataset of service pros and work orders (drawn from `src/data/field-service-seed.json`).
- **Reset** the database back to a single example work order.

It's not linked from the regular UI on purpose, go there directly by adding `/_admin/` to the deployed URL.

In the admin page:

1. Click **Seed database** (or the equivalent button).
2. Wait for the operation to complete. You'll see a confirmation with how many service pros and work orders were created.

Now go back to the Service Pro view and to the manager view at **/manager/**. You should see a much richer dataset: dozens of service pros across different skill sets, work orders in every status, addresses across multiple cities, etc.

> [!NOTE]
> **Why we're doing this:** in the next part we'll create a Fabric data agent over this app's database. A handful of seeded rows would make for boring queries, a few hundred makes the agent's natural-language answers more interesting.

## 2. (Optional) Add some comments

Pick a few work orders and post a couple of comments on each. The data agent in the next part can answer questions about comments too, and a sparse comments thread limits what you can ask.

---

## ✅ Verify

- You ran the seed in the admin page and the deployed app now has dozens of service pros and work orders.

You now have a meaningful production dataset to query.

===

[TODO: test and complete this section]

# Explore data with Fabric intelligence

Your app is live in Microsoft Fabric, with a real production database backing it. Now let's flip perspectives: instead of using the database to **power** the app, let's **interrogate** it with natural language using **Microsoft Fabric data agents**.

By the end of this step, the manager could ask "How many work orders are scheduled for next week?" or "Who's our most productive Service Pro?" and get answers in plain English, without writing a line of SQL.


The Fabric App deployment exposes a SQL Database in your Fabric workspace. We'll build a **Power BI semantic model** over it, publish it to Fabric, then create a **Fabric data agent** that uses the semantic model as a data source. Finally, we'll ask the agent questions: first from the Fabric portal, then optionally from a Python notebook.

## 1. Open the SQL Database from the Rayfin deployment

When you ran `npx rayfin up`, Fabric provisioned a SQL Database in your workspace alongside your app item.

1. Open [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com) and navigate to the workspace you created.
2. Locate the **SQL Database** item that belongs to your Rayfin deployment (its name starts with the same prefix as your Fabric data app item).
3. Click into it. From the database overview page, copy the **SQL connection string** — you'll need it in Power BI Desktop in the next section.

> [TODO: confirm exact item name pattern + screenshot of where to copy the SQL connection string from a Rayfin-deployed Fabric SQL Database.]

## 2. Build a Power BI semantic model over the database

A **semantic model** is the layer that gives the data agent a clean, well-described view of your data — table relationships, friendly names, descriptions — so it can translate natural language into accurate queries.

You'll build it in **Power BI Desktop**.

1. Launch **Power BI Desktop** from the Start menu.
2. Click **Get data** → **More…** → **Azure** → **Azure SQL Database** (or use the **Fabric** connector if available — both work for a Fabric-hosted SQL Database).
3. Paste the **server** and **database** names from the connection string you copied in Section 1.
4. Choose **DirectQuery** (or **Import** if you prefer a snapshot — DirectQuery keeps the model live against the production database).
5. When prompted for credentials, sign in with the same Microsoft account you've been using for Fabric (Microsoft Entra account / Microsoft account).
6. In the **Navigator**, select the tables you want to expose: at minimum **ServicePro**, **WorkOrder**, and **Comment**. Click **Load**.

Once loaded:

7. Open the **Model view** (the diagram icon on the left). Verify Power BI detected the relationship between **WorkOrder** and **ServicePro** via `servicePro_id`. If not, drag the FK column onto the matching `id` to create it.
8. Optional but recommended: rename columns to friendly names (e.g., `scheduledAt` → `Scheduled date`), add **descriptions** on tables and columns, and make sure date columns are typed as `Date` so the agent can answer time-based questions.

> [!TIP]
> **Why descriptive names matter:** the data agent uses table/column names and descriptions to interpret natural-language questions. `Scheduled date` is much more useful than `scheduledAt`. Spend a couple of minutes here, it pays back tenfold in agent answer quality.

> [TODO: add screenshots of the Get data wizard, navigator, and model view; link to the official Power BI semantic model docs.]

## 3. (Optional) Run "Prep for AI" in Power BI

Power BI has a feature called [**Prep for AI**](https://learn.microsoft.com/fabric/data-science/data-agent-semantic-model) that asks you to confirm AI-friendly schemas, sample questions, and verified answers. If you have time, run it now: it makes the data agent dramatically more accurate.

> [TODO: add specific Prep for AI steps relevant to this dataset, or skip this section if time-constrained in the lab.]

## 4. Publish the semantic model to your Fabric workspace

1. In Power BI Desktop, click **Publish** in the ribbon.
2. Sign in if prompted, and select the **same Fabric workspace** you've been working in.
3. Wait for publish to finish. The semantic model now lives in your Fabric workspace as a Power BI item.

## 5. Create a Fabric data agent

Back in the [Fabric portal](https://app.fabric.microsoft.com), in your workspace:

1. Click **+ New item** → choose **Data agent**.
2. Name it something descriptive, for example, `field-services-agent`.
3. When the agent opens, click **+ Add data source** in the **Explorer** panel on the left.
4. From the OneLake catalog, find the **Power BI semantic model** you just published, select it, and click **Add**.
5. In the **Explorer**, the model's tables appear. Check the boxes next to **ServicePro**, **WorkOrder**, and **Comment** so the agent can use them.
6. Click **Data agent instructions** in the toolbar and add a short note about the domain — for example:

   ```
   This is a field-services work-order management app. Service Pros perform jobs at customer addresses. WorkOrders have a status (pending, assigned, in_progress, completed, needs_followup, cancelled) and may be assigned to one ServicePro. Use ScheduledAt for time-based questions about when jobs happen.
   ```

7. Save the agent.

> [!TIP]
> **Permissions:** you only need **Read** on the semantic model to use it from a data agent, no Build or Write permissions are required.

## 6. Ask the agent a few questions

In the agent's chat pane, try a few natural-language questions:

- `How many work orders do we have in total?`
- `How many work orders are assigned to each Service Pro?`
- `Which Service Pro has the most completed jobs?`
- `List all work orders scheduled for the next 7 days.`
- `Which Service Pros have plumbing in their skills and are currently free (no in-progress jobs)?`

The agent generates a DAX query against the semantic model, runs it, and returns a structured answer (often with a table). You can also click **Show SQL/DAX** to see exactly what query it generated — useful both for trust and for debugging when the answer looks off.

If an answer is wrong or off-target:

- Refine your **Data agent instructions** with extra context.
- Check that the relevant table/column has a clear name and description in the semantic model.
- Re-run "Prep for AI" with verified answers for the question that misfired.

## 7. (Optional) Publish the agent and call it from a Python notebook

If you want to use the agent from code, **publish** it from the agent settings to get a published URL.

> [TODO: confirm the exact "publish agent" UI steps and where the published URL is shown.]

Then create a new **Notebook** item in your Fabric workspace and try the [Fabric Data Agent Python SDK](https://learn.microsoft.com/fabric/data-science/fabric-data-agent-sdk):

```python
%pip install -U fabric-data-agent-sdk
```

```python
from fabric.dataagent.client import FabricDataAgentClient

agent = FabricDataAgentClient(data_agent_name="field-services-agent")
response = agent.ask("How many work orders are scheduled for next week?")
print(response)
```

> [!NOTE]
> **The Fabric Data Agent SDK only runs inside Fabric notebooks** — it isn't supported for local execution. The notebook handles authentication automatically using your Fabric session.

For richer programmatic access patterns (calling from outside Fabric, integrating with an Azure AI agent, etc.), see [Consume Fabric data agent from Microsoft Foundry Services](https://learn.microsoft.com/fabric/data-science/data-agent-foundry).

---

## ✅ Verify

- A Power BI semantic model over the Rayfin SQL database is published in your Fabric workspace.
- A Fabric data agent in the same workspace lists **ServicePro**, **WorkOrder**, and **Comment** as available tables.
- The agent answers at least three plain-English questions about your seeded data with reasonable accuracy.
- *(Optional)* a Fabric notebook calls the published agent and prints a response.

===

# 🎉 You're done

In one lab session you just:

1. Bootstrapped a full-stack Fabric App from a template.
2. Ran it locally with **rayfin CLI**.
3. Deployed it to Microsoft Fabric with one command.
4. Added a real schema-backed feature using the GitHub Copilot CLI and the rayfin agent skill.
5. Pushed the change back to production with the same one-command deploy.
6. Seeded production data and built a natural-language interface over it with a Fabric data agent.

No infrastructure scripts. No migration files written by hand. No bespoke auth plumbing. **From zero to a deployed, intelligent enterprise app — using a managed backend, decorators, and coding agents.**

I hope you enjoyed the lab and are excited about the possibilities of building with Microsoft Fabric and Rayfin SDK. The tools and patterns you saw here are designed to help you build faster, smarter, and more maintainable applications on top of Microsoft Fabric's powerful data and AI capabilities.
