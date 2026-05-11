# TODO

Things done, blocking and missing at this point:

- [x] publish lab
- [ ] step 8 instructions test
- [ ] src of final source code in /src + readme
- [ ] test lab e2e + timing
- [ ] clean up TODO:
- [ ] lab slides

## Done
- Draft instructions for steps 1-7 of the lab (only step 8 is missing, see below)
- Bootstrapping from local template with rayfin CLI
- Updated: Lab is 75min, including intro/conclusion. To use the additional time, I propose to create the semantic model in PowerBI desktop during the lab, instead of providing a pre-created one. This way, attendees will have the chance to see how to create a semantic model from scratch and upload it to Fabric, and avoid the issue with semantic model not matching the model updated with Copilot CLI. 
- Instructions 1-7 updated in Skillable env
- Docker installed in skillable to run rayfin app locally (issue created in the lab)
- PowerBI Pro license to create and upload the semantic model (issue created in the lab) 

## /!\ Blocking

- Fabric apps are available in the tenant, but not enable in admin setting so we cannot deploy with `rayfin up`
- No way to install the Rayfin skill in Copilot CLI, the command in docs `npx rayfin init ai-files install` doesn't work (reported in rayfin feedback channel)
- `npm create @microsft/rayfin@latest` is broken because of node-gyp/Python/VS dependency

## Missing

- Links to final Learn / CLI docs for Fabric apps and Rayfin tools (aka.ms)
- Look up for `TODO:` in the docs (screenshots, things to be tested, final commands, etc.)
- Review instructions to create the semantic model in PowerBI desktop and upload it to Fabric (see with @Christopher Maneu) (step 8)
- Lab slides
