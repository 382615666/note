const sharesTypes = {
    881122: '光学服务',
    881138: '包装印刷',
    881125: '汽车整车',
    881148: '港口航运',
    881107: '采掘服务',
    881128: '交运设备服务',
    881161: '酒店及餐饮',
    881132: '视听器材',
    881143: '医药商业',
    881101: '种植业与林业',
    881137: '造纸',
    881150: '公交',
    881155: '银行',
    881113: '有色冶炼加工',
    881166: '国防军工',
    881122: '光学光电子',
    881116: '建筑装饰',
    881130: '计算机设备',
    881163: '计算机应用',
    881121: '半导体元件',
    881156: '保险及其他',
    881126: '汽车零部件',
    881162: '通信服务',
    881129: '通信设备',
    881164: '传媒',
    881135: '纺织制造',
    881124: '电子制造',
    881106: '石油矿业开采',
    881144: '医疗器械服务',
    881112: '钢铁',
    881114: '新材料',
    881145: '电力',
    881160: '景点及旅游',
    881151: '机场航运',
    881157: '证券',
    881102: '养殖业',
    881105: '煤炭开采加工',
    881119: '仪器仪表',
    881127: '非汽车交运',
    881136: '服装家纺',
    881140: '化学制药',
    881141: '中药',
    881142: '生物制品',
    881149: '公路铁路运输',
    881110: '化工合成材料',
    881154: '园区开发',
    881159: '贸易',
    881165: '综合',
    881103: '农产品加工',
    881115: '建筑材料',
    881118: '专用设备',
    881120: '电气设备',
    881104: '农业服务',
    881108: '基础化学',
    881111: '化工新材料',
    881131: '白色家电',
    881133: '饮料制造',
    881134: '食品加工制造',
    881139: '家用轻工',
    881146: '燃气水务',
    881147: '环保工程',
    881117: '通用设备',
    881109: '化学制品',
    881123: '其他电子',
    881158: '零售',
}
const sharesDatas = {
    '07-24': {
        881136: {
            money: 0.59
        },
        881128: {
            money: 0.49
        },
        881159: {
            money: -0.41
        },
        881117: {
            money: -0.96
        },
        881107: {
            money: -1.3
        },
        881135: {
            money: -1.4
        },
        881161: {
            money: -1.6
        },
        881106: {
            money: -1.6
        },
        881150: {
            money: -2
        },
        881148: {
            money: -2
        },
        881101: {
            money: -2.2
        },
        881111: {
            money: -2.5
        },
        881154: {
            money: -2.7
        }
    },
    '07-23': {
        881163: {
            money: 36.1
        },
        881121: {
            money: 17.9
        },
        881130: {
            money: 12
        },
        881131: {
            money: 9
        },
        881142: {
            money: 5
        },
        881124: {
            money: 4.2
        },
        881160: {
            money: 3.8
        },
        881106: {
            money: 3.7
        },
        881108: {
            money: 3.1
        },
        881134: {
            money: 3
        },
        881158: {
            money: 2.8
        },
        881123: {
            money: 2.3
        },
        881107: {
            money: 2
        }
    },
    '07-21': {
        881144: {
            money: 13.6
        },
        881142: {
            money: 10.4
        },
        881122: {
            money: 5.2
        },
        881161: {
            money: 4.5
        },
        881133: {
            money: 3.7
        },
        881141: {
            money: 2.7
        },
        881132: {
            money: 2.4
        },
        881104: {
            money: 2
        },
        881134: {
            money: 1.6
        },
        881131: {
            money: 0.64
        },
        881160: {
            money: 0.47
        },
        881136: {
            money: 0.38
        },
        881139: {
            money: 0.14
        }
    },
    '07-20': {
        881115: {
            money: 35.5
        },
        881166: {
            money: 29
        },
        881155: {
            money: 24.3
        },
        881113: {
            money: 18.6
        },
        881156: {
            money: 17
        },
        881109: {
            money: 15.9
        },
        881118: {
            money: 12.6
        },
        881116: {
            money: 11.4
        },
        881131: {
            money: 11
        },
        881120: {
            money: 9.4
        },
        881112: {
            money: 6.9
        },
        881121: {
            money: 6.6
        },
        881126: {
            money: 5.9
        }
    },
    '07-17': {
        881166: {
            money: 11.7
        },
        881124: {
            money: 10.6
        },
        881160: {
            money: 9
        },
        881133: {
            money: 7.2
        },
        881131: {
            money: 4.7
        },
        881111: {
            money: 4.2
        },
        881115: {
            money: 3
        },
        881147: {
            money: 2.2
        },
        881132: {
            money: 2.1
        },
        881161: {
            money: 0.35
        },
        881110: {
            money: 0.3
        },
        881102: {
            money: 0.28
        },
        881146: {
            money: 0.16
        }
    },
    '07-16': {
        881161: {
            money: -0.65
        },
        881107: {
            money: -1
        },
        881146: {
            money: -1.2
        },
        881150: {
            money: -1.3
        },
        881128: {
            money: -1.8
        },
        881135: {
            money: -2
        },
        881111: {
            money: -2.2
        },
        881132: {
            money: -2.2
        },
        881165: {
            money: -2.4
        },
        881106: {
            money: -2.4
        },
        881159: {
            money: -2.5
        },
        881137: {
            money: -2.5
        },
        881154: {
            money: -2.8
        }
    },
    '07-15': {
        881142: {
            money: 6.3
        },
        881131: {
            money: 5
        },
        881160: {
            money: 3.8
        },
        881111: {
            money: 2.3
        },
        881108: {
            money: 2.1
        },
        881133: {
            money: 1.4
        },
        881143: {
            money: 1.3
        },
        881161: {
            money: 0.93
        },
        881139: {
            money: 0.12
        },
        881137: {
            money: 0.06
        },
        881145: {
            money: -0.49
        },
        881134: {
            money: -0.52
        },
        881104: {
            money: -0.66
        }
    },
    '07-14': {
        881162: {
            money: 5.9
        },
        881149: {
            money: 0.29
        },
        881136: {
            money: -0.06
        },
        881161: {
            money: -0.35
        },
        881127: {
            money: -1
        },
        881107: {
            money: -1
        },
        881104: {
            money: -1.3
        },
        881105: {
            money: -1.4
        },
        881137: {
            money: -1.8
        },
        881150: {
            money: -2.2
        },
        881160: {
            money: -2.3
        },
        881128: {
            money: -2.4
        },
        881159: {
            money: -2.9
        }
    },
    '07-13': {
        881113: {
            money: 28.8
        },
        881122: {
            money: 28.4
        },
        881103: {
            money: 13
        },
        881142: {
            money: 9.4
        },
        881120: {
            money: 8.5
        },
        881115: {
            money: 8.3
        },
        881118: {
            money: 7.5
        },
        881124: {
            money: 6.8
        },
        881140: {
            money: 5.6
        },
        881101: {
            money: 5.4
        },
        881112: {
            money: 4.3
        },
        881102: {
            money: 4.2
        },
        881162: {
            money: 4.0
        }
    },
    '07-10': {
        881125: {
            money: 5.5
        },
        881160: {
            money: 2.6
        },
        881154: {
            money: 2.4
        },
        881144: {
            money: 1.8
        },
        881151: {
            money: 1.2
        },
        881150: {
            money: 1
        },
        881110: {
            money: 0.87
        },
        881128: {
            money: 0.82
        },
        881165: {
            money: 0.49
        },
        881135: {
            money: 0.28
        },
        881132: {
            money: -0.39
        },
        881161: {
            money: -0.46
        },
        881159: {
            money: -0.59
        }
    },
    '07-09': {
        881129: {
            money: 5.7
        },
        881140: {
            money: 4.6
        },
        881141: {
            money: 4
        },
        881142: {
            money: 3
        },
        881102: {
            money: 1.9
        },
        881119: {
            money: 1.6
        },
        881149: {
            money: 1.5
        },
        881127: {
            money: 1.1
        },
        881143: {
            money: 1.1
        },
        881164: {
            money: 1
        },
        881132: {
            money: 0.94
        },
        881136: {
            money: 0.88
        },
        881105: {
            money: 0.39
        }
    },
    '07-08': {
        881166: {
            money: 34.9
        },
        881157: {
            money: 16.9
        },
        881113: {
            money: 15.5
        },
        881156: {
            money: 11.1
        },
        881130: {
            money: 10.5
        },
        881163: {
            money: 10.3
        },
        881116: {
            money: 6.8
        },
        881112: {
            money: 5.9
        },
        881160: {
            money: 3.6
        },
        881145: {
            money: 3.3
        },
        881162: {
            money: 2.3
        },
        881101: {
            money: 1.5
        },
        881151: {
            money: 1.5
        }
    },
    '07-07': {
        881144: {
            money: 5.2
        },
        881163: {
            money: 3.3
        },
        881138: {
            money: 1.9
        },
        881124: {
            money: 0.69
        },
        881164: {
            money: 0.67
        },
        881122: {
            money: 0.61
        },
        881107: {
            money: 0.55
        },
        881162: {
            money: 0.55
        },
        881128: {
            money: 0.08
        },
        881106: {
            money: 0.01
        },
        881148: {
            money: 0
        },
        881135: {
            money: -0.1
        }
    },
    '07-06': {
        881155: {
            money: 42.9
        },
        881113: {
            money: 22.9
        },
        881166: {
            money: 18
        },
        881122: {
            money: 16.8
        },
        881116: {
            money: 13.2
        },
        881130: {
            money: 11.6
        },
        881163: {
            money: 6.7
        },
        881121: {
            money: 6.3
        },
        881156: {
            money: 5.7
        },
        881126: {
            money: 5.5
        },
        881162: {
            money: 4.8
        },
        881129: {
            money: 4.7
        }
    },
}