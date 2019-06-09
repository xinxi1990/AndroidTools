<template>
   <div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary"  @click="goDevicesPage()">设备连接</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary"  @click="goScreenShowPage()">设备同屏</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary"  @click="goLogPage()">LOG日志</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary"  @click="goScreenShotPage()">屏幕截图</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary" >视频录制</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary"  @click="goDataPage()">性能数据</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary" >Monkey测试</Button>
      </div>
   </div>
</template>

<script>
     export default {
        data () {
            return {
                theme3: 'light'
            }
        },
        methods: {
            goDevicesPage() {
                this.$router.push('/devices');
            },
            goLogPage() {
                this.$router.push('/log');
            },
            goScreenShotPage() {
                this.$router.push('/screen');
            },
            goDataPage() {
                this.$router.push('/data');
            },
            goScreenShowPage() {
                this.$router.push('/show');
            },
         }
    }
</script>

<style scoped>
</style>