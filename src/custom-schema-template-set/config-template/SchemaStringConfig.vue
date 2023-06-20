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
      <config-item label='Người giữ chỗ'>
        <el-input v-model="content.curComponent.options.placeholder" placeholder="Vui lòng nhập trình giữ chỗ"
          size='small'></el-input>
      </config-item>
      <config-item label='Mặc định'>
        <el-input v-model="content.curComponent.value" placeholder="Vui lòng nhập giá trị mặc định"
          size='small'></el-input>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
export default {
  name: "SchemaStringConfig",
  inject: ["content"],
};
</script>

