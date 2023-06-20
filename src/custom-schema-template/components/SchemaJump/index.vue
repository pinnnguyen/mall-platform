<template>
  <config-item :label='label'>
    <div class="flex col-center h32">
      <div v-if="!mValue.id" class="f12 f-theme pointer" @click="open">
        Chọn một trang để nhảy đến
      </div>

      <template v-else>
        <el-tag size='small'>{{ pageName }}</el-tag>
        <span class="ml5 f12 f-theme pointer" @click="open">Ôn lại</span>
      </template>
    </div>

    <JumpDialog ref='jump'></JumpDialog>

  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import { mapGetters } from "vuex";

export default {
  name: "SchemaJump",
  mixins: [schemaMixin],
  provide() {
    return {
      value: this.value,
    };
  },

  props: {
    value: {
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters(["project", "fixedPages"]),
    pageName() {
      let page = null;
      switch (this.mValue.type) {
        case "fixed":
          page = this.fixedPages.find((page) => page.id == this.mValue.id);
          break;
        case "custom":
          page = this.project.pages.find((page) => page.id == this.mValue.id);
          break;
        case "link":
          page = { name: "Liên kết bên ngoài H5" };
          break;
        default:
          break;
      }
      return page.name;
    },
  },

  methods: {
    open() {
      this.$refs.jump.open();
    },
  },
};
</script>

<style lang="scss" scoped></style>
