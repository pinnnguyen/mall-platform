<template>
  <div class="shape">
    <div v-if="data.component != 'waiting'" class="shape-tab" @click="setcurComponent(data)">
      <template v-if="control.curWidget && control.curWidget.id == data.id">
        <i class="icon icon-shanchu tab-icon f16" @click.stop="delComponent(data.id)"></i>
      </template>

      <span v-else>{{ data.name }}</span>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "shape",

  inject: ["control"],

  props: {
    data: {
      type: Object,
    },
  },

  methods: {
    setcurComponent() {
      this.$emit("changeCurrWidget", this.data);
    },

    delComponent(id) {
      let index = this.control.curPage.componentList.findIndex(
        (item) => item.id == id
      );
      this.control.curPage.componentList.splice(index, 1);
      this.control.curWidget = undefined;
    },
  },
};
</script>

<style lang="scss" scoped>
.shape {
  position: relative;

  .shape-tab {
    position: absolute;
    right: -86px;
    /*no*/
    top: 0;
    /*no*/
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    /*no*/
    height: 24px;
    /*no*/
    font-size: 12px;
    /*no*/
    color: #333;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &::after {
      content: "";
      position: absolute;
      right: 100%;
      /*no*/
      top: 7px;
      /*no*/
      width: 0;
      /*no*/
      height: 0;
      /*no*/
      border-width: 5px;
      /*no*/
      border-style: solid;
      border-color: transparent;
      margin-bottom: -1px;
      /*no*/
      border-right-width: 5px;
      /*no*/
      border-right-color: currentColor;
      color: #fff;
    }
  }

  .event-none {
    pointer-events: none;
  }

  .tab-icon {
    color: #969799;
    cursor: pointer;

    &:hover {
      color: #87888a;
    }
  }
}
</style>