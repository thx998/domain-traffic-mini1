module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1655433776744, function(require, module, exports) {

const parseMilliseconds = require('parse-ms');

const pluralize = (word, count) => count === 1 ? word : `${word}s`;

const SECOND_ROUNDING_EPSILON = 0.0000001;

module.exports = (milliseconds, options = {}) => {
	if (!Number.isFinite(milliseconds)) {
		throw new TypeError('Expected a finite number');
	}

	if (options.colonNotation) {
		options.compact = false;
		options.formatSubMilliseconds = false;
		options.separateMilliseconds = false;
		options.verbose = false;
	}

	if (options.compact) {
		options.secondsDecimalDigits = 0;
		options.millisecondsDecimalDigits = 0;
	}

	const result = [];

	const floorDecimals = (value, decimalDigits) => {
		const flooredInterimValue = Math.floor((value * (10 ** decimalDigits)) + SECOND_ROUNDING_EPSILON);
		const flooredValue = Math.round(flooredInterimValue) / (10 ** decimalDigits);
		return flooredValue.toFixed(decimalDigits);
	};

	const add = (value, long, short, valueString) => {
		if ((result.length === 0 || !options.colonNotation) && value === 0 && !(options.colonNotation && short === 'm')) {
			return;
		}

		valueString = (valueString || value || '0').toString();
		let prefix;
		let suffix;
		if (options.colonNotation) {
			prefix = result.length > 0 ? ':' : '';
			suffix = '';
			const wholeDigits = valueString.includes('.') ? valueString.split('.')[0].length : valueString.length;
			const minLength = result.length > 0 ? 2 : 1;
			valueString = '0'.repeat(Math.max(0, minLength - wholeDigits)) + valueString;
		} else {
			prefix = '';
			suffix = options.verbose ? ' ' + pluralize(long, value) : short;
		}

		result.push(prefix + valueString + suffix);
	};

	const parsed = parseMilliseconds(milliseconds);

	add(Math.trunc(parsed.days / 365), 'year', 'y');
	add(parsed.days % 365, 'day', 'd');
	add(parsed.hours, 'hour', 'h');
	add(parsed.minutes, 'minute', 'm');

	if (
		options.separateMilliseconds ||
		options.formatSubMilliseconds ||
		(!options.colonNotation && milliseconds < 1000)
	) {
		add(parsed.seconds, 'second', 's');
		if (options.formatSubMilliseconds) {
			add(parsed.milliseconds, 'millisecond', 'ms');
			add(parsed.microseconds, 'microsecond', 'µs');
			add(parsed.nanoseconds, 'nanosecond', 'ns');
		} else {
			const millisecondsAndBelow =
				parsed.milliseconds +
				(parsed.microseconds / 1000) +
				(parsed.nanoseconds / 1e6);

			const millisecondsDecimalDigits =
				typeof options.millisecondsDecimalDigits === 'number' ?
					options.millisecondsDecimalDigits :
					0;

			const roundedMiliseconds = millisecondsAndBelow >= 1 ?
				Math.round(millisecondsAndBelow) :
				Math.ceil(millisecondsAndBelow);

			const millisecondsString = millisecondsDecimalDigits ?
				millisecondsAndBelow.toFixed(millisecondsDecimalDigits) :
				roundedMiliseconds;

			add(
				Number.parseFloat(millisecondsString, 10),
				'millisecond',
				'ms',
				millisecondsString
			);
		}
	} else {
		const seconds = (milliseconds / 1000) % 60;
		const secondsDecimalDigits =
			typeof options.secondsDecimalDigits === 'number' ?
				options.secondsDecimalDigits :
				1;
		const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
		const secondsString = options.keepDecimalsOnWholeSeconds ?
			secondsFixed :
			secondsFixed.replace(/\.0+$/, '');
		add(Number.parseFloat(secondsString, 10), 'second', 's', secondsString);
	}

	if (result.length === 0) {
		return '0' + (options.verbose ? ' milliseconds' : 'ms');
	}

	if (options.compact) {
		return result[0];
	}

	if (typeof options.unitCount === 'number') {
		const separator = options.colonNotation ? '' : ' ';
		return result.slice(0, Math.max(options.unitCount, 1)).join(separator);
	}

	return options.colonNotation ? result.join('') : result.join(' ');
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1655433776744);
})()
//miniprogram-npm-outsideDeps=["parse-ms"]
//# sourceMappingURL=index.js.map