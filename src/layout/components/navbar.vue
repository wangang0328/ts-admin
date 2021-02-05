<template>
  <div class="navbar">
    <div class="navbar-left">
      <Hamburger />
      <Breadcrumb />
    </div>
    <div class="navbar-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          >
          </el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/profile">
                个人中心
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import Hamburger from '@/components/hamburger/index'
import Breadcrumb from '@/components/breadcrumb/index.vue'

export default {
  data() {
    return {}
  },
  methods: {
    test() {
      console.log('测试test')
    }
  },
  components: {
    Hamburger,
    Breadcrumb
  }
}
</script>

<style scoped lang="stylus">
.navbar
  position: relative
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  height: 50px
  background: #fff
  box-shadow: 0 1px 4px rgba(0,21,41,.08)
  .navbar-left
    display: flex
    height: 100%
    align-items: center
  .navbar-right
    padding-right: 20px
</style>
