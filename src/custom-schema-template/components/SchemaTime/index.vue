<template>
  <config-item :label='label'>

    <el-date-picker v-model="mValue" type="datetime" v-bind="mOptions" size='small' style="width:100%">
    </el-date-picker>
  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
export default {
  name: "SchemaTime",
  mixins: [schemaMixin],

  data() {
    return {
      defaultOptions: {
        placeholder: "Lựa chọn ngày giờ",
        format: "yyyy-MM-dd HH:mm:ss",
      },
    };
  },
};
</script>