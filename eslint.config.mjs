// @ts-check
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
		// Forces HTML inside <template> to indent correctly
		"vue/html-indent": ["error", "tab", {
			"attribute": 1,
			"baseIndent": 1,
			"closeBracket": 0,
			"alignAttributesVertically": true,
		}],
		// Prevents messy multi-attribute lines
		"vue/max-attributes-per-line": ["error", {
			"singleline": { "max": 1 },
			"multiline": { "max": 1 }
		}],
		"vue/first-attribute-linebreak": ["error", {
			"singleline": "beside",
			"multiline": "below"
		}],
		// Syncs script indentation with the rest of the file
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