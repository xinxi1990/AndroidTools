<template>
    <div>
        <p>实时屏幕:
             <a href="http://localhost:9002">跳转屏幕展示</a>
            <!--<span @click="openUrl">http://www.yunlauncher.com</span>-->
        </p>
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
                imagePath: ''
            }
        },
        mounted() {
            this.getScreenShow()
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
                // this.imagePath = 'data:image/png;base64,' + window.btoa(window.encodeURIComponent(data))
                // console.log(this.imagePath)
                // var staticPath = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
                // console.log(staticPath)
                // let imgUrl = 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(stdout)))
                // console.log(imgUrl)
                })
            },
        }
    }
</script>

<style scoped>

</style>