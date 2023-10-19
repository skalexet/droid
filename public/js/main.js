import Level from './Level.js';  
import Timer from './Timer.js';  
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {makePlayer, createPlayerEnv, findPlayers} from './player.js';
import {setupKeyboard} from './input.js';
import {createColorLayer} from './layers/color.js';
import {createTextLayer} from './layers/text.js';
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardLayer} from './layers/dashboard.js';
import SceneRunner from './SceneRunner.js';
import { createPlayerProgressLayer } from './layers/player-progress.js';
import Scene from './Scene.js';
import TimedScene from './TimedScene.js';

async function main() {
	const canvas = document.createElement('canvas');
	canvas.id = 'screen';
	canvas.width = 256;
	canvas.height = 244;
	document.body.append(canvas);

	const a = document.getElementById('startDeclare');
	a.remove();

	const videoContext = canvas.getContext('2d');
	const audioContext = new AudioContext();
	
	const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);
	const loadLevel = createLevelLoader(entityFactory);

	const sceneRunner = new SceneRunner();

	const droid = entityFactory.droid();	
	makePlayer(droid, "DROID");
	
	window.droid = droid;

	const inputRouter = setupKeyboard(window);
	inputRouter.addReceiver(droid);

	async function runLevel(name) {
		const loadScreen = new Scene();
		loadScreen.comp.layers.push(createColorLayer('#000'));
		loadScreen.comp.layers.push(createTextLayer(font, `${name}`));
		sceneRunner.addScene(loadScreen);
		sceneRunner.runNext();

		const level = await loadLevel(name);

		level.events.listen(Level.EVENT_TRIGGER, (spec, trigger, touches) => {
			if (spec.type === "goto") {
				for (const _ of findPlayers(touches)) {
					runLevel(spec.name);
					return;
				}
			}
		});

		const playerProgressLayer = createPlayerProgressLayer(font, level);
		const dashboardLayer = createDashboardLayer(font, level);

		droid.pos.set(32, 32);
		level.entities.add(droid);

		const playerEnv = createPlayerEnv(droid, level);
		level.entities.add(playerEnv);

		const waitScreen = new TimedScene();
        waitScreen.countDown = 2;
        waitScreen.comp.layers.push(createColorLayer('#000'));
        waitScreen.comp.layers.push(dashboardLayer);
        waitScreen.comp.layers.push(playerProgressLayer);
        sceneRunner.addScene(waitScreen);

		//level.comp.layers.push(createCollisionLayer(level));
		level.comp.layers.push(dashboardLayer);
		sceneRunner.addScene(level);

		sceneRunner.runNext();
	}

	const gameContext = {
		audioContext,
		videoContext,
		entityFactory,
		deltaTime: null,
	};

	const timer = new Timer(1/60);
	timer.update = function update(deltaTime) { 
		gameContext.deltaTime = deltaTime;
		sceneRunner.update(gameContext);
	}												

	timer.start();

	runLevel('1'); 
}

const start = () => {
	window.removeEventListener('keydown', start);
	main();
};
 
window.addEventListener('keydown', start);