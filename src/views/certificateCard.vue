<template>
  <div class="certificate">
    <div class="certificate-title">
      <img src="../assets/logo.png" alt="" />
      XXXX欢迎您的来访
    </div>
    <div class="visitor-card">
      <div class="visitor-info">
        <div class="row">
          <div class="label">
            <span>访</span>
            <span>客</span>
            <span>姓</span>
            <span>名</span>
            <!-- 访客姓名 -->
            </div>
          <div class="colon">：</div>
          <div class="value name">{{info.name}}</div>
        </div>
        <div class="row">
          <div class="label">来访有效期</div>
          <div class="colon">：</div>
          <div class="value">{{info.date}}</div>
        </div>
        <div class="row">
          <div class="label">
            <span>地</span>
            <span>址</span>
            <!-- 地址 -->
            </div>
          <div class="colon">：</div>
          <div class="value">{{info.visitSpotAddress}}</div>
        </div>
        <div class="row">
          <div class="label">
            <!-- 访问区域 -->
            <span>访</span>
            <span>问</span>
            <span>区</span>
            <span>域</span>
          </div>
          <div class="colon">：</div>
          <div class="value">{{info.area}}</div>
        </div>
        <div class="row" v-if="info.carPlateNo">
          <div class="label">
            <!-- 车牌 -->
            <span>车</span>
            <span>牌</span>
          </div>
          <div class="colon">：</div>
          <div class="value">{{info.carPlateNo}}</div>
        </div>
      </div>
      <div class="divider-box">
        <div class="circle"></div>
        <div class="divider"></div>
        <div class="circle"></div>
      </div>
      <div class="visitor-qrcode">
        <div class="title">访客凭证</div>
        <div class="qrcode">
          <img :src="info.completeBarCodePath" alt="" />
        </div>
        <div class="qrcode-desc">持此二维码于人脸道闸处核验</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="less" scoped>
.certificate {
  width: 100%;
  height: 100%;
  background: url(../assets/bg.png) no-repeat center;
  background-size: 100% 100%;
  padding: 0 16px;
  box-sizing: border-box;
  &-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 0 20px;
    font-size: 18px;
    font-weight: 600;
    color: #1c1d1d;
    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
  }
  .visitor-card {
    background: #f9fbff;
    border-radius: 8px;
    padding: 25px 22px 42px;
    .visitor-info {
      padding-bottom: 24px;
    }
    .row {
      display: flex;
      margin-bottom: 5px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 400;
      .label {
        flex: 70px 0 0;
        color: #1c1d1d;
        display: flex;
        justify-content: space-between;
      }
      .value {
        color: #646566;
        margin-left: 14px;
        &.name {
          font-size: 16px;
          font-weight: 500;
          color: #3e6dff;
        }
      }
    }
    .divider-box {
      position: relative;
      .divider {
        margin: 0 2px;
        border: 0.5px dashed #a6a8a9;
      }
      .circle {
        position: absolute;
        top: -10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ccd9ff;
        &:first-child {
          left: -50px;
        }
        &:last-child {
          right: -50px;
        }
      }
    }

    .visitor-qrcode {
      background-color: #fff;
      padding-top: 19px;
      .title {
        font-size: 16px;
        font-weight: 400;
        color: #3e6dff;
        text-align: center;
      }
      .qrcode {
        width: 148px;
        height: 148px;
        margin: 14px auto;
        img {
          width: 100%;
          height: auto;
        }
      }
      .qrcode-desc {
        font-size: 12px;
        font-weight: 400;
        color: #a6a8a9;
        text-align: center;
      }
    }
  }
}
</style>
