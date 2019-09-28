import request from '@/service/request.js';
const details = {};

details.getArticleDetails = (params) => request({
    url: `/app/article/getArticleById?id=${params.id}`,
    method: 'GET',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' },
});

details.getApplyDetails = (params) => request({
    url: `/app/report/getReportDetail?id=${params.id}`,
    method: 'GET',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' },
});

details.addSignin = (params, sessionId) => request({
    url: `/app/signin?type=${params.type}`,
    method: 'GET',
    headers: { 'Content-Type': 'multipart/form-data','sessionId': sessionId },
})
export default details;
