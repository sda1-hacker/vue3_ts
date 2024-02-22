<template>
  <div class = "app">
    <h2 class="title">Vue3路由</h2>

    <!-- 导航区域 -->
    <div class="navigate">
      <ul>
        <li><RouterLink to="/props" active-class="active">1.props</RouterLink></li>
        <li><RouterLink to="/event" active-class="active">2.自定义事件</RouterLink></li>
        <li><RouterLink to="/mitt" active-class="active">3.mitt</RouterLink></li>
        <li><RouterLink to="/vmodel" active-class="active">4.v-model</RouterLink></li>
        <li><RouterLink to="/attrs" active-class="active">5.$attrs</RouterLink></li>
        <li><RouterLink to="/refsAndParent" active-class="active">6.$refs/$parent</RouterLink></li>
        <li><RouterLink to="/provideAndInject" active-class="active">7.provide/inject</RouterLink></li>
        <li><RouterLink to="/pinia" active-class="active">8.pinia</RouterLink></li>
        <li><RouterLink to="/solt" active-class="active">9.slot</RouterLink></li>
      </ul>
    </div>

    <!-- 内容区域 -->
    <div class="main-content">
      <RouterView></RouterView>
    </div>

  </div>
</template>

<script setup lang="ts" name = "app">
  // 通过routerView这个组件，将路由对应的组件放在这里
  // RouterLink 类似于 a标签
  import {RouterView, RouterLink} from 'vue-router' 

</script>

<style scoped>
  .title {
    text-align: center;
    word-spacing: 5px;
    margin: 30px 0;
    height: 70px;
    line-height: 70px;
    background-image: linear-gradient(45deg, gray, white);
    border-radius: 10px;
    box-shadow: 0 0 2px;
    font-size: 30px;
  }

  .navigate {
    display: flex;
    justify-content: space-around;
    margin: 0 100px;
  }

  .navigate a {
    display: block;
    text-align: center;
    width: 260px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    letter-spacing: 5px;
  }

  .navigate a.active {
    background-color: #64967E;
    color: #ffc268;
    font-weight: 900;
    text-shadow: 0 0 1px black;
    font-family: 微软雅黑;
  }

  .main-content {
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    border: 1px solid;
  }
</style>
