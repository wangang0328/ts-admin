<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Icons">
      <div class="icon-list">
        <el-tooltip
          v-for="item in iconList"
          :key="item"
          class="icon-item"
          :content="generateIconCode(item)"
          placement="top"
        >
          <div class="icon-item-inner">
            <SvgIcon :icon-class="item" />
            <span class="icon-name"> {{ item }} </span>
          </div>
        </el-tooltip>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Element-UI icons">Element-UI icons</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import SvgIcon from '@/components/svg-icon'
import icons from './svg-icon'
export default {
  name: 'IconBox',
  components: {
    SvgIcon
  },
  data() {
    return {
      iconList: icons
    }
  },
  methods: {
    generateIconCode(iconName: string): string {
      return `<SvgIcon icon-class="${iconName}" />`
    }
  },
  mounted() {
    console.log(icons)
  }
}
</script>

<style scoped lang="stylus">
.icon-list
  display: flex
  flex-wrap: wrap
  border: 1px solid #eee
  .icon-item
    padding: 25px 10px 5px
    border-right: 1px solid #eee
    border-bottom: 1px solid #eee
    text-align: center
    cursor: pointer
    transition: all linear 0.3s
    &:hover
      background: #f8f8f8
.icon-item-inner
  width: 100px
  height: 80px
  .svg-icon
    width: 30px
    height: 30px
  .icon-name
    margin-top: 10px
    display: block
</style>
