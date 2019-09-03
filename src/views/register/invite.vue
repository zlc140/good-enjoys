<template>
    <div class="invite-box" :class="{show:isShow}">
        <div class="qrcode-body">
            <img class="qrCode" src="./_img/qrCode.png" :style="qrCodeStyle" alt="">
            <canvas ref="qrcode"></canvas>
        </div>

        <img :src="qrcodeImg" v-show="isShow" alt="" style="position: absolute;top:0;left: 0;z-index: 9">
    </div>
</template>
<script>
import html2canvas from 'html2canvas';
import lrz from 'lrz';

const qrCodeWidth = 0.324;
const qrLeft = 0.3604;
const qrTop = 0.7;
const screenWidth = document.body.offsetWidth||window.screen.width;

export default {
    data() {
        return {
            isShow: false,
            qrcodeImg: require('./_img/invite.png'),
            qrCodeStyle: {}
        }
    },
    created() {
        this.capture();
        let qTop = screenWidth * qrTop;
        let qLeft = screenWidth * qrLeft;
        let qWidth = screenWidth * qrCodeWidth;
        this.qrCodeStyle = {
            width: qWidth + 'px',
            top: qTop + 'px',
            left: qLeft + 'px'
        }
        console.log(screenWidth,this.qrCodeStyle)
    },
    methods: {
        setCanvas() {
          let convasObj = this.$refs.qrcode;
          convasObj.width = screenWidth;
          convasObj.height = '100%';

          let context = convasObj.getContext('2d')
          context.drawImage(this.qrcodeImg,0,0)
        },
        // 分享海报生成
        capture() {

            // 根据图片来设置容器的尺寸
            imgSetWidth(this.qrcodeImg, (img) => {
                let container = this.$refs.qrcode.parentNode;

                setWidth(img.width, img.height, container);

                container.style.backgroundImage = 'url(' + this.qrcodeImg + ')';
                container.style.backgroundSize = 'cover'
                // 截图生成canvas
                html2canvas(container, {
                    userCORS: true,
                    // scale: 1
                }).then((canvas) => {

                    // this.qrcodeImg = canvas.toDataURL("image/png");
                    lrz(canvas.toDataURL("image/png"), {quality: 0.8, width: document.querySelector('html').offsetWidth + 100})
                        .then(rst => {
                            // 处理成功会执行
                            // this.qrcodeImg = window.URL.createObjectURL(rst.file);
                            this.qrcodeImg = rst.base64;
                        })
                        .catch(function (err) {
                            // 处理失败会执行
                            console.log(err)
                        })
                        .always(function () {
                            // 不管是成功失败，都会执行
                        });
                    this.isShow = true;
                });
            });


        }
    }
}
// 设置容器宽度
function setWidth(maxWidth, maxHeight, container) {
    let width = document.querySelector('html').offsetWidth;

    let height = maxHeight / maxWidth * width;
    container.style.height = height + 'px';
    container.style.width = width + 'px';
}
// 根据图片尺寸设置容器高宽
function imgSetWidth(src, callback) {
    var image = new Image();
    image.setAttribute("crossOrigin", 'Anonymous');

    image.onload = function () {
        setTimeout(function () {
            callback(image)
        }, 500)
    };

    image.onerror = function () {
        callback(false)
    };
    image.src = src;
}
</script>


<style lang="scss">
    .invite-box{
        background-color: #fdf9be;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        img{
            width: 100%;
        }
        .qrCode{
            width: 33%;
            position: absolute;
            top: 40%;
            left: 35%;
            z-index: 9;
        }
    }
</style>
