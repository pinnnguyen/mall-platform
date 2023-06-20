<template>
  <div>
    <config-wrap title='Cấu hình phải -Lose'>
      <config-item label='Tên thuộc tính'>
        <el-input v-model="content.curComponent.property" placeholder="Vui lòng nhập tên thuộc tính"
          size='small'></el-input>
      </config-item>
    </config-wrap>
    <config-wrap title='Cấu hình cơ bản'>
      <config-item label='Tiêu đề'>
        <el-input v-model="content.curComponent.label" placeholder="Vui lòng nhập tiêu đề" size='small'></el-input>
      </config-item>
      <config-item label='Thời gian mặc định'>
        <el-date-picker v-model="content.curComponent.value" style="width:100%" type="datetime" size='small'>
        </el-date-picker>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
export default {
  name: "SchemaTimeConfig",

  inject: ["content"],
};
</script>

