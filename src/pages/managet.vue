<template>
  <div class="manage">
    <div class="manage-head">
      <div class="manage-head-content">
        <git-control />
        <el-button size="small f-white bg-theme" @click="create">Hãy tạo ngay</el-button>
        <el-button size="small" @click="onLogout">Đăng xuất</el-button>
      </div>
    </div>

    <div v-for="(type, index) in list" :key="index" class="manage-body">
      <h2 class="manage-body-title">
        {{ type.title }}
        <span>{{ type.subTitle }}</span>
      </h2>

      <ul v-if="type.list.length" class="list">
        <li class="list-item" v-for="item in type.list" :key="item.id">
          <div class="list-item-content">
            <img :src="item.logo" class="w50 mt10 radius" />
            <div class="mt25 f20">{{ item.name }}</div>
            <div class="list-item-content-type">{{ type.title }}</div>
            <div class="list-item-content-btn">
              <span @click="update(item)">Chỉnh sửa</span>
              <span @click.stop="del(item.id)">Xoá bỏ</span>
            </div>
          </div>
        </li>
      </ul>

      <el-empty v-else class="mt80">
        <template slot="description">
          <span class="f13 f-grey">{{ `Tạo nên${type.title}Quán ba` }}</span>
        </template>
      </el-empty>
    </div>
    <div v-if="list.length == 0" class="manage-loading" v-loading="loading"></div>

    <div class="footer"></div>

    <create-dialog ref="create"></create-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getProjectList, delProject } from "@/api/project";
import { mallTypeList } from "@/config/mall";
import CreateDialog from "@/components/CreateDialog";

export default {
  name: "mall-managet",

  components: {
    CreateDialog,
  },

  created() {
    this.dropProject();
    this.getMallList();
  },

  data() {
    return {
      show: false,
      loading: false,
      form: {},
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project", "userInfo"]),
  },

  watch: {
    show: {
      immediate: true,
      handler() {
        if (!this.show) this.form = {};
      },
    },
  },

  methods: {
    ...mapMutations(["dropProject", "setProject", "logout"]),

    async getMallList() {
      let map = new Map();
      let temp = mallTypeList;
      mallTypeList.map((item) => {
        item.list = [];
        map.set(item.type, item.list);
      });

      this.loading = true;
      let { list } = await getProjectList({ userId: this.userInfo.userId });
      list.map((item) => {
        let value = map.get(item.type);
        value.push(item);
      });

      this.list = temp;
      this.loading = false;
    },

    create() {
      this.$refs["create"].open();
    },

    update(project) {
      this.setProject(project);
      this.$router.push({ name: "mall" });
    },

    del(id) {
      this.$confirm("Sau khi xóa trung tâm mua sắm, nó sẽ không được khôi phục. Bạn có muốn tiếp tục không?", "Xóa trung tâm mua sắm", {
        confirmButtonText: "Chắc chắn",
        cancelButtonText: "Hủy bỏ",
        type: "warning",
      }).then(() => {
        delProject({ id }).then(() => {
          this.getMallList();
        });
      });
    },

    onLogout() {
      this.$confirm("Bạn có chắc chắn thoát khỏi nền tảng?", "Từ bỏ", {
        confirmButtonText: "Chắc chắn",
        cancelButtonText: "Huỷ bỏ",
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
.manage {
  position: relative;

  &::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }

  .manage-head {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    z-index: 10;

    .manage-head-content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 970px;
      height: 100%;
      margin: 0 auto;
      line-height: 50px;
      text-align: right;
    }
  }

  .manage-body {
    width: 1000px;
    margin: 100px auto;

    .manage-body-title {
      font-size: 18px;
      color: #1b1c26;
      margin-bottom: 20px;
      padding: 0 15px;
      font-weight: 700;

      span {
        color: #ced1d6;
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .list-item {
        height: 300px;

        .list-item-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 220px;
          margin: 10px 15px 50px;
          padding-top: 20px;
          border-radius: 10px;
          background-image: linear-gradient(-50deg, #edf1f7, #ebedf4);
          box-shadow: 0 5px 10px 0 rgba(2, 31, 65, 0.05);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            box-shadow: 0 20px 40px 0 rgba(15, 48, 85, 0.1);
            margin-top: 5px;
          }

          .list-item-content-type {
            position: relative;
            margin-top: 15px;
            font-size: 14px;
            color: #61616a;
            line-height: 24px;

            &::after {
              content: "";
              position: absolute;
              top: 50%;
              right: -50px;
              width: 35px;
              height: 1px;
              background-color: #e1e0e6;
            }

            &::before {
              content: "";
              position: absolute;
              top: 50%;
              left: -50px;
              width: 35px;
              height: 1px;
              background-color: #e1e0e6;
            }
          }

          .list-item-content-btn {
            margin: 50px auto 25px;
            width: 180px;
            height: 40px;
            line-height: 40px;
            border-radius: 100px;
            background-color: hsla(0, 0%, 100%, 0.4);

            span {
              display: inline-block;
              width: 50%;
              height: 100%;
              font-size: 12px;
              color: #61616a;
              text-align: center;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .manage-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .footer {
    height: 200px;
    width: 100%;
  }
}
</style>