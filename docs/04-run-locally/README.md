# Run the app locally

Now that you've toured the project, let's see it running. You'll **provision a Fabric backend** for the app with one command, then start the **frontend dev server**, and walk through the app's two views as a Service Pro and as a manager.

## 1. Provision the Fabric backend

In the Visual Studio Code terminal, from your project folder, run:

```sh
npx rayfin up --encryption-fallback-enabled
```

If this is the first time you run `rayfin up` on this machine, the CLI will open a browser to sign you in to Microsoft Entra (use the same account you used for the Fabric portal in Step 1). Then it will:

- **Create a Fabric App item** in the workspace you wired up at bootstrap.
- **Provision a managed SQL database** for your data model.
- **Apply your schema** (with your entities) to that database.
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

This starts the Vite dev server on `http://localhost:5173`. Open that URL in your browser.

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

You're now running a real full-stack app — frontend on your machine, backend in the cloud.
