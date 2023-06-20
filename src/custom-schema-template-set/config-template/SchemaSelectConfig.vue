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
      <config-item label="Mặc định">
        <el-select v-model="content.curComponent.value" size="small">
          <el-option v-for="item in content.curComponent.data" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </config-item>
    </config-wrap>
    <config-wrap title="Dữ liệu mảng">
      <div class="nav">
        <draggable v-model="content.curComponent.data">
          <slot></slot>
          <div v-for="(item, index) in content.curComponent.data" :key="item.id" class="nav-item">
            <config-item label="Tên tùy chọn">
              <el-input v-model="item.label" size="small"></el-input>
            </config-item>
            <config-item label="Lựa chọn">
              <el-input v-model="item.value" size="small"></el-input>
            </config-item>
            <div class="nav-delete" @click="delItem(index)">x</div>
          </div>
        </draggable>

        <div class="nav-add" @click="addItem">Thêm dữ liệu</div>
      </div>
    </config-wrap>
  </div>
</template>

<script>
import ConfigItem from '../../components/global/ConfigItem.vue'

export default {
  components: { ConfigItem },
  name: 'SchemaSelectConfig',
  inject: ['content'],
  methods: {
    addItem() {
      this.content.curComponent.data.push({
        id: this.$getRandomCode(4),
        label: '',
        value: this.$getRandomCode(4, false)
      })
    },

    delItem(i) {
      this.content.curComponent.data.splice(i, 1)
    }
  }
}
</script>
