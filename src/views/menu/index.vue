<template>
  <el-row :gutter="10" class="menu-wrapper px-10">
    <el-col :xs="24" :sm="9" :md="7">
      <el-card>
        <template #header>
          <div class="menu-head-wrap">
            <span>
              菜单列表
            </span>
            <div class="operate-wrap">
              <el-dropdown>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  class="no-right-border"
                >
                  <i class="el-icon-circle-plus-outline" />
                  <!-- <i class="el-icon-arrow-down el-icon--right" /> -->
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>添加兄弟菜单</el-dropdown-item>
                    <el-dropdown-item>添加子菜单</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button-group size="mini">
                <!-- <el-button type="primary" plain icon="el-icon-circle-plus-outline" size="mini"></el-button> -->
                <el-button
                  type="success"
                  icon="el-icon-edit"
                  size="mini"
                  plain
                  class="no-left-border"
                />
                <el-button
                  type="warning"
                  icon="el-icon-delete"
                  size="mini"
                  plain
                />
              </el-button-group>
            </div>
          </div>
        </template>

        <el-tree
          :data="data"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="15" :md="17">
      <el-card>
        <template #header>
          <p class="menu-title">菜单选项</p>
        </template>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="菜单标题" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入菜单标题" />
          </el-form-item>
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="只能为英文" />
          </el-form-item>
          <el-form-item label="路径" prop="name">
            <el-input v-model="ruleForm.name" placeholder="菜单路由" />
          </el-form-item>
          <el-form-item label="菜单类型" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择菜单类型">
              <el-option label="目录" value="shanghai"></el-option>
              <el-option label="资源" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组件" prop="name">
            <el-input v-model="ruleForm.name" placeholder="菜单路由" />
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="ruleForm.date2"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <template #header>
          <p class="menu-title">资源选项</p>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
// import {ref} from 'vue'
export default {
  data() {
    return {
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang="stylus">
.menu-wrapper
  margin-top: 20px
.menu-head-wrap
  justify-content: space-between
  display: flex
  align-items: center
.operate-wrap
  display: flex
  align-items: center
.no-right-border
  border-right: none
  border-bottom-right-radius: 0
  border-top-right-radius: 0
.no-left-border
  border-left: 1px solid #fff
  border-bottom-left-radius: 0
  border-top-left-radius: 0
.menu-title
  height: 28px
  line-height: 28px
</style>
