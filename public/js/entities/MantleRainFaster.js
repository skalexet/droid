import Entity from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {findPlayers} from '../player.js';
import {loadAudioBoard} from '../loaders/audio.js'; 

export function loadMantleRainFaster(audioContext) {
	return loadAudioBoard('mantleRainFaster', audioContext)
	.then(audio => {
		return createMantleRainFasterFactory(audio);
	});
}

function createMantleRainFasterFactory(audio) {

	function emitMantle(mantleRainFaster, gameContext, level) {
		 
		
		const mantle = gameContext.entityFactory.mantle();
  
		mantle.pos.copy(mantleRainFaster.pos);
		mantle.vel.set(0, 0);
		
		// mantleRainFaster.sounds.add('shoot');
		level.entities.add(mantle);
	}

	return function createMantleRainFaster() {
		const mantleRainFaster = new Entity(); // new Entity obj from Entity.js
		// mantleRainFaster.audio = audio;
        
		const emitter = new Emitter();
		emitter.interval = 3;
		emitter.emitters.push(emitMantle);
		mantleRainFaster.addTrait(emitter);
		return mantleRainFaster;
	} 
}