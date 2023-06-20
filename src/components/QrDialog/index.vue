<template>
  <el-dialog title="Xem trước mã QR" :visible.sync="show" width="30%">
    <ul class="flex row-around pt20">
      <li>
        <div class="flex-column row-center mb20">
          <img class="w200 h200 mb20" :src="getQr()" />
          <span class="lb-1 f-h5-grey">Vui lòng quét mã để xem trước H5 Mall</span>
        </div>
      </li>
      <li>
        <div class="flex-column row-center">
          <img class="w200 h200 mb20" :src="WXCode" />
          <span class="lb-1 f-h5-grey">Vui lòng quét mã xem trước chương trình Mini Mall</span>
        </div>
      </li>
    </ul>
    <div class="mt40">
      <el-input placeholder="Vui lòng nhập nội dung" v-model="url">
        <template slot="append"><el-button type="primary" icon="el-icon-link" @click="link"></el-button></template>
      </el-input>
      <h3 class="mt5 mb10 f12 f-h5-grey">Liên kết H5 Mall, bạn có thể nhảy trực tiếp để xem trực tiếp trong trình duyệt
      </h3>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { createWXcode } from "@/api/project";
import global from "@/config/global";

export default {
  data() {
    return {
      show: false,
      WXCode: "",
      url: "",
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    open() {
      this.show = true;
      this.getWXQr();
    },

    getQr() {
      this.url = `${global.viewUrl}pages/index/tabbar/home?id=${this.project.id}`;

      let options = {
        padding: 10, // Mã QR Four -sided Blank (mặc định 10px)
        width: 160, // Chiều rộng hình ảnh mã QR (mặc định là 256px)
        height: 160, // Chiều cao hình ảnh mã QR (mặc định là 256px)
        reverse: false, // Mã QR chống màu, màu mã hai chiều là màu nền của thùng chứa trên
        background: "#ffffff", // Màu nền mã QR (màu trắng mặc định)
        foreground: "#000000", // Màu mã qr (màu đen mặc định)
      };
      console.log("Xem trước địa chỉ:" + this.url);
      return jrQrcode.getQrBase64(this.url, options);
    },

    async getWXQr() {
      let { data } = await createWXcode({ id: this.project.id });
      this.WXCode = data;
    },

    link() {
      window.open(this.url);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none !important;
}
</style>