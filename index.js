module.exports = function Memelord420(dispatch) {
	const {protocol} = require('tera-data-parser'),
	Slash = require('./slash')
	const slash = new Slash(dispatch)
	let cid,
		name,
		x,
		y,
		z,
		zone,
		serv,
		player,
		pc,
		pcapp,
		target,
		ucid = 33333333333333, //These are like this to prevent conflicts and camera issues
		objcid = 33333333333333,
		npccid = 33333333333333,
		colcid = 33333333333333,
		petcid = 33333333333333,
		shutid = 33333333333333,
		pserver,
		pid,
		w
	dispatch.hook('S_LOGIN', 1, (event) => {
    name = event.name;
  });
  dispatch.hook('S_LOGIN', 2, (event) => {
	  pcid = event.cid
	  pserver = event.serverId
	  pid = event.playerId
//	  console.log(event)
  })
	dispatch.hook('C_PLAYER_LOCATION', 1, event =>{
		location = event
		w = event.w
		x = event.x1
		y = event.y1
		z = event.z1	
	});
	dispatch.hook('S_LOAD_TOPO', 1, event =>{
		zz = event.zone
	});
	dispatch.hook('S_SPAWN_USER', 4, event =>{
		console.log('User Found '+event.name, event.appface, event.apphair)
		pc = event
	})
	dispatch.hook('S_SPAWN_SHUTTLE', 1, event => {
		console.log(event)
	})


	slash.on('snpc', (args) => {
		snpc(args)
	})
	slash.on('shut', (args) => {
	shut(args)
	})
	slash.on('col', (args) => {
	col(args)
	})
	slash.on('su', (args) => {
	su(args)
	})
	slash.on('obj', (args) => {
	obj(args)
	})
	slash.on('pet', (args) => {
	pet(args)
	})
	slash.on('rmobj', (args) => {
	rmobj(args)
	})
	slash.on('rmu', (args) => {
	rmu(args)
	})
	slash.on('rmnpc', (args) => {
	rmnpc(args)
	})
	slash.on('rmcol', (args) => {
	rmcol(args)
	})
	slash.on('rmshut', (args) => {
	rmshut(args)
	})
	slash.on('reload', (args) => {
	reload(args)
	})
	slash.on('scriptme', (args) => {
	scriptme(args)
	})
	slash.on('scriptuser', (args) => {
	scriptuser(args)
	})
	slash.on('scriptnpc', (args) => {
	scriptnpc(args)
	})
	function reload(args){
		dispatch.toClient('S_SPAWN_ME', 1, {
			target: pcid,
			x: x,
			y: y,
			z: z,
			alive: 1
		})
	}
	function obj(args){
	object([parseFloat(args[1])])
	}
	function scriptuser(args){
	scriptOther([parseFloat(args[1])])
	}
	function scriptme(args){
	scriptPlayer([parseFloat(args[1])])
	}
	function scriptnpc(args){
	scriptc([parseFloat(args[1])])
	}
	function shut(args){
	shuttle([parseFloat(args[1])])
	}
	function col(args){
	collection([parseFloat(args[1])])
	}
	function su(args){
	spawnUser([parseInt(args[1]),parseInt(args[2]),parseInt(args[3]),parseInt(args[4]),parseInt(args[5]),parseInt(args[6]),parseInt(args[7]),parseInt(args[8])])
	}
	function snpc(args){
	spawnNpc([parseFloat(args[1]),parseFloat(args[2]),parseFloat(args[3])])
	}
	function scriptOther(SCRIPTUSER){
	dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
	cid: ucid-1,
	unk1: SCRIPTUSER[0],
	unk2: 0
		})
	}
	function scriptPlayer(SCRIPTME){
	dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
	cid: pcid,
	unk1: SCRIPTME[0],
	unk2: 0
		})
	}
	function scriptc(SCRIPTNPC){
	dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
	cid: npccid-1,
	unk1: SCRIPTNPC[0],
	unk2: 0
		})
	}
	function shuttle(SHUT){
	dispatch.toClient('S_SPAWN_SHUTTLE', 1, {
	uid: shutid++,
	shuttle: SHUT[0],
	x: x,
	y: y,
	z: z,
	unk1: 24576,
		})
	}
	function object(OBJ){
	dispatch.toClient('S_SPAWN_WORKOBJECT', 1, {
	uid: objcid++,
	item: OBJ[0],
	x: x,
	y: y,
	z: z,
	unk1: 0,
	unk2: 2, //status of object, default is 2?
	unk3: 0
		})
		}
	
	function collection(COL){
		dispatch.toClient('S_SPAWN_COLLECTION', 1, {
	uid: colcid++,
	item: COL[0],
	amount: 1,
	x: x,
	y: y,
	z: z,
	unk1: 0,
	unk2: 0
		})
	}
	
	function rmu(args){
	dispatch.toClient('S_DESPAWN_USER', 2, {
	target: ucid-1,
	type: 1	
	})
	ucid--
	}
	function rmshut(args){
	dispatch.toClient('S_DESPAWN_SHUTTLE', 1, {
	cid: shutid-1,
	})
	shutid--
	}
	function rmnpc(args){
	dispatch.toClient('S_DESPAWN_NPC', 1, {
	target: npccid-1,
	type: 1	
	})
	npccid--
	}
	
	function rmobj(args){
	dispatch.toClient('S_DESPAWN_WORKOBJECT', 1, {
	uid: objcid-1,
	unk: 0
	})
	objcid--
	}
	
	function rmcol(args){
	dispatch.toClient('S_DESPAWN_COLLECTION', 1, {
	uid: colcid-1,
	unk: 0
	})
	colcid--
	}
	
	function spawnUser(SU){
	dispatch.toClient('S_SPAWN_USER', 4, {
		serverId: pserver,
		playerId: pid,
		cid: ucid++,
		x: x,
		y: y,
		z: z,
		w: w,
  relation: 1, //determines players relation to you, ex if they're hostile or a guild member
  model: SU[0],
  unk6: 1, //visible
  alive: 1, // alive
  appface: SU[1],
  apphair: SU[2],
  effect: 0, // spawn style? 0 for NYOOM 1 for nothing
  type: 7,
  mount: SU[3],
  title: 0, //title
  weapon: 1, // just to get models to display
  weaponEnchant: SU[9],
  hairAdornment: SU[4],
  mask: SU[5],
  back: SU[6],
  weaponSkin: SU[8],
  costume: SU[7],
  costumeDye: 0,
  unk43: 1, //costume display
  name: 'Spacecats',
 	})
	}
	
	function spawnNpc(SNPC){
dispatch.toClient('S_SPAWN_NPC', 3, {
				id: npccid++,
				target: 0,
				x: x,
				y: y,
				z: z,
				w: w,
				unk1: 12, //no
				templateId: SNPC[0],
				huntingZoneId: SNPC[1],
				unk4: 110, //no
				unk5: 0, //no
				unk6: 0, //no
				unk7: 5, //race// does not matter
				unk8: 1, //gender? 
				unk9: 290, //mno
				unk10: 3, //no
				unk11: 0, //no
				unk12: SNPC[2], //spawnscript/action script
				ink13: 0, //
				unk14: 0, //
				unk15: 0,
				unk16: 0,
				unk17: 0,
				unk18: 0,
				unk19: 0,
				unk20: 16777216,
				unk25: 16777216				
			})
	}
}