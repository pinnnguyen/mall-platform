<template>
  <div class="manage">
    <div class="manage-body">
      <models-list></models-list>
    </div>
  </div>
</template>

<script>
import ModelsList from "@/components/ModelsList";

export default {
  name: "model-manage",

  components: {
    ModelsList,
  },

  data() {
    return {
      list: [
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.manage {
  padding: 20px;

  .manage-body {
    width: 100%;
    height: 800px;
    padding: 10px;
    background: #fff;

    .advertising {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;

      .advertising-title {
        margin-top: 40px;
        font-size: 29px;
        font-weight: 550;
        color: #fff;
        letter-spacing: 2px;
      }

      .advertising-sub {
        margin-top: 30px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        letter-spacing: 1px;
      }

      .advertising-btn {
        display: inline-block;
        margin-top: 30px;
        padding: 8px 24px;
        border-radius: 2px;
        font-size: 14px;
        background: #fff;
        letter-spacing: 1px;
      }

      .advertising-image {
        width: 120px;
        // height: 220px;
        margin-left: 40px;
      }
    }
  }
}
</style>