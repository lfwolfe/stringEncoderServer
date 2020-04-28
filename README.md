# Encoder

This is a node server that accepts a key value 
```{"Message":"apples and pear", "Shift":1}```

Response is an encoded message shifted by the shift value in the input json ex:```{"EncodedMessage":"bqqmft boe qfbs"}```
### Some assumptions
* input/output processed as lowercase alphabet (a-z) and spaces ex: 'a' or 'A' shifted by 1 is 'b'
* Will wrap so 'z' shifted by 1 is 'a'

## Installation
must have node installed

npm install body

npm install http

node server.js


## License
[MIT](https://choosealicense.com/licenses/mit/)
