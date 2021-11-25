/**
 * Full credits to https://github.com/roa-2021/the-one-word-story/blob/main/word.js for that word checker.
 * Requires "check-word", "profanity-js" NPM packages.
*/

const checkWord = require('check-word');
const Profanity = require('profanity-js');
const words = checkWord('en');

const profanity = new Profanity({ test: '' }, { language: 'en-us' });

// if word is invalid return TRUE
function isInvalidWord(input) {
	// If the input is not string, return invalid.
	if (typeof input !== 'string') {
		return true;
	}
	// If the input is bigger in length or equal to 26, return invalid.
	else if (input.length >= 26) {
		return true;
	}
	// If the input is not a valid english word, return invalid.
	else if (words.check(input) === false) {
		return true;
	}
	// If the input is profane (https://en.wikipedia.org/wiki/Profanity), return invalid.
	else if (profanity.isProfane(input)) {
		return true;
	}
	// If none of the if statements triggered, return valid.
	return false;
}

module.exports = {
	isInvalidWord,
};