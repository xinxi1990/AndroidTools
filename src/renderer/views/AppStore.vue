<template>

  <div class="layout-content-main">
             <div><MenuTop></MenuTop></div>
             <div style="padding-top: 20px;position:relative;background-color:#87CEFA;">
                <Form ref="formValidate" :model="selectBody" :label-width="50">
                  <table width="90%">
                      <tr>
                          <td align="right" width="100px">
                              <FormItem label="项目:">
                                  <Select v-model="selectBody.project"  placeholder="下拉筛选">
                                      <Option style="width: 100px;" v-for="(item, index) in projectList" :value="item.name" :key="index">{{item.name}}</Option>
                                  </Select>
                              </FormItem>
                          </td>
                      </tr>
                      <tr>
                          <td align="right" width="100px">
                              <FormItem label="平台:">
                                  <Select v-model="selectBody.platform"  placeholder="下拉筛选">
                                      <Option style="width: 100px;" v-for="(item, index) in platformList" :value="item.name" :key="index">{{item.name}}</Option>
                                  </Select>
                              </FormItem>
                          </td>
                          <td align="right" width="100px">
                              <FormItem label="版本:">
                                  <Select v-model="selectBody.version" placeholder="下拉筛选" >
                                      <Option style="width: 100px;" v-for="(item, index) in versionList" :value="item.name" :key="index">{{item.name}}</Option>
                                  </Select>
                              </FormItem>
                          </td>
                      </tr>
                      <tr>
                          <td align="right" width="100px">
                              <FormItem label="环境:">
                                  <Select v-model="selectBody.env"  placeholder="下拉筛选" >
                                      <Option style="width: 100px;" v-for="(item, index) in envList" :value="item.name" :key="index">{{item.name}}</Option>
                                  </Select>
                              </FormItem>
                          </td>
                          <td align="right" width="100px">
                              <FormItem label="时间:">
                                  <Select v-model="selectBody.create_time"  placeholder="下拉筛选" >
                                      <Option style="width: 100px;" v-for="(item, index) in timeList" :value="item.value" :key="index">{{item.name}}</Option>
                                  </Select>
                              </FormItem>
                          </td>
                      </tr>
                  </table>
                </Form>
                <div class="div-card-submit" style="height:30px; width:60px; float:right;margin-right:20px">
                  <Button type="primary" @click="getSelectList(1)" icon="document-text">查询</Button>
                </div>
                <div style="color:#ed1941;" align="center">请使用浏览器访问，点击下载安装</div>
                <div style="color:#ed1941;" align="center">默认只显示最新的测试包，更多请查询</div>
            </div>
            <!--<div style="width:100%; height:72%; overflow-y: auto; position:absolute;padding-top: 20px;">-->
            <div v-if="ApkList.length !== 0" style="padding-top: 20px;">
                    <div v-for="(item, index) in ApkList" style="float:left;width:50%" align="center">
                         <div>
                            <viewer >
                              <img :src="item.qrcode_path" style="height: 180px;width: 200px"/>
                            </viewer>
                         </div>
                        <div>
                            <a href="#" slot="extra" @click.prevent="downLoadApk(item.apk_path)">
                                点击下载
                            </a>
                            <a href="#" slot="extra" @click.prevent="downInstallApk(item.apk_path)">
                                点击安装
                            </a>
                        </div>
                        <div>
                            <Button type="text" @click="handleRender(item.info_list)">查看详情</Button>
                        </div>
                        <div>
                            <p>{{item.platform}}{{item.tag}}</p>
                            <p>{{item.env}}{{item.version}}</p>
                            <p>{{item.create_time}}</p>
                        </div>
                    </div>
                    <div style="clear:both" align="center"></div>
                    <div style="padding-top:100px;float:right;position:relative;">
                        <Page :total="ApkList.totalsize" :current="ApkList.page" @on-change="changeDataPage" show-total></Page>
                    </div>
            </div>
            <div v-else style="padding-top: 20px;">
                    <div style="float:left;width:100%" align="center">
                        <h3 style="align-content: center">未查询到App安装包列表 请重新选择筛选条件!</h3>
                    </div>
                    <div style="clear:both" align="center"></div>
                    <div style="padding-top:100px;float:right;position:relative;">
                        <Page :total="ApkList.totalsize" :current="ApkList.page" @on-change="changeDataPage" show-total></Page>
                    </div>
            </div>
            <Modal
                  v-model="installlogmodal"
                  title="详情页"
                  width="1000px"
                  hegit="800px"
                  @on-ok="ok"
                  @on-cancel="cancel">
                  <Spin fix v-show="installPageLoad">
                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                        <div>安装应用中，请耐心等待一会。。。</div>
                 </Spin>
                  <p>{{installMsg}}</p>
            </Modal>

  </div>
