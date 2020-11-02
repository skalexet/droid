import Trait from '../Trait.js';
import Camera from '../Camera.js';

export default class Killable extends Trait { // extends by proto
	constructor() {
		super('killable'); // named
		this.dead = false;
		this.deadTime = 0;
		this.removeAfter = 2;
		this.camera = new Camera();
	}

	kill() {
		this.queue(() => this.dead = true);
	}

	revive() {
		this.dead = false;
		this.deadTime = 0;
	}

	update(entity, {deltaTime}, level) {
		if (entity.pos.y > this.camera.size.y) {
			this.kill();
		} else if (entity.pos.y < -8) {
			entity.pos.y = -8;
		}

		if (this.dead) {
			
			if (entity.draw.name == 'droidDraw') {
				entity.sounds.add('die');
			}
			
			this.deadTime += deltaTime;
			if (this.deadTime > this.removeAfter) {
				this.queue(() => {
					level.entities.delete(entity);
				});
			}
		}
	}
}
