import Entity from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {findPlayers} from '../player.js';
import {loadAudioBoard} from '../loaders/audio.js'; 

export function loadMantleRainFastest(audioContext) {
	return loadAudioBoard('mantleRainFastest', audioContext)
	.then(audio => {
		return createMantleRainFastestFactory(audio);
	});
}

function createMantleRainFastestFactory(audio) {

	function emitMantle(mantleRainFastest, gameContext, level) {
		 
		
		const mantle = gameContext.entityFactory.mantle();
  
		mantle.pos.copy(mantleRainFastest.pos);
		mantle.vel.set(0, 0);
		
		// mantleRainFastest.sounds.add('shoot');
		level.entities.add(mantle);
	}

	return function createMantleRainFastest() {
		const mantleRainFastest = new Entity(); // new Entity obj from Entity.js
		// mantleRainFastest.audio = audio;
        
		const emitter = new Emitter();
		emitter.interval = 2;
		emitter.emitters.push(emitMantle);
		mantleRainFastest.addTrait(emitter);
		return mantleRainFastest;
	} 
}