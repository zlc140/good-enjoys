<template>
    <div class="register">
        <div class="login-bg">
            <img src="../../assets/image/login-bg.png" alt />
        </div>
        <div class="login-form">
            <div class="form">
                <div class="form-item">
                    <label>
                        <span class="icon">&#xe6a0;</span>
                    </label>
                    <van-field v-model="registerForm.mobile"  clearable placeholder="请输入手机号" />
                </div>
                <div class="form-item">
                    <label>
                        <span class="imgIcon code-icon"></span>
                    </label>
                    <van-field v-model="registerForm.code"
                               clearable placeholder="请输入验证码" >
                        <van-button
                                slot="button"
                                size="small"
                                type="primary"
                                color="#FE605D"
                                :disabled="codeStatus"
                                @click="getCode"
                        >{{ codeText }}
                            <span v-show="codeStatus">({{codeTime}}s)</span>
                        </van-button>
                    </van-field>
                </div>
                <div class="form-item">
                    <label>
                        <span class="icon">&#xe69f;</span>
                    </label>
                    <van-field v-model="registerForm.password" type="password"  clearable placeholder="请输入密码" />
                </div>
                <div class="form-item">
                    <label>
                        <span class="imgIcon invite-icon"></span>
                    </label>
                    <van-field v-model="registerForm.invitationCode"  placeholder="请输入邀请码" />
                </div>
                <div class="button-box">
                    <div class="button" @click="goLogin">登录</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/service/api/index.js'
// import utils from '@/utils/utils.js'

const exp = /^1[3-9]\d{9}$/;
export default {
    name: 'register',
    data() {
        return {
            codeText: '发送验证码',
            codeStatus: false,
            codeTime: 60,
            registerForm: {
                mobile: '',
                password: '',
                code: '',
                invitationCode:''
            }
        }
    },
    created() {
      this.registerForm.invitationCode = this.$route.query.invitationCode
    },
    methods: {
        //倒计时
        countDown() {
            let that = this;
            let codeTimeDown = setInterval(function () {
                if (that.codeTime > 0) {
                    that.codeTime -= 1;
                } else {
                    that.codeText = '重新发送';
                    that.codeTime = 60;
                    that.codeStatus = false;
                    clearInterval(codeTimeDown);
                    clearInterval(codeTimeDown._id);
                }
            }, 1000)
        },
        //获取验证码
        getCode() {
            if (this.registerForm.mobile == '') {
                this.$toast('手机号不能为空')
                return false
            } else if (!exp.test(this.registerForm.mobile)) {
                this.$toast('手机号不符合规则')
                return false;
            }
            let para = {
                target: this.registerForm.mobile,
                source: 3,
                type: 4
            }

            api.logins.getMobileCode(para).then((res) => {
                if(res.code === 200){
                    this.$toast({
                        message: '短信验证码已发出'
                    });
                    this.codeStatus = true;//验证码按钮不可点
                    this.codeText = '已发送';
                    this.countDown();
                }else {
                    this.$toast(res.message)
                }

            }).catch(err => {
                this.$toast(err)
            })

        },
        goLogin() {
            let errMessge = '';
            if(this.registerForm.mobile) {
                errMessge = '请填写手机号'
            }else if(this.registerForm.code) {
                errMessge = '请获取验证码'
            }else if(this.registerForm.password) {
                errMessge = '请设置密码'
            }
            if(!errMessge) {
                this.$toast(errMessge)
                return ;
            }
            let userInfo = sessionStorage.getItem('userInfo')
            userInfo = userInfo ? JSON.parse(userInfo) : null
            let props = {
                openid: sessionStorage.getItem('short_time_openId'),
                regSource:3,
                city: sessionStorage.getItem('_cName__'),
                image: userInfo.image || '',
                region: sessionStorage.getItem('_cip__'),
                nickname: userInfo.nickname || ''
            }
            props = Object.assign(props, this.registerForm)
            console.log(props)
            api.logins.bindMobile(props).then(res => {
                if(res.code == 200) {
                    sessionStorage.setItem('__openId__',props.openid)
                    sessionStorage.setItem('__sessionId__',res.data.sessionId)
                    this.$toast('注册成功')
                    this.$router.go(-1);
                }else {
                    this.$toast(res.message)
                    // this.$router.go(-1);
                }
            }).catch(err => {
                this.$toast(err)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .register {
        position: relative;
        background: #fff;
        height: -webkit-fill-available;
        .login-bg {
            position: absolute;
            top: 0;
            left: 0;
            img {
                display: block;
                width: 100%;
            }
        }
        .login-form {
            position: relative;
            padding: 60px 25px 0px 25px;
            .form {
                position: relative;
                background: #fff;
                border-radius: 5px;
                padding-bottom: 5px;
                padding: 50px 20px 70px;
                box-shadow: 1px 1px 1px #eee;
                .form-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px #eeeeee solid;
                    .icon {
                        font-family: "lx-iconfont";
                        color: #fe605d;
                        font-size: 20px;
                    }
                }
                .button-box {
                    position: absolute;
                    margin: 0 auto;
                    left: 0;
                    bottom: -25px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .button {
                        width: 210px;
                        height: 49px;
                        line-height: 49px;
                        border-radius: 49px;
                        text-align: center;
                        color: #fff;
                        font-size: 18px;
                        background:#FE605D;
                    }
                }
            }
        }
        .tool{
            padding: 35px 25px;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                color: #fe605d;
                font-size: 14px;
            }
        }
    }
</style>
