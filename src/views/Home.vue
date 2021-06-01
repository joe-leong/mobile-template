<template>
    <div>
        <van-button @click="lo">成功</van-button>
        <div class="line"></div>
    </div>
</template>

<script>
export default {
  created () {
    this.$execApi({
      name: 'app.areaDict',
      data: {
        type: 1
      }
    }).then(res => {
      console.log(res)
    })
  },
  methods: {
    lo () {
      this.$toast.success('代码是写给人看的')
    }
  }
}
</script>

<style lang="scss" scoped>
.line{
    height: 1px;
    background-color: $themeColor;
}
</style>
