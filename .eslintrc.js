let ERROR_TYPE = process.env.NODE_ENV === "production" ? "error" : "warn";
module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "no-console": ERROR_TYPE,
        "no-debugger": ERROR_TYPE,
        "prettier/prettier": "off",

        // Vue
        "vue/html-quotes": ["error", "double"],
        "vue/name-property-casing": ["error", "PascalCase"],
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/v-bind-style": ["error", "shorthand"],
        "vue/v-on-style": ["error", "shorthand"],
        "vue/order-in-components": [
            "error",
            {
                order: [
                    "el",
                    "name",
                    "parent",
                    "functional",
                    ["delimiters", "comments"],
                    ["components", "directives", "filters"],
                    "extends",
                    "mixins",
                    "inheritAttrs",
                    "model",
                    ["props", "propsData"],
                    "fetch",
                    "asyncData",
                    "data",
                    "computed",
                    "watch",
                    "LIFECYCLE_HOOKS",
                    "methods",
                    "head",
                    ["template", "render"],
                    "renderError"
                ]
            }
        ],
        "vue/this-in-template": ["error", "never"]
    },
};
