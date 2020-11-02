export function setupMouseControl(canvas, entity, camera) { // esp.to main takes 
	let lastEvent;
	['mousedown', 'mousemove'].forEach(eventName => {
		canvas.addEventListener(eventName, event => {
			if (event.buttons === 1) { //generaly it's just checking for clicks and movement and  
				entity.vel.set(0, 0); // then replace the position of the Entity obj droid 
				entity.pos.set(
				event.offsetX + camera.pos.x, 
				event.offsetY + camera.pos.y); // by mouses coordinates
			} else if (event.buttons === 2
				&& lastEvent && lastEvent.buttons === 2
				&& lastEvent.type === 'mousemove') {
				camera.pos.x -= event.offsetX - lastEvent.offsetX;
			}
			lastEvent = event;
		});
	});

	canvas.addEventListener('contextmenu', event => {
		event.preventDefault();
	});
}