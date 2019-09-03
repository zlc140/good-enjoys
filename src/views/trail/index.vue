<template>
    <div class="applyTrial">
        <div class="product-image-detail">
            <div class="image-show">
                <span class="icon">&#xe6a5;</span>
                <img class="image" :src="imageShowSrc" alt />
            </div>
            <div class="activity">
                <img class="bg" src="../../assets/image/bg-red.png" alt />
                <div class="activity-title">
                    <div class="activity-left">
                        <img src="../../assets/image/free.png" alt />
                        <div class="price">
                            <p>
                                <span>{{ currency }}</span>享币
                            </p>
                            <p>¥{{ price }}</p>
                        </div>
                    </div>
                    <div class="activity-right">
                        <img class="bg" src="../../assets/image/bg-yellow.png" alt />
                        <div class="activity-time" v-if="endTime">
                            <p>距离结束仅剩</p>
                            <p>
                                <span>{{ endTime.day }}</span>天
                                <span>{{ endTime.hour }}</span>时
                                <span>{{ endTime.minute }}</span>分
                            </p>
                        </div>
                    </div>
                </div>
                <div class="product-name">
                    <div class="name">{{ skuName }}</div>
                    <div class="number">
                        <p>
                            限量
                            <i>{{ triaNum }}</i>份
                        </p>
                        <p>
                            <em>{{ applicationsNum }}</em>人申请
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="product-text-detail">
            <p>商品详情</p>
            <p>PRODUCT DETAILS</p>
            <div class="img" v-html="specsValues"></div>
        </div>
        <div class="line"></div>
        <div class="product-process">
            <div class="text">
                <span></span>
                试用流程
            </div>
            <img src="../../assets/image/apply.jpg" alt />
        </div>
        <div class="line"></div>
        <div class="product-name-list">
            <div class="text">
                <span></span>
                试用名单
            </div>
            <div class="name-list">
                <div class="list-item">
                    <img
                            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg"
                            alt
                    />
                    <span>钢铁侠</span>
                </div>
                <div class="list-item">
                    <img
                            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg"
                            alt
                    />
                    <span>钢铁侠</span>
                </div>
                <div class="list-item">
                    <img
                            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg"
                            alt
                    />
                    <span>钢铁侠</span>
                </div>
            </div>
        </div>
        <div class="detail-footer">
            <div class="home">
                <p class="icon">&#xe69d;</p>
                <p>首页</p>
            </div>
            <div class="share">
                <p class="icon">&#xe69e;</p>
                <p>分享</p>
            </div>
            <div v-show="userStatus == 1" @click="apply" class="apply red">立即申请</div>
            <div v-show="userStatus == 2" class="apply red">已结束</div>
            <div v-show="userStatus == 3" class="apply red">已申请</div>
            <div v-show="userStatus == 4" class="apply red">未选中</div>
            <div v-show="userStatus == 5" class="apply red">恭喜获得试用</div>
        </div>
    </div>
</template>

<script>
    import api from '@/service/api/index.js'
    import configs from '@/service/conf'
    export default {
        data() {
            return {
                userStatus: 1,
                imageShowSrc:'',
                currency: 1,
                price: '0',
                skuName: '',
                triaNum: '',
                applicationsNum: '',
                specsValues: '',
                detail: null,
                endTime: null
            }

        },
        mounted() {
          this.getData()
        },
        methods: {
            async getData() {
                let id = this.$route.query.id || 175812049018818560
                const { success, code, data, message } = await api.trial.getDetails({ id: id });
                if (success && code === 200) {
                    this.imageShowSrc = configs.IMAGE_SRC + data.mainImg;
                    this.currency = data.triaNum;
                    this.price = data.salePrice;
                    this.skuName = data.skuName;
                    this.triaNum = data.triaNum;
                    this.applicationsNum = data.applicationsNum;
                    this.specsValues = data.specsValues;
                    this.userStatus = data.userStatus;
                    this.getSurplusTime(data.failureTime);
                }
            },
            /**
             * getSurplusTime 获取与当前时间的差值
             * @param {[any]} time
             */
             getSurplusTime(time) {
                const nowTime = Date.now();
                // 获取时间差
                const timediff = Math.round((time - nowTime) / 1000);
                // 获取还剩多少天
                const day = Math.floor(timediff / 3600 / 24);
                // 获取还剩多少小时
                const hour = Math.floor(timediff / 3600 % 24);
                // 获取还剩多少分钟
                const minute = Math.floor(timediff / 60 % 60);
                this.endTime = {
                    day: day > 0 ? day : 0,
                    hour: hour > 0 ? hour : 0,
                    minute: minute > 0 ? minute : 0,
                };
                setTimeout(() => {
                    this.getSurplusTime(time);
                }, 60000);
                if (minute === 0) { return; }
            },
            async apply() {
                const { success, code, data, message } = await api.trial.getDetails({ id: 175812049018818560 });
            },

        }
    }

