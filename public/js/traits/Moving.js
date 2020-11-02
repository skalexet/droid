import {Sides} from '../Entity.js'; //supply Trait class
import Trait from '../Trait.js';

export default class Moving extends Trait { // extends by proto
	constructor() {
		super('moving'); // named
		this.enabled = true;
		this.speed = -30;
	}

	obstruct(entity, side) {
		if (side === Sides.LEFT || side === Sides.RIGHT) {
			this.speed = -this.speed;
		}
	}

	update(entity) {
		if (this.enabled) {
			entity.vel.x = this.speed;
		}
	}
}
