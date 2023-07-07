<!--
 * @Author: huwanfei
 * @Date: 2023-07-07 10:26:20
 * @LastEditTime: 2023-07-07 11:17:58
 * @LastEditors: huwanfei
 * @Description:  示例
 * @FilePath: /h5-downloadImg/src/views/index.vue
-->
<template>
  <div class="home">
    <div class="text-center marginTop20">
      <van-button type="primary" @click="handleDownload">下载</van-button>
    </div>

    <van-dialog
      v-model="showPreview"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
    >
      <img :src="img" />
      <p class="textCenter">
        {{ isSave ? "“长按”保存照片到手机" : "因系统限制，安卓用户请截屏保存" }}
      </p>
    </van-dialog>
    <!-- 展示需要下载的html -->
    <div id="saveHtml">
      <certificateCard :info="data" />
    </div>
  </div>
</template>

<script>
import { convertToImage, saveBlob } from "@/utils/convertToImage";
import certificateCard from "./certificateCard.vue";
import { browser } from "@/utils/index";
export default {
  components: { certificateCard },
  data() {
    return {
      showPreview: false,
      isSave: false,
      img: "",
      data: {
        name: "李四",
        date: "2023-07-01 ~ 2023-07-03",
        visitSpotAddress: "浙江省杭州市",
        area: "A号楼1楼",
        carPlateNo: "",
        completeBarCodePath: require("@/assets/qrcode.png"),
      },
    };
  },
  methods: {
    handleDownload() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "下载中...",
        overlay: true,
        forbidClick: true,
        loadingType: "spinner",
      });

      setTimeout(() => {
        this.saveImg();
      }, 800);
    },
    async saveImg() {
      let element = document.getElementById("saveHtml");
      element.style.display = "block";
      // 调用函数，取到截图的二进制数据，对图片进行处理（保存本地、展示等）
      const blob = await convertToImage(element);

      this.$toast.clear();

      element.style.display = "none";

      // 在ios/android APP内、微信上直接预览图片，长按图片保存（ios系统不支持直接下载）
      if (browser.versions.mobile) {
        // 在苹果、微信上直接预览，长按图片调用系统自己的保存图片功能
        if (browser.versions.ios || browser.versions.weixin) {
          this.isSave = true;
          this.img = window.URL.createObjectURL(blob);
          this.showPreview = true;
        } else if (browser.versions.android) {
          // 在安卓APP内，无法长按保存图片到手机，需要APP开发一个保存图片功能，故在此，只让它预览
          this.isSave = false;
          this.img = window.URL.createObjectURL(blob);
          this.showPreview = true;
        }

        // 其他情况，按需添加判断处理
      } else {
        // 网页端都直接下载
        saveBlob(blob, "访客凭证");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-color: #F6F7F8;
}
.textCenter {
  font-size: 12px;
  font-weight: 400;
  color: #a6a8a9;
  text-align: center;
}

// 下载图片
#saveHtml {
  position: absolute;
  top: 0;
  width: 100%;
  height: 570px;
  z-index: -10;
  display: none;
}
</style>
