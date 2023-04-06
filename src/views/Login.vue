<template>
    <div class="login" style="width:100%; height:100%;">
        <h3> login </h3>
        <div>
            账号：<el-input v-model="account" placeholder="请输入管理员账号"  clearable></el-input>
            密码：<el-input v-model="pass" placeholder="请输入管理员密码"  clearable show-password></el-input>
            <el-button @click="run()"> Login </el-button>
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
        user:[],
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

              if(this.account == response.data.account&&this.pass == response.data.pass){

              this.$router.push('/home');
              this.$message({
                  message: '登录成功',
                  type: 'success'
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
        //  // 加载动画
        // openFullScreen2() {
        //   const loading = this.$loading({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        //   });
        //   setTimeout(() => {
        //     loading.close();
        //   }, 400);
        // },
    },

}

</script>