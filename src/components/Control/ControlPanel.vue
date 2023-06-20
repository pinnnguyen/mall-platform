<template>
  <div class="panel">
    <phone-ctn>
      <div class="page">
        <iframe v-if="initIframe" ref="iframe" class="page-iframe" frameborder="no" :style="{
          height: iframeHeight + 'px',
          pointerEvents: control.dragstatus ? 'none' : 'auto',
        }" :src="iframeUrl" @load="init"></iframe>

        <div class="page-layer" type="page" :style="{
          height: iframeHeight + 'px',
          zIndex: control.dragstatus ? '20' : '1',
        }" @dragover="layerMove">
          <control-widget-shape v-for="item in widgetInfoList" :key="item.id" :data="item"
            @changeCurrWidget="changeCurrWidget">
            <div ref="layerWidget" class="page-layer-widget" type="widget" :id="item.id"
              :style="{ height: item.height + 'px' }"></div>
          </control-widget-shape>
        </div>
      </div>

      <el-tooltip effect="light" content="Cài đặt trang" placement="bottom">
        <div class="panel-set flex-center" @click="control.curWidget = undefined">
          <i class="el-icon-setting"></i>
        </div>
      </el-tooltip>
    </phone-ctn>
  </div>
</template>

<script>
import ControlWidgetShape from "./ControlWidgetShape.vue";
import global from "@/config/global";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { ControlWidgetShape },
  inject: ["control"],

  created() {
    console.log("Tạo một trang");

    this.initIframe = true;
  },

  mounted() {
    this.control.h5Iframe = this.$refs.iframe;
    this.getMessage();
  },

  destroyed() {
    console.log("Trang hủy bỏ");

    this.initIframe = false;
    window.removeEventListener("message", this.getMessageHandle);
  },

  data() {
    return {
      widgetInfoList: [],
      iframeHeight: 667,
      initIframe: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    iframeUrl() {
      return `${global.viewUrl}pages/build/build?operate=build`;
    },
  },

  watch: {
    "control.curPage.componentList": {
      handler() {
        this.messageList();
      },
      deep: true,
    },
  },

  methods: {
    init() {
      console.log("khởi tạo...");

      this.messageInit();
      this.messageList();
    },

    getMessage() {
      window.addEventListener("message", this.getMessageHandle);
    },

    getMessageHandle(e) {
      let self = this;
      let { type, params } = e.data;
      switch (type) {
        case "setList":
          self.setList(params);
          break;
        case "setHeight":
          self.setHeight(params);
          break;
        case "setCurrWidget":
          self.setCurrWidget(params);
          break;
      }
    },

    setHeight(params) {
      this.widgetInfoList = params;
      this.iframeHeight = this.widgetInfoList.reduce((a, b) => a + b.height, 0);
    },

    setList(params) {
      console.log(" Danh sách tài liệu nội bộ của iframe thay đổi và cập nhật đồng thời");
      console.log(params);
      console.log(this.control.curPage.name);

      let { list } = params;
      this.control.curPage.componentList = list;
      console.log(this.project);
    },

    setCurrWidget(params) {
      let { id } = params;
      this.control.curWidget = this.control.curPage.componentList.find(
        (item) => id == item.id
      );
    },

    changeCurrWidget(widget) {
      this.setCurrWidget(widget);
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "changeCurrWidget",
          params: { id: widget.id },
        },
        "*"
      );
    },

    layerMove(e, index) {
      this.throttle(this.layerMoveFun, 1)(e, index);
    },

    layerMoveFun(e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("Chuyển động kéo vật chất, chuyển động chờ kiểm soát");

      if (!this.control.dragstatus) return;

      let type = e.target.getAttribute("type");
      let params = {
        type: "page",
      };

      if (type == "widget") {
        let [y, h] = [e.offsetY, e.target.offsetHeight];
        params = {
          id: e.target.getAttribute("id"),
          type: "widget",
          direction: y < h / 2,
        };
      }

      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "move",
          params,
        },
        "*"
      );
    },

    // Gửi thông tin, dữ liệu cấu hình trung tâm hiện tại
    messageInit() {
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "init",
          params: { project: this.project },
        },
        "*"
      );
    },

    messageList() {
      console.log("Gửi thông tin, đồng bộ hóa mảng các loài iframe");
      console.log(this.control.curPage);
      console.log(this.control.curPage.componentList);

      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "list",
          params: this.control.curPage.componentList,
        },
        "*"
      );
    },

    throttle(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  left: 176px;
  /*no*/
  right: 360px;
  /*no*/
  height: calc(100% - 56px);
  /*no*/
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }

  .panel-set {
    position: absolute;
    top: 10px;
    left: -70px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    i {
      font-size: 22px;
      color: #b0afb2;
    }
  }

  .page {
    position: relative;
    font-size: 0;

    .page-iframe {
      position: relative;
      width: 100%;
      z-index: 10;
    }

    .page-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 667px;
      // background: cornflowerblue;

      .page-layer-widget {
        width: 100%;
        z-index: 99999;
      }
    }
  }
}
</style>