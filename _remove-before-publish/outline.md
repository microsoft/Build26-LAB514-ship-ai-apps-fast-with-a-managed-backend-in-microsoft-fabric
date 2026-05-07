## Draft outline for the lab (45-60min)

0. Setup prerequites
  - login to Github SSO and Fabric, login to Github Copilot in VS Code and Copilot CLI

1. Bootstrap app from template
  `npm create @microsoft/rayfin@latest -- --template TBD`

2. Explore template and important files:
  - open in VS Code
  - rayfin.yaml
  - rayfin/data/ folder for schema with types

3. Run app locally with `npx rayfin dev`
  - open OpenAPI swagger
  - open logs in aspire dashboard
  - start frontend dev: `npm run dev`
  - open app in browser
    * create an account with login/password (this is the default auth provider for local dev, but it will be Fabric SSO in production)
    * you're greeted with the "service pro" view, put your name and create your account.
    * there's a work order ready to be assigned, you can accept it and mark it as done when you're done
    * you can explore the /manager/ view to create more work orders, assign them to yourself or other pros, and track the progress
    * you've seen a bit what the app looks like, now let's deploy

4. Go "straight to production" and deploy on Fabric with `npx rayfin up`
  - open deployed version, notice the auth with Fabric SSO instead of login/password

5. Add a feature that requires a schema change (comments with history on intervention)
  - open copilot CLI (in VS Code terminal) 
  - install rayfin plugin (if not already) in the CLI. Explain that it brings an agent SKILL.md and MCP server.
  - use copilot CLI to prompt the change (TBD): "Add comments to the work orders, with a history of interventions, so that the pros can communicate with the manager and ask questions about the work order. Comments must have: id, userId, createdAt, workOrderId, content. Keep the comments section folded by default. Only pros assigned to the work order and the manager can see the comments and add new ones. Don't apply the schema change yet on the backend, just generate the code."

6. Explore the changed types and schema in rayfin/data, and the generated migration
  - run the migration locally with `npx rayfin dev db apply`
  - test the app locally again, see the changes in action
  - redeploy with `npx rayfin up` -> migration is performed automatically on deploy as well
  - test the new feature in the deployed version

7. Explore the data in Fabric
  - open special /_admin/ page in the deployed URL to generate more data directly from the frontend
  - upload semantic model for the app
    * /!\ if lab time is bumped to 75min, then instead we can use the extra time with the Power BI desktop app to create the semantic model and connect it to the data source, and then publish it to Fabric from there.
  - create a data agent using the semantic model, connect data source
  - run a query on the data with the semantic model in agent: "how many work orders do we have? how many are assigned to each pro? etc."
  - (notebook python?) create a Jupyter notebook that connects to the published OAI agent with SDK to show how to ask the created agent