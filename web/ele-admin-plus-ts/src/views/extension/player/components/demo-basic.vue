<template>
  <ele-card header="基础演示">
    <!-- 操作按钮 -->
    <div style="margin-bottom: 16px">
      <el-button type="primary" class="ele-btn-icon" @click="play"> 播放 </el-button>
      <el-button type="primary" class="ele-btn-icon" @click="pause"> 暂停 </el-button>
      <el-button type="primary" class="ele-btn-icon" @click="replay"> 重新播放 </el-button>
      <el-button type="primary" class="ele-btn-icon" @click="changeSrc"> 切换视频源 </el-button>
    </div>
    <!-- 播放器 -->
    <ele-xg-player :config="config" @player="handlePlayer" />
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type Player from 'xgplayer'
  const url1 = 'https://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
  const poster1 =
    'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/solution/general-video/css/img/scene/1.png'
  const url2 = 'https://tianyu.v.netease.com/2024/0617/745cbbaa15464f6c191a10a4c7fb9a30.mp4'
  const poster2 =
    'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/solution/general-video/css/img/scene/6.png'

  /** 视频播放器配置 */
  const config = ref({
    lang: 'zh-cn',
    fluid: true,
    // 视频地址
    url: url1,
    // 封面
    poster: poster1,
    // 开启倍速播放
    playbackRate: [0.5, 1, 1.5, 2],
    // 开启画中画
    pip: true,
    // 默认音量
    volume: 1,
    // 自动播放
    autoplay: false
  })

  /** 视频播放器实例 */
  let player: Player

  /** 播放器渲染完成 */
  const handlePlayer = (e: Player) => {
    player = e
  }

  /** 播放 */
  const play = () => {
    if (player && player.paused) {
      player.play()
    }
  }

  /** 暂停 */
  const pause = () => {
    if (player) {
      player.pause()
    }
  }

  /** 重新播放 */
  const replay = () => {
    if (player) {
      player.replay()
    }
  }

  /** 切换视频源 */
  const changeSrc = () => {
    config.value = {
      ...config.value,
      url: config.value.url == url1 ? url2 : url1,
      poster: config.value.url == url1 ? poster2 : poster1,
      autoplay: true
    }
  }
</script>
