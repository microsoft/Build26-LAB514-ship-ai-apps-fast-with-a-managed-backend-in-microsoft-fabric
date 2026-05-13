# Exercise 4: Run the App Locally

In this exercise, you will run the Field Services app locally.

You will:

- **Provision a Fabric backend** for the app with one command
- Start the **frontend dev server** locally
Then you will sign in, create a Service Pro profile, complete a work order, and test the manager view.



## Task 1: Provision the Fabric backend

The `rayfin up` command provisions a managed backend (database, auth, data API) in your Fabric workspace and wires your local frontend to talk to it.

1. Use the terminal from the previous exercise. It should already be in the `field-services-app` folder.



1. Provision the Fabric backend by running:

    ```shell
    npx rayfin up
    ```

1. As this is your first time deploying, the CLI will:

    - Open a browser to sign you in to Microsoft Entra (use the same Microsoft Fabric account you used in Exercise 1).
    - **Create a Fabric App item** in the workspace you wired up at bootstrap.
    - **Provision a managed SQL database** for your data model.
    - **Apply your schema** to that database.
    - **Generate a publishable key** for the new backend.
    - **Wire your frontend** to the new backend by writing the connection details and key into `.env.local` and `rayfin/.env`.

1. Watch the terminal for progress on each step. The first run takes a couple of minutes.

1. When the command finishes, the CLI prints the deployment details, including the backend URL.

> [!Tip]
> The CLI saves the deployment details to `rayfin/.deployments.json` so subsequent `rayfin up` runs update the same deployment instead of creating a new one.

## Task 2: Start the frontend

The frontend is the React app that users interact with.

1. In the same terminal, start the Vite dev server:

    ```shell
    npm run dev
    ```

    Because `rayfin up` already wrote the backend URL and publishable key into `.env.local`, Vite picks them up automatically. Your locally-served frontend talks to the freshly provisioned Fabric backend with no extra configuration.

1. Open the local frontend URL shown in the terminal.

    It should look similar to `http://localhost:5173`.

1. Confirm that the app sign-in page opens.

## Task 3: Sign up as a Service Pro

The auth page shows a **"Sign in with Microsoft Fabric"** button — the backend authenticates against Microsoft Entra (Fabric SSO).

1. Select the **"Sign in with Microsoft Fabric"** button. Use the same Microsoft Fabric account you signed in with in Exercise 1:

    - **Email**: `@lab.CloudPortalCredential(User1).Username`
    - **Password**: `@lab.CloudPortalCredential(User1).Password`

1. After sign-in, create your Service Pro profile.

1. Enter your name.

1. Enter a few skills, such as:

    ```text
    painting, hanging, drilling
    ```

1. Save the profile.

1. In the **Jobs** view, find an available work order.

1. Accept the work order.

1. Mark the work order complete.

## Task 4: Explore the manager view

The same app also includes a manager view.

1. In the browser, go to the manager URL:

    ```text
    http://localhost:5173/manager/
    ```

1. Review the manager view.

1. Create a new work order.

1. Assign the work order to your Service Pro profile.

1. Select **Jobs** in the navigation bar.

1. Confirm that the assigned work order appears for the Service Pro.

## Verify Your Setup

Before moving on, confirm that everything is working:

- `rayfin up` finished without errors and printed a hosting URL and publishable key.
- The frontend opens at `http://localhost:5173` and shows the **Sign in with Microsoft Fabric** button.
- You can sign up, create a Service Pro profile, accept the seeded work order, and create new ones from `/manager/`.

Leave the frontend dev server running for the next exercise.

Next → [5. Deploy to Microsoft Fabric](../instructions/exercise-5-deploy-to-production.md)

