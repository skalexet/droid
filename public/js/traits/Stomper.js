import Trait from '../Trait.js';
import Killable from './Killable.js';

export default class Stomper extends Trait { // extends by proto
	static EVENT_STOMP = Symbol('stomp');

	constructor() {
		super('stomper');
		this.bounceSpeed = 700;
	}

	bounce(us, them) {
		us.bounds.right = them.bounds.left;
		us.vel.y = -this.bounceSpeed;
	}

	collides(us, them) {
		if (!them.traits.has(Killable) || them.traits.get(Killable).dead) {
			return;
		}

		if (us.vel.y > them.vel.y) {
			this.queue(() => this.bounce(us, them));
			us.sounds.add('stomp');
			us.events.emit(Stomper.EVENT_STOMP, us, them);
		}
	}
} 
