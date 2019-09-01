/**
 * 金额千分制格式化
 * @param  {[Number]} 金额
 * @retrun  {[String]} 返回千分制金额
 */
function formatNumber(num) {
    if (isNaN(num)) {
        throw new TypeError('num is not a number');
    }
    return ('' + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
}
/**
 * 金额千分制格式化去除
 * @param  {[Number]} 金额
 * @retrun  {[String]} 返回千分制金额
 */
function rmoney(s) {
    return parseFloat(s.replace(/[^\d\.-]/g, ''));
}
export {
    formatNumber,
    rmoney,
};
