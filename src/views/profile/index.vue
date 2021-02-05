<template>
  <div class="profile-wrapper">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="10">
        <el-card>
          <template #header>
            <div>
              关于我
            </div>
          </template>
          <div>
            <div class="figure-wrapper">
              <img
                class="user-figure"
                src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              />
            </div>
            <div class="location-wrapper">
              <span class="el-icon-location-information position"></span>
              <span class="position-text" @click="getLocationInfo">
                {{ locationText }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="14">
        <el-card>
          <template #header>
            <div>
              基本资料
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { getCityInfo } from './position'
//http://api.map.baidu.com/location/ip?ak=juQI7ubxirLbo1tPwX1qKzdwz4aXvElo 百度地图根据ip获取位置信息
//https://blog.csdn.net/vikki0001/article/details/68922308
export default {
  name: 'Profile',
  setup() {
    const locationText = ref('点击获取当前位置信息')
    function getLocationInfo(): void {
      if (!navigator.geolocation) {
        ElNotification({
          title: '获取位置信息失败',
          message: '当前浏览器版本太低,无法获取位置信息~'
        })
      } else {
        console.log('----')
        navigator.geolocation.getCurrentPosition(
          function(position) {
            debugger
            console.log(position)
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
          },
          function(err) {
            const msgObj = {
              1: '没有权限获取位置信息',
              2: '位置信息错误',
              3: '超时'
            }
            const errMsg = msgObj[err.code]
              ? msgObj[err.code]
              : '获取位置信息失败'
            ElNotification({
              title: '获取位置信息失败',
              message: errMsg
            })
          }
        )
      }
    }
    async function _getLocation() {
      try {
        const res = await getCityInfo()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    _getLocation()
    // getLocationInfo()
    return {
      locationText,
      getLocationInfo
    }
  }
}
</script>

<style scoped lang="stylus">
.profile-wrapper
  padding: 20px
  .figure-wrapper
    text-align: center
    .user-figure
      width: 100px
      height: 100px
      border-radius: 50%

.location-wrapper
  text-align: center
  .position
    margin-right: 5px
    font-size: 20px
    color: $rainbow-1
  .position-text
    font-size: 12px
    color: $color-info
    cursor: pointer
</style>
