<template>
  <div>
    <config-wrap title="Cấu hình phải -Lose">
      <config-item label="Tên thuộc tính">
        <el-input v-model="content.curComponent.property" placeholder="Vui lòng nhập tên thuộc tính"
          size="small"></el-input>
      </config-item>
    </config-wrap>
    <config-wrap title="Cấu hình cơ bản">
      <config-item label="Tiêu đề">
        <el-input v-model="content.curComponent.label" placeholder="Vui lòng nhập tiêu đề" size="small"></el-input>
      </config-item>
      <config-item label="Mặc định">
        <el-switch v-model="content.curComponent.value" class="mt8">
        </el-switch>
      </config-item>
      <config-item label="Mở bản sao chép">
        <el-input v-model="content.curComponent.options.trueLabel" size="small"></el-input>
      </config-item>
      <config-item label="Khép kín">
        <el-input v-model="content.curComponent.options.falseLabel" size="small"></el-input>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
export default {
  name: 'SchemaSwitchConfig',

  inject: ['content']
}
</script>
