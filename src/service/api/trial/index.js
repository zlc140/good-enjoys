import request from '@/service/request.js';
const trial = {};

trial.getDetails = (params) => request({
    url: `/app/product/getProductDetail?id=${params.id}&type=3`,
    method: 'GET',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' },
});

export default trial;
