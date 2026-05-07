# 4. Run the app locally

> ⚠️ Draft — fill in detailed instructions.

## Draft notes (from outline)

Start the backend:

```sh
npx rayfin dev
```

- Open the OpenAPI swagger
- Open logs in the Aspire dashboard

Start the frontend:

```sh
npm run dev
```

Open the app in the browser:

- Create an account with login/password (default auth provider for local dev — will be Fabric SSO in production)
- You're greeted with the "service pro" view; enter your name and create your account
- A work order is ready to be assigned — accept it and mark it as done
- Explore the `/manager/` view to create more work orders, assign them to yourself or other pros, and track progress

Now you've seen what the app looks like — next, deploy it.

## Things to add

- [ ] Screenshots of swagger, Aspire dashboard, and the two views
- [ ] Expected URLs/ports
- [ ] Troubleshooting tips for common local-dev issues

---

Prev ← [3. Explore the template](../03-explore-template/README.md) · Next → [5. Deploy to production](../05-deploy/README.md)
