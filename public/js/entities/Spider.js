import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import Moving from '../traits/Moving.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Hit from '../traits/Hit.js';
import {loadSpriteSheet} from '../loaders/sprite.js'; 
import Go from '../traits/Go.js';
import Camera from '../Camera.js';

export function loadSpider() { // export of function
	return loadSpriteSheet('spider') // returns function from sprites.js that returns the SpriteSheet obj
	.then(createSpiderFactory);
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
		them.sounds.add('hitSpider');
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
			them.vel.x -= 25;
			them.vel.y -= 145;
			us.vel.y -= 70;
			us.vel.x += 280;
		} else {
			them.vel.x += 25;
			them.vel.y -= 145;
			us.vel.y -= 70;
			us.vel.x -= 280;
		}
	}

	update(entity, level) {
		if(entity.pos.y > level.camera.size.y) {
			entity.traits.get(Killable).kill();
		}
	}
}

function createSpiderFactory(sprite) {
	const walkAnim = sprite.animations.get('walk');

	function routeAnim(spider) {
		if (spider.traits.get(Killable).dead) {
			return 'fall';
		}

		return	walkAnim(spider.lifetime);
	}

	function spiderDraw(context) { // dynamicaly define method droidDraw 
		sprite.draw(routeAnim(this), context, 0, 0); // then we dr aw SpriteSHeet's							                        // by method draw takes name, x, y and context
	}

	return function createSpider() {
		const spider = new Entity();
		spider.size.set(13, 16);
	
		spider.addTrait(new Physics());
		spider.addTrait(new Solid());
		spider.addTrait(new Moving());
		spider.addTrait(new Behavior());
		spider.addTrait(new Killable());

		spider.draw = spiderDraw;

		return spider;
	} 
}