<template>
  <section>
    <div class="color" />
    <div class="color" />
    <div class="color" />
    <div class="box">
      <div class="square" style="--i: 0" />
      <div class="square" style="--i: 1" />
      <div class="square" style="--i: 2" />
      <div class="square" style="--i: 3" />
      <div class="square" style="--i: 4" />
      <div class="container">
        <div class="form">
          <h2>密码修改</h2>
          <div class="inputBox">
            <input v-model="pwd" type="password" placeholder="请输入密码">
          </div>
          <div class="inputBox">
            <input v-model="rePwd" type="password" placeholder="请再次确认密码">
            <span :style="{color: !misTake ? 'transparent' : ''}" class="error-tip">两次密码输入不一致，请重新输入</span>
          </div>
          <div class="inputBox">
            <el-button
              type="primary"
              round
              @click="onConfirm"
            >确认</el-button>
          </div>
          <!-- <p class="forget">Forget Password ? <a href="#">Click Here</a></p>
          <p class="forget">Don't have an account ? <a href="#">Sign up</a></p> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getUserInfo } from '@/api/postmanagement'
import { streetedit } from '@/api/set/street'
export default {
  name: 'ChangePwd',
  data() {
    return {
      pwd: '',
      rePwd: '',
      userInfo: {}
    }
  },
  computed: {
    misTake() {
      if (this.pwd.length > 0 && this.rePwd.length > 0) {
        return this.pwd !== this.rePwd
      } else {
        return false
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      getUserInfo().then(res => {
        this.userInfo.id = res.data.id
        this.userInfo.street = res.data.street
        this.userInfo.user_name = res.data.username
      })
    },
    onConfirm() {
      if (this.pwd.length && this.pwd === this.rePwd) {
        this.userInfo.password = this.rePwd
        streetedit(this.userInfo).then(res => {
          this.$message({
            type: 'success',
            message: '登录密码修改成功',
            duration: 5000
          })
          this.$router.push('/dashboard')
        })
      } else {
        this.$message({
          type: 'error',
          message: '请输入要修改的密码',
          duration: 5000
        })
      }
    }
  }
}
</script>

<style scoped>
    section {
        display: flex;
        justify-content: center;
        align-items: center;
            height: calc(100vh - 50px);
        background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
    }

    section .color {
      position: absolute;
      filter: blur(150px);
    }

    section .color:nth-child(1) {
      top: -350px;
      width: 600px;
      height: 600px;
      background: #0757cf;
    }

    section .color:nth-child(2) {
      bottom: -150px;
      left: 100px;
      width: 500px;
      height: 500px;
      background: #fffd87;
    }

    section .color:nth-child(3) {
      bottom: 50px;
      right: 100px;
      width: 300px;
      height: 300px;
      background: #00d2ff;
    }
    .box {
      display: block;
      position: relative;
    }
    .box .square {
      position: absolute;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgba(0,0,0,.1);
      border: 1px solid rgba(255,255,255,.5);
      border-right: 1px solid rgba(255,255,255,.2);
      border-bottom: 1px solid rgba(255,255,255,.2);
      background: rgba(255,255,255.0.1);
      border-radius: 10px;
      animation: animate 10s linear infinite;
      animation-delay: calc(-1s * var(--i));
    }
    @keyframes animate {
      0%, 100% {
        transform: translateY(-40px);
      }
      50% {
        transform: translateY(40px);
      }
    }
    .box .square:nth-child(1) {
      top: -50px;
      right: -60px;
      width: 100px;
      height: 100px;
    }

    .box .square:nth-child(2) {
      top: 150px;
      left: -100px;
      width: 120px;
      height: 120px;
      z-index: 2;
    }
    .box .square:nth-child(3) {
      bottom: 50px;
      right: -60px;
      width: 80px;
      height: 80px;
      z-index: 2;
    }
    .box .square:nth-child(4) {
      bottom: -80px;
      left: 100px;
      width: 50px;
      height: 50px;
    }
    .box .square:nth-child(5) {
      top: -80px;
      left: 140px;
      width: 60px;
      height: 60px;
    }
    .container {
      position: relative;
      width: 400px;
      min-height: 400px;
      background: rgba(255,255,255, .1);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgba(0,0,0,.1);
      border: 1px solid rgba(255,255,255,.5);
      border-right: 1px solid rgba(255,255,255,.2);
      border-bottom: 1px solid rgba(255,255,255,.2);
    }
    .form {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 40px;
    }
    .form h2 {
      position: relative;
      color: #fff;
      font-size: 24px;
      letter-spacing: 1px;
      margin-bottom: 40px;
    }
    .form h2::before {
      position: absolute;
      content: '';
      left: 0;
      bottom: -10px;
      width: 80px;
      height: 4px;
      background: #fff;
    }
    .form .inputBox {
      width: 100%;
      margin-top: 20px;
    }

    .form .inputBox input {
      width: 100%;
      background: rgba(255,255,255);
      outline: none;
      padding: 10px 20px;
      border-radius: 35px;
      border: 1px solid rgba(255,255,255,.5);
      border-right: 1px solid rgba(255,255,255,.2);
      border-bottom: 1px solid rgba(255,255,255,.2);
      font-size: 16px;
      letter-spacing: 1px;
      color: #222;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }
    .form .inputBox input::placeholder {
      color: #555;
    }
    .form .inputBox input[type='submit'] {
      background: #fff;
      color: #666;
      max-width: 100px;
      cursor: pointer;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .forget {
      margin-top: 5px;
      color: #fff;
    }
    .forget a {
      color: #fff;
      font-weight: 600;
    }
    .error-tip {
          font-size: 14px;
    margin: 6px 20px;
    display: block;
    color: #c3130a;
}
</style>
