<template>
    <div class="login">
        <h3> login </h3>
        <el-button @click="run()"> </el-button>
    </div>
</template>

<script>
export default {
    name:'loginView',
    methods: {
        run(){
            this.$router.push('/home') 
        },
         // 加载动画
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 400);
      },
    },

}

</script>