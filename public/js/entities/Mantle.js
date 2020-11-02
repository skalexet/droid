import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import {loadSpriteSheet} from '../loaders/sprite.js'; 
 

export function loadMantle() { // export of function
	return loadSpriteSheet('mantle') // returns function from sprites.js that returns the SpriteSheet obj
	.then(createMantleFactory);
}

class Behavior extends Trait {
	collides(us, them) {
        if (them.traits.get(Killable)) {
            them.traits.get(Killable).kill();
            us.vel.set(100, -200);
        } else {
			return;
		}
	}

	update(entity, gameContext, level) {
		if(entity.pos.y > level.camera.size.y) {
			entity.traits.get(Killable).kill();
		}
	}
}

function createMantleFactory(sprite) {
	function routeAnim(mantle) {
		if (mantle) {
			return 'fall';
		} else {
			console.log('mantle is undefined');
		}
	}

	function mantleDraw(context) { // dynamicaly define method droidDraw 
		sprite.draw(routeAnim(this), context, 0, 0); // then we dr aw SpriteSHeet's							                        // by method draw takes name, x, y and context
	}

	return function createMantle() {
		const mantle = new Entity();
		mantle.size.set(13, 16);
	
		mantle.addTrait(new Physics());
		mantle.addTrait(new Behavior());
		mantle.addTrait(new Killable());

		mantle.draw = mantleDraw;

		return mantle;
	} 
}