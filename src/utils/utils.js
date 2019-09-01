export default {
    //随机码
    randomCode:function(num){
        let numInit = parseInt(num);
        let Arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",1,2,3,4,5,6,7,8,9,0];
        let len = Arr.length;
        let code = '';
        for(let i = 0; i<numInit; i++){
            code += Arr[Math.floor( Math.random()*len )];
        }
        return code;
    },
}
