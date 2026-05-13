# Seed test data

You shipped a real schema-backed feature in the previous step: schema applied to the Fabric backend, frontend redeployed, end-to-end working through the live URL. Let's first check the new feature in the live app, then seed the database with a richer dataset so the Fabric data agent in the next part has something interesting to work with.


## 1. Verify the new feature in the live app

Open the hosting URL in a browser tab where you're signed in to Microsoft Fabric.

- Sign in (Fabric SSO).
- Go through the same flow you tested locally: open a work order, expand the **Comments** section, post a comment.
- Open `/manager/` in another tab and confirm the manager sees the same comments.

If everything works, you've shipped a real schema-backed feature end-to-end with two commands. 🎉

## 2. Seed the database

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

## 3. (Optional) Add some comments

Pick a few work orders and post a couple of comments on each. The data agent in the next part can answer questions about comments too, and a sparse comments thread limits what you can ask.

---

## ✅ Verify

- The deployed app at the hosting URL shows the **Comments** section on each work order.
- You ran the seed in the admin page and the deployed app now has dozens of service pros and work orders.

You now have a fully featured app and a meaningful production dataset to query.

