<template>
  <div style="padding: 0 10px; overflow: hidden; background: #fff;">
    <el-scrollbar :vertical="false" class="scroll-container">
      <div class="tags-view">
        <router-link to="/" class="tag-item" tag="span">
          首页
        </router-link>
        <router-link to="/" class="tag-item" tag="span">
          角色管理
          <i class="close el-icon-close" />
        </router-link>
        <router-link to="/" class="tag-item active" tag="span">
          dashboard
          <i class="close el-icon-close" />
        </router-link>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
.scroll-container
  margin-top: 6px
  width: 100%
.tags-view
  height: 32px
  background: #fff
  box-sizing: border-box
  white-space: nowrap
  display: inline-block
  min-width: 100%
  .tag-item
    margin: 0 5px
    padding: 0 10px
    display: inline-block
    height: 26px
    line-height: 26px
    border: 1px solid #d8dce5;
    color: #495060;
    box-sizing: border-box
    font-size: $font-size-small
    .close
      display: inline-block
      width: 18px
      height: 18px
      border-radius: 50%
      box-sizing: border-box
      text-align: center
      line-height: 18px
      cursor: pointer
      transition: all 0.3s cubic-bezier(.645,.045,.355,1)
      color: #ccc
      &:hover
        color: #fff
        background: #b4bccc
.tag-item.active
  padding: 0 10px 0 20px
  position: relative
  border-color: #42b983
  background: #42b983
  color: #fff
  &::after
    content: ""
    display: block
    position: absolute
    top: 8px
    left: 5px
    width: 10px
    height: 10px
    border-radius: 50%
    background: rgba(255, 255, 255, 1)
  .close
    color: rgba(255, 255, 255, 0.8)
</style>
