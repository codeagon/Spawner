const Command = require('command');
let developer = false, //developer mode: display console messages on used cids and location co-ord of spawn
    userdata = false; //Display all user costume and features data (default true in original)
module.exports = function Spawner(dispatch) {
    const command = Command(dispatch);
    let SAFE_SPAWN = true,
        spawning = false,
        name,
        x,
        y,
        z,
        pc,
        ucid = 33333333333333, //These are like this to prevent conflicts and camera issues
        objcid = 33333333333333,
        npccid = 33333333333333,
        colcid = 33333333333333,
        signid = 33333333333333,
        pserver,
        fnpc = [],
        fu = [],
        fcol = [],
        fobj = [],
        fsign = [],
        pid,
        w,
        customname;
    ///////Dispatches
    dispatch.hook('S_LOGIN', 1, (event) => {
        spawning = false;
        name = event.name;
    });
    dispatch.hook('S_LOGIN', 2, (event) => {
        pcid = event.cid;
        pserver = event.serverId;
        pid = event.playerId;
    });
    dispatch.hook('C_PLAYER_LOCATION', 1, event => {
        w = event.w;
        x = event.x1;
        y = event.y1;
        z = event.z1;
    });

    dispatch.hook('S_LOAD_TOPO', 1, event => {
        zz = event.zone;
    });
    dispatch.hook('S_SPAWN_USER', 5, event => {
        if (userdata) console.log('User Found ' + event.name, event.appface, event.apphair);
        pc = event;
    });
    dispatch.hook('C_MEET_BOSS_INFO', 1, event => {
        if (spawning && SAFE_SPAWN) return false;
    });
    dispatch.hook('C_REQUEST_BOSS_GAGE_INFO', 'raw', () => {
        if (spawning && SAFE_SPAWN) return false;
    });

    //Function hooks
    dispatch.hook('S_SPAWN_NPC', 3, {
        filter: {
            fake: null
        }
    }, event => {
        if (event.unk7 === 6969) {
            fnpc.push(event.id);
        }
    });

    dispatch.hook('S_SPAWN_USER', 5, {
        filter: {
            fake: null
        }
    }, event => {
        if (event.playerId === 6969) {
            fu.push(event.cid);
        }
    });

    dispatch.hook('S_SPAWN_COLLECTION', 1, {
        filter: {
            fake: null
        }
    }, event => {
        if (event.unk1 === 6969) {
            fcol.push(event.uid);
        }
    });

    dispatch.hook('S_SPAWN_WORKOBJECT', 1, {
        filter: {
            fake: null
        }
    }, event => {
        if (event.unk1 === 6969) {
            fobj.push(event.uid);
        }
    });

    dispatch.hook('S_SPAWN_BUILD_OBJECT', 1, {
        filter: {
            fake: null
        }
    }, event => {
        if (event.unk === 6969) {
            fsign.push(event.uid);
        }
    });


    //////////Commands
    command.add('npc', (hzone, template, script) => {
        defaultzone = (hzone === undefined) ? 63 : hzone;
        defaulttemplate = (template === undefined) ? 1147 : template;
        dispatch.toClient('S_SPAWN_NPC', 3, {
            id: npccid++,
            target: 0,
            x: x,
            y: y,
            z: z,
            w: w,
            unk1: 12, //no
            templateId: defaulttemplate,
            huntingZoneId: defaultzone,
            unk4: 110, //no
            unk5: 0, //no
            unk6: 0, //no
            unk7: 6969, //race// does not matter
            unk8: 1, //gender? 
            unk9: 290, //mno
            unk10: 3, //no
            unk11: 0, //no
            unk12: script, //spawnscript/action script
            ink13: 0, //
            unk14: 0, //
            unk15: 0,
            unk16: 0,
            unk17: 0,
            unk18: 0,
            unk19: 0,
            unk20: 16777216,
            unk25: 16777216
        });
        spawning = true;
        if (developer) console.log(npccid + ',' + x + ',' + y + ',' + z + ',' + w); //display id,location where boss is spawned
    });

    command.add('rmnpc', () => {
        dispatch.toClient('S_DESPAWN_NPC', 1, {
            target: npccid - 1,
            type: 1
        });
        npccid--;
    });


    command.add('uisound', (soundName) => {
        dispatch.toClient('S_PLAY_SOUND', 1, {
            sound: soundName
        });
    });

    command.add('sound', (soundid) => {
        dispatch.toClient('S_PLAY_EVENT_SOUND', 1, {
            id: soundid,
            unk1: 1,
            unk2: 1
        });
    });
    /*command.add('ssound', (Namu) => { // Can't figure this out currently so it's commented
      dispatch.toClient('S_PLAY_SOUND_BYNAME', 1, {
        cid: pcid,
        unk: 2147483647,
        x: x,
        y: y,
        z: z,
        sound: Namu
      });
    });*/

    command.add('user', (model, appface, apphair, mount, hair, mask, back, costume, weaponskin, weaponenchant, name) => {
        customname = (name === undefined) ? 'Spacecats' : name;
        defaultmodel = (model === undefined) ? 11008 : name;
        dispatch.toClient('S_SPAWN_USER', 5, {
            serverId: pserver,
            playerId: 6969,
            cid: ucid++,
            x: x,
            y: y,
            z: z,
            w: w,
            relation: 1, //determines players relation to you, ex if they're hostile or a guild member
            model: defaultmodel,
            unk6: 1, //visible
            alive: 1, // alive
            appface: appface,
            apphair: apphair,
            effect: 0, // spawn style? 0 for NYOOM 1 for nothing
            type: 7,
            mount: mount,
            title: 0, //title
            weapon: 99216, // just to get models to display
            weaponEnchant: weaponenchant,
            hairAdornment: hair,
            mask: mask,
            back: back,
            weaponSkin: weaponskin,
            costume: costume,
            costumeDye: 0,
            unk43: 1, //costume display
            name: customname
        });
        if (developer) console.log(ucid + ',' + x + ',' + y + ',' + z + ',' + w); //id,locations        
    });

    command.add('rmuser', (args) => {
        dispatch.toClient('S_DESPAWN_USER', 2, {
            target: ucid - 1,
            type: 1
        });
        ucid--;
    });

    command.add('obj', (objectID) => {
        dispatch.toClient('S_SPAWN_WORKOBJECT', 1, {
            uid: objcid++,
            item: objectID,
            x: x,
            y: y,
            z: z,
            unk1: 6969,
            unk2: 2, //status of object, default is 2?
            unk3: 0
        });
        if (developer) console.log(objcid + ',' + x + ',' + y + ',' + z);
    });

    command.add('rmobj', (args) => {
        dispatch.toClient('S_DESPAWN_WORKOBJECT', 1, {
            uid: objcid - 1,
            unk: 0
        });
        objcid--;
    });

    command.add('col', (ColID) => {
        dispatch.toClient('S_SPAWN_COLLECTION', 1, {
            uid: colcid++,
            item: ColID,
            amount: 1,
            x: x,
            y: y,
            z: z,
            unk1: 6969,
            unk2: 0
        });
        if (developer) console.log(colcid + ',' + x + ',' + y + ',' + z);
    });

    command.add('rmcol', (args) => {
        dispatch.toClient('S_DESPAWN_COLLECTION', 1, {
            uid: colcid - 1,
            unk: 0
        });
        colcid--;
    });

    command.add('sign', (message, itemid) => {
        dispatch.toClient('S_SPAWN_BUILD_OBJECT', 1, {
            uid: signid++,
            itemId: itemid,
            x: x,
            y: y,
            z: z,
            w: w,
            unk: 6969,
            ownerName: name,
            message: message
        });
    });

    command.add('rmsign', () => {
        dispatch.toClient('S_DESPAWN_BUILD_OBJECT', 1, {
            uid: signid - 1
        });
        signid--;
    });

    command.add('reload', () => {
        dispatch.toClient('S_SPAWN_ME', 1, {
            target: pcid,
            x: x,
            y: y,
            z: z,
            alive: 1
        });
    });
    command.add('scriptme', (sID) => {
        dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
            cid: pcid,
            unk1: sID,
            unk2: 0
        });
    });
    command.add('scriptuser', (suID) => {
        dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
            cid: ucid - 1,
            unk1: suID,
            unk2: 0
        });
    });
    command.add('scriptnpc', (snpcID) => {
        dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
            cid: npccid - 1,
            unk1: snpcID,
            unk2: 0
        });
    });

    //clears
    command.add('clearnpc', () => {
        rmallnpc();
        for (var i = fnpc.length - 1; i >= 0; i--) {
            fnpc.splice(i, 1);
        }
    });

    command.add('clearsign', () => {
        rmallsign();
        for (var i = fsign.length - 1; i >= 0; i--) {
            fsign.splice(i, 1);
        }
    });

    command.add('clearcol', () => {
        clearallcol();
        for (var i = fcol.length - 1; i >= 0; i--) {
            fcol.splice(i, 1);
        }
    });

    command.add('clearobj', () => {
        rmallobj();
        for (var i = fobj.length - 1; i >= 0; i--) {
            fobj.splice(i, 1);
        }
    });

    command.add('clearuser', () => {
        rmallu();
        for (var i = fu.length - 1; i >= 0; i--) {
            fu.splice(i, 1);
        }
    });

    //functions

    function clearallcol() {
        for (let trmcol of fcol) {
            dispatch.toClient('S_DESPAWN_COLLECTION', 1, {
                uid: trmcol,
                unk: 0
            });
        }
    }

    function rmallsign() {
        for (let tsign of fsign) {
            dispatch.toClient('S_DESPAWN_BUILD_OBJECT', 1, {
                uid: tsign
            });
        }
    }

    function rmallobj() {
        for (let tobj of fobj) {
            dispatch.toClient('S_DESPAWN_WORKOBJECT', 1, {
                uid: tobj
            });
        }
    }

    function rmallu() {
        for (let trmu of fu) {
            dispatch.toClient('S_DESPAWN_USER', 2, {
                target: trmu,
                type: 1
            });
        }
    }

    function rmallnpc() {
        for (let tnpc of fnpc) {
            dispatch.toClient('S_DESPAWN_NPC', 1, {
                target: tnpc,
                type: 1
            });
        }
    }
};
