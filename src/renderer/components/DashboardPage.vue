<template>
    <div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
            <div style="float:left;width:50%;">
                <h2>实时屏幕</h2>
                <br>
                <iframe :key="this.url1" v-once :src="this.url1" frameborder="0" style="width:400px;height:700px"></iframe>
            </div>
            <div style="float:left;width:50%;">
                  <h2>LOG日志</h2>
                  <br>
                  <div>
                      <Select v-model="selectBody.loglevel" style="width:200px" placeholder="下拉筛选">
                        <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                      <Button type="primary"  @click="timerLogCat()">打印日志</Button>
                      <Button type="primary"  @click="stopLogCat()">停止打印</Button>
                  </div>
                  <div style="padding-top: 20px;height: 600px">
                      <textarea rows="20" cols="70" id="LogArea" disabled="true"></textarea>
                  </div>
            </div>
            <div style="clear:both" align="center"></div>
        </div>
            <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
            <h2>Monkey测试</h2>
            <br>
            <!-- <div style="margin-bottom: 20px;">
                <Tag>运行时间</Tag>
                <Select v-model="runTime" style="width:200px">
                    <Option v-for="item in runTimeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>   -->
            <div style="margin-bottom: 20px;margin-top:20px">
                <Tag>事件间隔</Tag>
                <Select v-model="throttleTime" style="width:200px">
                    <Option v-for="item in throttleTimeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>      
            <div style="margin-bottom: 20px;margin-top:20px">
                <Tag>事件数量</Tag>
                <Input v-model="eventCount" placeholder="请输入事件数量" style="width: 200px" />
            </div>    
            <div style="margin-bottom: 20px;margin-top:20px">
                <Tag>APP包名</Tag>
                <Select v-model="packageName" style="width:200px">
                    <Option v-for="item in appList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>     
            <div style="margin-bottom: 20px;margin-top:20px">
                <Button type="primary" @click="setMonkyeCMD()">生成命令</Button>
                <Input v-model="cmdstr" placeholder="生成命令" style="width: 300px;margin-left:10px" />
            </div> 
            <div style="margin-bottom: 20px;margin-top:20px">    
                <Modal
                    v-model="modal1"
                    title="最终运行命令"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <p>{{cmdstr}}</p>
                </Modal>
                <Button type="primary" @click="modal1 = true">准备测试</Button>
            </div> 
        </div>
        <div style="margin-bottom: 20px;margin-top: 40px;margin-left: 20px;">
              <Button type="primary" @click="timerMEM()">开始监控内存</Button>
        </div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
              <Button type="primary" @click="stopMEM()">停止监控内存</Button>
        </div>
        <div class="mem" style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
            <h2>内存占用率趋势图</h2>
            <div id="mem" style="min-width:400px;height:400px">
                <section class="chart-list">
                    <section class="charts">
                        <vue-highcharts :options="memareaOptions" ref="memareaCharts"></vue-highcharts>
                    </section>
                </section>
            </div>
        </div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
              <Button type="primary" @click="timerCPU()">开始监控CPU</Button>
        </div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
              <Button type="primary" @click="stopCPU()">停止监控CPU</Button>
        </div>
        <div class="cpu" style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
            <h2>CPU占用率趋势图</h2>
            <div id="cpu" style="min-width:400px;height:400px">
                <section class="chart-list">
                    <section class="charts">
                        <vue-highcharts :options="cpuareaOptions" ref="cpuareaCharts"></vue-highcharts>
                    </section>
                </section>
            </div>
        </div>

    </div>


</template>

