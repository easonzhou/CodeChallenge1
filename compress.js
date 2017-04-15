var compress = (function() {
    "use strict";

    var compressString = function (str) { 
        console.log("Input: ", str)
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

console.log("Return: ", compress.compressString('aaaabbaaaababbbcccccccccccc'));
console.log('\n')
console.log("Return: ", compress.compressString('aaaaaaaaaaaaalllllllldddfffeeeeeeeebbbbbbbbeggggggggabbaaaababbbccccccccccccccccccccccccccc'));
console.log('\n')
console.log("Return: ", compress.compressString('a'));
console.log('\n')
console.log("Return: ", compress.compressString('abc'));
console.log('\n')
console.log("Return: ", compress.compressString());
console.log('\n')
console.log("Return: ", compress.compressString(''));
