import Trait from '../Trait.js';
import {Vec2} from '../math.js';
import Killable from '../traits/Killable.js';
import CheckPoint from '../CheckPoint.js';

export default class PlayerController extends Trait {
	constructor() {
		super('playerController'); 
		this.checkpoint = new Vec2(0, 0);
		this.player = null;
		
	}

	setPlayer(entity) {
		this.player = entity;
	}

	update(entity, {deltaTime}, level) {
		if (!level.entities.has(this.player)) {			
			this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
			level.entities.add(this.player);
			this.player.traits.get(Killable).revive();
		}

	}

}
