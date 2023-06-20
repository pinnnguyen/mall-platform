<template>
  <div class="m20 p20 bg-white">
    <div class="mt10 mb20">
      <span class="mr20 f14">Nhóm hàng hóa</span>
      <span class="f12 f-grey">Kéo có thể điều chỉnh chuỗi các gói để lưu hiệu quả</span>
    </div>

    <div class="p10 bg-grey">

      <div class="flex row-between p15 r8 bg-white">
        <div>
          <el-button class="mr10" size="small" @click="allUnFold">Mở rộng tất cả</el-button>
          <el-button size="small" @click="allFold">Gấp tất cả</el-button>
        </div>
        <el-button size="small" @click="addGroup">Đã thêm nhóm đầu tiên</el-button>
      </div>

      <draggable v-model="project.config.goodsGroups">
        <div v-for="group in project.config.goodsGroups" :key="group.type" class="group mt10 p10 bg-white">

          <div class="group-head flex row-between col-center p15">
            <div>
              <i v-if="!group.fold" class="el-icon-arrow-right f14 mr10 pointer" @click="fold(group)"></i>
              <i v-else class="el-icon-arrow-down f14 mr10 pointer" @click="fold(group)"></i>
              <span class="f12">{{ group.name }}</span>
            </div>
            <div class="f-theme f12">
              <span class="mr10 pointer" @click="addType">Thêm nhóm thứ cấp</span>
              <span class="mr10 pointer" @click="editGroup(group)">biên tập</span>
              <span class="mr10 pointer" @click="delGroup(group.type)">xóa bỏ</span>
            </div>
          </div>

          <ul v-if="group.child.length && group.fold" class="group-body">
            <li v-for="item in group.child" :key="item.type" class="group-body-item">
              <div class="flex-center">
                <img class="w35 h35 mr15" :src="item.image" />
                <span>{{ item.name }}</span>
              </div>
              <div class="f-theme f12">
                <span class="mr10 pointer" @click="editType(item)">biên tập</span>
                <span class="pointer" @click="delType(item)">xóa bỏ</span>
              </div>
            </li>
          </ul>
        </div>
      </draggable>
    </div>

    <edit ref="edit"></edit>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Edit from "./edit.vue";

export default {
  name: "groupManager",

  components: {
    Edit,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    fold(group) {
      group.fold
        ? this.$set(group, "fold", false)
        : this.$set(group, "fold", true);
    },

    allFold() {
      this.project.config.goodsGroups.map((item) => (item.fold = false));
    },

    allUnFold() {
      this.project.config.goodsGroups.map((item) => (item.fold = true));
    },

    addGroup() {
      this.$refs.edit.open(1);
    },

    editGroup(data) {
      this.$refs.edit.open(1, data);
    },

    delGroup(type) {
      let groups = this.project.config.goodsGroups;
      let index = groups.reduce((pre, cur, i) => {
        if (cur.type == type) pre = i;
        return pre;
      }, 0);
      groups.splice(index, 1);
    },

    addType() {
      this.$refs.edit.open(2);
    },

    editType(data) {
      this.$refs.edit.open(2, data);
    },

    delType(data) {
      let temp = this.project.config.goodsGroups.find(
        (item) => item.type == data.parentType
      );
      let index = temp.child.reduce((pre, cur, i) => {
        if (cur.type == data.type) pre = i;
        return pre;
      }, 0);
      temp.child.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  .group-head {
    border: 1px solid #e3e2e5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .group-body {
    padding: 5px 15px 5px 50px;
    border-left: 1px solid #e3e2e5;
    border-right: 1px solid #e3e2e5;
    border-bottom: 1px solid #e3e2e5;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    font-size: 13px;

    .group-body-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 10px 0;
      border-bottom: 1px solid #e3e2e5;

      &:last-child {
        border: 0;
      }
    }
  }
}
</style>