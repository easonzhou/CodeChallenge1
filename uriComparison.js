var uriComparison = (function() {
    "use strict";
    var uriComparison = function(uri1, uri2) {
        console.log(uri1);
        console.log(uri2);
        var uriArray1 = uri1.split('/');
        var uriArray2 = uri2.split('/');
        uriArray1 = reducePath(uriArray1);
        uriArray2 = reducePath(uriArray2);

        if (uriArray1.length !== uriArray2.length) { 
            //console.log("The two urls don't have the same lengths of paths");
            return false;
        }

        // compare scheme
        if (uriArray1[0].toLowerCase() !== uriArray2[0].toLowerCase()) {
            //console.log("scheme is not equal");
            return false;
        }

        if (!compareBasicAuthHostPort( uriArray1[1], uriArray2[1])) {
            return false;
        }

        // compare each path 
        for (var i = 2; i < uriArray1.length - 1; i++) {
            if (!checkPathEquality(uriArray1[i], uriArray2[i])) {
                //console.log("The path of first uri doesn't match the path of the second uri");
                return false;
            }
        }

        return checkLastPathQueryStrings(uriArray1[uriArray1.length - 1], uriArray2[uriArray2.length - 1]);
    };

    var checkLastPathQueryStrings = function(path1, path2) {
        var str1 = path1.split('?');
        var str2 = path2.split('?');

        if (str1[0] !== str2[0]) {
            //console.log("Filename doesn't match");
            return false;
        }

        if (str1[1] === undefined && str2[1] === undefined)
            return true;
        else if (str1[1] === 'undefined' || str2[1] === 'undefined') {
            //console.log("one path has query strings while the other has no query strings");
            return false;
        }

        var params1 = str1[1].split('&');
        var params2 = str2[1].split('&');
        var params1KeyVal = {};
        var params2KeyVal = {};

        if (params1.length !== params2.length) {
            //console.log("The number of params of two urls don't match");
            return false;
        }

        for (var i = 0; i < params1.length; i++) {
            var first = params1[i].split('=');
            var second = params2[i].split('=');
            if (params1KeyVal[first[0]] === undefined)
                params1KeyVal[first[0]] = [first[1]];
            else 
                params1KeyVal[first[0]].push(first[1]);

            if (params2KeyVal[second[0]] === undefined)
                params2KeyVal[second[0]] = [second[1]];
            else 
                params2KeyVal[second[0]].push(second[1]);
        }

        return compareHashmap(params1KeyVal, params2KeyVal);
    };

    var compareHashmap = function(map1, map2) {
        var testVal;
        if (Object.keys(map1).length !== Object.keys(map2).length) {
            return false;
        }

        for (var key in map1) {
            var array = map1[key];
            var testArray = map2[key];

            if (testArray === undefined) {
                return false;
            } else {
                if (array.length !== testArray.length)
                    return false;

                for (var i = 0; i < array.length; i++) {
                    if (array[i] !== testArray[i])
                        return false;
                }
            }
        }

        return true;
    };

    var checkPathEquality = function(path1, path2) {
        var rx = /%../g;
        function convertHex2String(e) {
            e = e.slice(1);
            var reserved = ["2C", "2c", "2F", "2f", "3F", "3f", "3A", "3a", "40", "26", "3D", "3d", "2B", "2b", "24", "23"];
            if (reserved.indexOf(e) === -1)
                return hex2a(e);
            else
                return "%" + e; 
        }
        path1 = path1.replace(rx, convertHex2String);
        path2 = path2.replace(rx, convertHex2String);

        if (path1 === path2)
            return true;

        return false;
    };

    var compareBasicAuthHostPort = function(str1, str2) {
        var userAuth1 = str1.split('@');
        var userAuth2 = str2.split('@');
        if (userAuth1.length !== userAuth2.length) {
            //console.log("one uri has basic auth but the other doesn't have");
            return false;
        }

        if (userAuth1.length === 2 && userAuth2.length === 2) {
            if (userAuth1[0] !== userAuth2[0]) {
                //console.log("basic authentication is not the same ");
                return false;
            }
            if (reducePort(userAuth1[1]).toLowerCase() !== reducePort(userAuth2[1]).toLowerCase()) {
                //console.log("host name and port is not equal");
                return false;
            }
        } else if (reducePort(userAuth1[0]).toLowerCase() !== reducePort(userAuth2[0]).toLowerCase()) {
            //console.log("host name and port is not equal");
            return false;
        }

        return true;
    };

    var reducePath = function(uriArray) {
        var result = [];
        for (var i = 0; i < uriArray.length; i++) {
            if (uriArray[i] === '..') {
                result.pop();
            } else if (uriArray[i] === '.' || uriArray[i] === "") {
                continue;
            } else {
                result.push(uriArray[i]);
            }
        }
        return result;
    };

    var reducePort = function(hostPort) {
        var strArray = hostPort.split(':');
        if (strArray.length === 2 && strArray[1] === '80')
            return strArray[0];
        return hostPort;
    };

    var hex2a = function(hex) {
        return String.fromCharCode(parseInt(hex, 16));
    };

    return {
        uriComparison : uriComparison,
        // export the following methods for unit tests only 
        //checkLastPathQueryStrings : checkLastPathQueryStrings,
        //checkPathEquality : checkPathEquality,
        //hex2a : hex2a,
        //compareBasicAuthHostPort : compareBasicAuthHostPort
    };
})();

//console.log(uriComparison.checkLastPathQueryStrings("foo.html?a=1&b=2", "foo.html?b=2&a=1"))
//console.log(uriComparison.checkPathEquality("%7eabc.com", "~abc.com"));
//console.log(uriComparison.checkPathEquality("%23abc.com", "#abc.com"));
//console.log(uriComparison.hex2a('7e')); // returns '2460'
//console.log(uriComparison.compareBasicAuthHostPort("abc.com","uname:passwd@abc.com"));
//console.log(uriComparison.compareBasicAuthHostPort("admin:password@abcd.com","admin:password@abc.com"));
//console.log(uriComparison.compareBasicAuthHostPort("abc.com","abcd.com"));
//console.log(uriComparison.compareBasicAuthHostPort("admin:password1@abc.com","admin:password@abc.com"));
//console.log(uriComparison.compareBasicAuthHostPort("abc.com","abc.com"));
//console.log(uriComparison.compareBasicAuthHostPort("admin:password@abc.com","admin:password@abc.com"));

console.log(uriComparison.uriComparison('http://abc.com:80/~smith/home.html', 'http://ABC.com/%7Esmith/home.html'));
console.log('\n')
console.log(uriComparison.uriComparison('http://abc.com/drill/down/foo.html', 'http://abc.com/drill/further/../down/./foo.html'));
console.log('\n')
console.log(uriComparison.uriComparison('http://abc.com/drill/down/foo.html', 'http://abc.com/drill/further/../../drill/down/./foo.html'));
console.log('\n')
console.log(uriComparison.uriComparison('http://abc.com/foo.html?a=1&b=2', 'http://abc.com/foo.html?b=2&a=1'));
console.log('\n')
console.log(uriComparison.uriComparison('http://abc.com/foo.html?a=1&b=2&a=3', 'http://abc.com/foo.html?a=3&a=1&b=2'));
console.log('\n')
console.log(uriComparison.uriComparison('http://abc.com/foo.html?a=3&b=2&a=1', 'http://abc.com/foo.html?a=3&a=1&b=2'));
console.log('\n')
console.log(uriComparison.uriComparison('https://abc.com/foo.html?a=3&b=2&a=1', 'http://abc.com/foo.html?a=3&a=1&b=2'));
