<template>
  <div :style="[getStyle('wrap')]" @click="jump">
    <div class="flex" :style="[getStyle('item')]">
      <image :src="item.cover" :style="[getStyle('image')]" mode="widthFix" radius="6" />

      <div class="flex-1 pl5 pr5" :style="[getStyle('item-info')]">
        <div>
          <div class="h34 mt10 f13 ellipsis-2" :style="[getStyle('goodsName')]">
            {{ item.name }}
          </div>
          <div v-show="attr.showInfo" class="mt8 f12 f-grey">
            {{ item.describe }}
          </div>
        </div>

        <div class="flex col-center flex-wrap mt5" :style="[getStyle('priceCtn')]">
          <div class="mb5">
            <span class="f-red">
              <span class="mr2 f12">¥</span>
              <span class="f18" :style="[getStyle('price')]">{{
                item.price | money
              }}</span>
            </span>
            <span v-show="attr.showOriginalPrice" class="text-through f-grey">
              <span class="ml4 f12">¥</span>
              <span class="f14" :style="[getStyle('originalPrice')]">{{
                item.originalPrice | money
              }}</span>
            </span>
          </div>

          <div class="flex-center mb5 f-white" :style="[getStyle('buy')]">
            <i :style="[getStyle('buy-icon')]" class="van-icon van-icon-shopping-cart-o f14"></i>
            <span v-show="attr.buyText" class="f12 ml2">{{
              attr.buyText
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  inject: ["tabs"],
  props: {
    item: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    attr() {
      return this.tabs.config.attrs;
    },
    style() {
      return this.tabs.config.styles;
    },
    contentWidth() {
      return 365 - this.tabs.config.styles.pagePadding * 2;
    },
    itemWidth() {
      if (this.attr.listModel == "oneCols") {
        return `${this.$unit(this.contentWidth)}`;
      }
      if (this.attr.listModel == "towCols") {
        return `${this.$unit(this.contentWidth / 2)}`;
      }
      if (this.attr.listModel == "threeCols") {
        return `${this.$unit(this.contentWidth / 3)}`;
      }
      if (this.attr.listModel == "roll") {
        return `${this.$unit(this.contentWidth / 2.5)}`;
      }
    },
  },

  methods: {
    getStyle(target) {
      if (target == "wrap") {
        let result = {
          padding: this.$unit(5),
        };

        if (this.attr.model == "transverse") {
          result.width = this.itemWidth;
        }

        return result;
      }

      if (target == "item") {
        let result = {
          flexDirection: "column",
          padding: this.$unit(5),
          boxShadow: `0 0 8px 0 rgba(0, 0, 0, 0.1)`,
          borderRadius: `6px`,
          background: `#ffffff`,
        };

        if (this.attr.listModel == "oneCols") {
          result.flexDirection = "row";
        }

        if (this.attr.model == "vertical") {
          delete result.boxShadow;
        }

        return result;
      }

      if (target == "image") {
        if (this.attr.listModel == "oneCols") {
          if (this.attr.model == "vertical") {
            return { width: this.$unit(108), marginRight: this.$unit(5) };
          } else {
            return {
              width: this.$unit(140),
              marginRight: this.$unit(10),
            };
          }
        } else {
          return {
            width: `100%`,
          };
        }
      }

      if (target == "item-info") {
        if (this.attr.listModel == "oneCols") {
          return {
            display: `flex`,
            flexDirection: `column`,
            justifyContent: "space-between",
            paddingLeft: this.$unit(8),
            paddingRight: this.$unit(8),
          };
        } else {
          if (this.attr.itemAlign == "center") {
            return {
              textAlign: "center",
            };
          }
        }
      }

      if (target == "priceCtn") {
        if (
          this.attr.listModel != "oneCols" &&
          this.attr.itemAlign == "center"
        ) {
          return {
            justifyContent: "center",
            flexDirection: "column",
          };
        } else {
          return {
            justifyContent: "space-between",
          };
        }
      }

      if (target == "buy") {
        let result = {
          background: this.style.buyBackgroundColor,
        };

        if (this.attr.buyText) {
          result.borderRadius = this.$unit(4);
          result.padding = `${this.$unit(4)} ${this.$unit(8)}`;
        } else {
          result.borderRadius = `50%`;
          result.width = this.$unit(24);
          result.height = this.$unit(24);
        }

        return result;
      }

      if (["goodsName", "price"].includes(target)) {
        return {
          fontWeight: "700",
        };
      }

      if (
        ["roll", "threeCols"].includes(this.attr.listModel) ||
        this.attr.model == "vertical"
      ) {
        if (target == "price") {
          return {
            fontSize: `${this.$unit(15)} !important`,
          };
        }
        if (target == "originalPrice") {
          return {
            fontSize: `${this.$unit(12)} !important`,
          };
        }
        if (target == "buy-icon") {
          return {
            fontSize: `${this.$unit(16)} !important`,
          };
        }
      }
    },

    jump() {
      this.$jump({
        name: "detail",
        data: { id: this.item.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-buy {
  margin-bottom: 5px;
}
</style>