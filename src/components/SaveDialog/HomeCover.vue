<template>
  <el-dialog :visible.sync="show" :append-to-body="true" :show-close="false" :close-on-click-modal="false" top="50px"
    width="415px" class="flex-center">
    <div v-loading="show" id="cover" class="cover">
      <iframe v-if="show" ref="iframe" class="w-100" frameborder="no" :style="{ height: '667px' }" :src="iframeUrl"
        @load="setWidgetsMessage"></iframe>
    </div>
  </el-dialog>
</template>

<script>
import RealTimeView from "@/components/TopBar/RealTimeView";
import { uploadCover } from "@/api/project";
import global from "@/config/global";
import { mapGetters } from "vuex";

export default {
  name: "HomeCover",

  components: {
    RealTimeView,
  },

  mounted() {
    this.getMessage();
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    iframeUrl() {
      return `${global.viewUrl}pages/build/build?operate=build`;
    },

    // Dữ liệu cấu hình trang chủ
    home() {
      return this.project.pages.find((page) => page.home);
    },
  },

  methods: {
    /**
     * khởi tạo
     * 1. Khởi tạo trang iframe
     * 2. Chờ 2s, thông báo cho phương thức cuộc gọi iframe để tạo Cover Base64
     *
     */
    async init() {
      await this.open();

      this.createCover();
    },

    // Mở cửa sổ bật lên và độ trễ 2 cho các hoạt động tiếp theo (2S được sử dụng để kết xuất, hình ảnh uni-app chậm hơn)
    open() {
      return new Promise((resolve, reject) => {
        this.show = true;
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },

    // Danh sách các tài liệu gửi để kết xuất
    setWidgetsMessage() {
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "list",
          params: this.home.componentList,
        },
        "*"
      );
    },

    // Gửi thông tin, thông báo cho phương thức gọi iframe để tạo Cover Base64
    createCover() {
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "cover",
        },
        "*"
      );
    },

    // Sau khi nghe iframe, bạn sẽ thông báo cuộc gọi lại sau khi tạo nắp 64
    getMessage() {
      let self = this;
      window.addEventListener("message", function (e) {
        let { type, params } = e.data;
        if (type == "getCoverBase64") {
          self.upload(params.base64);
        }
      });
    },

    // Tải lên bìa
    upload(base64) {
      return new Promise((resolve, reject) => {
        let coverFile = this.getFile(base64);
        let formData = new FormData();
        formData.append("domainId", 3);
        formData.append("dir", "img");
        formData.append("file", coverFile);
        // Máy chủ tải lên hình ảnh
        uploadCover(formData)
          .then((res) => {
            ß
            if ((res.errorCode = "00000")) {
              console.log("Hình ảnh tải lên thành công của máy chủ");
              this.$emit("complete", {
                status: 1,
                data: res.data,
              });
            }
          })
          .finally(() => (this.show = false));
      });
    },

    // Tệp tích hợp Base64
    getFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cover {
  width: 375px;
  min-height: 667px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
