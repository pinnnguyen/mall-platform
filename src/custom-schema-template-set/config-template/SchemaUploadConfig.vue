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
      <config-item label='Hinh ảnh mặc định'>
        <Imgpond v-model="content.curComponent.value" :count="1" />
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
export default {
  name: "SchemaUploadConfig",

  inject: ["content"],
};
</script>

