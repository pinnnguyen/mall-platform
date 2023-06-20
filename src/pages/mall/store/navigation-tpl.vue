<template>
  <div class="wrap">
    <div style="padding-right: 360px">
      <phone-ctn>
        <div class="edit">
          <nav-bar v-bind="project.config.navigation" :disabled="true"></nav-bar>
        </div>
      </phone-ctn>
    </div>

    <config-ctn title="Điều hướng trung tâm">
      <config-wrap>
        <div class="mb15 f13">dẫn đường</div>
        <div class="nav">
          <div class="mt10 mb15 f12 f-grey">Có thể được cấu hình 1 đến 4 điều hướng</div>
          <div class="mt10 mb15 f12 f-red">Không thể định cấu hình điều hướng trang chủ</div>
          <draggable v-model="navigation.list">
            <div class="nav-item" v-for="(item, index) in navigation.list" v-if="index > 0" :key="item.id">
              <div v-if="navigation.list.length > 2" class="nav-delete" @click="navigation.list.splice(index, 1)">
                <i class="f12 icon icon-cha-"></i>
              </div>
              <config-item label="Biểu tượng menu" class="flex f13">
                <icon-select v-model="item.icon"></icon-select>
              </config-item>
              <config-item label="Tên menu">
                <el-input v-model="item.text" size="small" maxlength="4" show-word-limit></el-input>
              </config-item>
              <config-item label="Trang nhảy">
                <jump-select v-model="item.jump"></jump-select>
              </config-item>
            </div>
          </draggable>
          <div v-if="navigation.list.length < 4" class="nav-add" @click="add">
            Điều hướng mới
          </div>
        </div>
      </config-wrap>
    </config-ctn>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import IconSelect from "@/components/IconSelect";
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    IconSelect,
  },

  computed: {
    ...mapGetters(["project"]),

    navigation() {
      return this.project.config.navigation;
    },
  },

  methods: {
    add() {
      this.navigation.list.push({ value: "" });
    },
  },
};
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  align-items: flex-end;
  width: 100%;
  min-height: 603px
    /*no*/
  ;
  background: #f7f8fa;
}
</style>