<template>
    <div id="container" >
        <h1>实时屏幕</h1>
             <!--<a href="http://localhost:9002">跳转屏幕展示</a>-->
         <iframe :key="this.url1" v-once :src="this.url1" frameborder="0" style="width:400px;height:700px"></iframe>
	</div>

</template>

<script>
    const { exec } = require('child_process');
    var dayjs = require('dayjs');
    import { shell } from 'electron'
    export default {
        name: "screen-show-page",
        data () {
            return {
                imagePath: '',
                url1:'http://localhost:9002'
            }
        },
        mounted() {
            // this.getScreenShow()
            this.url1 = 'http://localhost:9002'
        },
        methods:{
            openUrl () {
              shell.openExternal('http://www.yunlauncher.com')
            },
            getCurrentTime(){
                var myDate = new Date();
                var CurrentTime = dayjs(myDate).format('YYYYMMDDHHmmss');
                return CurrentTime;
            },
            getScreenShow(){
                var staticPath = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
                var saveImagePath = staticPath + '/' + this.getCurrentTime() + "_Android.png"
                console.log(saveImagePath)
                exec('adb shell LD_LIBRARY_PATH=/data/local/tmp /data/local/tmp/minicap -P 1080x1920@1080x1920/0 -s', (err, stdout, stderr) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                var data = `${stdout}`;
                var blob = new Blob([stdout], {type: "image/jpeg"});
                var imUrl = URL.createObjectURL(blob);
                this.imagePath = imUrl;
                console.log(this.imagePath)
                })
            },
        }
    }
</script>

<style scoped>

</style>