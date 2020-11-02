import Entity from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {findPlayers} from '../player.js';
import {loadAudioBoard} from '../loaders/audio.js'; 

export function loadBjakaCheckPoint(audioContext) {
	return loadAudioBoard('bjakaCheckPoint', audioContext)
	.then(audio => {
		return createBjakaCheckPointFactory(audio);
	});
}

function createBjakaCheckPointFactory(audio) {

	function emitBjaka(bjakaCheckPoint, gameContext, level) {
		let dir = 1;
		for (const player of findPlayers(level.entities)) {
			if (player.pos.x < bjakaCheckPoint.pos.x) {
				dir = -1;
			}
		}
		
		const bjaka = gameContext.entityFactory.bjaka();

		bjaka.pos.copy(bjakaCheckPoint.pos);
		bjaka.vel.set(80 * dir, 0);
		
		level.entities.add(bjaka);
	}

	return function createBjakaCheckPoint() {
		const bjakaCheckPoint = new Entity(); // new Entity obj from Entity.js
		// bjakaCheckPoint.audio = audio;

		const emitter = new Emitter();
		emitter.interval = 3;
		emitter.emitters.push(emitBjaka);
		bjakaCheckPoint.addTrait(emitter);
		return bjakaCheckPoint;
	} 
}