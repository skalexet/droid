import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import Moving from '../traits/Moving.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Hit from '../traits/Hit.js';
import Go from '../traits/Go.js';
import {loadSpriteSheet} from '../loaders/sprite.js'; 

export function loadHumid() { // export of function
	return loadSpriteSheet('humid') // returns function from sprites.js that returns the SpriteSheet obj
	.then(createHumidFactory);
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
		them.sounds.add('hitHumid');
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
			us.sounds.add('hit');
			this.killUs(us, them);
		}
	}

	sheet(us, them) {
		us.traits.get(Moving).enabled = false;
		us.traits.get(Solid).obstructs = false;
		if(us.pos.x > them.pos.x) {
			them.vel.x -= 70;
			us.vel.y -= 180;
			us.vel.x += 420;
		} else {
			them.vel.x += 70;
			us.vel.y -= 180;
			us.vel.x -= 420;
		}
	}

	update(entity, gameContext, level) {
		if(entity.pos.y > (level.camera.size.y + 20)) {
			entity.traits.get(Killable).kill();
		}
	}
}

function createHumidFactory(sprite) {
	const walkAnim = sprite.animations.get('walk');

	function routeAnim(humid) {
		if (humid.traits.get(Killable).dead) {
			return 'fall';
		}
		return	walkAnim(humid.lifetime);
	}

	function humidDraw(context) { // dynamicaly define method droidDraw 
		sprite.draw(routeAnim(this), context, 0 , 0); // then we dr aw SpriteSHeet's							                        // by method draw takes name, x, y and context
	}

	return function createHumid() {
		const humid = new Entity();
		humid.size.set(13, 16);
	
		humid.addTrait(new Physics());
		humid.addTrait(new Solid());
		humid.addTrait(new Moving());
		humid.addTrait(new Behavior());
		humid.addTrait(new Killable());

		humid.draw = humidDraw;

		return humid;
	} 
}