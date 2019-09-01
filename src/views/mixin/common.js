import api from '@/service/api/index.js'
export default {
    data() {
      return {
          query: null
      }
    },
    methods: {
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

            api.logins.getOpenIdAndToken({ code }).then((res) => {
                if(res.code == 200){
                    sessionStorage.setItem('__openId__', (res.data.unionid || res.data.openid))
                    this.getData()
                }else if(res.code == 501){ //授权成功但没有注册过

                }else {
                    this.$toast(res.message)
                }

            }).catch((err) => {
                this.$toast(err);
            })


        }
    }
}
