<template>
  <div class="m20 p20 bg-white">
    <div class="mb20">
      <el-button size='small' class='f-white bg-theme' @click="add">Xuất bản hàng hóa</el-button>
    </div>

    <div class="mt30">
      <el-table :data="list" :header-cell-style="{ background: '#f7f8fa', color: '#323233', fontWeight: 500 }"
        style="width: 100%">
        <el-table-column prop="name" label="Tên sản phẩm" align='center' header-align='center'>
        </el-table-column>
        <el-table-column prop="name" label="Hàng hóa bao gồm" align='center' header-align='center'>
          <template slot-scope="scope">
            <img class="w50 h50" :src="scope.row.cover">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="Giá (VND)" align='center' header-align='center'>
          <template slot-scope="scope">
            {{ scope.row.price | moneyDec }}
          </template>
        </el-table-column>
        <el-table-column prop="originalPrice" label="Giá gốc (VND)" align='center' header-align='center'>
          <template slot-scope="scope">
            {{ scope.row.originalPrice | moneyDec }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="inventory"
          label="库存"
          align='center'
          header-align='center'
        >
        </el-table-column> -->

        <el-table-column label="Vận hành" align='center' header-align='center'>
          <template slot-scope="scope">
            <span class="mr5 f-theme pointer" @click="edit(scope.row)">biên tập</span>
            <span class="ml5 mr5 f-theme pointer" @click="copy(scope.row)">sao chép</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getGoodsList, copyGoods } from "@/api/goods";

export default {
  name: "goodsManager",

  created() {
    this.getList();
  },

  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    async getList() {
      let { status, list } = await getGoodsList({ projectId: this.project.id });
      if (status == "10000") this.list = list;
    },

    add() {
      this.$router.push({ name: "goods-edit" });
    },

    edit(params) {
      this.$router.push({
        name: "goods-edit",
        params: this.$cloneDeep(params),
      });
    },

    async copy(data) {
      let { status } = await copyGoods(data);

      if (status == "10000") {
        this.getList();
        this.$notify({
          title: "成功",
          message: "商品复制成功",
          type: "success",
        });
      }
    },
  },
};
</script>