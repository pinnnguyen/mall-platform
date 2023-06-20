<template>
  <SideBar :groups='groups'></SideBar>
</template>

<script>
import SideBar from "@/components/SideBar";
export default {
  components: {
    SideBar,
  },

  data() {
    return {
      groups: [
        {
          label: "Trang trí nhân cách",
          list: [
            {
              name: "Điều hướng trung tâm",
              path: "/mall/store/navigation-tpl",
            },
          ],
        },
        {
          label: "Trang hệ thống",
          list: [
            {
              name: "Liệt kê mẫu",
              path: "/mall/store/list-tpl",
            },
            {
              name: "Mẫu phân loại",
              path: "/mall/store/category-tpl",
            },
            {
              name: "Trang tìm kiếm",
              path: "/mall/store/search-tpl",
            },
          ],
        },
      ],
    };
  },
};
</script>