<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Icons">
      <el-row class="icon-list">
        <el-col
          v-for="item in iconList"
          :key="item"
          :xs="8"
          :sm="6"
          :md="4"
          :lg="3"
          :xl="2"
        >
          <el-tooltip
            class="icon-item"
            :content="generateIconCode(item)"
            placement="top"
          >
            <div class="icon-item-inner" @click="iconClickHandler('svg', item)">
              <SvgIcon :icon-class="item" />
              <span class="icon-name"> {{ item }} </span>
            </div>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="Element-UI icons">
      <el-row class="icon-list">
        <el-col
          v-for="item in elementIconList"
          :key="item"
          :xs="8"
          :sm="6"
          :md="4"
          :lg="3"
          :xl="2"
        >
          <el-tooltip
            class="icon-item"
            :content="generateElementCode(item)"
            placement="top"
          >
            <div
              class="icon-item-inner"
              @click="iconClickHandler('element', item)"
            >
              <i class="element-icon" :class="item" />
              <span class="icon-name"> {{ item }} </span>
            </div>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import handleClipboard from '@/util/clipboard'
import SvgIcon from '@/components/svg-icon'
import icons from './svg-icon'
import elementIcons from './element-icon'
export default {
  name: 'IconBox',
  components: {
    SvgIcon
  },
  data() {
    return {
      iconList: icons,
      elementIconList: elementIcons
    }
  },
  methods: {
    generateIconCode(iconName: string): string {
      return `<SvgIcon icon-class="${iconName}" />`
    },
    generateElementCode(iconName: string): string {
      return `<i class="${iconName}" />`
    },
    iconClickHandler(tag: string, name: string): void {
      const text =
        tag === 'svg'
          ? this.generateIconCode(name)
          : this.generateElementCode(name)
      handleClipboard(text)
    }
  }
}
</script>

<style scoped lang="stylus">
.icon-list
  display: flex
  flex-wrap: wrap
  border: 1px solid #eee
  .icon-item
    padding: 25px 0 5px
    border-right: 1px solid #eee
    border-bottom: 1px solid #eee
    text-align: center
    cursor: pointer
    transition: all linear 0.3s
    &:hover
      background: #f8f8f8
.icon-item-inner
  width: 100%
  height: 80px
  .svg-icon
    width: 30px
    height: 30px
  .icon-name
    margin-top: 10px
    display: block
  .element-icon
    font-size: 30px
</style>
