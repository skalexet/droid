import {Vec2} from './math.js'; //supply Vec2

export default class Camera { //esp. main
	constructor() {
		this.pos = new Vec2(0, 0); // pos is the new Vec2 object
		this.size = new Vec2(256, 224);// also
	}
}