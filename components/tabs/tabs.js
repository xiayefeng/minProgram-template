Component({
    externalClasses: ['tabs-wrap'],
    properties: {
        tabsArr: {     // tabs 数组，必传
            type: Array,
            value: []
        },
        activeColor: {
            type: String,
            value: '#e4393c'
        },
        borderWidth: {
            type: String,
            value: '2px'
        },
        idx: {
            type: Number,
            value: 0
        }
    },
    data: {
        activedIdx: 0
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached() {
            this.setData({
                activedIdx: this.data.idx
            })
        },
        moved() { },
        detached() { },
    },
    methods: {
        tapItem (e) {
            const idx = e.currentTarget.dataset.idx
            if(idx !== this.data.activedIdx) {
                this.setData({
                    activedIdx: idx
                })
                this.triggerEvent('change-idx', idx)
            }
        }
    }
})