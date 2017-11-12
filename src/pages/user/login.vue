<template>
  <div class="login-body">
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submit_form">
      <div class="login-title">
        <img src="./images/login_logo.png"/>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="username" class="login-item">
            <el-input v-model="form.username" placeholder="请输入账户名：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  // import { user_api } from '@/api';
  import {SET_TOKEN,SET_USER_INFO} from '@/store/actions/type'

  export default{
    data(){
      return {
        form: {
          username: null,
          password: null
        },
        rules: {
          username: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
          password: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
        },
        //请求时的loading效果
        load_data: false
      }
    },
    methods: {
      ...mapActions({
        set_token: SET_TOKEN,
        set_user_info:SET_USER_INFO
      }),
      //提交
      submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.load_data = true
         //  console.log(this.form);
         let login_para = this.form
         login_para.grant_type = "password";
             this.$fetch.api_user.Login(login_para).then((res) => {
              console.log("login resolved");
              this.logining = false;
              //NProgress.done();
             // let { msg, code, user } = data;

                this.set_token({
                token: res.access_token
              })
               this.$message.success("登录成功")
               //拉取User信息
                this.$fetch.api_user.GetUserInfo().then(res=>{
                    this.set_user_info({
                      user:res
                    })
                }
                );
               setTimeout(this.$router.push({path: '/'}), 500)
              
            }).catch((error)=>{
               console.log('login.vue error');
              this.load_data = false;
              let errorData = error.response;
              this.$message.error("登录失败");              
              //this.$message.error(errorData.data.error_description);
            });
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .login-body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(./images/login_bg.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .loginWarp {
      width: 300px;
      padding: 25px 15px;
      margin: 100px auto;
      background-color: #fff;
      border-radius: 5px;
      .login-title {
        margin-bottom: 25px;
        text-align: center;
      }
      .login-item {
        .el-input__inner {
          margin: 0 !important;
        }
      }
      .form-input {
        input {
          margin-bottom: 15px;
          font-size: 12px;
          height: 40px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 5px;
          color: #555;
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        border-color: #6bc5a4;
        background: #6bc5a4;
        &:active, &:hover {
          border-color: #6bc5a4;
          background: #6bc5a4;
        }
      }
    }
  }
</style>
