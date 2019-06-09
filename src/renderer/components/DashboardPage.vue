<template>
    <div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
            <div style="float:left;width:50%;">
                <h2>实时屏幕</h2>
                <br>
                <iframe :key="this.url1" v-once :src="this.url1" frameborder="0" style="width:400px;height:700px"></iframe>
            </div>
            <div style="float:left;width:50%;">
                <br>
                <Card style="width:500px">
                    <p slot="title">
                        设备信息
                    </p>
                    <div v-for="item in DeviceDetailList">
                        <p style="color:#FF0000">
                           {{ item.name }}
                        </p>
                    </div>
                </Card>
                <br>
                <Card style="width:500px">
                    <p slot="title">
                        设备快捷
                    </p>
                    <div style="margin-bottom: 20px;">
                        <Button class="audio" type="primary" @click="getScreentAudio()">视频截图</Button>
                    </div >    
                    <div style="margin-bottom: 20px;">
                        <Button class="audio" type="primary" @click="getScreentAudio()">视频录制</Button>
                    </div> 
                    <div style="margin-bottom: 20px;">
                        <Button class="audio" type="primary" @click="getAudioPlayer()">播放视频</Button>
                    </div>   
                </Card>
            </div>    
            <div style="clear:both" align="center"></div>  
        
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
            <h2>LOG日志</h2>
            <br>
            <div>
                <Tag>APP包名</Tag>
                <Select v-model="packageName" style="width:200px" filterable multiple>
                    <Option v-for="item in appList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>  
                <Tag>日志等级</Tag>
                <Select v-model="selectBody.loglevel" style="width:100px" placeholder="下拉筛选">
                <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button type="primary"  @click="timerLogCat()">打印日志</Button>
                <Button type="primary"  @click="stopLogCat()">停止打印</Button>
            </div>
            <div style="padding-top: 20px;">
                <textarea rows="20" cols="60" id="LogArea" disabled="true"></textarea>
            </div>  
        </div>    
        
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
                <Select v-model="packageName" style="width:200px" filterable multiple>
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
        <div style="margin-bottom: 20px;margin-top: 40px;margin-left: 20px;"  filterable multiple>
              <Tag>APP包名</Tag>
              <Select v-model="packageName" style="width:200px">
                    <Option v-for="item in appList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" @click="timerMEM()">开始监控内存</Button>
              <Button type="primary" @click="stopMEM()">停止监控内存</Button>
        </div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">    
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
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;"  filterable multiple>
              <Tag>APP包名</Tag>  
              <Select v-model="packageName" style="width:200px">
                    <Option v-for="item in appList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>  
              <Button type="primary" @click="timerCPU()">开始监控CPU</Button>
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
        <div style="margin-bottom: 20px;margin-top: 40px;margin-left: 20px;" filterable multiple>
              <h1 style="margin-bottom: 20px">请在手机中开启GPU渲染模式分析</h1> 
              <Tag>APP包名</Tag>
              <Select v-model="packageName" style="width:200px">
                    <Option v-for="item in appList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" @click="timerFPS()">开始监控FPS</Button>
              <Button type="primary" @click="stopFPS()">停止监控FPS</Button>
        </div>
        <div class="fps" style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">           
             <h2>FPS帧率趋势图</h2>
             <div id="fps" style="min-width:400px;height:400px" >
                <section class="chart-list">
                    <section class="charts">
                        <vue-highcharts :options="fpsareaOptions" ref="fpsareaCharts"></vue-highcharts>
                    </section>
                </section>
            </div> 
        </div> 
        <div>
            <Back-top :height="100" :bottom="200">
                <div class="top">返回顶端</div>
            </Back-top>
        </div>
        <div>
            <Modal
                v-model="modal1"
                title="视频录制完成"
                @on-ok="saveok"
                @on-cancel="savecancel">
                <p>视频录制完成,请输入保存视频路径</p>
                <Input v-model="saveAudioPath" placeholder="请输入保存视频路径" style="width: 300px" />
            </Modal>
        </div> 
        <div>
            <Modal
                v-model="modalplayer"
                title="视频录制播放"
                @on-ok="saveok"
                @on-cancel="savecancel">
                <p>视频录制完成,请输入保存视频路径</p>
                <Input v-model="saveAudioPath" placeholder="请输入保存视频路径" style="width: 300px;margin-bottom: 20px;" />
                <video-player  class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                ></video-player>
            </Modal>
        </div>             
    </div>


</template>

