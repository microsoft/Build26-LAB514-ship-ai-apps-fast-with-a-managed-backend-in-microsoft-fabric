# Deploy to production

Surprise! Your app is **already in production**. When you ran `npx rayfin up` to provision the backend in the previous step, the same command also packaged your frontend (`npm run build:fabric`), uploaded it to Fabric's managed static-hosting service, and deployed the schema. There is no separate "ship to prod" step in the Rayfin workflow: every `rayfin up` updates the live deployment.

What you've been testing locally with `npm run dev` is the same backend, same database, same schema as the live URL the CLI printed, just with the frontend served from your machine.

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

## 2. Inspect the deployment in Fabric

To see your app item and its associated SQL Database in the Fabric portal:

1. Open [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com).
2. Open the workspace you created in Step 1.
3. You'll see your **Fabric data app** item alongside a **SQL Database** item, that's where your `ServicePro` and `WorkOrder` tables live.

You can also click the **Fabric portal link** that `rayfin up status` prints to jump straight to the deployment.

---

## ✅ Verify

- The hosting URL printed by `rayfin up` opens your live app and shows the **Sign in with Microsoft Fabric** button.
- After signing in, you see the same data you created locally in the previous step.
- The Fabric workspace contains a Fabric data app item and its associated SQL Database.

Continue with **Next →** to update the app with a new feature.


