import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
	features: {
		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: true,
			commaDangle: "always-multiline",
		},
	},
	rules: {
		"vue/html-indent": ["error", "tab", {
			"attribute": 1,
			"baseIndent": 1,
			"closeBracket": 0,
			"alignAttributesVertically": true,
		}],
		"vue/max-attributes-per-line": ["error", {
			"singleline": { "max": 1 },
			"multiline": { "max": 1 }
		}],
		"vue/first-attribute-linebreak": ["error", {
			"singleline": "beside",
			"multiline": "below"
		}],
		"vue/script-indent": ["error", "tab", {
			"baseIndent": 1,
			"switchCase": 1
		}],
		"vue/html-closing-bracket-newline": ["error", {
			"singleline": "never",
			"multiline": "always"
		}]
	}
});