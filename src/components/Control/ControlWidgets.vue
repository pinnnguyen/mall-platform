<template>
  <div class="wrap">
    <div class="w-100 h-100 p16 bg-white">
      <ul class="flex flex-wrap">
        <li v-for="(item, index) in $initializing" :key="index" class="item" :data-component="item.component" draggable
          @dragstart="handleDragStart" @dragend="dragEnd">
          <i class="icon" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["control"],

  methods: {
    handleDragStart(e) {
      this.control.dragWidget = this.$getNewComponent(
        e.target.dataset.component
      );
      this.control.dragstatus = true;
    },

    dragEnd(e) {
      this.control.h5Iframe.contentWindow.postMessage(
        {
          even: "drop",
          params: this.control.dragWidget,
        },
        "*"
      );

      this.control.dragstatus = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 176px;
  /*no*/
  overflow: hidden;
}

.item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72px;
  /*no*/
  margin-bottom: 8px;
  /*no*/
  padding: 10px 0;
  /*no*/
  font-size: 12px;
  /*no*/
  color: #666;

  i {
    font-size: 29px;
    /*no*/
    margin-top: 5px;
    /*no*/
    margin-bottom: 10px;
    /*no*/
  }

  &:hover {
    color: #fff;
    background: $color-theme;
  }

  span {
    text-align: center;
  }
}
</style>
