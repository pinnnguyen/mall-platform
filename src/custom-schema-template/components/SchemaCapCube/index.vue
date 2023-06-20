<template>
  <div>
    <config-item v-show="mValue.model == 'custom'" label="魔方行数">
      <el-select v-model="mValue.row" placeholder="Vui lòng chọn" size="small" @change="changeRow">
        <el-option v-for="key in 10" :key="key" :label="key + '行'" :value="key">
        </el-option>
      </el-select>
    </config-item>

    <template>
      <div class="f-red f13 mb15 pl10 pr10">Bố cục khối của Rubik</div>
      <div class="f-grey f12 mb15 pl10 pr10">Di chuyển kích thước khu vực lựa chọn chuột</div>
      <div class="pl10 pl10">
        <cap-cube-layout ref="layout" :row="mValue.row" :model="mValue.model" v-model="mValue.list"
          @onCuurIndex="onCuurIndex"></cap-cube-layout>
      </div>
    </template>

    <SchemaSelect class="mt15 mb20" label="模板选择" v-model="mValue.model" :data="modelOptions" @change="changeModel">
    </SchemaSelect>

    <div v-if="activeItem" class="nav ml10 mr10 mb20">
      {{ activeItem }}
      <SchemaUpload label="Hình ảnh khối của Rubik" v-model="activeItem.image" />
      <SchemaJump label="Trang nhảy" v-model="activeItem.jump"></SchemaJump>
    </div>
  </div>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import CapCubeLayout from "./CapCubeLayout";
import { initialModels, modelOptions } from "./config";

export default {
  name: "SchemaCapCube",

  mixins: [schemaMixin],

  components: {
    CapCubeLayout,
  },

  props: {
    value: {
      type: Object,
      default: () => { },
    },
  },

  data() {
    return {
      modelOptions,
      activeItem: null,
    };
  },

  methods: {
    // 切换模型
    changeModel(model) {
      if (model) {
        // 设置模板对应行数
        let target = this.modelOptions.find((m) => m.value == model);
        this.$set(this.mValue, "row", target.row);

        // 重置模板
        this.$refs.layout.reset();

        // 设置模板对应初始数据
        if (model == "custom") {
          this.$set(this.mValue, "list", []);
        } else {
          this.$set(
            this.mValue,
            "list",
            this._.cloneDeep(initialModels[model])
          );
        }
      }
    },

    // 切换行数
    changeRow() {
      this.$refs.layout.reset();
    },

    // 切换单元块设置 
    onCuurIndex(item) {
      this.activeItem = null;
      setTimeout(() => {
        this.activeItem = item;
      }, 10);
    },
  },
};
</script>
