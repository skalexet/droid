import Entity from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {findPlayers} from '../player.js';
import {loadAudioBoard} from '../loaders/audio.js'; 

export function loadMantleRain(audioContext) {
	return loadAudioBoard('mantleRain', audioContext)
	.then(audio => {
		return createMantleRainFactory(audio);
	});
}

function createMantleRainFactory(audio) {

	function emitMantle(mantleRain, gameContext, level) {
		 
		
		const mantle = gameContext.entityFactory.mantle();
  
		mantle.pos.copy(mantleRain.pos);
		mantle.vel.set(0, 0);
		
		// mantleRain.sounds.add('shoot');
		level.entities.add(mantle);
	}

	return function createMantleRain() {
		const mantleRain = new Entity(); // new Entity obj from Entity.js
		// mantleRain.audio = audio;
        
		const emitter = new Emitter();
		emitter.interval = 5;
		emitter.emitters.push(emitMantle);
		mantleRain.addTrait(emitter);
		return mantleRain;
	} 
}