import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Hit from '../traits/Hit.js';
import Go from '../traits/Go.js';
import {loadSpriteSheet} from '../loaders/sprite.js'; 

export function loadGorilla() { // export of function
	return loadSpriteSheet('gorilla') // returns function from sprites.js that returns the SpriteSheet obj
	.then(createGorillaFactory);
}

class Behavior extends Trait {
	collides(us, them) {
		if(!them.traits.get(Hit)) {
			return;
		} else if (them.traits.get(Hit).hit === true) {
			this.killUs(us, them);
		} else {
			this.killThem(them);
		}
	}

	killThem(them) {
		them.traits.get(Killable).kill();
	}

	killUs(us, them) {
		them.sounds.add('hitGorilla');
		this.sheet(us, them);
		us.traits.get(Killable).kill();
	}

	sheet(us, them) {
		us.traits.get(Solid).obstructs = false;
		if(us.pos.x > them.pos.x) {
			them.vel.x -= 120;
			us.vel.y -= 2;
			us.vel.x += 130;
		} else {
			them.vel.x += 120;
			us.vel.y -= 2;
			us.vel.x -= 130;
		}
	}

	update(entity, gameContext, level) {
		if(entity.pos.y > level.camera.size.y) {
			entity.traits.get(Killable).kill();
		}
	}
}

function createGorillaFactory(sprite) {
	const liveAnim = sprite.animations.get('live');

	function routeAnim(gorilla) {
		if (gorilla.traits.get(Killable).dead) {
			return 'fall';
		}
		return liveAnim(gorilla.lifetime);
	}

	function gorillaDraw(context) { // dynamicaly define method droidDraw 
		sprite.draw(routeAnim(this), context, 0 , 0); // then we dr aw SpriteSHeet's							                        // by method draw takes name, x, y and context
	}

	return function createGorilla() {
		const gorilla = new Entity();
		gorilla.size.set(16, 18);
	
		gorilla.addTrait(new Physics());
		gorilla.addTrait(new Solid());
		gorilla.addTrait(new Behavior());
		gorilla.addTrait(new Killable());

		gorilla.draw = gorillaDraw;

		return gorilla;
	} 
}