</template>

<script>
    const { exec } = require('child_process');
    import api from '../js/apk/apk'
    import Vue from 'vue';
    import Viewer from 'v-viewer'
    import 'viewerjs/dist/viewer.css'
    import MenuTop from '@/views/MenuTop.vue'
    Vue.use(Viewer);
    Viewer.setDefaults({
      Options: {
          'inline': true,
          'button': true,
          'navbar': true,
          'title': true,
          'toolbar': true,
          'tooltip': true, 'movable': true,
          'zoomable': true, 'rotatable': true,
          'scalable': true, 'transition': true,
          'fullscreen': true, 'keyboard': true,
          'url': 'data-source'
      }
    })
    export default {
        components: {
            MenuTop
        },
        beforeMount(){
          this.getVersionList();
          this.getProjectList();
          this.getApkList(1);
        },
        mounted: function () {
          // this.checkCookie()
          this.handleSpinShow()
        },
        destroyed() {
             clearInterval(this.timer)
        },
        data () {
          return {
             installPageLoad: true,
             installMsg: '',
             installlogmodal: false,
             buildcount:0,
             modal1: false,
             isChoose:false,
             self: this,
             reqListExecution: [],
             executionList: [],
             totalsize: 0,
             reqListEnd: {
                totalSize: 0,
                type: 'api',
                pageSize: 10,
                page: 1
              },
            runsList: [],
            drawer_is_show: false,
            page_load: true,
            activeTab:null,
            columns1: [
                    {
                        title: '详情',
                        key: 'info'
                    },
                ],
            modalInfo: false,

            projectList: [
                    {
                        name: 'igetcool'
                    },
            ],


            platformList: [
                    {
                        name: 'Android'
                    },
                    {
                        name: 'iOS'
                    }
            ],
            envList: [
                    {
                        name: '测试'
                    },
                    {
                        name: '仿真'
                    },
                    {
                        name: '线上'
                    }
            ],
            timeList: [
                    {
                        name: '最近1天',
                        value: '1'
                    },
                    {
                        name: '最近3天',
                        value: '3'
                    },
                    {
                        name: '最近7天',
                        value: '7'
                    },
                    {
                        name: '最近30天',
                        value: '30'
                    }
                    ,{
                        name: '全部',
                        value: '31'
                    }
            ],
            versionList: [],
            selectBody: {
              page: 1,
              project: 'igetcool',
              platform: 'Android',
              version: '2.0.0',
              env: '测试',
              create_time: '31',
            },
            apkBody:{
              page: 1,
              pagesize: 10,
              totalsize: 0,
            },
            historyBody:{
              page: 1,
              pagesize: 10,
              totalsize: 0,
            },
            channelsBody:{
              page: 1,
            },
            ApkList: [],
            buildBody:{
              job_name: "",
              id: ""
            },
           columnsDataTemp: [],
           configBody: {
              id: "",
            },
          }
        },
        methods:{
            goTask(){
                this.$router.push('/buildcreate')
            },
            goHistory(){
                this.$router.push('/historycreate')
            },
            changeDataPage (changeDataPage) {
                this.getApkList(changeDataPage);
            },
            setSelectedList(selection) {
                  this.selectedList = selection;
            },
            downLoadApk(apk_url){
              window.open(apk_url);
              },

            downInstallApk(apk_url){
              this.installlogmodal = true;
              var InstallCMD = 'fa install --force ' + apk_url;
              console.log(InstallCMD);
              this.timer = setTimeout(()=>{
                //设置延迟执行
                this.installPageLoad = false;
              },60000); // 60秒安装时间
              exec('echo `'+ InstallCMD + '`', (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return;
                    }

                    this.installMsg = stdout;
                    console.log(stdout);
                });
            },
            getApkList(page) {
                this.apkBody.platform = this.selectBody.platform;
                this.apkBody.create_time = this.selectBody.create_time;
                this.apkBody.env = this.selectBody.env ;
                this.apkBody.version = this.selectBody.version;
                this.apkBody.project = this.selectBody.project;
                this.apkBody.page = page;
                api.getList(this.apkBody, (body) => {
                    // console.log(body)
                    this.ApkList = body.data
                    this.ApkList.totalsize = body.totalsize;
                    console.log(this.ApkList)
                }, (error) => {
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            getSelectList(page){
              this.selectBody.page = page;
                api.getSelectList(this.selectBody, (body) => {
                    this.ApkList = body.data
                    this.ApkList.totalsize = body.totalsize;
                    console.log(this.ApkList)
                }, (error) => {
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });

            },
            checkCookie: function () {
                var user = getCookie("username");
                if (user != "") {
                    //alert("欢迎登录!");
                } else {
                     this.$router.push('/login')
                    // user = prompt("Please enter your name:", "");
                    // if (user != "" && user != null) {
                    //     this.setCookie("username", user, 365);
                    // }
                }
            },
            getVersionList(){
                api.getVersionList('', (body) => {
                    this.versionList = body.data
                }, (error) => {
                    console.log(error)
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            getProjectList(){
                api.getProjectList('', (body) => {
                    this.projectList = body.data
                }, (error) => {
                    console.log(error)
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            getJobs(){
                api.getJobs('', (body) => {
                    this.columnsData = body.data
                    this.getBuildList(body.data)
                }, (error) => {
                    console.log(error)
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            ok () {
                // this.$Message.info('Clicked ok');
            },
            cancel () {
                // this.$Message.info('Clicked cancel');
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
                                h('div', '需要点时间加载，请耐心等待一会。。。')
                            ])
                        }
                    });
                    setTimeout(() => {
                            this.$Spin.hide();
                        }, 3000);
              },
              handleSpinRemove () {
                  this.$Spin.remove();
              },
            handleRender (value) {
                this.$Modal.confirm({
                  render: (h) => {
                    return h('Input', {
                      props: {
                        value: value,
                        autofocus: true,
                        type: "textarea",
                        rows: 50,
                        readonly: true
                      },
                      on: {
                        input: (val) => {
                          this.value = val;
                        }
                      }
                    })
                  }
                })
             },
             getHistoryList() {
                api.getHistorylist(this.historyBody, (body) => {
                    // console.log(body)
                    this.columnsDataHistory = body.data
                }, (error) => {
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            getChannelslist() {
                api.getChannelslist(this.channelsBody, (body) => {
                    this.columnsDataHistoryChannels = body.data
                    console.log(this.columnsDataHistoryChannels)
                }, (error) => {
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            uploadBugly(){
              api.uploadBuly(this.channelsBody, (body) => {
                    this.columnsDataHistoryChannels = body.data
                    console.log(this.columnsDataHistoryChannels)
                }, (error) => {
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            imgScc:function () {
                console.log("imgScc")
                this.isChoose = !this.isChoose
            },
            getConfig(){
                api.getConfig(this.configBody, (body) => {
                    this.columnsDataTemp = body.details
                    console.log(this.columnsDataTemp)
                }, (error) => {
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            goBuild(job_name,id){
                     this.handleSpinShow();
                        if (this.timer) {
                            clearInterval(this.timer)
                          } else {
                            this.timer = setInterval(() => {
                            }, 3000)
                    }
                    this.buildBody.job_name = job_name;
                    this.buildBody.id = id;

                    api.runBuild(this.buildBody, (body) => {

                    var message = body.message;
                    console.log(message);
                    if (body.code == 0) {
                      this.$Modal.success({
                        title: '构建通知',
                        content: "构建成功 请等待app打包通知",
                        okText: '确定'
                      })
                    } else {
                      this.$Modal.error({
                        title: '构建通知',
                        content: body.message,
                        okText: '确定'
                      })
                    }
                  }, (error) => {
                      {
                        this.$Modal.error({
                            title: '出现了错误',
                            content: '获取数据失败',
                            okText: '确定'
                        });
                    }
                });
            },
            getBuildList(data){
                this.buildcount = 0
                var index;
                for (index in data){
                    console.log(data[index]["job_building"])
                    if (data[index]["job_building"] === true){
                        this.buildcount +=1;
                    }
                }
            }

        },
    }
</script>

<style scoped>
  .div-card-head{
      float:left;width:40%;
      margin-left:100px
  }
  .footer {
      /*position: absolute;*/
      bottom: 0;
      width: 100%;
      height: 50px;
      padding: 100px;
  }
  .layout-content-main{
        min-height: 1000px;
        padding: 10px;
  }


/*div, ul, li, span, img {*/
    /*margin: 0;*/
    /*padding: 0;*/
    /*display: flex;*/
    /*box-sizing: border-box;*/
/*}*/

/*.vueBox{*/
    /*text-align: center;*/
    /*margin-left: 300px;*/
    /*position: relative;*/
/*}*/

img {
 transform: scale(1);          /*图片原始大小1倍*/
 transition: all ease 0.5s; }  /*图片放大所用时间*/


 img.active {
 transform: scale(3);          /*图片需要放大3倍*/
 position: absolute;           /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
 z-index: 100; }

</style>
