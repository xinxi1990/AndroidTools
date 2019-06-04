export const MEMData = {
    chart: {
        type: 'area'
    },
    credits: {
        enabled:false
    },
    title: {
        text: '内存占用率趋势图'
    },
    xAxis: {
        type: "datetime",
        categories: []
    },
    yAxis: {
        title: {
            text: 'MB'
        },
        labels: {
            formatter: function () {
                return this.value + 'MB';
            }
        }
    },
    tooltip: {
        pointFormat: '<b>{series.name}</b>峰值<b>{point.y:,.0f}MB</b>'
    },
    plotOptions: {
        // area: {
        //     pointStart: 1940,
        //     marker: {
        //         enabled: false,
        //         symbol: 'circle',
        //         radius: 2,
        //         states: {
        //             hover: {
        //                 enabled: true
        //             }
        //         }
        //     }
        // }
    },
    // series: []
    series: [{
        name: '内存',
        // color: '#FF8C69',
        data: []
    }
    ]
}


export const CPUData = {
    chart: {
        type: 'area'
    },
    credits: {
        enabled:false
    },
    title: {
        text: 'CPU占用率趋势图'
    },
    xAxis: {
        type: "datetime",
        categories: []
    },
    yAxis: {
        title: {
            text: '%'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        }
    },
    tooltip: {
        pointFormat: '<b>{series.name}</b>峰值<b>{point.y:,.0f}%</b>'
    },
    plotOptions: {
        // area: {
        //     pointStart: 1940,
        //     marker: {
        //         enabled: false,
        //         symbol: 'circle',
        //         radius: 2,
        //         states: {
        //             hover: {
        //                 enabled: true
        //             }
        //         }
        //     }
        // }
    },
    // series: []
    series: [{
        name: 'CPU',
        // color: '#FF8C69',
        data: []
    }
    ]
}