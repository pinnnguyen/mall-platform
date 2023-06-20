<template>
  <div>
    <ul class="nav">
      <li class="nav-item" v-for="(group, index) in mValue" :key="index">
        <div v-if="index != 0" class="nav-delete" @click="delType(index)">
          <i class="f12 icon icon-cha-"></i>
        </div>

        <config-item label='Tên nhóm'>
          <el-input class="mt5 w200" v-model="group.label" placeholder="Vui lòng nhập tên nhóm" size='mini'></el-input>
        </config-item>
        <config-item label='Tiêu đề nhóm'>
          <el-input class="mt5 w200" v-model="group.title" placeholder="Vui lòng nhập tên nhóm" size='mini'></el-input>
        </config-item>

        <div class="flex">
          <GoodsConfigList :group='group' @add='editActiveList'></GoodsConfigList>
        </div>
      </li>
    </ul>

    <div class="add-btn" @click="addType">Thêm nhóm sản phẩm</div>
    <GoodsConfigChoose v-if="show" :show.sync='show' :activeList="aciveItem.list" @submit="replaceActiveList">
    </GoodsConfigChoose>

  </div>
</template>

<script>
export default {
  name: "SchemaGoods1",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: false,
      mValue: [],
      aciveItem: {},
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.mValue = newValue;
      },
    },
    mValue: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    addType() {
      this.mValue.push({
        label: "Nhóm mới",
        title: "Sản phẩm mới",
        list: [],
      });
    },

    delType(index) {
      this.mValue.splice(index, 1);
    },

    editActiveList(item) {
      this.aciveItem = item;
      this.show = true;
    },

    replaceActiveList(list) {
      this.aciveItem.list = list;
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  outline: none;
  border: 0;
}

.add-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  margin-bottom: 10px;
  border: solid 1px $color-theme;
  text-align: center;
  font-size: 14px;
  color: $color-theme;
  cursor: pointer;
}
</style>