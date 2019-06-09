<template>
  <div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
          <Button type="primary" @click="goHomePage()">返回</Button>
      </div>
      <div style="margin-bottom: 20px;margin-left: 20px;">
          <Select v-model="selectBody.loglevel" style="width:200px" placeholder="下拉筛选">
            <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
      </div>
      <div style="margin-bottom: 20px;margin-left: 20px;">
          <Button type="primary"  @click="timerLogCat()">打印日志</Button>
          <!--<Button type="primary"  @click="refreshLogCat()">刷新日志</Button>-->
          <Button type="primary"  @click="stopLogCat()">停止打印</Button>
      </div>
      <div style="padding-top: 20px">
          <Card style="width:800px">
              <textarea rows="20" cols="50" id="myTextArea" disabled="true"></textarea>
          </Card>
     </div>
  </div>
</template>

<script>
    const { exec } = require('child_process');
    export default {
        name: "logpage",
        data(){
           return {
               message: "未查询到日志",
               page_load: false,
               levelList: [
                    {
                        value: 'Verbose',
                        label: 'Verbose'
                    },
                    {
                        value: 'Debug',
                        label: 'Debug'
                    },
                    {
                        value: 'Info',
                        label: 'Info'
                    },
                    {
                        value: 'Warn',
                        label: 'Warn'
                    },
                    {
                        value: 'Error',
                        label: 'Error'
                    },
                    {
                        value: 'Assert',
                        label: 'Assert'
                    }
                ],
                logcmd: '',
                logTag: '',
                loglevel: '',
                selectBody: {
                  loglevel: 'Error'
                },
           }
        },
        mounted() {
        },
        beforeDestroy () {
                clearInterval(this.intervalId)
        },
        methods: {
            goHomePage() {
                this.$router.back('/');
            },
            printLogCat(){
               this.loglevel = this.selectBody.loglevel
               if (this.loglevel == "Verbose" ){
                  this.logTag = "*:V"
               }
               else if (this.loglevel == "Debug" ){
                   this.logTag = "*:D "
               }
               else if (this.loglevel == "Info" ){
                   this.logTag = "*:I"
               }
               else if (this.loglevel == "Warn" ){
                   this.logTag = "*:W"
               }
               else if (this.loglevel == "Error" ){
                   this.logTag = "*:E"
               }
               else if (this.loglevel == "Assert" ){
                   this.logTag = "*:A"
               }

               this.logcmd = 'adb logcat ' + this.logTag + ' -d'
               console.log(this.logcmd);
               exec(this.logcmd, {
                        encoding: 'utf8',
                        timeout: 0,
                        maxBuffer: 10 * 1024, // 默认 200 * 1024
                        killSignal: 'SIGTERM'
                    }, function(err, stdout, stderr) {
                        document.getElementById('myTextArea').innerHTML = stdout;
                        // setTimeout(function() {
                        //     document.getElementById('myTextArea').innerHTML = stdout;
                        //     }, 300);

               });
            },
            clearLogCat(){
                exec('clear', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                 })
            },
            refreshLogCat(){
                this.clearLogCat()
                this.printLogCat()
            },
            timerLogCat(){
                this.intervalId = setInterval(() => {
                     this.clearLogCat()
                     this.printLogCat()
                }, 1000)
            },
            stopLogCat(){
                clearInterval(this.intervalId)
            }
         }
    }
</script>

<style scoped>

</style>