<template>
  <div class="login-container" :style="bg">
    <div class="form-wrap">
      <h1 class="login-title">TS-ADMIN管理系统</h1>
      <el-form
        :model="userForm"
        status-icon
        :rules="rules"
        ref="userFormEl"
        class="demo-userForm"
      >
        <el-form-item prop="userId" :error="userIdErrMsg">
          <el-input
            type="email"
            v-model="userId"
            autocomplete="off"
            placeholder="请输入邮箱"
            class="login-input"
          >
            <template #prefix>
              <svg-icon icon-class="user" class-name="login-icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd" :error="pwdErrMsg">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="pwd"
            autocomplete="off"
            class="login-input"
          >
            <template #prefix>
              <svg-icon icon-class="lock" class-name="login-icon" />
            </template>
          </el-input>
        </el-form-item>

        <div class="captcha-item">
          <el-form-item prop="captcha" :error="captchaErrMsg">
            <el-input
              type="text"
              v-model="captcha"
              placeholder="请输入验证码"
              autocomplete="off"
              class="login-input"
            >
              <template #prefix>
                <svg-icon icon-class="validation" class-name="login-icon" />
              </template>
            </el-input>
          </el-form-item>
          <div
            class="svg-captcha"
            v-html="captchaSvg"
            @click="getCaptcha"
          ></div>
        </div>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm('userForm')"
            :loading="loading"
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
import { computed, onBeforeMount, reactive, Ref, ref, toRefs } from 'vue'
import { getCaptcha } from '@/api/user'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const store = useStore()
    const bgStyl = {
      background: `url(${require('@/assets/images/bg.jpg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
    const userForm: UserLoginForm = reactive({
      userId: '',
      pwd: '',
      captcha: ''
    })
    const userFormEl: Ref = ref(null)
    let captchaCode = ''
    const sid = computed(() => store.state.user.sid)

    const captchaSvg = ref('')
    const validateCode: Function = (
      rule: any,
      value: string,
      callback: Function
    ): void => {
      if (value.toLowerCase() !== captchaCode.toLowerCase()) {
        return callback(new Error('验证码错误'))
      }
      callback()
    }
    const errMsgObj = {
      pwdErrMsg: ref(''),
      userIdErrMsg: ref(''),
      captchaErrMsg: ref('')
    }
    const rules = {
      userId: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
          type: 'email',
          message: '请输入正确格式的邮箱',
          trigger: 'blur'
        }
      ],
      pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      captcha: [
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

    async function login(data: UserLoginForm) {
      try {
        loading.value = true
        await store.dispatch('user/login', data)
        await store.dispatch('user/getInfo')
        //添加功能，此处跳转到原来的页面
        router.push('/dashboard')
      } catch (error) {
        //do nothing
        console.log(error)
        if (error.code === 422) {
          const errList = error.data
          for (const errObj of errList) {
            const key = Object.keys(errObj)[0]
            errMsgObj[`${key}ErrMsg`].value = errObj[key]
          }
        }
      } finally {
        loading.value = false
      }
    }

    async function _getCaptcha() {
      try {
        // debugger
        const { data } = await getCaptcha(sid.value)
        captchaSvg.value = data.captcha
        captchaCode = data.text
      } catch (error) {
        //do nothing
      }
    }

    onBeforeMount(() => {
      _getCaptcha()
    })

    function submitForm(): void {
      userForm.sid = sid.value
      console.log(userForm)
      userFormEl.value.validate(valid => {
        if (!valid) {
          return
        } else {
          userForm.sid
          login(userForm)
        }
      })
    }
    return {
      rules,
      captchaSvg,
      userForm,
      submitForm,
      userFormEl,
      bg: bgStyl,
      getCaptcha: _getCaptcha,
      loading,
      ...toRefs(userForm),
      ...errMsgObj
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
  background-image: url('')
  .form-wrap
    margin-top: -20px
    max-width: 360px
    width: 100%
    padding: 40px 30px 20px
    border-radius: 5px
    background: rgba(0, 0, 0, 0.5)
    border: 1px solid #555
    .login-title
      margin-bottom: 30px
      text-align: center
      font-weight: 600
      font-size: 22px
      color: #fafafa
  .login-icon
    vertical-align: middle
    width: 16px
    height: 16px
    margin-top: -2px
    color: #ccc
  .login-btn
    width: 100%
    text-align: center
/deep/.login-input
  .el-input__inner
    background: transparent
    color: #fafafa

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
    background: rgba(255, 255, 255, 0.5)
</style>
