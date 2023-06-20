<template>
  <el-dialog title="Chọn một sản phẩm" :visible.sync="visible" :close-on-click-modal='false' :append-to-body='true'
    width="45%">
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" max-height="300"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align='center' header-align='center'>
      </el-table-column>
      <el-table-column prop="name" label="Tên sản phẩm" align='center' header-align='center'>
      </el-table-column>
      <el-table-column label="Hàng hóa bao gồm" align='center' header-align='center'>
        <template slot-scope="scope">
          <img class="w50 h50" :src="scope.row.cover">
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Giá (VND)" align='center' header-align='center'>
      </el-table-column>
      <el-table-column prop="originalPrice" label="Giá gốc (VND)" align='center' header-align='center'>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">Hủy bỏ</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { getGoodsList } from "@/api/goods";

export default {
  name: "GoodsConfigChoose",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    this.getList();
  },

  data() {
    return {
      visible: false,
      selectList: [],
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  watch: {
    show: {
      immediate: true,
      handler(newValue, oldValue) {
        this.visible = this.show;
      },
    },
    visible: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$emit("update:show", newValue);
      },
    },
  },

  methods: {
    // Nhận danh sách các sản phẩm trung tâm
    async getList() {
      let { status, list } = await getGoodsList({ projectId: this.project.id });

      if (status == "10000") {
        // Trường sàng lọc
        this.list = list;

        // Theo ID danh sách đã chọn, mảng tương ứng phù hợp với sàng lọc được sàng lọc để kiểm tra lại màn hình
        this.selectList = this.list.filter((item) => {
          return this.value.includes(item.id);
        });

        // Kiểm tra phương thức hiển thị trở lại
        setTimeout(() => {
          this.toggleSelection(this.selectList);
        }, 0);
      }
    },

    // Kiểm tra lại
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    },

    // Cái móc
    handleSelectionChange(val) {
      this.selectList = val;
    },

    // nộp
    submit() {
      this.$emit(
        "submit",
        this.selectList.map((item) => item.id)
      );
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-dialog__title {
    font-size: 14px !important;
    font-weight: 600;
  }

  .el-dialog__body {
    padding: 10px 20px 30px 20px !important;
  }
}

.wrap {
  background: #f2f2f6;
  height: 400px;
  border-radius: 5px;
}
</style>