<template>
   <div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary"  @click="goDevicesPage()">设备连接</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary"  @click="goLogPage()">LOG日志</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary" >屏幕截图</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary" >视频录制</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary" >性能数据</Button>
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
         }
    }
</script>

<style scoped>
</style>