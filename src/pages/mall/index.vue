<template>
  <div class="main">
    <!-- Menu bên -->
    <ul class="main-meau">
      <img class="w40 auto-center mt10 mb30 radius" :src="project.logo">
      <template v-for="(item, index) in meauList">
        <router-link :to="{ path: item.path }">
          <li class="main-meau-item">
            <i class="icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </li>
        </router-link>
      </template>
    </ul>

    <!-- nội dung -->
    <div class="main-body">
      <top-bar></top-bar>
      <div class="main-body-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { mapMutations, mapGetters } from "vuex";
import { settingProject } from "@/utils/auth";

export default {
  name: "mall",

  components: {
    TopBar,
  },

  created() {
    // Đặt trang chủ theo mặc định vào trang xây dựng hiện tại
    this.setHomePage();

    // Sử dụng đóng cửa để lưu dữ liệu dự án, lưu khi làm mới
    let temp = this.project;

    // Khi trang được làm mới, hãy lưu dữ liệu dự án hiện tại trong LocalStorage
    window.addEventListener("beforeunload", function (e) {
      settingProject(temp);
    });
  },

  data() {
    return {
      meauList: [
        {
          name: "Trung tâm mua sắm",
          icon: "icon-shop",
          path: "/mall/store",
        },
        {
          name: "Trang",
          icon: "icon-fuzhiyemian",
          path: "/mall/pages-manage",
        },
        {
          name: "Sản phẩm",
          icon: "icon-shangpin-meau",
          path: "/mall/goods",
        },
        {
          name: "Builder",
          icon: "icon-list",
          path: "/mall/page-build",
        },
        {
          name: "Template",
          icon: "icon-list",
          path: "/mall/model-manage",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    ...mapMutations(["setHomePage"]),
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  height: 100vh;
  /*no*/
  background: #f7f8fa;

  .main-body {
    flex: 1;

    .main-body-content {
      position: relative;
      height: calc(100% - 60px);
      /*no*/
      margin-top: 4px;
      overflow: hidden;
    }
  }
}

.main-meau {
  width: 120px;
  /*no*/
  height: 100%;
  padding-top: 16px;
  /*no*/
  border-right: 1px solid #ebedf0;
  /*no*/
  // background: #22242f;
  background: #fff;

  .main-meau-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    /*no*/
    padding: 11px 20px;
    color: #7d7e80;
    cursor: pointer;
    flex-direction: column;
    gap: 8px;

    i {
      text-align: center;
      font-size: 18px;
      /*no*/
      color: #7d7e80;
    }
  }

  .active {
    i {
      color: $color-theme !important;
    }

    .main-meau-item {
      position: relative;
      color: $color-theme !important;

      &::after {
        position: absolute;
        top: 10px;
        /*no*/
        right: 10px;
        /*no*/
        content: "";
        width: 4px;
        /*no*/
        height: 21px;
        /*no*/
        border-radius: 3px;
        /*no*/
        background: $color-theme;
      }
    }
  }
}
</style>