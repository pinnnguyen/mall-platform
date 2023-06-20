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
          label: "Sản phẩm mô phỏng",
          list: [
            {
              name: "tất cả sản phẩm",
              path: "/mall/goods/goods-manager",
            },
            {
              name: "Tất cả danh mục",
              path: "/mall/goods/group-manager",
            },
          ],
        },
      ],
    };
  },
};
</script>