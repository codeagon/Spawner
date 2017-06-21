# Exploration
Ever wanted to spawn an army of popori?

## Commands
* `!SNPC <TemplateId> <HuntingZone> <SpawnScript>` Spawns in an NPC. IDs for NPCs can be found <here> and spawnscripts <here>. Lots of things are NPCs.
* `!SPC <Face> <Hair> <Mount> <Name> <hairitem> <maskitem> <backitem> <weaponskin> <costume>` Spawns a player. Face and hair values can be found in the console (Currently I have no idea how the data is set out). Equipment IDs can be found <here>
* `!SC <ID>` Spawns a "collection"/collecatable item
* `!SOBJ` Spawns a "Work object" IDs can be found <here>. Far less cool than it sounds.
* `!RMPC` Despawns the character you are currently looking at. Works on normal players too!

## Future changes
* Use electron for less cancerous spawning
* Make variables settable rather than required, eg !set npc hair 264704
* Make some less disgusting way of removing things
* Implement way of changing NPCs/PCs on the fly, including applying effects to them

## FAQ
* Can I interact with the sp- no. Everything you spawn is client side only.
