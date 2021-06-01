<template>
  <div id="app">
    <router-view class="router-vew"/>
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>
<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.router-view{
  flex: 1;
}
</style>