</script>
<style lang="scss" scoped>
    .applyTrial {
        overflow: hidden;
        position: relative;
        .product-image-detail {
            .image-show {
                width: 100%;
                overflow: hidden;
                position: relative;
                span {
                    position: absolute;
                    top: 1.875rem;
                    left: 1.875rem;
                    display: inline-block;
                    height: 1.875rem;
                    width: 1.875rem;
                    border-radius: 3.75rem;
                    font-family: "lx-iconfont";
                    text-align: center;
                    line-height: 1.875rem;
                    color: #fff;
                    background-color: rgba(0, 0, 0, 0.1);
                }
                .image {
                    display: block;
                    width: 100%;
                    height: 23.4375rem;
                }
            }
            .activity {
                width: 100%;
                overflow: hidden;
                position: relative;
                background: #fff;
                .bg {
                    display: block;
                    width: 100%;
                    height: 3.125rem;
                }
                .activity-title {
                    height: 3.125rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .activity-left {
                        margin-left: 20px;
                        display: inline-flex;
                        align-items: center;
                        height: 3.125rem;
                        img {
                            display: block;
                            height: 2.1875rem;
                            width: 2.1875rem;
                        }
                        .price {
                            margin-left: 20px;
                            color: #fff;
                            p:first-child {
                                font-size: 17px;
                                font-weight: 600;
                                span {
                                    font-size: 24px;
                                }
                            }
                            p:nth-child(2) {
                                font-size: 14px;
                                text-decoration: line-through;
                            }
                        }
                    }
                    .activity-right {
                        position: relative;
                        img {
                            display: block;
                            width: 10rem;
                            height: 3.125rem;
                        }
                        .activity-time {
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 9rem;
                            text-align: center;
                            line-height: 1.5625rem;
                            p:first-child {
                                font-size: 14px;
                                color: #e5a83e;
                                letter-spacing: 2px;
                            }
                            p:nth-child(2) {
                                line-height: 20px;
                                color: #e5a83e;
                                span {
                                    display: inline-block;
                                    height: 20px;
                                    width: 20px;
                                    margin-right: 5px;
                                    color: #fff;
                                    font-weight: 600;
                                    background: #e5a83e;
                                }
                            }
                        }
                    }
                }
            }
            .product-name {
                padding: 15px 20px;

                width: 100%;
                box-sizing: border-box;
                .name {
                    font-size: 16px;
                    margin-bottom: 15px;
                    font-style: normal;
                }
                .number {
                    width: 100%;
                    color: #4d4d4d;
                    display: inline-flex;
                    justify-content: space-between;
                    i {
                        font-style: normal;
                        color: red;
                    }
                    em {
                        font-style: normal;
                    }
                }
            }
        }
        .line {
            width: 100%;
            height: 0.9375rem;
            border-radius: 5px;
            background: #eee;
        }
        .product-text-detail {
            padding: 20px 10px 20px 10px;
            background: #fff;
            color: #454545;
            p:first-child {
                font-size: 14px;
                letter-spacing: 1px;
            }
            p:nth-child(2) {
                font-size: 10px;
                color: #969696;
            }
            .img {
                margin-top: 10px;
            }
        }
        .product-process {
            padding: 20px 10px 20px 10px;
            background: #fff;
            .text {
                font-size: 18px;
                span {
                    background: #ff5f5c;
                    display: inline-block;
                    height: 15px;
                    width: 5px;
                }
            }
            img {
                display: block;
                width: 100%;
            }
        }
        .product-name-list {
            padding: 20px 10px 20px 10px;
            background: #fff;
            margin-bottom: 50px;
            .text {
                font-size: 18px;
                span {
                    background: #ff5f5c;
                    display: inline-block;
                    height: 15px;
                    width: 5px;
                }
            }
            .name-list {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 10px 20px 10px;
                .list-item {
                    width: 30%;
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    img {
                        display: block;
                        height: 4.375rem;
                        width: 4.375rem;
                        border-radius: 4.375rem;
                    }
                }
            }
        }
        .detail-footer {
            position: fixed;
            display: flex;
            bottom: 0;
            width: 100%;
            height: 50px;
            text-align: center;
            background: #fff;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
            .home {
                width: 70px;
                font-size: 12px;
                padding: 10px;
                color: #b4b6c0;
                .icon {
                    font-family: "lx-iconfont";
                    font-size: 20px;
                }
            }
            .share {
                width: 70px;
                padding: 10px;
                color: #b4b6c0;
                font-size: 12px;
                .icon {
                    font-family: "lx-iconfont";
                    font-size: 20px;
                }
            }
            .apply {
                text-align: center;
                width: inherit;
                line-height: 50px;
                color: #fff;
                font-size: 18px;
            }
            .red {
                background: #ff5f5c;
            }
            .gray {
                background: #babcc4;
            }
        }
    }
</style>
