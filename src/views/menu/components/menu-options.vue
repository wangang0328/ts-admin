<template>
  <el-card>
    <template #header>
      <p class="menu-title">菜单选项</p>
    </template>
    <el-form
      :model="menuForm"
      :rules="rules"
      ref="menuFormEl"
      label-width="100px"
      class="demo-ruleForm"
      :disabled="!enable"
    >
      <el-form-item label="菜单标题" prop="title">
        <el-input v-model="title" placeholder="请输入菜单标题" />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="name" placeholder="只能为英文" />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="path" placeholder="菜单路由" />
      </el-form-item>
      <el-form-item label="高亮路径" prop="activeMenu">
        <el-input v-model="activeMenu" placeholder="菜单路由" />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-select v-model="type" placeholder="请选择菜单类型">
          <el-option label="目录" value="menu"></el-option>
          <el-option label="资源" value="resource"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组件" prop="component">
        <el-input v-model="component" placeholder="菜单路由">
          <template #prepend>()=>import('@/views/</template>
          <template #append>.vue')</template>
        </el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="sort" placeholder="请输入排序权重,只接受数字" />
      </el-form-item>
      <el-row>
        <el-col :xs="24" :sm="8">
          <el-form-item label="显示菜单" prop="showInMenu">
            <el-switch id="showInMenu" v-model="showInMenu" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-form-item label="显示面包屑" prop="showInBread">
            <el-switch id="showInBread" v-model="showInBread" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-form-item label="缓存页面" prop="isCache">
            <el-switch id="cache" v-model="isCache" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="图标">
        <el-input v-model="icon" placeholder="请输入图标名称" />
      </el-form-item>
      <el-form-item label="重定向">
        <el-input v-model="redirect" placeholder="请输入重定向地址" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">
          提交
        </el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { reactive, ref, Ref, toRefs, PropType, watch } from 'vue'
import { MenuForm, MenuTreeData, OperateType } from './interface'

export default {
  name: 'MenuOptions',
  props: {
    enable: {
      type: Boolean,
      required: true,
      default: false
    },
    curNodeName: {
      type: String,
      required: true,
      default: ''
    },
    formValue: {
      type: Object as PropType<MenuTreeData>,
      required: true
    },
    curOperateType: {
      type: String as PropType<OperateType>,
      required: true
    },
    menuTree: {
      type: Array as PropType<MenuTreeData[]>,
      default: () => [],
      required: true
    }
  },
  setup(props, { emit }) {
    const { formValue, curNodeName, curOperateType, menuTree } = toRefs(props)
    const menuFormEl: Ref = ref(null)
    const menuForm: MenuForm = reactive({
      title: '',
      name: '',
      path: '',
      component: '',
      showInBread: true,
      showInMenu: true,
      isCache: true,
      icon: '',
      sort: 200,
      redirect: '',
      type: 'menu',
      activeMenu: '',
      children: [],
      operations: []
    })

    //补全组件名称
    function completeComponentName(name: string): string {
      return `()=>import('@/views/${name}.vue')`
    }

    //拆分组件名称
    function splitComponentName(name: string): string {
      const reg = /^\(\)=>import\('@\/views\/(.*)\.vue'\)$/
      reg.test(name)
      return RegExp.$1
    }

    function setFormDataFromEdit() {
      for (const key in formValue.value) {
        if (key !== 'label') {
          if (key === 'component') {
            menuForm[key] = splitComponentName(formValue.value[key])
          } else {
            menuForm[key] = formValue.value[key]
          }
        }
      }
    }

    //改变选中的节点
    watch(curNodeName, () => {
      setFormDataFromEdit()
    })
    //校验是否重复
    function validateMenuNameRepeat(
      parentMenu: MenuTreeData[],
      name: string
    ): boolean {
      let isRepeat = false
      return (function validateName(parentMenu) {
        for (let i = 0; i < parentMenu.length; i++) {
          if (parentMenu[i].name === name) {
            isRepeat = true
            break
          } else {
            if (parentMenu[i].children && parentMenu[i].children.length !== 0) {
              validateName(parentMenu[i].children)
            }
          }
        }
        return isRepeat
      })(parentMenu)
    }
    function validateMenuName(rule: any, value: string, callback: Function) {
      const reg = /[A-Za-z]+/
      if (!reg.test(value)) {
        return callback(new Error('只接受字母'))
      }
      if (
        curOperateType.value !== 'editNode' &&
        validateMenuNameRepeat(menuTree.value, value)
      ) {
        return callback(new Error('name字段必须唯一'))
      }
      callback()
    }
    const rules = {
      title: [{ required: true, message: '请输入菜单标题', trigger: 'blur' }],
      name: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { validator: validateMenuName, trigger: 'blur' }
      ],
      path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
      type: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
      sort: [{ required: true, message: '请输入排序权重', trigger: 'blur' }],
      component: [{ required: true, message: '请输入组件', trigger: 'blur' }]
    }

    function submitForm(): void {
      menuFormEl.value.validate(valid => {
        if (!valid) {
          return
        }
        const component = completeComponentName(menuForm.component)
        emit('submitMenuForm', { ...menuForm, component })
      })
    }

    function resetForm(): void {
      setTimeout(() => {
        if (curOperateType.value !== 'editNode') {
          menuFormEl.value.resetFields()
        } else {
          setFormDataFromEdit()
        }
      }, 200)
    }

    return {
      rules,
      menuForm,
      menuFormEl,
      submitForm,
      resetForm,
      ...toRefs(menuForm)
    }
  }
}
</script>

<style scoped lang="stylus"></style>
