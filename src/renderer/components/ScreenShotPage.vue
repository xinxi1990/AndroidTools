<template>
    <div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
        <Button type="primary" @click="goHomePage()">返回</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
         <Button type="primary" @click="getScreenShot()">截图</Button>
      </div>
   </div>
</template>

<script>
    const { exec } = require('child_process');
    var path = require('path');
    var fs = require("fs")
    export default {
        name: "screen-shot-page",
        data () {
            return {
                savePath: '',
                saveCMD: '',
                image_url: '/Users/xinxi/Desktop/electron-vue/my-project/screen.png',
            }
        },
        mounted() {
        },
        methods: {
              goHomePage() {
                    this.$router.back('/');
                },
              getScreenShot(){
                exec('adb shell screencap /sdcard/screen.png', (err, stdout, stderr) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                })

                this.saveCMD = 'adb pull /sdcard/screen.png ' + this.savePath
                console.log(this.saveCMD);
                exec(this.saveCMD, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                })
                this.image_url =  this.savePath + '/screen.png'
            }

        }

    }
</script>

<style scoped>

</style>