import Trait from '../Trait.js';

export default class Go extends Trait { //then extend it by prototype
	constructor() {
		super('go'); // assign name

		this.dir = 0; // oown param
		this.lookDir = 1;
		this.acceleration = 400; // same 
		this.deceleration = 300;
		this.dragFactor = 1/5000;
		this.distance = 0;
		this.heading = 1;
		this.checkPoint;
	}

	update(entity, {deltaTime}) {
		const absX = Math.abs(entity.vel.x);
		
		if (this.checkPoint) {
			this.checkPoint.checkPos();
		}

		if (this.dir !== 0) {
			entity.vel.x += this.acceleration * deltaTime * this.dir;
			
			if (this.dir < 0) {
				this.lookDir = -1;
			} else {
				this.lookDir = 1;
			}
			
			if (entity.jump) {
				if (entity.jump.falling === false) {
					this.heading = this.dir;
				}
			} else {
				this.heading = this.dir;
			}
			 
		} else if (entity.vel.x !== 0) {
			const decel = Math.min(absX, this.deceleration * deltaTime);
			entity.vel.x += entity.vel.x > 0 ? -decel : decel;
		} else {
			this.distance = 0;
		}

		const drag = this.dragFactor * entity.vel.x * absX;
		entity.vel.x -= drag;

		this.distance += absX * deltaTime;	
	}                                                    
}
