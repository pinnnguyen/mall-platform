<template>
  <div class="edit">
    <el-dialog :title="type == 'add' ? 'Nhóm mới' : 'Biên tập'" :visible.sync="show" width="25%">
      <div class="auto-center">
        <el-form :model="form" ref="ruleForm" label-width="120px" class="demo-ruleForm">

          <el-form-item label="mức độ" prop="level" verify>
            <el-radio v-model="form.level" :label="1" :disabled="type == 'edit'">Cấp 1</el-radio>
            <el-radio v-model="form.level" :label="2" :disabled="type == 'edit'">Cấp 2</el-radio>
          </el-form-item>

          <el-form-item v-if="form.level == '1'" label="Tên nhóm cấp 1" prop="name" :verify="{ maxLen: 4 }">
            <el-input v-model="form.name" maxlength="4" show-word-limit size='small'></el-input>
          </el-form-item>

          <template v-if="form.level == '2'">
            <el-form-item label="Nhóm vượt trội" prop="parentType" verify>
              <el-select v-model="form.parentType" placeholder="Vui lòng chọn nhóm vượt trội" size='small'
                :disabled="type == 'edit'">
                <el-option v-for="item in project.config.goodsGroups" :key="item.type" :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="Tên nhóm cấp 2" prop="name" :verify="{ maxLen: 6 }">
              <el-input v-model="form.name" maxlength="4" show-word-limit size='small'></el-input>
            </el-form-item>
            <el-form-item label="Hình ảnh nhóm hai góc" prop="image" verify>
              <Imgpond :count="1" v-model="form.image" />
            </el-form-item>
            <el-form-item label="Hai sản phẩm nhóm" prop="shopList">
              <groupGoods v-model="form.shopList"></groupGoods>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">Hủy bỏ</el-button>
        <el-button type="primary" @click="submitForm">Chắc chắn</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import groupGoods from "./groupGoods.vue";

export default {
  components: {
    groupGoods,
  },

  data() {
    return {
      type: "",
      form: {},
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    open(level, data) {
      if (!data) {
        this.type = "add";
        this.form = {
          level,
        };
      } else {
        this.type = "edit";
        this.form = this.$cloneDeep(data);
      }
      this.show = true;
    },

    close() {
      this.type = "";
      this.form = {};
      this.show = false;
    },

    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.type == "add" ? this.add() : this.edit();
          this.close();
        } else {
          return false;
        }
      });
    },

    add() {
      if (this.form.level == 1) {
        this.form.type = this.$getRandomCode(4);
        this.form.child = [];
        this.project.config.goodsGroups.push(this.form);
      } else {
        this.form.type = this.$getRandomCode(4);
        let temp = this.project.config.goodsGroups.find(
          (item) => item.type == this.form.parentType
        );
        temp.child.push(this.form);
      }
    },

    edit() {
      if (this.form.level == 1) {
        let temp = this.project.config.goodsGroups.find(
          (item) => item.type == this.form.type
        );
        temp.name = this.form.name;
      } else {
        let temp = this.project.config.goodsGroups.find(
          (item) => item.type == this.form.parentType
        );
        let index = temp.child.reduce((pre, cur, i) => {
          if (cur.type == this.form.type) pre = i;
          return pre;
        }, 0);
        temp.child.splice(index, 1, this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  display: inline-block;
  margin: 0 auto;
}
</style>