<template>
  <div class="wrap">
    <div style="padding-right:360px">
      <phone-ctn>
        <search-bar></search-bar>
      </phone-ctn>
    </div>

    <config-ctn title="Cài đặt trang tìm kiếm">
      <config-wrap>
        <div class="mb15 f13">Tìm kiếm từ nóng</div>
        <div class="nav">
          <div class="mt10 mb15 f12 f-grey">Cấu hình nhất 5 Những từ nóng đã chọn</div>
          <draggable v-model='project.config.hotList'>
            <div class="nav-item" v-for="(item, index) in project.config.hotList" :key="index">
              <div class="nav-delete" @click="project.config.hotList.splice(index, 1)">
                <i class="f12 icon icon-cha-"></i>
              </div>
              <el-input v-model="item.value" size='small'></el-input>
            </div>
          </draggable>
          <div v-if="project.config.hotList.length < 5" class="nav-add" @click="add">
            Tăng
          </div>
        </div>
      </config-wrap>
    </config-ctn>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import { mapGetters } from "vuex";

export default {
  name: "navigation",

  components: {
    SearchBar,
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    add() {
      this.project.config.hotList.push({ value: "" });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>