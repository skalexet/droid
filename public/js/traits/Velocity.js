import Trait from '../Trait.js';

export default class Velocity extends Trait { // extends by proto
	constructor() {
		super('velocity'); // named
	}

	update(entity, {deltaTime}, level) {
		entity.pos.x += entity.vel.x * deltaTime; 
		entity.pos.y += entity.vel.y * deltaTime;
	}
}