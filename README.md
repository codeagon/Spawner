# Spawner
Ever wanted to spawn an army of popori? Well now you can with this incredibly poorly coded trainwreck!
![Screenshot](https://i.imgur.com/bViJShK.jpg)

## Commands
* `!NPC <TemplateId> <HuntingZone> <SpawnScript>` Spawns in an NPC. Spawnscript refers to ActionScripts - Will crash you if you spawn an invalid NPC.
* `!USER <Model> <Face> <Hair> <Mount> <hairitem> <maskitem> <backitem> <costume> <weaponSkin> <WeaponEnchant>` Spawns a player. Face and hair values can be found spammed in the console from other players(Currently I have no idea how the data is set out). Player relation and name can be changed in the script currently
* `!COL <ID>` Spawns a "collection"/collecatable item
* `!SOUND <ID>` Plays a sound
* `!UISOUND`
* `!SIGN <"TEXT"> <SIGNID>` Spawns a sign with your text on it, sign IDs are 1-3
* `!OBJ <ID>` Spawns a "Work object" IDs can be found <here>. Far less cool than it sounds.
* `!RM<OBJ/NPC/USER/SHUT/COL/SIGN>` Despawns the last thing spawned. EG. !RMU will delete the last user spawned in with !su
* `!SCRIPT<ME/USER/NPC>` Applys an actionscript to the last thing spawned or yourself. Can lock your character in place or teleport you client side, requiring a restart to fix.
* `CLEAR<NPC,USER,COL,SIGN,OBJ>` Clears all of the type.
* `!RELOAD` Sends S_SPAWN_ME to fix camera/other issues, wont always fix things.

## IDs
* Collection, NPC, Shuttle, Object and character model IDs can be found [Here](https://docs.google.com/spreadsheets/d/1Inba-tW70grzqisvpdFPpKFfgz5XTptFygjUNb1T1hw/edit?usp=sharing). ActionScripts [Here](https://drive.google.com/file/d/0B9CbzlVpo0LuTjVWZ19Lel8wVjQ/view?usp=sharing) - Now also in main sheet in more readable format. Costume/etc ids can be found [Here](http://teradatabase.net/)

## Future changes
* Add S_PLAY_SOUND_BYNAME
* Use electron for less cancerous spawning (lol)
* Make variables settable rather than required, eg !set npc hair 264704 - soon
* Make some less disgusting way of removing things
* Implement way of changing NPCs/PCs on the fly - moving them
* Add Abnormalities and AERO to this

## FAQ
* *Can I interact with the sp-* no. Everything you spawn is client side only.
* *Help! My camera zoomed in and now I can't unzoom it!* Some actionscripts and ID issues can do this, try !reload
* *Help! My game crashed!* Invalid IDs do this.
* *This script is terrible!* Feel free to fork it and add your own things/fix my terrible code.
* *This is too fucking complicated for me!* sametbh, try [Ａｅｓｔｈｅｔｉｃｓ](https://github.com/hugedong69/aesthetics)

## Updates
* Added defaults to NPC and USER spawns
* Added signs
* Changed command names to be less dumb
* Added S_PLAY_SOUND
* Swapped Huntingzone and Template ID fields to make more sense to my reptile brain
* Made code somehow more garbage despite trying to do the opposite
