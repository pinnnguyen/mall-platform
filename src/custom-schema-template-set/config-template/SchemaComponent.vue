<template>
  <div class="SchemaComponent">
    <config-wrap title="Thành phần">
      <config-item label="Tên thành phần">
        <el-input v-model="content.model.label" placeholder="Vui lòng nhập tên thành phần" size="small"></el-input>
      </config-item>
      <config-item label="Biểu tượng thành phần">
        <ul class="flex flex-wrap">
          <li v-for="(icon, index) in icons" :key="index" class="icon-item flex-center"
            :class="[content.model.icon == icon ? 'icon-item-active' : '']" @click="content.model.icon = icon">
            <i class="icon f24" :class="icon"></i>
          </li>
        </ul>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
import icons from './icon'
export default {
  name: 'SchemaComponent',

  inject: ['content'],

  data() {
    return {
      icons
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-item {
  width: 44px;
  height: 44px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background: $color-theme;
    color: #fff;
  }
}

.icon-item-active {
  background: $color-theme;
  color: #fff;
}
</style>
