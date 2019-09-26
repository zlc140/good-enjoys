<template>
    <div class="details">
<!--        <div class="download" >-->
<!--            <span class="close">+</span>-->
<!--            <img src="../../assets/image/login-bg.png"/>-->
<!--            <div>-->
<!--                <p class="title">好享试</p>-->
<!--                <p>开启生活之道</p>-->
<!--            </div>-->
<!--            <button>立即下载</button>-->
<!--        </div>-->
        <div v-if="query.type == 'plantingGrass' || query.type == 'brand'">
            <h2>{{ articleName }}</h2>
            <div class="detail-info" v-html="articleInfo"></div>
        </div>
        <div v-if="query.type == 'apply'">
            <h2>{{ specstitle }}</h2>
            <div class="detail-info" v-html="specsValues"></div>
        </div>
    </div>
</template>

<script>
import api from '@/service/api/index.js'
import wechat from '@/utils/wechat/index'

export default {
    data() {
        return {
            articleName: '',
            articleInfo: '',
            specstitle:'',
            specsValues:'',
            query: ''
        }
    },
    beforeRouteEnter(to, from, next) {
        if(to.query.invitationCode) { //存储邀请码
            sessionStorage.setItem('invitationCode', to.query.invitationCode)
        }
        if(to.query.id && to.query.type){
            sessionStorage.setItem('__query_obj__', JSON.stringify(to.query))
        }

        if(wechat.isWechat) {
            if(!to.query.code && !sessionStorage.getItem('__openId__')){
                wechat.authorize()
                return next(false);
            }else {
                let checkOpen = sessionStorage.getItem('__openId__') ? false : to.query.code;
                return next(vm => {
                    vm.getOpenId(checkOpen)
                    let datas = sessionStorage.getItem('__query_obj__')
                    if(datas) {
                        let {id, type} = JSON.parse(datas)
                        vm.$router.replace({
                            path: '/wechat',
                            query: {
                                id: id,
                                type: type
                            }
                        })
                    }
                })
            }

        }
        next()

    },
    created() {

        this.query = this.$route.query || JSON.parse(sessionStorage.getItem('__query_obj__'));

        this.getData()
        // if(query.invitationCode) { //存储邀请码
        //     sessionStorage.setItem('invitationCode', query.invitationCode)
        // }
        // if(!wechat.isWechat){
        //     this.getData();
        // }else if (query.id && query.type && !query.code && !sessionStorage.getItem('__openId__')) {
        //
        //     sessionStorage.setItem('__query_obj__', JSON.stringify(query))
        //     //启动授权
        //     if(!sessionStorage.getItem('isAuthorize')) {
        //         sessionStorage.setItem('isAuthorize','true')
        //         wechat.authorize()
        //     }
        // }else if(query.code && !sessionStorage.getItem('__openId__')){
        //     const codevalue = query.code+ ''
        //     this.getOpenId(codevalue)
        // }else {
        //     this.getData();
        // }
    },
    methods: {
        getData() {
            let query = this.query;
            if (query.type === 'plantingGrass' || query.type === 'brand') {
                this.getDetail(query.id);
            } else if (query.type === 'apply') {
                this.getApplyDetail(query.id);
            }else {
                this.$toast('请求参数不全，稍后重试')
            }
        },
        /**
         * getDetail 获取品牌和种草详情
         * @param {[any]}
         */
        async getDetail(id) {
            const { success, code, data, message } = await api.details.getArticleDetails({ id });
            if (success && code === 200) {
                this.articleName = data.articleName;
                this.articleInfo = data.articleInfo;
            } else {
                this.$toast(message);
            }

        },
        goRegister() {
            this.$router.push({
                path: '/register',
                query: {
                    invitationCode: sessionStorage.getItem('invitationCode') || '1234'
                }
            })
        },
        /**
         * getApplyDetail 获取试用详情
         *  @param {[any]}
         */
        async getApplyDetail(id) {
            const { success, code, data, message } = await api.details.getApplyDetails({ id });
            if (success && code === 200) {
                this.specstitle = data.title;
                this.specsValues = data.specsValues;
            } else {
                this.$toast(message);
            }
        },
        getOpenId(code) {
            let queryStr = sessionStorage.getItem('__query_obj__')
            let query = queryStr ?JSON.parse(queryStr) : null
            this.query = query;

            if(!code && sessionStorage.getItem('__openId__')) {
                this.getData()
                return;
            }
            // let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx5db1f717b73bf215&secret=dcde7436b5beaa81ab21979d36ea1021&code='+code+'&grant_type=authorization_code'
            // window.location.href = url;
            // appid=code=CODE&grant_type=authorization_code

            api.logins.getOpenIdAndToken({ wxCode:code,loginType:3 }).then((res) => {
                if(res.code == 200){
                    sessionStorage.setItem('__openId__', (res.data.unionid || res.data.openid))
                    this.getData()
                }else if(res.code == 501){ //授权成功但没有注册过
                    sessionStorage.setItem('short_time_openId', res.data.openid)
                    let userInfo = {
                        nickname: res.data.nickname,
                        image: res.data.image
                    }
                    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                    this.$router.push({
                        path: '/register',
                        query: {
                            invitationCode: sessionStorage.getItem('invitationCode') || ''
                        }
                    })
                }else if(res.code == 500){
                    this.getData()
                }else{
                    // this.$toast(res.message)
                }

            }).catch((err) => {
                // this.$toast(err);
            })


        },
        clickDownload() {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                var loadDateTime = new Date();
                window.location = "...";//schema链接或者universal link
                window.setTimeout(function() { //如果没有安装app,便会执行setTimeout跳转下载页
                    var timeOutDateTime = new Date();
                    if (timeOutDateTime - loadDateTime < 5000) {
                        window.location = "..."; //ios下载地址
                    } else {
                        window.close();
                    }
                }, 500);

            } else if (navigator.userAgent.match(/android/i)) {
                var state = null;
                try {
                    window.location = '...'; //schema链接或者universal link
                    window.setTimeout(function() {
                        window.location = "..."; //android下载地址
                    }, 500);
                } catch (e) {}
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .details {
        padding:20px 0px;
        background: #ffffff;
        h2 {
            // text-align: center;
            font-weight: normal;
            margin-left: 20px;
        }
        &>div{
            overflow-x: hidden;
        }
        .detail-info {
            padding: 20px;
            *{
                max-width: 100%;
            }
        }
    }
    .download{
        margin-top: -20px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 15px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f0f0f0;
        div{
            flex-grow: 2;
            text-align: left;
            padding-left: 10px;
            .title{
                font-size: 14px;
                font-weight: 600;
                color: #888;
            }
        }
        .close{
            font-size: 30px;
            transform: rotate(40deg);
        }
        img{
            width: 40px;
            height: 40px;
        }
        button{
            padding: 5px 15px;
            outline: none;
            background-color: red;
            color: white;
            border: none;
            border-radius: 4px;
        }
    }
</style>
