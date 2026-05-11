# Deploy to production

You've seen the app run locally. Now let's take the **same code, same schema, same auth wiring** and ship it to Microsoft Fabric — no infrastructure to provision, no migrations to write, no deployment pipeline to set up. One command.

> [!NOTE]
> The Fabric workspace and capacity you set up earlier is the deployment target. The bootstrap command you used already wired your project to that workspace via `--workspace-uri`.

## 1. Run **rayfin up**

From the project folder, in a new terminal, run:

```sh
npx rayfin up --encryption-fallback-enabled
```

If this is the first time you deploy from this machine, the CLI will:

1. **Open a browser** to sign you in to Microsoft Entra (use the same account you used before if asked).
2. **Create a Fabric App item** in your Fabric workspace.
3. **Retrieve the publishable key** for the deployed backend.
4. **Sync `rayfin.yml`** settings to the remote service (auth, data, static hosting flags).
5. **Apply your data model** to the remote SQL database — same TypeScript decorators, same schema you used locally.
6. **Build and deploy your frontend** — runs `npm run build:fabric`, packages `dist/` into a ZIP, uploads it, and serves it from the managed static-hosting service.
7. **Save deployment details** to `rayfin/.deployments.json` and `rayfin/.env` so future `rayfin up` runs update the same deployment instead of creating a new one.

The whole flow takes a couple of minutes the first time. The CLI streams progress for each step.

When it finishes, the CLI prints:

- A **hosting URL** — your live app.
- A **Fabric portal link** — to manage the deployment in the Fabric UI.
- A **deployment ID** — for reference.

[TODO — capture and link a screenshot of the `rayfin up` final output]

## 2. Open the deployed app

Open the **hosting URL** the CLI printed. The auth page now looks different from local — you'll see a **"Sign in with Microsoft Fabric"** button instead of email + password.

That's because deployed Rayfin apps **only support Fabric brokered authentication (Microsoft Entra SSO)**. Email/password is local-dev only. The same **rayfin.yml** had both providers enabled: Rayfin's auth layer auto-selects the right one based on where the app runs.

1. Sign in with the same Fabric account.
2. You're back in the Service Pro view. Create your profile, accept the seeded work order, same flow as local.
3. Go to `/manager/` and create a couple of new work orders.

You're now using the **production database** running in your Fabric workspace.

## 3. (Optional) Check the deployment

To inspect deployment health later:

```sh
npx rayfin up status
```

To see your app item in the Fabric portal, click the **Fabric portal link** printed by `rayfin up`, or open the workspace you created in [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com).

---

## ✅ Verify

- `rayfin up` completed with no errors and printed a hosting URL.
- The hosting URL opens your app and shows the **"Sign in with Microsoft Fabric"** button.
- After signing in, you can create a Service Pro profile and work orders against the deployed backend.

Continue with **Next →** to update the app with a new feature.

