import {Sides} from '../Entity.js'; //supply Trait class
import Trait from '../Trait.js';

export default class Solid extends Trait { // extends by proto
	constructor() {
		super('solid'); // named
		this.obstructs = true;
	}

	obstruct(entity, side, match) {
		if(!this.obstructs) {
			return;
		}

		if (side === Sides.BOTTOM) {
			entity.bounds.bottom = match.y1; //same
			entity.vel.y = 0;
		} else if (side === Sides.TOP) {
			entity.bounds.top = match.y2;
			entity.vel.y = 0;
		} else if (side === Sides.LEFT) {
			entity.bounds.left = match.x2;
			entity.vel.x = 0;
		} else if (side === Sides.RIGHT) {
			entity.bounds.right = match.x1;
			entity.vel.x = 0;
		}
	}
}
