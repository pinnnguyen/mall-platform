<template>
  <div>
    <config-wrap title="Cấu hình phải -Lose">
      <config-item label="Tên thuộc tính">
        <el-input v-model="content.curComponent.property" placeholder="Vui lòng nhập tên thuộc tính"
          size="small"></el-input>
      </config-item>
    </config-wrap>
    <config-wrap title="Cấu hình cơ bản">
      <config-item label="tiêu đề">
        <el-input v-model="content.curComponent.label" placeholder="Vui lòng nhập tiêu đề" size="small"></el-input>
      </config-item>
      <config-item label="Nhận xét">
        <el-input v-model="content.curComponent.options.note" placeholder="Vui lòng nhập tiêu đề" size="small"></el-input>
      </config-item>
      <config-item label="số tiền lớn nhất">
        <el-input-number v-model="content.curComponent.options.limit" size="small"></el-input-number>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
export default {
  name: 'SchemaArrayConfig',

  inject: ['content']
}
</script>
