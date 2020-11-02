import Trait from '../Trait.js';

export default class Physics extends Trait { // extends by proto
	constructor() {
		super('physics');
	}

	update(entity, gameContext, level) {
		const {deltaTime} = gameContext;
		entity.pos.x += entity.vel.x * deltaTime; 
		level.tileCollider.checkX(entity, gameContext, level);

		entity.pos.y += entity.vel.y * deltaTime;// increasing y by y.pos mult dt
		level.tileCollider.checkY(entity, gameContext, level);// check the pos and correct it

		entity.vel.y += level.gravity * deltaTime;
	}
}
