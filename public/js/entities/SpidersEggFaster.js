import Entity from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {findPlayers} from '../player.js';
import {loadAudioBoard} from '../loaders/audio.js'; 

const HOLD_FIRE_THRESHOLD = 30;

export function loadSpidersEggFaster(audioContext) {
	return loadAudioBoard('spidersEggFaster', audioContext)
	.then(audio => {
		return createSpidersEggFasterFactory(audio);
	});
}

function createSpidersEggFasterFactory(audio) {

	function emitSpider(spidersEggFaster, gameContext, level) {
		let dir = 1;
		for (const player of findPlayers(level.entities)) {
			// if (player.pos.x > spidersEggFaster.pos.x - HOLD_FIRE_THRESHOLD
			// && player.pos.x < spidersEggFaster.pos.x + HOLD_FIRE_THRESHOLD) {
			// 	return;
			// }

			if (player.pos.x < spidersEggFaster.pos.x) {
				dir = -1;
			}
		}
		
		const spider = gameContext.entityFactory.spider();

		spider.pos.copy(spidersEggFaster.pos);
		spider.vel.set(80 * dir, 0);
		
		// spidersEggFaster.sounds.add('shoot');
		level.entities.add(spider);
	}

	return function createSpidersEggFaster() {
		const spidersEggFaster = new Entity(); // new Entity obj from Entity.js
		// spidersEggFaster.audio = audio;

		const emitter = new Emitter();
		emitter.interval = 3;
		emitter.emitters.push(emitSpider);
		spidersEggFaster.addTrait(emitter);
		return spidersEggFaster;
	} 
}