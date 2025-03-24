export function capitalize(string) {
	return string.charAt(0).toUpperCase() +
		string.slice(1);
}

export function toChar(index) {
	if (index <= 0) return '';

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';

	while (index > 0) {
		index--; // decrease on 1 because alphabets index starts from 0
		const remainder = index % 26;

		result = alphabet[remainder] + result;
		index = Math.floor(index / 26);
	}

	return result;
}