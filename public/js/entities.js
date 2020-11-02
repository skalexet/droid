import {loadDroid} from './entities/Droid.js';
import {loadHumid} from './entities/Humid.js';
import {loadBjaka} from './entities/Bjaka.js';
import {loadPtero} from './entities/Ptero.js';
import {loadGorilla} from './entities/Gorilla.js';
import {loadEgg} from './entities/Egg.js';
import {loadSpidersEgg} from './entities/SpidersEgg.js';
import {loadSpidersEggFaster} from './entities/SpidersEggFaster.js';
import {loadSpider} from './entities/Spider.js';
import {loadBigSpider} from './entities/BigSpider.js';
import {loadMantle} from './entities/Mantle.js';
import {loadMantleRain} from './entities/MantleRain.js';
import {loadMantleRainFaster} from './entities/MantleRainFaster.js';
import {loadMantleRainFastest} from './entities/MantleRainFastest.js';
import {loadHumidCheckPoint} from './entities/HumidCheckPoint.js';
import {loadBjakaCheckPoint} from './entities/BjakaCheckPoint.js';

export function loadEntities(audioContext) {
	const entityFactories = {};

	function addAs(name) {
		return factory => entityFactories[name] = factory;
	}

	return Promise.all([
		loadDroid(audioContext).then(addAs('droid')),
		loadHumid(audioContext).then(addAs('humid')),
		loadHumidCheckPoint(audioContext).then(addAs('humidCheckPoint')),
		loadBjakaCheckPoint(audioContext).then(addAs('bjakaCheckPoint')),
		loadBjaka(audioContext).then(addAs('bjaka')),
		loadPtero(audioContext).then(addAs('ptero')),
		loadGorilla(audioContext).then(addAs('gorilla')),
		loadSpider(audioContext).then(addAs('spider')),
		loadBigSpider(audioContext).then(addAs('bigSpider')),
		loadEgg(audioContext).then(addAs('egg')),
		loadMantle(audioContext).then(addAs('mantle')),
		loadMantleRain(audioContext).then(addAs('mantleRain')),
		loadMantleRainFaster(audioContext).then(addAs('mantleRainFaster')),
		loadMantleRainFastest(audioContext).then(addAs('mantleRainFastest')),
		loadSpidersEgg(audioContext).then(addAs('spidersEgg')),
		loadSpidersEggFaster(audioContext).then(addAs('spidersEggFaster')),
	])
	.then(() => entityFactories);
}