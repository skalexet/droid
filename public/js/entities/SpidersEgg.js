import Entity from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {findPlayers} from '../player.js';
import {loadAudioBoard} from '../loaders/audio.js'; 

export function loadSpidersEgg(audioContext) {
	return loadAudioBoard('spidersEgg', audioContext)
	.then(audio => {
		return createSpidersEggFactory(audio);
	});
}

function createSpidersEggFactory(audio) {

	function emitSpider(spidersEgg, gameContext, level) {
		let dir = 1;
		for (const player of findPlayers(level.entities)) {
			if (player.pos.x < spidersEgg.pos.x) {
				dir = -1;
			}
		}
		
		const spider = gameContext.entityFactory.spider();

		spider.pos.copy(spidersEgg.pos);
		spider.vel.set(80 * dir, 0);
		
		// spidersEgg.sounds.add('shoot');
		level.entities.add(spider);
	}

	return function createSpidersEgg() {
		const spidersEgg = new Entity(); // new Entity obj from Entity.js
		// spidersEgg.audio = audio;

		const emitter = new Emitter();
		emitter.interval = 5;
		emitter.emitters.push(emitSpider);
		spidersEgg.addTrait(emitter);
		return spidersEgg;
	} 
}