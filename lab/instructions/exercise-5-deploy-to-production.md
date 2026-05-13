# Exercise 5: Deploy to Production on Microsoft Fabric

Surprise! Your app is **already in production**. When you ran `npx rayfin up` to provision the backend in Exercise 4, the same command also packaged your frontend (`npm run build:fabric`), uploaded it to Fabric's managed static-hosting service, and deployed the schema. There is no separate "ship to prod" step in the Rayfin workflow: every `rayfin up` updates the live deployment.

What you've been testing locally with `npm run dev` is the same backend, same database, same schema as the live URL the CLI printed, just with the frontend served from your machine.

## Task 1: Open the live app

1. Look at the output of the previous `npx rayfin up` from Exercise 4 and find the **hosting URL** the CLI printed (it looks like `https://<random-prefix>.webapp.rayfin….com`).

    ![Rayfin up command output](../media/rayfin-up.png)

    > [!Tip]
    > If you missed it, run `npx rayfin up status` from the `field-services-app` folder to print the current deployment details.

1. Open the hosting URL in a new browser tab where you're signed in to Microsoft Fabric. You'll see the same auth page as your local frontend — same **Sign in with Microsoft Fabric** button — because both are pointing at the same Fabric backend.

1. Select **Sign in with Microsoft Fabric**. If asked, use the same credentials as before:

    - **Email**: `@lab.CloudPortalCredential(User1).Username`
    - **TAP**: `@lab.CloudPortalCredential(User1).AccessToken`

1. You land in the Service Pro view, with the same profile and the same work orders you created earlier in the previous exercise. It's literally the same data, served from the same database.

1. Navigate to `/manager/` and and create a couple of new work orders.

That's it. There is no "deploy" gate to clear: the app you've been working on is already live for anyone with access to your Fabric workspace.

> [!Tip]
> **Want separate dev and prod environments?** Run `npx rayfin up` against a second Fabric workspace to create a separate deployment with its own backend, database, and frontend. Then switch between deployments anytime with `npx rayfin up switch`. Each deployment is tracked independently in `rayfin/.deployments.json`.

## Task 2 (Optional): Inspect the deployment in Fabric

To see your app item and its associated SQL Database in the Fabric portal:

1. Open the Fabric portal at: `https://app.fabric.microsoft.com`.

1. Open the `Lab514-workorders-@lab.LabInstance.Id` workspace you created in Exercise 1.

1. You'll see your **Fabric data app** item alongside a **SQL Database** item — that's where your `ServicePro` and `WorkOrder` tables live.

You can also click the **Fabric portal link** that `rayfin up status` prints to jump straight to the deployment.

---

## ✅ Verify

- The hosting URL printed by `rayfin up` opens your live app and shows the **Sign in with Microsoft Fabric** button.
- After signing in, you see the same data you created locally in the previous exercise.
- The Fabric workspace contains a Fabric data app item and its associated SQL Database.

Next → [6. To Add a new Feature to the app](../instructions/exercise-6-new-feature.md)

