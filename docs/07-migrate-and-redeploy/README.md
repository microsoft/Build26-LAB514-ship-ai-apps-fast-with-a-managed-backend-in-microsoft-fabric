# 7. Apply migration and redeploy

> ⚠️ Draft — fill in detailed instructions.

## Draft notes (from outline)

Explore the changed types and schema in `rayfin/data`, and the generated migration.

Apply the migration locally:

```sh
npx rayfin dev db apply
```

- Test the app locally again — see the changes in action
- Redeploy:

```sh
npx rayfin up
```

  The migration is performed automatically on deploy as well.

- Test the new feature in the deployed version

## Things to add

- [ ] Screenshots of the diff in `rayfin/data` and the generated migration
- [ ] Expected output of `db apply`
- [ ] How to roll back if something goes wrong

---

Prev ← [6. Add a feature with Copilot CLI](../06-add-feature/README.md) · Next → [8. Explore data with Fabric intelligence](../08-fabric-insights/README.md)
