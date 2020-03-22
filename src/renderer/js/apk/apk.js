import client from '../base.js';
import base from '../base';

const URLs = {
    getlist: '/apk/getselectlist',
    getselectlist: '/apk/getselectlist',
    getversionlist: '/apk/getversionlist',
    getprojectlist: '/apk/getprojectlist',
    getjobs: '/apk/getjobs',
    getbuildlog: '/apk/buildlog',
    getbranches: '/apk/getbranches',
    getscript: '/apk/getscript',
    savehistory: '/apk/savehistory',
    gethistorylist: '/apk/gethistorylist',
    getchannelslist: '/apk/getchannelslist',
    uploadbuly: '/apk/uploadbuly',
    getconfig: '/apk/getconfig',
    saveconfig: '/apk/saveconfig',
    runbuild: '/apk/build',
    getchannelsinfo: '/apk/getchannelsinfo',
    getchannleconfig: '/apk/getchannleconfig',
    savechannleconfig: '/apk/savechannleconfig',
    channleconfigdetail: '/apk/channleconfigdetail',
    getchannleshortlist: '/apk/getchannleshortlist',
    getchannleshortdetail: '/apk/getchannleshortdetail',
    getbranchcommitlist: '/apk/getbranchcommitlist',
    savehotfixcreate: '/apk/savehotfixcreate',
    gethotfixlist: '/apk/gethotfixlist',
    gethotfixconfig: '/apk/gethotfixconfig',
    hotfixbuild: '/apk/hotfixbuild',
    getbuildchannle: '/apk/getbuildchannle',
    // 获取所有渠道号列表
    createchannle: '/apk/createchannle',
    // 构建批量包
    getcreatechannlelist: '/apk/getcreatechannlelist',
    dsymgetlist: '/dsym/getlist',
    // 获取dsym列表接口

};

let api = {};

api.getList = function (params, success, error) {
    base.base_url.post(URLs.getlist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.getSelectList = function (params, success, error) {
    base.base_url.post(URLs.getselectlist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};



api.getApk = function (url,params, success, error) {
    base.base_url.get(url, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.getVersionList = function (params, success, error) {
    base.base_url.get(URLs.getversionlist, '').then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.getProjectList = function (params, success, error) {
    base.base_url.get(URLs.getprojectlist, '').then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};




api.getJobs = function (params, success, error) {
    base.base_url.get(URLs.getjobs, '').then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getBuildLog = function (params, success, error) {
    base.base_url.post(URLs.getbuildlog, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.getBranches = function (params, success, error) {
    base.base_url.post(URLs.getbranches, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getScript = function (params, success, error) {
    base.base_url.post(URLs.getscript, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.saveHistory = function (params, success, error) {
    base.base_url.post(URLs.savehistory, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getHistorylist = function (params, success, error) {
    base.base_url.post(URLs.gethistorylist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getChannelslist = function (params, success, error) {
    base.base_url.post(URLs.getchannelslist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.uploadBuly = function (params, success, error) {
    base.base_url.post(URLs.uploadbuly, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.getConfig = function (params, success, error) {
    base.base_url.post(URLs.getconfig, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.saveConfig = function (params, success, error) {
    base.base_url.post(URLs.saveconfig, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.runBuild = function (params, success, error) {
    base.base_url.post(URLs.runbuild, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getChannelsInfo = function (params, success, error) {
    base.base_url.post(URLs.getchannelsinfo, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.getChannleConfig = function (params, success, error) {
    base.base_url.post(URLs.getchannleconfig, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.saveChannleConfig = function (params, success, error) {
    base.base_url.post(URLs.savechannleconfig, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.channleConfigDetail = function (params, success, error) {
    base.base_url.post(URLs.channleconfigdetail, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getChannleShortList = function (params, success, error) {
    base.base_url.post(URLs.getchannleshortlist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getChannleShortDetail = function (params, success, error) {
    base.base_url.post(URLs.getchannleshortdetail, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getHotFixList = function (params, success, error) {
    base.base_url.post(URLs.gethotfixlist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};

api.getBranchCommitList = function (params, success, error) {
    base.base_url.post(URLs.getbranchcommitlist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.saveHotfixCreate = function (params, success, error) {
    base.base_url.post(URLs.savehotfixcreate, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getHotfixConfig = function (params, success, error) {
    base.base_url.post(URLs.gethotfixconfig, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.hotFixBuild = function (params, success, error) {
    base.base_url.post(URLs.hotfixbuild, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getBuildChannle = function (params, success, error) {
    base.base_url.post(URLs.getbuildchannle, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.createChannle = function (params, success, error) {
    base.base_url.post(URLs.createchannle, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.createChannle = function (params, success, error) {
    base.base_url.post(URLs.createchannle, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.getCreateChannleList = function (params, success, error) {
    base.base_url.post(URLs.getcreatechannlelist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};


api.dsymGetList = function (params, success, error) {
    base.base_url.post(URLs.dsymgetlist, params).then((response) => {
        if (success !== undefined) {
            success(response.data);
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e);
        } else {
            client.message(e);
        }
    });
};




export default api;
