<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Icons">
      en
    </el-tab-pane>
    <el-tab-pane label="Element-UI icons">Element-UI icons</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import icons from './svg-icon'
export default {
  name: '',
  data() {
    return {}
  },
  mounted () {
    console.log(icons)
  }
}
</script>

<style scoped lang="stylus"></style>
