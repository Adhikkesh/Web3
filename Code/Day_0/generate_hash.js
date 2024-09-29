const crypto = require('crypto');

var str = "Ritesh sent 10BTC to his mom";
var n = 0;
var s = '00000';

while(true){
    var s1 = `${str}${n}`;
    const hash = crypto.createHash('sha256').update(s1).digest('hex');
    if(hash.startsWith(s)){
        console.log(hash);
        console.log(n);
        break;
    }  
    n++;
}
