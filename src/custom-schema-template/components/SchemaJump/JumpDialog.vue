<template>
  <el-dialog title="Vui lòng chọn trang nhảy" :visible.sync="show" width="30%">
    <div class="tabs mb30">
      <div class="tab flex-center" :class="[value.type == tab.type ? 'tab-active' : '']" v-for="(tab, i) in tabs" :key="i"
        @click="changeTab(tab.type)">
        {{ tab.label }}
      </div>
    </div>

    <template v-if="value.type == 'fixed'">
      <el-select v-model="value.id" placeholder="Vui lòng chọn trang vi mô bạn muốn nhảy" size='mini' style="width:250px">
        <el-option v-for="(page, i) in fixedPages" :key="i" :label="page.name" :value="page.id">
        </el-option>
      </el-select>
    </template>

    <template v-if="value.type == 'custom'">
      <el-select v-model="value.id" placeholder="Vui lòng chọn trang tùy chỉnh để nhảy để nhảy" size='mini'
        style="width:250px">
        <el-option v-for="(page, i) in customPages" :key="i" :label="page.name" :value="page.id">
        </el-option>
      </el-select>
    </template>

    <template v-if="value.type == 'link'">
      <el-input v-model="value.id" placeholder="Vui lòng nhập địa chỉ liên kết H5 bên ngoài" size='mini'
        style="width:250px"></el-input>
    </template>

  </el-dialog>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "JumpDialog",
  inject: ["value"],
  data() {
    return {
      show: false,
      tabs: [
        {
          label: "Micro -An",
          type: "fixed",
        },
        {
          label: "Trang tùy chỉnh",
          type: "custom",
        },
        {
          label: "Liên kết bên ngoài",
          type: "link",
        },
        {
          label: "Không nhảy",
          type: undefined,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["project", "fixedPages"]),
    customPages() {
      return this.project.pages;
    },
  },
  methods: {
    open() {
      this.show = true;
    },

    changeTab(type) {
      this.$set(this.value, "type", type);
      this.$set(this.value, "id", "");
    },
    setPageId(id) {
      this.$set(this.value, "id", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;

  .tab {
    width: 100px;
    height: 30px;
    color: #979797;
    border: solid 1px #ebedf0;
    cursor: pointer;
  }

  .tab-active {
    color: $color-theme;
    border: solid 1px $color-theme;
    background: #e0edff;
  }
}
</style>