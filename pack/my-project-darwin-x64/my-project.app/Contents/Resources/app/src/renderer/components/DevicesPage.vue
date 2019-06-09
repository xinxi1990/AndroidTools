<template>
    <div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
        <Button type="primary" @click="goHomePage()">返回</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
         <Button type="info">刷新ADB</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
         <Button type="success" @click="restartADB()">重启ADB</Button>
      </div>
      <div style="margin-bottom: 20px;margin-top: 20px;margin-left: 20px;">
         <Tag color="primary">设备列表</Tag>
         <Select v-model="model1" style="width:200px">
           <Option v-for="item in devicesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
         </Select>
         <Button type="success">连接设备</Button>
      </div>
   </div>
</template>


<script>
    const { exec } = require('child_process');
    export default {
        name: "devicepage",
        data(){
            return {
                theme3: 'light',
                devicesList: [],
                model1: ''
            }
        },
        mounted() {
            this.getDeviesList()
        },
        methods: {
            goHomePage() {
                this.$router.back('/');
            },
            restartADB(){
                exec('adb kill-server', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                })
                exec('adb start-server', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                })
            },
            getDeviesList(){
                  exec('adb devices', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    if (`${stdout}`.replace('List of devices attached','').indexOf('device') !=-1){
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                        var deviceName;
                        var deviceNameList = `${stdout}`.replace('List of devices attached','').split('device')
                        for (deviceName in deviceNameList){
                            if (deviceNameList[deviceName] != "") {
                                console.log(deviceNameList[deviceName])
                                var deviceDetail = {
                                    value: deviceNameList[deviceName],
                                    label: deviceNameList[deviceName]
                                }
                                this.devicesList.push(deviceDetail)
                            }
                        }
                    }else {
                        this.devicesList = [{value:'未查询到设备',label:'未查询到设备'}]
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>