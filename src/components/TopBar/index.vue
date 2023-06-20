<template>
  <div>
    <div class="topBar">
      <!-- Bên trái nội dung -->
      <span class="f14 pointer" @click="back">Chuyển đổi trung tâm</span>

      <!-- Nội dung đúng -->
      <div>
        <git-control />
        <el-button size="small" @click="toSchema">schema Người xây dựng</el-button>

        <el-button size="small ml10" @click="viewQr">Mã QR trung tâm</el-button>

        <el-button size="small ml10" @click="show = true">Xem trước thực sự</el-button>

        <el-button size="small f-white bg-theme" @click="openSave">Lưu</el-button>

        <el-button size="small ml10" @click="onLogout">từ bỏ</el-button>
      </div>
    </div>

    <real-timeView :show.sync="show"></real-timeView>

    <save-dialog ref="save"></save-dialog>

    <qr-dialog ref="qr"></qr-dialog>
  </div>
</template>

<script>
import RealTimeView from "./RealTimeView.vue";
import SaveDialog from "@/components/SaveDialog";
import QrDialog from "@/components/QrDialog";
import jrQrcode from "jr-qrcode";
import { mapGetters, mapMutations } from "vuex";
import { editProject } from "@/api/project";

export default {
  components: {
    RealTimeView,
    SaveDialog,
    QrDialog,
  },

  provide() {
    return {
      topBar: this,
    };
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project", "userInfo"]),
  },

  methods: {
    ...mapMutations(["logout"]),

    // Trở lại quản lý trung tâm
    back() {
      this.$router.push({ name: "managet" });
    },

    openSave(view = false) {
      this.$refs.save.open(view);
    },

    toSchema() {
      let { href } = this.$router.resolve({
        path: "/schema",
      });
      window.open(href);
    },

    viewQr() {
      this.$confirm("Nếu bạn không cập nhật, bản xem trước là dữ liệu dự án được lưu trữ lần trước?", "Có nên cập nhật và lưu", {
        confirmButtonText: "Cập nhật",
        cancelButtonText: "Không cập nhật",
        type: "warning",
      }).then(() => {
        this.openSave(true);
      }).catch(() => {
        this.openQr()
      })
    },

    openQr() {
      this.$refs.qr.open();
    },

    // Lưu
    async save() {
      let data = {
        id: this.project.id,
        userId: this.userInfo.userId,
        name: this.project.name,
        richText: JSON.stringify(this.project),
      };

      let { status } = await editProject(data);

      if (status == "10000")
        this.$notify({
          title: "Thành công",
          message: "Bảo tồn dự án thành công",
          type: "success",
        });
    },

    // từ bỏ
    onLogout() {
      this.$confirm("Bạn có chắc chắn thoát khỏi nền tảng không?", "từ bỏ", {
        confirmButtonText: "Chắc chắn",
        cancelButtonText: "Hủy bỏ",
        type: "warning",
      }).then(() => {
        this.logout();
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  width: 100%;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
}
</style>
