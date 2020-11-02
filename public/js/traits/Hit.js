import {Sides} from '../Entity.js'; //supply Trait class
import Trait from '../Trait.js';

export default class Hit extends Trait { // extends by proto
	constructor() {
		super('hit'); // named
        this.engageTime = 0;
        this.atack = 0;
        this.lastTime = 0;
        this.hitCounter = 0;
        this.hit = false;
    }

    start() {
        this.engageTime++;
        this.hit = true;
    }

    cancel() {
        this.engageTime = 0;
        this.atack = 0;
        this.hitCounter = 0;
        this.hit = false;
    }

    update(entity, {deltaTime}) {
        if(this.engageTime > 0) {
            this.hitCounter++;
            this.atack = this.hitCounter;
        } 
    }
		
}
