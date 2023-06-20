<template>
  <div class="notice">
    <uni-notice-bar :scrollable="true" :single="true" :text="noticeContent.text" :color='noticeStyles.fontColor'
      :backgroundColor='noticeStyles.cmpBackground' />
  </div>
</template>

<script>
import UniNoticeBar from "./uni-notice-bar.vue";
export default {
  name: "McNotice",

  components: {
    UniNoticeBar,
  },

  props: {
    noticeStyles: {
      type: Object,
      default: () => { },
    },
    noticeContent: {
      type: Object,
      default: () => { },
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.notice {}
</style>