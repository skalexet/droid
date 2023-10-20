import Entity from './Entity.js';
import Player from './traits/Player.js';
import PlayerController from './traits/PlayerController.js';
import CheckPoint from './CheckPoint.js'
import Go from './traits/Go.js';

export function createPlayerEnv(playerEntity, level) {
	const playerEnv = new Entity();
	const playerControl = new PlayerController();
	
	const checkPoint = new CheckPoint();
	checkPoint.control = playerControl;
	checkPoint.player = playerEntity;
	checkPoint.level = level;
	playerEntity.traits.get(Go).checkPoint = checkPoint;
	
	playerControl.checkpoint.set(32, 32); /* TODO: TO NOT FORGET 32x32 */ /* END OF TE LINE: 3700 */
	playerEnv.addTrait(playerControl);
	playerControl.setPlayer(playerEntity);
	return playerEnv;
}

export function makePlayer(entity, name) {
	const player = new Player();
	player.name = "DROID";
	entity.addTrait(player);
}

export function* findPlayers(entities) {
	for (const entity of entities) {
		if (entity.traits.has(Player)) {
			yield entity;
		}
	}
}