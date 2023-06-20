<template>
  <config-wrap :title="label">
    <div class="mb10 f-grey f12">{{ mOptions.note }}</div>
    <div class="nav">
      <draggable v-model="mValue">
        <!-- Chế độ biên dịch, khe cắm có thể được sử dụng cho các thành phần kéo tùy chỉnh vào thùng chứa -->
        <slot v-if="edit"></slot>

        <!-- Chế độ không hợp đồng, được đi qua theo lược đồ phụ theo lớp con lược đồ -->
        <template v-else>
          <div v-for="item in mValue" :key="item.id" class="nav-item">
            <component v-for="(val, key, index) in schema.child" :key="index" :is="typeToComponent[val.type]"
              v-model="item[key]" v-bind="val">
            </component>
            <div class="nav-delete" @click="delItem(item.id)">x</div>
          </div>
        </template>
      </draggable>

      <div class="nav-add" @click="addItem">Thêm dữ liệu</div>
    </div>
  </config-wrap>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import typeToComponent from "@/config/schema-template";

export default {
  name: "SchemaArray",

  mixins: [schemaMixin],

  props: {
    label: {
      type: String,
      default: "",
    },
    edit: {
      type: Boolean,
      default: false,
    },
    schema: {
      type: Object,
      default: () => { },
    },
  },

  data() {
    return {
      typeToComponent,
    };
  },

  methods: {
    addItem() {
      console.log("...");
      console.log(this.mValue);
      if (this.mValue.length >= this.mOptions?.limit) {
        this.$notify({
          title: "Không thể thêm",
          message: `Bạn chỉ có thể thêm nhiều nhất${this.mOptions?.limit}Dữ liệu bài viết`,
          type: "warning",
        });
        return;
      }

      this.mValue.push({
        id: this.$getRandomCode(6),
      });
    },

    delItem(id) {
      let i = this.mValue.findIndex((item) => item.id == id);
      this.mValue.splice(i, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .config-item {
  margin-bottom: 10px !important;
}
</style>
