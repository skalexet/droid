import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import Moving from '../traits/Moving.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Hit from '../traits/Hit.js';
import Go from '../traits/Go.js';
import {loadSpriteSheet} from '../loaders/sprite.js'; 

export function loadBjaka() { // export of function
	return loadSpriteSheet('bjaka') // returns function from sprites.js that returns the SpriteSheet obj
	.then(createBjakaFactory);
}

class Behavior extends Trait {
	collides(us, them) {
		if(!them.traits.get(Hit)) {
			return;
		} else if (them.traits.get(Hit).hit === true) {
			this.checkDir(us, them);
		} else {
			this.killThem(them);
		}
	}

	killThem(them) {
		them.traits.get(Killable).kill();
	}

	killUs(us, them) {
		them.sounds.add('hitBjaka');
		this.sheet(us, them);
		us.traits.get(Killable).kill();
	}

	checkDir(us, them) {
		if ((us.traits.get(Moving).speed < 0 && them.traits.get(Go).lookDir < 0) 
		&& (us.pos.x > them.pos.x)) {
			this.killThem(them);
		} else if ((us.traits.get(Moving).speed > 0 && them.traits.get(Go).lookDir > 0)
		&& (us.pos.x < them.pos.x)) {
			this.killThem(them);
		} else {
			this.killUs(us, them);
		}
	}

	sheet(us, them) {
		us.traits.get(Moving).enabled = false;
		us.traits.get(Solid).obstructs = false;
		if(us.pos.x > them.pos.x) {
			them.vel.x -= 100;
			us.vel.y -= 70;
			us.vel.x += 390;
		} else {
			them.vel.x += 100;
			us.vel.y -= 70;
			us.vel.x -= 390;
		}
	}

	update(entity, gameContext, level) {
		if(entity.pos.y > level.camera.size.y) {
			entity.traits.get(Killable).kill();
		}
	}

}


function createBjakaFactory(sprite) {
	const walkAnim = sprite.animations.get('walk');
	const fallAnim = sprite.animations.get('fall');

	function routeAnim(bjaka) {
		if (bjaka.traits.get(Killable).dead) {
			return fallAnim(bjaka.lifetime);
		}
		return walkAnim(bjaka.lifetime);
	}

	function bjakaDraw(context) { 
		sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0); 
	}

	return function createBjaka() {
		const bjaka = new Entity();
		bjaka.size.set(12, 14);
	 
	
		bjaka.addTrait(new Physics());
		bjaka.addTrait(new Solid());
		bjaka.addTrait(new Moving());
		bjaka.addTrait(new Behavior());
		bjaka.addTrait(new Killable());

		bjaka.draw = bjakaDraw;

		return bjaka;
	} 

}