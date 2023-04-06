<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->


    
    <div class="loader"></div>
    <nav>

    <!-- <router-link to="/home">首页</router-link> | -->
    <router-link to="/teacher">讲师</router-link> |
    <router-link to="/exercise">练习题</router-link>|
    <router-link to="/user">用户</router-link>|
    <router-link to="/information">招考信息</router-link>|
    <router-link to="/mycourse">我的课程</router-link>|
    <router-link to="/course">课程</router-link>
    </nav>


    <br/> <br/>

    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>


<style>
.loader{
    width: 48px;
    height: 48px;
    margin: auto;
    position: relative;
}

.loader::before{
    content: '';
    width: 48px;
    height: 5px;
    background-color: #f0808050;
    position:absolute;
    top: 60px;
    left: 0%;
    border-radius: 50%;
    animation: shadow01 0.5s linear infinite;
}

.loader::after{
    content: '';
    width: 100%;
    height: 100%;
    background-color: #f08080;
    position: absolute;
    top: 0;
    left:0%;
    border-radius: 4px;
    animation: jump01 0.5s linear infinite;
}

@keyframes jump01{
    15%{
        border-bottom-right-radius: 3px;
    }
    25%{
        transform: translateY(9px) rotate(22.5deg);
    }
    50%{
        transform: translateY(18px) scale(1,0.9) rotate(45deg);
        border-bottom-right-radius: 40px;
    }
    75%{
        transform: translateY(9px) rotate(67.5deg);
    }
    100%{
        transform: translateY(0) rotate(90deg);
    }
}

@keyframes shadow01 {
    0%,
    100% {
            transform: scale(1, 1);
    }
    50% {
        transform: scale(1.2, 1.2);
    }
}
</style>
