export default {
    props: {
        id: {},
        value: {},
        label: {
            type: String,
        },
        options: {
            type: Object,
            default: () => { }
        }
    },

    data() {
        return {
            mValue: undefined,
            defaultOptions: {}
        };
    },

    computed: {
        mOptions() {
            return { ...this.defaultOptions, ...this.options }
        }
    },

    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(newVal, oldVal) {
                this.mValue = this.value;
            },
        },
        mValue: {
            handler() {
                this.$emit("input", this.mValue);
                this.$emit("change", this.mValue);
            },
        },
    },
}