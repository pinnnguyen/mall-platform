<template>
  <div class="categoryTpl m20 p20 bg-white">
    <div class="mb20 f14 f-bold" style="color:#595961">Cài đặt danh sách</div>
    <div class="p10 r10" style="background:#f2f2f6">
      <div class="categoryTpl-body">

        <img class="categoryTpl-body-left" :src="getImage()">

        <div class="categoryTpl-body-right">
          <el-form label-width="80px">
            <el-form-item label="Phong cách mặc định">
              <el-radio v-model="categoryTpl.advertising" :label="true">Mở</el-radio>
              <el-radio v-model="categoryTpl.advertising" :label="false">Khép kín</el-radio>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "categoryTpl",

  computed: {
    ...mapGetters(["project"]),

    categoryTpl() {
      return this.project.config.categoryTpl;
    },
  },

  methods: {
    getImage() {
      return this.categoryTpl.advertising ? require("@/assets/image/pc-template-category-advert.jpg") : require('@/assets/image/pc-template-category-base.jpg')
    },
  },
};
</script>

<style lang="scss" scoped>
.categoryTpl {
  .categoryTpl-body {
    display: flex;
    padding: 10px 30px;

    .categoryTpl-body-left {
      width: 375px;
      margin-right: 30px;
    }

    .categoryTpl-body-right {
      padding-top: 10px;
    }
  }
}
</style>