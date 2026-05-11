# Run the app locally

Now that you've toured the project, let's see it running. You'll start the **Rayfin backend** (database, auth, data API) locallt, then the **frontend dev server**, and finally walk through the app's two views as a Service Pro and as a manager.

> [!TIP]
> The local backend is a full Rayfin environment running in Docker on your machine — same shape as production, just running locally.

## 1. Start the Rayfin backend

In the Visual Studio Code terminal, from your project folder, run:

```sh
npx rayfin dev
```

This will:

- Start Docker containers for every service enabled in `rayfin/rayfin.yml` (database, auth, data API).
- Run health checks until everything is ready.
- **Auto-apply your data model** to the local database (you don't need a separate `db apply` on first run).

Leave this running. You'll see logs streaming in the terminal — when it's ready, the CLI prints the URLs for the local backend and the **publishable key** the frontend uses to connect.

> [!help] 
> If `rayfin dev` complains about Docker, make sure Docker Desktop is running.

> [!TIP]
> The rayfin backend will keep running in the background, even if you close the terminal or Visual Studio Code. To stop it, run `npx rayfin dev stop` from your project folder.

### (Optional) Enable the Aspire dashboard

If you'd like to see live telemetry — request logs, traces, and service health — stop the backend with `npx rayfin dev stop` and restart it with the `--debug` flag:

```sh
npx rayfin dev --debug
```

The CLI will print an **Aspire dashboard** URL alongside the backend URLs. Open it in your browser to inspect what the backend is doing as you click around the app. You'll be able to see log traces here, which is super helpful for debugging and understanding how the different services interact.

## 2. Open the data API explorer

Once `rayfin dev` is up, open the URL the CLI printed for the local backend (typically `http://localhost:5168`) in your browser. You'll land on the **OpenAPI / Swagger UI** for your data API, generated automatically from the entities in **rayfin/data/**.

Try expanding the **ServicePro** or **WorkOrder** endpoints: every entity gets full CRUD operations for free, with the validation and authorization rules from your decorators applied.

## 3. Start the frontend

In the VS Code terminal run:

```sh
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`. Open that URL in your browser.

## 4. Sign up as a Service Pro

Locally, Rayfin uses **email + password** auth (in production, the same app uses Microsoft Entra SSO, no code change required).

1. On the auth page, switch to **Sign up** and create an account with any email + password.
2. After sign-in, you land on the **Service Pro view**. Fill in your name and a few skills (for example `painting, hanging, drilling`) and create your profile.
3. You'll see one pre-seeded work order ready to be assigned. **Accept it** and then **mark it complete**.

You can edit your profile later if needed in the profile view.

## 5. Switch to the manager view

The app also has a manager view at **/manager/**. It's not linked from the Service Pro UI on purpose. Go there directly by adding `/manager/` to the URL in the address bar.

In the manager view you can:

- Create new work orders (customer, address, task, scheduled date)
- Assign them to a Service Pro
- Track status across all jobs

Create a couple of new work orders and assign them to your Service Pro account. Click on **Jobs** in the nav bar to switch bar to the service pro view and confirm they show up.

---

## ✅ Verify

- The terminal running `rayfin dev` shows all services healthy. You can use `npx rayfin dev status` to check the status of each service at any time.
- The Swagger UI for your local backend opens in the browser.
- `http://localhost:5173` shows the auth page.
- You can sign up, create a Service Pro profile, accept the seeded work order, and create new ones from **/manager/**.

When you're ready to take the app to production, leave the local servers running and head to the next step.