<script>
    // 导入chart组件
    import VueHighcharts from 'vue2-highcharts'
    import Highcharts from 'highcharts'
    import * as dataChart from '../data/per_data'
    var dayjs = require('dayjs');
    const { exec } = require('child_process');
    var dayjs = require('dayjs');
    import { shell } from 'electron'
    export default {
        components: {
            VueHighcharts
        },
        name: "dashboardPage.vue-page",
        data () {
            return {
                cmdstr: "",
                modal1: false,
                imagePath: '',
                url1:'http://localhost:9002',
                Highcharts: Highcharts,
                memareaOptions: dataChart.MEMData,
                cpuareaOptions: dataChart.CPUData,
                memdataList:[],
                memtimeList:[],
                cpudataList:[],
                cputimeList:[],
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
                throttleTimeList: [
                    {
                        value: '100',
                        label: '100'
                    },
                    {
                        value: '300',
                        label: '300'
                    },
                    {
                        value: '500',
                        label: '500'
                    },
                    {
                        value: '700',
                        label: '700'
                    }
                    ,
                    {
                        value: '1000',
                        label: '1000'
                    }
                ],
                runTimeList: [
                    {
                        value: '5',
                        label: '5'
                    },
                    {
                        value: '10',
                        label: '10'
                    },
                    {
                        value: '15',
                        label: '15'
                    },
                    {
                        value: '20',
                        label: '20'
                    },
                    {
                        value: '25',
                        label: '25'
                    },
                    {
                        value: '30',
                        label: '30'
                    }
                ],
                runTime: '',
                throttleTime: '',
                eventCount:'',
                packageName:'',
                appList: []

            }
        },
        mounted() {
            // this.getScreenShow()
            this.url1 = 'http://localhost:9002'
            this.getAPPList()
        },
        beforeDestroy () {
            clearInterval(this.intervalId)
        },
        methods:{
            ok () {
                this.$Message.info('Clicked ok');
                this.runMonkey();
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            openUrl () {
              shell.openExternal('http://www.yunlauncher.com')
            },
            setMEMChart(searchDate) {
                var memareaCharts = this.$refs.memareaCharts.chart;
                memareaCharts.xAxis[0].setCategories(this.memtimeList);
                memareaCharts.series[0].setData(this.memdataList)
            },
            setCPUChart(searchDate) {
                var cpuareaCharts  = this.$refs.cpuareaCharts.chart;
                cpuareaCharts.xAxis[0].setCategories(this.cputimeList);
                cpuareaCharts.series[0].setData(this.cpudataList)
            },
            goHomePage() {
                this.$router.back('/');
            },
            getCurrentTime(){
                var myDate = new Date();
                var CurrentTime = dayjs(myDate).format('YYYY-MM-DD HH:mm:ss');
                return CurrentTime;
            },
            getCurrentMEM(){
                exec('echo `adb shell dumpsys meminfo com.luojilab.player | grep -e TOTAL | grep -v  "TOTAL SWAP PSS"` | awk -F \'[ ;]+\' \'{print $2}\'', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var memInt = parseInt(stdout);
                    var mem = memInt / 1024
                    this.memdataList.push(mem)
                    this.memtimeList.push(this.getCurrentTime())
                })
            },
            timerMEM(){
                this.intervalId = setInterval(() => {
                     this.getCurrentMEM()
                     this.setMEMChart()
                }, 500)
            },
            stopMEM(){
                clearInterval(this.intervalId)
            },
            getCurrentCPU(){
                exec('echo `adb shell dumpsys cpuinfo | grep com.luojilab.player` | awk -F \'[ ;]+\' \'{print $1}\' | awk -F \'%\' \'{print $1}\'', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var cpu = parseInt(stdout);
                    this.cpudataList.push(cpu)
                    this.cputimeList.push(this.getCurrentTime())
                })
            },
            timerCPU(){
                this.intervalId = setInterval(() => {
                     this.getCurrentCPU()
                     this.setCPUChart()
                }, 500)
            },
            stopCPU(){
                clearInterval(this.intervalId)
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
                        document.getElementById('LogArea').innerHTML = stdout;
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
            },
            runMonkey(){
                exec(this.cmdstr, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(stdout)
                })

            },
            stopMonkey(){

            },
            getAPPList(){
                console.log("getAPPList") 
                exec('echo `adb shell pm list packages -3`', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var appstr = stdout.split("package:")
                    // console.log(appstr)
                    for (let index = 0; index < appstr.length; index++) {
                        const element = appstr[index];
                        var appname = {value: element,label: element}
                        this.appList.push(appname)
                    }
                });
            },
            setMonkyeCMD(){
                var baseCMD = "adb shell monkey -p " + this.packageName + "--throttle " + this.throttleTime + " " + this.eventCount
                console.log(baseCMD)
                this.cmdstr = baseCMD
            }


        }
    }
</script>

<style scoped>

</style>