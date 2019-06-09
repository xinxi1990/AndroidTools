<template>
    <div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
              <Button type="primary" @click="goHomePage()">返回</Button>
        </div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
              <Button type="primary" @click="timerMEM()">开始监控内存</Button>
        </div>
        <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
              <Button type="primary" @click="stopMEM()">停止监控内存</Button>
        </div>
        <div class="mem" style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
            <h2>内存占用率趋势图</h2>
            <div id="container" style="min-width:400px;height:400px">
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
        <div class="mem" style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
            <h2>CPU占用率趋势图</h2>
            <div id="container" style="min-width:400px;height:400px">
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

    export default {
        components: {
            VueHighcharts
        },
        data() {
            return {
                Highcharts: Highcharts,
                memareaOptions: dataChart.MEMData,
                cpuareaOptions: dataChart.CPUData,
                memdataList:[],
                memtimeList:[],
                cpudataList:[],
                cputimeList:[]
            }
        },
        mounted(){
            // this.timerMEM()
        },
        beforeDestroy () {
            clearInterval(this.intervalId)
        },
        methods: {
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
        }
        }
</script>

<style scoped>

</style>