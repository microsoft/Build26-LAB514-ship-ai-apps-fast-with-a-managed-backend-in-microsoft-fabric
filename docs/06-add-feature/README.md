# 6. Add a feature with Copilot CLI

> ⚠️ Draft — fill in detailed instructions.

## Draft notes (from outline)

Add a feature that requires a schema change (comments with intervention history).

- Open the GitHub Copilot CLI (in the Visual Studio Code terminal)
- Install the `rayfin` plugin in the CLI if not already installed. This brings an agent `SKILL.md` and an MCP server.
- Use the Copilot CLI to prompt the change (TBD):

  > Add comments to the work orders, with a history of interventions, so that the pros can communicate with the manager and ask questions about the work order. Comments must have: id, userId, createdAt, workOrderId, content. Keep the comments section folded by default. Only pros assigned to the work order and the manager can see the comments and add new ones. Don't apply the schema change yet on the backend, just generate the code.

## Things to add

- [ ] Final wording of the prompt
- [ ] Expected files/changes the agent should produce
- [ ] How to install/verify the `rayfin` Copilot CLI plugin

---

Prev ← [5. Deploy to production](../05-deploy/README.md) · Next → [7. Apply migration and redeploy](../07-migrate-and-redeploy/README.md)
