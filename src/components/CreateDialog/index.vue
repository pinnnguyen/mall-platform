<template>
  <el-dialog :visible.sync="show" width="40%" top="300px">
    <div class="flex-column col-center">
      <!-- form -->
      <el-form :model="form" ref="form" label-width="80px" style="width: 300px">
        <el-form-item label="tên" prop="name" verify>
          <el-input type="text" v-model="form.name" />
        </el-form-item>

        <el-form-item label="kiểu" prop="name" verify class="form-item-none">
          <el-radio v-model="form.type" label="mall">Trung tâm thương mại E -Commerce</el-radio>
          <el-radio v-model="form.type" label="model">Mẫu trung tâm mua sắm</el-radio>
        </el-form-item>

        <el-form-item label="ngành công nghiệp" prop="name" verify>
          <el-select v-model="form.industry" placeholder="Vui lòng chọn ngành công nghiệp">
            <el-option v-for="item in mallIndustryList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- submit -->
    <div slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" round style="width: 140px" @click="submit">Tạo</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addProject, editProject } from "@/api/project";
import { mapGetters, mapMutations } from "vuex";
import { rojectModel } from "@/config/project";
import { mallIndustryList, mallTypeList } from "@/config/mall";

export default {
  name: "CreateDialog",

  data() {
    return {
      mallIndustryList,
      show: false,
      form: {
        type: "mall",
      },
    };
  },

  computed: {
    ...mapGetters(["userInfo"]),
  },

  methods: {
    ...mapMutations(["setProject"]),

    open() {
      this.show = true;
    },

    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.create();
        }
      });
    },


    async create() {
      let map = new Map();
      mallTypeList.map((item) => map.set(item.type, item.logo));

      let project = {
        ...this.$cloneDeep(rojectModel),
        ...this.form,
        ...{ userId: this.userInfo.userId, logo: map.get(this.form.type) },
      };

      let { status, id } = await addProject(project);

      if (status == "10000") {
        project.id = id;
        this.setProject(project);
        this.$router.push({ name: "mall" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  border: 0;
  margin-bottom: 5px;
}

::v-deep .el-form-item {
  padding-bottom: 5px;
  border-bottom: solid 1px #e3e3e3;

  .el-form-item__label {
    text-align: left;
  }

  .el-form-item__error {
    top: 47px;
    left: -80px;
  }
}

::v-deep .el-button--primary {
  background: $color-theme !important;
}

::v-deep .el-select {
  width: 100%;

  input {
    padding-left: 0;
    border: 0;
  }
}

::v-deep .el-input__inner {
  border: 0px;
  margin: 0px;
  padding: 0px;
}

.form-item-none {
  border-color: transparent;
}
</style>