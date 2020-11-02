import Entity from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {findPlayers} from '../player.js';
import {loadAudioBoard} from '../loaders/audio.js'; 

const HOLD_FIRE_THRESHOLD = 30;

export function loadHumidCheckPoint(audioContext) {
	return loadAudioBoard('humidCheckPoint', audioContext)
	.then(audio => {
		return createHumidCheckPointFactory(audio);
	});
}

function createHumidCheckPointFactory(audio) {

	function emitHumid(humidCheckPoint, gameContext, level) {
		let dir = 1;
		for (const player of findPlayers(level.entities)) {
			if (player.pos.x < humidCheckPoint.pos.x) {
				dir = -1;
			}
		}
		
		const humid = gameContext.entityFactory.humid();

		humid.pos.copy(humidCheckPoint.pos);
		humid.vel.set(80 * dir, 0);
		
		level.entities.add(humid);
	}

	return function createHumidCheckPoint() {
		const humidCheckPoint = new Entity(); // new Entity obj from Entity.js
		// humidCheckPoint.audio = audio;

		const emitter = new Emitter();
		emitter.interval = 2;
		emitter.emitters.push(emitHumid);
		humidCheckPoint.addTrait(emitter);
		return humidCheckPoint;
	} 
}