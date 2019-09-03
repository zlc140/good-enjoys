import Url from './url';
// 微信配置
const wxConf = {
    appId: 'wx65592301759db4a4', //wx2eb3e05b46f61f34（lovego.tesm），wx5db1f717b73bf215(测试)，wx65592301759db4a4（好享试）
    state: 'lona',
    jsApiList: [  ]
};
// 存储key
const codeKey = 'sys__wx__code__';
const openIdKey = 'sys__wx__openId__';

let isWechat = navigator.userAgent.match(/MicroMessenger|wechat/i);

/**
 * 微信页面授权
 */
function authorize() {
    // let urlData = Url.toObject(location.href);

    localStorage.setItem('ignoreCheckRegister','true');
    // 避免页面授权死循环
    // if ( urlData.code && urlData.state === wxConf.state && localStorage.getItem(codeKey) === urlData.code) return localStorage.removeItem(codeKey);
    let option = {
        appid: wxConf.appId,
        redirect_uri: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.hash /*'http://weixin.lovego.com/#/pay' || 'http://mobile.tesb.lovego.xin/#/home/index' ||*/,
        response_type: 'code',
        scope: 'snsapi_userinfo',
        state: wxConf.state
    };
    let url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    console.log(Url.computedUrl(url, option) + '#wechat_redirect')
    window.location.href = Url.computedUrl(url, option) + '#wechat_redirect'
}

export default {
    authorize,
    isWechat,
    openIdKey,
    codeKey

}
