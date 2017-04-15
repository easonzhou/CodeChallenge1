# Code Challenge 1
This is the answer for the string compression and uri comparison.

## How to run the source code 
First question:

    $ node compress.js

I have 5 unit test cases: One from zendesk question, another longer string, two very simple strings, and two edge cases (which return empty strings). The output of the strings should be as follows:

	Input:  aaaabbaaaababbbcccccccccccc
	Return:  a4b2a4b1a1b3c12
	
	
	Input:  aaaaaaaaaaaaalllllllldddfffeeeeeeeebbbbbbbbeggggggggabbaaaababbbccccccccccccccccccccccccccc
	Return:  a13l8d3f3e8b8e1g8a1b2a4b1a1b3c27
	
	
	Input:  a
	Return:  a1
	
	
	Input:  abc
	Return:  a1b1c1
	
	
	Input:  undefined
	Return:
	
	
	Input:
	Return:
	
    ..


Second Question:

	$ node uriComparison.js
	
Similarly I have 7 unit test cases.  The result is:

	http://abc.com:80/~smith/home.html
	http://ABC.com/%7Esmith/home.html
	true
	
	
	http://abc.com/drill/down/foo.html
	http://abc.com/drill/further/../down/./foo.html
	true
	
	
	http://abc.com/drill/down/foo.html
	http://abc.com/drill/further/../../drill/down/./foo.html
	true
	
	
	http://abc.com/foo.html?a=1&b=2
	http://abc.com/foo.html?b=2&a=1
	true
	
	
	http://abc.com/foo.html?a=1&b=2&a=3
	http://abc.com/foo.html?a=3&a=1&b=2
	false
	
	
	http://abc.com/foo.html?a=3&b=2&a=1
	http://abc.com/foo.html?a=3&a=1&b=2
	true
	
	
	https://abc.com/foo.html?a=3&b=2&a=1
	http://abc.com/foo.html?a=3&a=1&b=2
	false
	
There are also some unit tests commented out for the helper methods in the file.

