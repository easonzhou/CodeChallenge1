var compress = (function() {
    "use strict";

    var compressString = function (str) {
        if ( str === undefined || str.length === 0 )
            return '';

        var character = str[0];
        var count = 1;
        var result = []; 

        for ( var i = 1; i < str.length; i++ ) {
            if ( str[i] === character )
                count++;
            else {
                result.push(character);
                result.push(count);

                character = str[i];
                count = 1;
            }
        }

        result.push(character);
        result.push(count);

        return result.join('');
    };

    return {
        compressString : compressString
    };
})();

console.log(compress.compressString('aaaabbaaaababbbcccccccccccc'));
console.log(compress.compressString());
console.log(compress.compressString(''));
console.log(compress.compressString('a'));
