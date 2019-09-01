<template>
    <div class="details">
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
    created() {
        const query = this.$route.query;
        this.query = query;
        if(query.invitationCode) { //存储邀请码
            sessionStorage.setItem('invitationCode', query.invitationCode)
        }
        if (query.id && query.type && !query.code && !sessionStorage.getItem('__openId__')) {
            sessionStorage.setItem('__query_obj__', JSON.stringify(query))
            //启动授权
            if(!sessionStorage.getItem('isAuthorize')) {
                sessionStorage.setItem('isAuthorize','true')
                wechat.authorize()
            }
        }else if(query.code){
            const codevalue = query.code+ ''
            this.getOpenId(codevalue)
        }else {
            this.getData();
        }
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
                            invitationCode: sessionStorage.getItem('invitationCode') || '1234'
                        }
                    })
                }else if(res.code == 500){
                    this.getData()
                }else{
                    this.$toast(res.message)
                }

            }).catch((err) => {
                this.$toast(err);
            })


        }
    }
}
</script>

<style lang="scss" scoped>
    .details {
        padding: 20px 0px;
        background: #ffffff;
        h2 {
            // text-align: center;
            font-weight: normal;
            margin-left: 20px;
        }
        .detail-info {
            padding: 20px;
        }
    }
</style>
