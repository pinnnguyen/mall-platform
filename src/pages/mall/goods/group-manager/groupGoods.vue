<template>
  <div class="flex flex-wrap">
    <div v-for="(item, key) in list" class="flex-center h45 w45 mr10 mb10 shadow" :key="key">
      <img class="w-100 h-100" :src="item.cover" />
    </div>
    <div class="flex-center h45 w45 shadow pointer" @click="show = true">+</div>

    <GoodsConfigChoose v-if="show" :show.sync="show" :activeList="mValue" @submit="submit">
    </GoodsConfigChoose>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getGoodsByIds } from "@/api/goods";

export default {
  props: ["value"],

  data() {
    return {
      show: false,
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
        this.mValue = this.value;
      },
    },
    mValue: {
      immediate: true,
      handler(newValue, oldValue) {
        this.getList();
        this.$emit("input", newValue);
      },
    },
  },

  methods: {
    async getList() {
      let data = {
        projectId: this.project.id,
        ids: this.mValue,
      };

      let { status, list } = await getGoodsByIds(data);

      if (status == "10000") this.list = list;
    },

    submit(list) {
      this.mValue = list;
    },
  },
};
</script>
