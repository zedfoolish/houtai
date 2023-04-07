<template>
  <div>
    <div class="login" style="width:100%; height:2000px;">
        <h3 class="loginTitle"> login </h3>
        <div class="loginForm">
            账号：<el-input v-model="account" placeholder="请输入管理员账号"  clearable class="input"></el-input>
            密码：<el-input v-model="pass" placeholder="请输入管理员密码"  clearable show-password class="input"></el-input>
            <!-- <el-button @click="run()"> Login </el-button> -->
            <el-button class="loginButton" type="primary" @click="run()">Login</el-button>
        </div>



   
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {

    data() {
      return {
        account:'',
        pass:'',
        user:{
          acc:'',
          pas:'',
        },
        te:false,


      }
    },
    methods: {
        run(){
          console.log(this.account)
          console.log(this.pass)
          

          axios
          .get("http://8.130.32.153:8090/admins/1")
          .then((response)=>{
              console.log(response)
              // console.log(response.data.account)
              // console.log(response.data.pass)
              this.user.acc = response.data.account
              this.user.pas = response.data.pass
              console.log("this.user=",this.user);
              localStorage.setItem("account",JSON.stringify(this.user.acc))
              localStorage.setItem("pass",JSON.stringify(this.user.pas))

              if(this.account == response.data.account&&this.pass == response.data.pass){

              this.$router.push('/teacher');
              this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration:2000
                });
              }else{
                // alert('error')
                this.$message({
                  message: '账号或密码错误哟',
                  type: 'error'
                });
              }

          })
          .catch((error)=>{
            console.log(error);
          })
    
        },

         // 监听回车键执行事件
        keyDown (e) {
          // 回车则执行登录方法 enter键的ASCII是13
          if (e.keyCode === 13) {
            this.run() // 需要执行的方法方法
          }
        },
 
    
    },
      // 绑定监听事件
      mounted () {
        window.addEventListener('keydown', this.keyDown)
      },
      // 销毁事件
      destroyed () {
        window.removeEventListener('keydown', this.keyDown, false)
      }

}

</script>

<style scoped>
.input {
margin: 5px 0 8px 0;

}

.login{
  background:url("../assets/圣米歇尔山 .jpg");
  width:100%;			
  height:100%;			
  position:fixed;
  background-size: auto;

}

.loginForm {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 120px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: white;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 0 auto 40px auto;
  text-align: center;
}
.Remember {
  text-align: left;
  margin: 0 0 15px 0;
}
.loginButton {
  width: 80%;
  margin-top: 10px;

}
</style>