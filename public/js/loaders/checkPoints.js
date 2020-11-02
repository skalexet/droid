import {loadJSON} from '../loaders.js';

export function loadCheckPoints(name) {
	return loadJSON(`/checkPoints/${name}.json`)
		.then(checkPointSheet => {
			return checkPointSheet.checkpoints;
        });
}

