import Entity from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {findPlayers} from '../player.js';
import {loadAudioBoard} from '../loaders/audio.js'; 

 

export function loadEgg(audioContext) {
	return loadAudioBoard('egg', audioContext)
	.then(audio => {
		return createEggFactory(audio);
	});
}

function createEggFactory(audio) {

	function emitPtero(egg, gameContext, level) {
		let dir = 1;
		for (const player of findPlayers(level.entities)) {			 
			if (player.pos.x < egg.pos.x) {
				dir = -1;
			}
		}
		
		const ptero = gameContext.entityFactory.ptero();

		ptero.pos.copy(egg.pos);
		ptero.vel.set(80 * dir, 0);
		
		// egg.sounds.add('shoot');
		level.entities.add(ptero);
	}

	return function createEgg() {
		const egg = new Entity(); // new Entity obj from Entity.js
		// egg.audio = audio;

		const emitter = new Emitter();
		emitter.interval = 10;
		emitter.emitters.push(emitPtero);
		egg.addTrait(emitter);
		return egg;
	} 
}