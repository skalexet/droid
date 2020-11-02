import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Hit from '../traits/Hit.js';
import {loadSpriteSheet} from '../loaders/sprite.js'; 

export function loadBigSpider() { // export of function
	return loadSpriteSheet('bigSpider') // returns function from sprites.js that returns the SpriteSheet obj
	.then(createBigSpiderFactory);
}

class Behavior extends Trait {
	collides(us, them) {
		if(!them.traits.get(Hit)) {
			return;
		} else {	
			them.traits.get(Killable).kill();
		}
	}
 
}

function createBigSpiderFactory(sprite) {
	const liveAnim = sprite.animations.get('live');
	const atackAnim = sprite.animations.get('atack');

	function routeAnim(bigSpider) {	 
		if (bigSpider.traits) {
			return liveAnim(bigSpider.lifetime);
		}
		return liveAnim(bigSpider.lifetime);
	}

	function bigSpiderDraw(context) { // dynamicaly define method droidDraw 
		sprite.draw(routeAnim(this), context, 0 , 0); // then we dr aw SpriteSHeet's							                        // by method draw takes name, x, y and context
	}

	return function createbigSpider() {
		const bigSpider = new Entity();
		bigSpider.size.set(29, 21);
	
		bigSpider.addTrait(new Physics());
		bigSpider.addTrait(new Solid());
		bigSpider.addTrait(new Behavior());
		// bigSpider.addTrait(new Killable());

		bigSpider.draw = bigSpiderDraw;

		return bigSpider;
	} 
}