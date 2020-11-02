import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import Velocity from '../traits/Velocity.js';
import Gravity from '../traits/Gravity.js';
import {loadSpriteSheet} from '../loaders/sprite.js'; 
import Hit from '../traits/Hit.js';

export function loadPtero() {
	return loadSpriteSheet('ptero') 
	.then(createPteroFactory);
}

class Behavior extends Trait {
	constructor() {
		super();
		this.gravity = new Gravity();
	}

	collides(us, them) {
		if (us.traits.get(Killable).dead) {
			return;
		}

		if (them.traits.has(Hit)) {
			them.traits.get(Killable).kill();	
		}
	}

	update(entity, gameContext, level, deltaTime) {
		if (entity.traits.get(Killable).dead) {
			this.gravity.update(entity, gameContext, level);
		}

 
		if (entity.lifetime > 17) {
			entity.vel.y -= 21;
			if (entity.pos.y < 0) {
				entity.traits.get(Killable).kill();
			}
		}
	}
}

function createPteroFactory(sprite) {
    const flyAnim = sprite.animations.get('fly');
    const dieAnim = sprite.animations.get('die');

    function routeAnim(ptero) {
		if (ptero.traits.get(Killable).dead) {
			return dieAnim(ptero.lifetime);
		}
		return	flyAnim(ptero.lifetime);
	}

    function pteroDraw(context) {  
		sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0); 
	}

	return function createPtero() {
		const ptero = new Entity();
		ptero.size.set(16, 14);
	
		ptero.addTrait(new Velocity());
		ptero.addTrait(new Behavior());
		ptero.addTrait(new Killable());

		ptero.draw = pteroDraw;

		return ptero;
	} 
}