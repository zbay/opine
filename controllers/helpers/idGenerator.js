var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
 
module.exports = function(){
    var charsAdded = 0;
    var randomID = "";
    for(var i = 0; i < 18; i++){
        randomID += chars[Math.floor(Math.random() * chars.length)];
        charsAdded++;
        if(charsAdded >= 18){
            return randomID;
        }
    }
}