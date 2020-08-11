module.exports = {
	'env': {
		'commonjs': true,
		'es2020': true,
		'node': true,
		'mocha': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 11
	},
	'rules': {
		'indent': [
			'warn',
			'tab'
		],
		'linebreak-style': [
			'warn',
			'windows'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'warn',
			'always'
		],
		'no-mixed-spaces-and-tabs': [
			'warn'
		],
		'no-unexpected-multiline': [
			'warn'
		]
	}
};
