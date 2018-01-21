export {}

const Es6Promise = require('es6-promise');

if (typeof Promise !== 'function') {
	window['Promise'] = Es6Promise;
}