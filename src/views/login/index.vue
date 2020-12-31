<template>
  <div class="login-container">
    <div class="form-wrap">
      <h1 class="login-title">TS-ADMIN管理系统</h1>
      <el-form
        :model="userForm"
        status-icon
        :rules="rules"
        ref="userFormEl"
        class="demo-userForm"
      >
        <el-form-item prop="username">
          <el-input
            type="email"
            v-model="username"
            autocomplete="off"
            placeholder="请输入邮箱"
            class="login-input"
          >
            <template #prefix>
              <svg-icon icon-class="user" class-name="login-icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="password"
            autocomplete="off"
            class="login-input"
          >
            <template #prefix>
              <svg-icon icon-class="lock" class-name="login-icon" />
            </template>
          </el-input>
        </el-form-item>

        <div class="captcha-item">
          <el-form-item prop="code">
            <el-input
              type="text"
              v-model="code"
              placeholder="请输入验证码"
              autocomplete="off"
              class="login-input"
            >
              <template #prefix>
                <svg-icon icon-class="validation" class-name="login-icon" />
              </template>
            </el-input>
          </el-form-item>
          <div class="svg-captcha">
          </div>
        </div>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm('userForm')"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { UserLoginForm } from './interface'
import { onMounted, reactive, Ref, ref, toRefs } from 'vue'

export default {
  setup(props, context) {
    const userForm: UserLoginForm = reactive({
      username: '',
      password: '',
      code: '',
      side: ''
    })
    const userFormEl: Ref = ref(null)
    const validationCode = '1234'
    const validateCode: Function = (
      rule: any,
      value: string,
      callback: Function
    ): void => {
      if (value !== validationCode) {
        return callback(new Error('验证码错误'))
      }
      callback()
    }
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
          type: 'email',
          message: '请输入正确格式的邮箱',
          trigger: 'blur'
        }
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      code: [
        {
          required: true,
          min: 4,
          max: 4,
          message: '请输入4位数的验证码',
          trigger: 'blur'
        },
        {
          validator: validateCode,
          trigger: 'blur'
        }
      ]
    }

    function submitForm(formName: string): void {
      userFormEl.value.validate(valid => {
        if (!valid) {
          return
        }
      })
    }
    return {
      rules,
      userForm,
      submitForm,
      userFormEl,
      ...toRefs(userForm)
    }
  }
}
</script>
<style scoped lang="stylus">
.login-container
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  padding: 20px
  box-sizing: border-box
  .form-wrap
    max-width: 360px
    width: 100%
    .login-title
      margin-bottom: 20px
      text-align: center
      font-weight: 600
      font-size: 22px
  .login-icon
    vertical-align: middle
    width: 16px
    height: 16px
    margin-top: -2px
    color: #889aa4
  .login-btn
    width: 100%
    text-align: center
/deep/.login-input
  .el-input__inner
    background: transparent

.captcha-item
  display: flex 
  .svg-captcha
    flex: none
    width: 150px
    overflow: hidden
    box-sizing: border-box
    margin-left: 8px
    display: inline-block
    padding: 0
    height: 40px
    vertical-align: middle
    border: 1px solid #ededed
    border-radius: 3px
    cursor: pointer
    background: #fafafa
</style>
