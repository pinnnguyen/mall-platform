<template>
  <div class="listTpl m20 p20 bg-white">
    <div class="mb20 f14 f-bold" style="color:#595961">Cài đặt danh sách</div>
    <div class="p10 r10" style="background:#f2f2f6">
      <div class="listTpl-body">

        <img class="listTpl-body-left" :src="getImage()">

        <div class="listTpl-body-right">
          <el-form label-width="80px">
            <el-form-item label="Phong cách mặc định">
              <el-radio v-model="listTpl.model" label="one">Một cột</el-radio>
              <el-radio v-model="listTpl.model" label="two">Cột đôi</el-radio>
            </el-form-item>
            <el-form-item label="Giỏ hàng">
              <el-radio v-model="listTpl.addIcon" label="cart">Phong cách một</el-radio>
              <el-radio v-model="listTpl.addIcon" label="add">Phong cách hai</el-radio>
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
  name: "listTpl",

  computed: {
    ...mapGetters(["project"]),

    listTpl() {
      return this.project.config.listTpl;
    },
  },

  methods: {
    getImage() {
      let imgUrl = `pc-list-${this.listTpl.model}-${this.listTpl.addIcon}.jpg`;
      return require("@/assets/image/" + imgUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.listTpl {
  .listTpl-body {
    display: flex;
    padding: 10px 30px;

    .listTpl-body-left {
      width: 375px;
      margin-right: 30px;
    }

    .listTpl-body-right {
      padding-top: 10px;
    }
  }
}
</style>