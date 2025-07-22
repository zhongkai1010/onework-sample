<template>
  <view style="background: #fffbe6; min-height: 100vh; padding: 0 32rpx">
    <!-- 账户总余额卡片 -->
    <view
      style="
        border-radius: 20rpx;
        background: linear-gradient(90deg, #3a3a3a 60%, #ffe066 100%);
        position: relative;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
      "
    >
      <view
        style="
          padding: 40rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <view style="display: flex; align-items: center">
          <view style="font-size: 26rpx; color: #fff; opacity: 0.9"
            >账户总余额</view
          >
          <view
            style="
              margin-left: 45rpx;
              font-size: 48rpx;
              font-weight: bold;
              color: #fff;
            "
            >￥0</view
          >
        </view>
        <view
          style="
            width: 64rpx;
            height: 64rpx;
            background: #ffe066;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2rpx 8rpx #ffe066;
          "
        >
          <u-icon name="man-add" color="#f7b500" size="40" />
        </view>
      </view>
    </view>
    <!-- 收益/奖励卡片 -->
    <view
      style="
        margin-top: 24rpx;
        background: #ffe000;
        border-radius: 20rpx;
        padding: 40rpx 60rpx 40rpx 60rpx;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
      "
    >
      <!-- 我的收益 -->
      <view
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 220rpx;
          padding-bottom: 24rpx;
        "
      >
        <view style="display: flex; align-items: center">
          <text style="font-size: 32rpx; color: #3d3b01; font-weight: 500"
            >我的收益</text
          >
          <u-icon
            name="question-circle"
            color="#4C3300"
            size="18"
            style="margin-left: 6rpx"
          />
          <view
            style="
              display: flex;
              align-items: center;
              margin-left: 10rpx;
              background: #ffe000;
              border: 1rpx solid #4c3300;
              border-radius: 32rpx;
              padding: 5rpx 10rpx;
              height: 32rpx;
            "
          >
            <text style="font-size: 24rpx; color: #4c3300">明细</text>
            <u-icon
              name="arrow-right"
              color="#4C3300"
              size="9"
              style="margin-left: 2rpx"
            />
          </view>
        </view>
        <view
          style="
            font-size: 28rpx;
            color: #3a3a3a;
            font-weight: bold;

            display: flex;
            align-items: center;
          "
        >
          <text>￥0</text>
        </view>
        <u-button
          type="primary"
          style="
            background: #3a3a3a;
            color: #fff;
            border: none;
            border-radius: 24rpx;
            width: 120rpx;
            height: 44rpx;
            font-size: 20rpx;
            margin-left: 0;
            align-self: flex-start;
          "
        >
          提现
        </u-button>
      </view>
      <!-- 分割线 -->
      <view
        style="
          width: 2rpx;
          height: 80%;
          background-color: #f5d100;
          align-self: center;
        "
      ></view>
      <!-- 我的奖励 -->
      <view
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 220rpx;
          padding-bottom: 24rpx;
        "
      >
        <view style="display: flex; align-items: center">
          <text style="font-size: 32rpx; color: #3d3b01; font-weight: 500"
            >我的奖励</text
          >
          <u-icon
            name="question-circle"
            color="#4C3300"
            size="18"
            style="margin-left: 6rpx"
          />
          <view
            style="
              display: flex;
              align-items: center;
              margin-left: 10rpx;
              background: #ffe000;
              border: 1rpx solid #4c3300;
              border-radius: 32rpx;
              padding: 5rpx 10rpx;
              height: 32rpx;
            "
          >
            <text style="font-size: 24rpx; color: #4c3300">明细</text>
            <u-icon
              name="arrow-right"
              color="#4C3300"
              size="9"
              style="margin-left: 2rpx"
            />
          </view>
        </view>
        <view
          style="
            font-size: 28rpx;
            color: #3a3a3a;
            font-weight: bold;

            display: flex;
            align-items: center;
          "
        >
          <text>￥0</text>
        </view>
        <u-button
          type="primary"
          style="
            background: #3a3a3a;
            color: #fff;
            border: none;
            border-radius: 24rpx;
            width: 120rpx;
            height: 44rpx;
            font-size: 20rpx;
            margin-left: 0;
            align-self: flex-start;
          "
        >
          权益兑现
        </u-button>
      </view>
      <!-- 提现须知按钮 -->
      <view style="position: absolute; right: 0rpx; bottom: 16rpx">
        <u-button
          type="primary"
          style="
            background: #f5d100;
            color: #3a3a3a;
            border: none;
            border-radius: 24rpx 0 0 24rpx;
            width: 120rpx;
            height: 44rpx;
            font-size: 20rpx;
          "
          >提现须知</u-button
        >
      </view>
    </view>
    <view
      style="
        margin-top: 24rpx;
        background: #fdf9e7;
        border-radius: 8rpx;
        padding: 16rpx 0;
        text-align: center;
      "
    >
      <text style="color: #a67c2d; font-size: 28rpx; letter-spacing: 2rpx"
        >每月25-31号可提现上月结算收益</text
      >
    </view>
    <view
      style="
        margin-top: 24rpx;
        display: flex;
        justify-items: center;
        justify-content: center;
      "
    >
      <view
        style="background-color: #fff; padding: 10rpx; border-radius: 36rpx"
      >
        <u-tabs
          :list="tabList"
          :current="currentTab"
          @change="onTabChange"
          :itemStyle="{
            margin: '0 12rpx',
          }"
          :activeStyle="{
            backgroundColor: '#FDD900',
            borderRadius: '36rpx',
            color: '#4F4510',
            padding: '12rpx 24rpx',
            fontWeight: 'bold',
            fontSize: '30rpx',
          }"
          :inactiveStyle="{
            backgroundColor: '#fff',
            borderRadius: '36rpx',
            fontSize: '30rpx',
            padding: '12rpx 24rpx',
          }"
          :lineHeight="0"
          :lineWidth="0"
          :scrollable="false"
          keyName="name"
        />
      </view>
    </view>
    <view style="margin-top: 24rpx; background-color: #fff">
      <u-tabs
        lineColor="#FDE008"
        :list="dateList"
        :itemStyle="{
          flex: 1,
          padding: '24rpx',
        }"
      ></u-tabs>
    </view>
    <view style="margin-top: 24rpx">
      <u-grid :border="false">
        <u-grid-item
          v-for="(baseListItem, baseListIndex) in baseList"
          :key="baseListIndex"
          bgColor="#fff"
        >
          <view
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 20rpx 0;
              flex: 1;
            "
          >
            <text>{{ baseListItem.title }}</text>
            <text style="margin-top: 12rpx">{{ baseListItem.price }}</text>
          </view>
        </u-grid-item>
      </u-grid>
    </view>
    <view style="margin-top: 24rpx">
      <!-- 表格表头 -->
      <view
        style="
          display: flex;
          background: #fafbfc;
          border-radius: 16rpx 16rpx 0 0;
          padding: 24rpx 0 24rpx 0;
          font-size: 26rpx;
          color: #888;
          font-weight: 500;
        "
      >
        <view style="flex: 3; text-align: left; padding-left: 32rpx">渠道</view>
        <view style="flex: 2; text-align: center">付款笔数</view>
        <view style="flex: 3; text-align: center">成交预估收益</view>
        <view style="flex: 3; text-align: center">结算预估收益</view>
        <view style="width: 40rpx"></view>
      </view>
      <!-- 数据行 -->
      <view
        v-for="(item, idx) in channelList"
        :key="item.name"
        :style="`display: flex; align-items: center; padding: 28rpx 0 28rpx 0; font-size: 28rpx; color: #333; background: ${
          idx % 2 === 1 ? '#fafbfc' : '#fff'
        };`"
      >
        <view style="flex: 3; text-align: left; padding-left: 32rpx">{{
          item.name
        }}</view>
        <view style="flex: 2; text-align: center; color: #888">{{
          item.count
        }}</view>
        <view style="flex: 3; text-align: center; color: #888">{{
          item.estimate
        }}</view>
        <view style="flex: 3; text-align: center; color: #888">{{
          item.settle
        }}</view>
        <view style="width: 40rpx; display: flex; justify-content: center">
          <u-icon name="arrow-right" color="#ccc" size="22" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      tabList: [{ name: "我的收益" }, { name: "我的奖励" }],
      dateList: [
        { name: "今日" },
        { name: "昨日" },
        { name: "本月" },
        { name: "上月" },
      ],
      channelList: [
        { name: "淘宝", count: 0, estimate: 0, settle: 0 },
        { name: "京东", count: 0, estimate: 0, settle: 0 },
        { name: "拼多多", count: 0, estimate: 0, settle: 0 },
        { name: "唯品会", count: 0, estimate: 0, settle: 0 },
        { name: "美团外卖", count: 0, estimate: 0, settle: 0 },
        { name: "饿了么", count: 0, estimate: 0, settle: 0 },
        { name: "抖音", count: 0, estimate: 0, settle: 0 },
      ],
      baseList: [
        {
          price: 3,
          title: "总付款笔数",
        },
        {
          price: 2,
          title: "总成交预估收益",
        },
        {
          price: 1,
          title: "总结算预估收益",
        },
      ],
    };
  },
  methods: {
    onTabChange(e) {
      this.currentTab = e.index;
    },
  },
};
</script>

<style lang="scss"></style>
