
const configs = {};
// 环境配置
switch (process.env.NODE_ENV) {
    case 'development':
        configs.API_SRC = 'http://mxynb.natapp1.cc';
        configs.IMAGE_SRC = 'http://mxynb.natapp1.cc/app/picture/pictureId?pictureId=';
        break;
    case 'production':
        configs.API_SRC = 'http://mxynb.natapp1.cc';
        configs.IMAGE_SRC = 'http://mxynb.natapp1.cc/app/picture/pictureId?pictureId=';
        break;
}

export default configs;
