# Exploration
Ever wanted to spawn an army of popori?

## Commands
* `!SNPC <TemplateId> <HuntingZone> <SpawnScript>` Spawns in an NPC. IDs for NPCs can be found <here> and spawnscripts <here>. Lots of things are NPCs.
* `!SPC <Face> <Hair> <Model> <Mount> <Name> <hairitem> <maskitem> <backitem> <weaponskin> <costume>` Spawns a player. Face and hair values can be found in the console (Currently I have no idea how the data is set out). Equipment IDs can be found <here>
* `!SC <ID>` Spawns a "collection"/collecatable item
* `!OBJ` Spawns a "Work object" IDs can be found <here>. Far less cool than it sounds.
* `!RML` Despawns the last thing spawned in

## Future changes
* Use electron for less cancerous spawning
* Make variables settable rather than required, eg !set npc hair 264704
* Make some less disgusting way of removing things using targeting (no idea how this works send help)
* Implement way of changing NPCs/PCs on the fly, including applying effects to them

## FAQ
* *Can I interact with the sp-* no. Everything you spawn is client side only.
* *no work* - Please make sure that you have the current (future from the time of writing this) version of tera-data, as some definitions have been changed/added. Or use the fork found on my git page
* *Help! My camera zoomed in and now I can't unzoom it!* A spawnscript of 0 does this.
* *Help! My game crashed!* Invalid IDs do this.
