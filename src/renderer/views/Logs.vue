<template>
  <div class="split-pane-page-wrapper">
    <div style="width: 100%; height: 100%;">
      <Row>
        <div>

          <Card >
            <h3>构建日志量较大 默认5秒自动刷新</h3>
            <p style="background: #495060; color: limegreen">
            <pre style="word-wrap:break-word;text-overflow:ellipsis;overflow:hidden;">{{ log }}</pre>
            </p>
          </Card>
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
  import api from '../js/apk/apk'
  // import Tables from '_c/tables'
  // import SideMenu from '../../components/main/components/side-menu'

  export default {
    name: 'pipeline_task_detail',
    data() {
      return {
        baseic_info : "",
        name: "",
        number: "",
        build_time: "",
        build_branch: "",
        log: "",
        right_page_load: false,
        right_log_load: false,
        logBody: {
          name: this.$route.query.name,
          number: parseInt(this.$route.query.number),
        },
        dataList: [],
        stageList: Object.freeze([]),
        stageList1: Object.freeze([]),
        stageLoading: false,
        isFailed: false,
        change_sets: [],
        offset: 0.28,
        offsetVertical: '250px'
      }
    },
    methods: {
      getLogs() {
            console.log(this.logBody)
            api.getBuildLog(this.logBody, (body) => {
                this.log = body.log
                this.name = body.name
                this.number = body.number
                this.build_time = body.build_time
                this.build_branch = body.build_branch
                this.baseic_info = "构建名称:" + this.name + "\n" + "构建号:" + this.number + "\n" + "构建时间:" + this.build_time + "\n" + "构建分支:" + this.build_branch
                // console.log(this.baseic_info)
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
    },
    beforeMount() {
      this.right_page_load = true;
      this.handleSpinShow()
      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
          this.getLogs();
        }, 5000)
      }
    },
    destroyed() {
      clearInterval(this.timer)
    },
  }
</script>

<style lang="less">
  .center-middle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .split-pane-page-wrapper {
    height: 800px;
    .pane {
      width: 100%;
      height: 100%;
      &.left-pane {
        /*background: sandybrown;*/
      }
      &.right-pane {
        /*background: palevioletred;*/
      }
      &.top-pane {
        /*background: sandybrown;*/
      }
      &.bottom-pane {
        /*background: palevioletred;*/
      }
    }
    .custom-trigger {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      /*background: #000000;*/
      position: absolute;
      .center-middle;
      box-shadow: 0 0 6px 0 rgba(28, 36, 56, 0.4);
      i.trigger-icon {
        .center-middle;
      }
    }
    .number {
      font-size: 15px;
      font-weight: bold;
      /*color: #666;margin-top: 50px;*/
    }
    .time {
      font-size: 15px;
      font-weight: bold;
    }
    .content {
      padding-left: 5px;
      padding-top: 5px;
      font-size: 10px;
    }
    pre {
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
      *white-space: normal !important;
    }
    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
      padding-bottom: 30%;
    }
    .goodShow {
      position: relative;
      overflow-y: scroll;
    }
    /*.main{*/
    /**/
    /*}*/
    /* 定义keyframe动画，命名为blink */
    @keyframes blink {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    /* 添加兼容性前缀 */
    @-webkit-keyframes blink {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @-moz-keyframes blink {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @-ms-keyframes blink {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @-o-keyframes blink {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    /* 定义blink类*/
    .blink {
      color: #dd4814;
      animation: blink 1s linear infinite;
      /* 其它浏览器兼容性前缀 */
       -webkit-animation: blink 1s linear infinite;
       -moz-animation: blink 1s linear infinite;
       -ms-animation: blink 1s linear infinite;
       -o-animation: blink 1s linear infinite;
    }

  }
</style>
