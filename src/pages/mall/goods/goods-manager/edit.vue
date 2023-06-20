<template>
  <div class="m20 p20 bg-white">
    <el-form label-position="right" label-width="120px" :model="form" ref="form" size="small" class="mb50">
      <el-form-item label="Tên sản phẩm:" prop="name" :verify="{ maxLen: 30 }">
        <el-input v-model="form.name" style="width: 500px"></el-input>
        <div class="f12 f-grey">Tên hàng hóa, được đề xuất trong vòng 30 từ</div>
      </el-form-item>
      <el-form-item label="Mô tả Sản phẩm:" prop="describe" :verify="{ maxLen: 60 }">
        <el-input v-model="form.describe" style="width: 500px"></el-input>
        <div class="f12 f-grey">
          Hiển thị thông tin điểm bán bên dưới tiêu đề trang chi tiết sản phẩm. Nó được khuyến nghị là trong vòng 60 từ
        </div>
      </el-form-item>
      <el-form-item label="Bìa hàng hóa:" prop="cover" verify>
        <Imgpond v-model="form.cover" :count="1" />
        <div class="f12 f-grey">Kích thước được đề xuất: 800*800 pixel</div>
      </el-form-item>
      <el-form-item label="Bản đồ hàng hóa:" prop="imgList" verify>
        <Imgpond v-model="form.imgList" :count="10" />
        <div class="f12 f-grey">
          Kích thước cụ thể: 800*800 pixel, bạn có thể kéo và kéo thứ tự điều chỉnh hình ảnh, tải lên tối đa 10 ảnh
        </div>
      </el-form-item>
      <el-form-item label="Giá:" prop="price" :verify="{ gte: 0, type: 'con số' }">
        <el-input v-model="form.price" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="Giá gốc:" prop="originalPrice" :verify="{ gte: 0, type: 'con số' }">
        <el-input v-model="form.originalPrice" style="width: 150px"></el-input>
      </el-form-item>
      <!-- <el-form-item
        label="库存："
        prop="inventory"
        :verify="{gte:1,lte:10000,type:'数字'}"
      >
        <el-input
          v-model="form.inventory"
          style="width:150px"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="Thông tin chi tiết sản phẩm:">
        <MiniMCE style="width: 800px" v-model="form.richText" />
      </el-form-item>
    </el-form>

    <div class="operation">
      <el-button size="small" class="f-white bg-theme" @click="submit()">Tiết kiệm hàng</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addGoods, editGoods } from "@/api/goods";

export default {
  created() {
    let form = this.$route.params;
    form.price = form.price ? form.price / 100 : 0;
    form.originalPrice = form.originalPrice ? form.originalPrice / 100 : 0;
    this.form = form;
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapGetters(["project"]),
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.id ? this.edit() : this.add();
        }
      });
    },

    async add() {
      let data = this.formatParams({
        projectId: this.project.id,
        ...this.form,
      });

      let { status } = await addGoods(data);

      if (status == "10000") {
        this.$notify({
          title: "成功",
          message: "商品发布成功",
          type: "success",
        });
        this.$router.push({ name: "goods-manager" });
      }
    },

    // 编辑
    async edit() {
      let { status } = await editGoods(this.formatParams(this.form));

      if (status == "10000") {
        this.$notify({
          title: "thành công",
          message: "Sửa đổi sản phẩm sửa đổi",
          type: "success",
        });
        this.$router.push({ name: "goods-manager" });
      }
    },

    formatParams(target) {
      let data = this.$cloneDeep(target);
      data.price = data.price * 100;
      data.originalPrice = data.originalPrice * 100;
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.operation {
  position: fixed;
  bottom: 0px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 1612px;
  box-shadow: 0 -3px 5px #eee;
  background: #fff;
}
</style>
