<template>
  <div class="flex flex-wrap">
    <div v-for="(item, key) in list" class="flex-center h45 w45 mr10 mb10 shadow" :key="key">
      <img class="w-100 h-100" :src="item.cover" />
    </div>
    <div class="flex-center h45 w45 shadow pointer" @click="add">
      +
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getGoodsByIds } from "@/api/goods";

export default {
  name: "GoodsConfigList",
  props: ["value"],

  data() {
    return {
      mValue: [],
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.getList();
      },
    },
  },

  methods: {
    // Danh sách sản phẩm
    async getList() {
      let data = {
        projectId: this.project.id,
        ids: this.value,
      };

      let { status, list } = await getGoodsByIds(data);

      if (status == "10000") {
        this.list = list;
      }
    },

    add() {
      this.$emit("edit");
    },
  },
};
</script>
