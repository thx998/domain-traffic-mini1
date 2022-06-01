// components/custom-tab-bar/index.ts
const app = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
    },
    /**
     * 组件的初始数据
     */
    data: {
        active: 0,
        'list': [
            {
                'url': "/pages/card/index",
                // 'icon': "https://test-1304306051.cos.ap-shanghai.myqcloud.com/image/3e2138a5b59c6120f4e65adf6ca6e3be.png",
                'icon':  {
                    normal: 'https://test-1304306051.cos.ap-shanghai.myqcloud.com/image/bab0c5e4503604dc42eaa16ef0e36ef7.png',
                    active: 'https://test-1304306051.cos.ap-shanghai.myqcloud.com/image/3e2138a5b59c6120f4e65adf6ca6e3be.png',
                },
                'text': "卡包"
            },
            {
                'url': "/pages/mine/index",
                // icon: "https://test-1304306051.cos.ap-shanghai.myqcloud.com/image/1e2214f283421b0b3dbab252192ff405.png",
                'icon':  {
                    normal: 'https://test-1304306051.cos.ap-shanghai.myqcloud.com/image/0d5158bad20288f1a514370109a3148f.png',
                    active: 'https://test-1304306051.cos.ap-shanghai.myqcloud.com/image/1e2214f283421b0b3dbab252192ff405.png',
                },
                'text': "我的"
            }
        ],
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onChange(e) {
            console.log(e, 'e')
            // this.setData!({
            //     active: e.detail
            // });
            wx.switchTab({
                url: this.data.list[e.detail].url
            });
        },
        // init() {
        //     const page = getCurrentPages().pop();
        //     this.setData!({
        //         active: this.data.list.findIndex(item => item.url === `/${page.route}`)
        //     });
        // }
    }
})
