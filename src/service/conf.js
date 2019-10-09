
const configs = {};
// 环境配置
switch (process.env.NODE_ENV) {
    case 'development':
        configs.API_SRC = '';
        configs.IMAGE_SRC = 'https://www.viphxs.com:8080/app/picture/pictureId?pictureId=';
        break;
    case 'production':
        configs.API_SRC = '';
        configs.IMAGE_SRC = 'https://www.viphxs.com:8080/app/picture/pictureId?pictureId=';
        break;
}

export default configs;
