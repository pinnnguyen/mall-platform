<template>
  <div class="search" :style="[$cmpStyle(styles)]">
    <div class="search-body" :style="[getSourceStyle()]" @click="$jump({ name: 'search' })">
      <span class="">{{ value.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "McSearch",

  props: {
    styles: {
      type: Object,
      default: () => { },
    },
    value: {
      type: Object,
      default: () => { },
    },
  },

  methods: {
    getSourceStyle() {
      let temp = {};
      if (this.styles.shape == "circular") temp.borderRadius = "25px";
      if (this.styles.location == "center") temp.justifyContent = "center";
      return temp;
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 8px 12px;

  .search-body {
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    height: 34px;
    background: #fff;
    font-size: 14px;
    color: #969799;
  }
}
</style
>+