<script>

    require('video.js/dist/video-js.css')
    require('vue-video-player/src/custom-theme.css')
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
                playerOptions : {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                    type: "",
                    src: "http://static.smartisanos.cn/common/video/t1-ui.mp4" //url地址
                    }],
                    poster: "./android.png", //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                    }
                },
                saveAudioPath: "",
                cmdstr: "",
                modal1: false,
                modalplayer: false,
                imagePath: '',
                url1:'http://localhost:9002',
                Highcharts: Highcharts,
                memareaOptions: dataChart.MEMData,
                cpuareaOptions: dataChart.CPUData,
                fpsareaOptions: dataChart.FPSData,
                memdataList:[],
                memtimeList:[],
                cpudataList:[],
                cputimeList:[],
                fpsdataList:[],
                fpstimeList:[],
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
                appList: [],
                deviceBody:{
                    deviceName:'',
                    deviceType:'',
                    deviceSystem:'Android',
                    deviceType:'',
                    deviceSystem:'',
                    deviceVerion:'',
                    deviceStatus:'Online',
                    deviceDisplay:'',
                    deviceMemory:'',
                    deviceModel:'',
                    deviceBattery:'',
                    deviceIP:'',
                    deviceCPU:'',
                    deviceMEM:''
                },
                DeviceDetailList:[]
            }
        },
        beforeMount(){
          this.handleSpinShow()      
        },
        mounted() {
            this.handleSpinRemove()
            // this.getScreenShow()
            this.url1 = 'http://localhost:9002'
            this.getAPPList()
            this.getCurrentDeviceName()
            this.getCurrentDeviceVersion()
            this.getCurrentDeviceDisplay()
            this.getCurrentDeviceIP()
            this.getCurrentDeviceMEM()
            this.getCurrentDeviceCPU()
            this.getCurrentDeviceBattery()
            this.getCurrentDeviceModel()
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
            setFPSChart(searchDate) {
                var fpsareaCharts  = this.$refs.fpsareaCharts.chart;
                fpsareaCharts.xAxis[0].setCategories(this.fpstimeList);
                fpsareaCharts.series[0].setData(this.fpsdataList)
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

               //this.logcmd = 'adb logcat ' + this.logTag + ' -d'
               this.logcmd = 'adb logcat ' + this.logTag + ' | grep ' + this.packageName
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
            },
            timerFPS(){
                this.intervalId = setInterval(() => {
                     this.getCurrentFPS()
                     this.setFPSChart()
                }, 500)
            },
            stopFPS(){
                clearInterval(this.intervalId)
            },
            getCurrentFPS(){
                var cmd = 'adb shell dumpsys gfxinfo com.luojilab.player | grep -A 128 \'Execute\' | grep -v \'[a-z]\''
                // console.log(cmd)
                exec(cmd, (err, stdout, stderr) => {
                        if(err) {
                            console.log(err);
                            return;
                        }
                        var resultstr = stdout.replace(/\s+/g,"|");
                        var DrawList = []
                        var PrepareList = []
                        var ProcessList = []
                        var ExecuteList = []
                        var resultList = resultstr.split("|");
                        for (var i = resultList.length - 1; i >= 0; i=i-1) {
                            if (resultList[i] != ""){
                                // console.log("Draw:" + resultList[i])
                                var Draw = parseInt(resultList[i]);
                                DrawList.push(Draw)
                            }
                        }
                        for (var i = resultList.length - 1; i >= 0; i=i-2) {
                            if (resultList[i] != ""){
                                // console.log("Prepare:" + resultList[i])
                                var Prepare = parseInt(resultList[i]);
                                PrepareList.push(Prepare)
                            }
                        }
                        for (var i = resultList.length - 1; i >= 0; i=i-3) {
                            if (resultList[i] != ""){
                                // console.log("Process:" + resultList[i])
                                var Process = parseInt(resultList[i]);
                                ProcessList.push(Process)
                            }
                        }
                        for (var i = resultList.length - 1; i >= 0; i=i-3) {
                            if (resultList[i] != ""){
                                // console.log("Execute:" + resultList[i])
                                var Execute = parseInt(resultList[i]);
                                ExecuteList.push(Execute)
                            }
                        }
                        let json = {DrawList,PrepareList,ProcessList,ExecuteList} 
                        //json中有任意多个数组
                        //保存结果的数组
                        // let result = [];  
                        //遍历json
                        for(let key in json){
                            //遍历数组的每一项
                            json[key].forEach((value,index) => {
                                if( isBlank(this.fpsdataList[index]) ){
                                    this.fpsdataList[index] = 0 ;
                                }
                                this.fpsdataList[index] += value ;  
                                this.fpstimeList.push(this.getCurrentTime())      
                            })      
                        }
                        // console.log(result);
                        // this.fpsdataList = result
                    
                        //判断值是否存在函数
                        function isBlank(val){
                            if(val == null || val == ""){
                                return true;
                            }
                        }
                })
            },
            handleSpinShow () {
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'ios-loading',
                                        size: 18
                                    }
                                }),
                                h('div', 'Loading')
                            ])
                        }
                    });
                    setTimeout(() => {
                            this.$Spin.hide();
                        }, 3000);
            },
            handleSpinRemove () {
                this.$Spin.hide();
            },
            setLoading(){
                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'ios-loading',
                                    size: 18
                                }
                            }),
                            h('div', 'Loading')
                        ])
                    }
                });
                setTimeout(() => {
                        this.$Spin.hide();
                    }, 10000);
            },
            getCurrentDeviceName(){
                exec('adb devices', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    if (`${stdout}`.replace('List of devices attached','').indexOf('device') !=-1){
                        // console.log(`stdout: ${stdout}`);
                        // console.log(`stderr: ${stderr}`);
                        var deviceName;
                        var deviceNameList = stdout.replace('List of devices attached','').split('device')
                        for (deviceName in deviceNameList){
                            if (deviceNameList[deviceName] != "") {
                                console.log(deviceNameList[deviceName])
                                var name = {"name":"设备名称: " + deviceNameList[deviceName]}
                                this.DeviceDetailList.push(name)
                                break
                            }
                        }
                    }else {
                        this.devicesList = [{value:'未查询到设备',label:'未查询到设备'}]
                    }
                })
            },
            getCurrentDeviceVersion(){
                    exec('adb shell getprop ro.build.version.release', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var name = {"name":"设备系统版本: " + stdout}
                    this.DeviceDetailList.push(name)
                })
            },
            getCurrentDeviceDisplay(){
                    var cmd = "adb shell wm size | awk -F '[ ;]+' '{print $3}'"
                    exec(cmd, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var name = {"name":"设备分辨率: " + stdout}
                    this.DeviceDetailList.push(name)
                })
            },
            getCurrentDeviceBattery(){
                    var cmd = "adb shell dumpsys battery | grep 'level' | awk -F '[ ;]+' '{print $3}'"
                    exec(cmd, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var name = {"name":"设备电量: " + stdout}
                    this.DeviceDetailList.push(name)
                })
            },
            getCurrentDeviceIP(){
                    var cmd = "adb shell ifconfig wlan0 | grep 'inet addr:' | awk -F '[ ;]+' '{print $3}' | awk -F ':' '{print $2}'"
                    exec(cmd, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var name = {"name":"设备IP地址: " + stdout}
                    this.DeviceDetailList.push(name)
                })
            },
            getCurrentDeviceCPU(){
                    var cmd = "adb shell cat /proc/cpuinfo | grep 'Hardware' | awk -F ':' '{print $2}'"
                    exec(cmd, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var name = {"name":"设备系统CPU: " + stdout}
                    this.DeviceDetailList.push(name)
            })
            },
            getCurrentDeviceMEM(){
                    var cmd = "adb shell cat /proc/meminfo | grep 'MemTotal:' | awk -F ':' '{print $2}' | awk -F '[ ;]+' '{print $2}'"
                    exec(cmd, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var name = {"name":"设备系统内存: " + stdout}
                    this.DeviceDetailList.push(name) 
                })
            },
            getCurrentDeviceModel(){
                    var cmd = "adb shell getprop ro.product.model"
                    exec(cmd, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    var name = {"name":"设备系统型号: " + stdout}
                    this.DeviceDetailList.push(name)  
                })
            },
            getScreentAudio(){
                console.log("getScreentAudio");
                this.setLoading()
                var cmd = "adb shell screenrecord  --time-limit 10 /sdcard/demo.mp4"
                console.log(cmd);
                exec(cmd, (err, stdout, stderr) => {
                if(err) {
                    console.log(err);
                    return;
                }
                this.getAudioModel()
            })
            },
            getAudioModel(){
                 this.modal1 = true   
            },
            saveok () {
                this.saveScreentAudio()
                this.$Message.info('点击了确定');

            },
            savecancel () {
                this.$Message.info('点击了取消');
            },
            saveScreentAudio(){
                var cmd = "adb pull /sdcard/demo.mp4 " + this.saveAudioPath
                console.log(cmd);
                exec(cmd, (err, stdout, stderr) => {
                if(err) {
                    console.log(err);
                    return;
                }
             })
            },
            getAudioPlayer(){
                this.modalplayer = true 
            }
        }    
    }
</script>

<style scoped>

#LogArea{font-size:20px; color:#0000FF;}
h1{color:red;}
/* .audio{
        padding: 30px;
        background: rgba(229, 0, 191, 0.7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    } */
.top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
.customers
  {
  font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
  width:100%;
  border-collapse:collapse;
  text-align:center;
  }
.customers td, #customers th
  {
  font-size:1em;
  border:1px solid rgba(122, 122, 93, 0.34);
  padding:3px 7px 2px 7px;
  }

 .customers th
  {
  font-size:1.1em;
  padding-top:5px;
  padding-bottom:4px;
  background-color: rgba(109, 122, 88, 0.21);
  color: #000000;
  }

 .customers tr.alt td
  {
  color:#000000;
  background-color: rgba(0, 0, 0, 0.21);
  font-size: 1.1em;
  }
 .text-style {
   text-align: center;
   color: #000c17;
   font-size: 1.5em;
 }
 .device-text{
   font-size: 1.1em;
   color: #000000;
   display: inline-block;
   float:left;
 }

.device-resp{
   /*color: rgba(6, 6, 6, 0.38);*/
   display: inline-block;
 }
.video-js .vjs-big-play-button{}
</style>