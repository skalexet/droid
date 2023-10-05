import Keyboard from './KeyboardState.js';
import InputRouter from "./InputRouter.js"; 
import Jump from './traits/Jump.js';
import Go from './traits/Go.js'; 
import Hit from './traits/Hit.js';

export function setupKeyboard(window) {
	const input = new Keyboard();
	const router = new InputRouter();

	input.listenTo(window);
	
	input.addMapping('Space', keyState => { 
		if (keyState) {
			router.route(entity => entity.traits.get(Jump).start());
		} else {                
			router.route(entity => entity.traits.get(Jump).cancel());
		}
	});
	
	input.addMapping('KeyS', keyState => {
		router.route(entity => entity.turbo(keyState));
	});

	input.addMapping('KeyD', keyState => {
		router.route(entity => entity.traits.get(Go).dir += keyState ? 1 : -1);
	});

	input.addMapping('KeyA', keyState => {
		router.route(entity => entity.traits.get(Go).dir += keyState ? -1 : 1);
	});
	
	input.addMapping('Enter', keyState => {
		if(keyState) {
			router.route(entity => entity.traits.get(Hit).start());
	    } else {
			router.route(entity => entity.traits.get(Hit).cancel());
		}
	});

	return router;
}