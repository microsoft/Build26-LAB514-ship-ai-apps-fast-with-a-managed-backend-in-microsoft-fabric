# Exercise 4: Run the App Locally

In this exercise, you will run the Field Services app locally.

You will start:

- the Rayfin backend
- the Data API explorer
- the React frontend

Then you will sign in, create a Service Pro profile, complete a work order, and test the manager view.

> [!Tip]
> Keep two terminals open: one for the Rayfin backend and one for the frontend.

## Task 1: Start the Rayfin backend

The backend runs the local Rayfin services for this app.

1. Use the terminal from the previous exercise. It should already be in the `field-services-app` folder.

    > [!Tip]
    > If you closed the terminal, open a new one and move into the project folder:

    ```shell
    cd field-services-app
    ```

1. Start the local Rayfin backend:

    ```shell
    npx rayfin dev
    ```

1. Wait for the services to finish starting.

1. Watch for the local backend URL in the terminal output.

    It should look similar to `http://localhost:5168`.

1. Leave this terminal running.

    The frontend needs the backend to stay online.

> [!Tip]
> On the first run, Rayfin may take a few minutes to start Docker containers and apply the data model.
> If Rayfin reports a Docker error, make sure Docker Desktop is running.

## Task 1.1 (Optional): Open the Aspire dashboard

The Aspire dashboard shows service health, logs, and traces.

Only do this task if your instructor asks you to use the dashboard.

1. Stop the local backend:

    ```shell
    npx rayfin dev --down
    ```

1. Restart the backend with debug output:

    ```shell
    npx rayfin dev --debug
    ```

1. Open the Aspire dashboard URL printed in the terminal.

1. Leave this terminal running.

## Task 2: Open the Data API explorer

Rayfin generates an API explorer from the data model you reviewed in Exercise 3.

1. In the browser, open the local backend URL from the `rayfin dev` terminal.

    It should look similar to `http://localhost:5168`.

1. Confirm that the OpenAPI / Swagger UI page opens.

1. Expand one of these API groups:

    - `ServicePro`
    - `WorkOrder`

1. Notice that CRUD operations were generated for each entity.

1. Do not edit data from Swagger in this exercise.

## Task 3: Start the frontend

The frontend is the React app that users interact with.

1. Open a second terminal in Visual Studio Code.

1. Make sure this terminal is also in the `field-services-app` folder:

    ```shell
    cd field-services-app
    ```

1. Start the frontend dev server:

    ```shell
    npm run dev
    ```

1. Open the local frontend URL shown in the terminal.

    It should look similar to `http://localhost:5173`.

1. Confirm that the app sign-in page opens.

## Task 4: Sign up as a Service Pro

Local development uses email and password sign-in.

1. On the sign-in page, select **Sign up**.

1. Create a test account using an email and password you can remember for this lab.

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

## Task 5: Explore the manager view

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

Before moving on, confirm that everything is working locally:

- The `rayfin dev` terminal shows the backend services are running.
- The Data API explorer opens in the browser.
- The frontend opens at the local Vite URL.
- You can sign up and create a Service Pro profile.
- You can accept and complete a work order.
- You can create and assign a work order from the manager view.

Leave both local servers running for the next exercise.

Next → [5. Deploy to Microsoft Fabric](../instructions/exercise-5-deploy-to-production.md)
