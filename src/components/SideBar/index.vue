<template>
  <div class="flex h-100">

    <!-- Menu bên -->
    <ul class="meau">
      <li class="meau-group" v-for="(group, index) in groups" :key="index">
        <div class="meau-title">{{ group.label }}</div>
        <router-link v-for="(item, index) in group.list" :key="index" :to="{ path: item.path }" class="maeu-item">
          {{ item.name }}
        </router-link>
      </li>
    </ul>

    <!-- Thùng đựng hàng -->
    <div class="body flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.meau {
  width: 140px;
  height: 100%;
  padding: 10px;
  background: #ffffff;

  .meau-group {
    &::after {
      content: "";
      display: block;
      height: 1px;
      margin: 15px 10px;
      background: #e3e2e5;
    }

    .meau-title {
      color: #595961;
      margin: 15px 0;
      padding-left: 20px;
      font-size: 12px;
      font-weight: 700;
    }

    .maeu-item {
      display: block;
      min-height: 28px;
      line-height: 28px;
      padding: 5px 20px;
      border-radius: 6px;
      color: #75757e;
      font-size: 12px;
      box-sizing: border-box;
      background: #fff;
      cursor: pointer;
    }
  }
}

.body {
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
}

.active {
  background: #ebedf0 !important;
}
</style>