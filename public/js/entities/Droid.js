import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Hit from '../traits/Hit.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';
import {loadAudioBoard} from '../loaders/audio.js'; 
import {loadSpriteSheet} from '../loaders/sprite.js';
import Camera from '../Camera.js'; 
import CheckPoint from '../CheckPoint.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadDroid(audioContext) {
	return Promise.all([
		loadSpriteSheet('droid'),
		loadAudioBoard('droid', audioContext),
	])
	.then(([sprite, audio]) => {
		return createDroidFactory(sprite, audio);
	});
}

function createDroidFactory(sprite, audio) {
	const runAnim = sprite.animations.get('run');
	const hitAnim = sprite.animations.get('hit');
	const runFightAnim = sprite.animations.get('runFight');

	function routeFrame(droid) {
		if (droid.traits.get(Jump).falling) { 
			if (droid.traits.get(Hit).hit === true) {
				return runFightAnim(droid.traits.get(Hit).atack);
			} else {
				return 'jump';
			}
		}

		if (droid.traits.get(Go).distance > 0) {
			if (droid.traits.get(Hit).hit === true) {
				return runFightAnim(droid.traits.get(Hit).atack);
			} else {
			 	if ((droid.vel.x > 0 && droid.traits.get(Go).dir < 0) || (droid.vel.x < 0 && droid.traits.get(Go).dir > 0)) {
					return 'break';
				}
				 
				return runAnim(droid.traits.get(Go).distance);
			}
			 
			
		} 

		if (droid.traits.get(Hit).atack > 0) {
			return hitAnim(droid.traits.get(Hit).atack);
		}
		
		return 'idle';
	}

	function setTurboState(turboOn) {
		this.traits.get(Go).dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
	}

	function droidDraw(context) {
		sprite.draw(routeFrame(this), context, 0, 0, this.traits.get(Go).heading < 0); // then we dr aw SpriteSHeet's							                        // by method draw takes name, x, y and context
	}

	return function createDroid() {
		const droid = new Entity();
		droid.audio = audio;
		droid.size.set(13, 16);

		droid.addTrait(new Physics());
		droid.addTrait(new Solid());
		droid.addTrait(new Go());
		droid.addTrait(new Jump());
		droid.addTrait(new Killable());
		droid.addTrait(new Hit());

		droid.traits.get(Killable).removeAfter = 0;
 
		droid.turbo = setTurboState;
		droid.draw = droidDraw;

		droid.turbo(false);
		
		return droid;
	} 
}