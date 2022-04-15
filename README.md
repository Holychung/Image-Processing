# Image-Processing
Stream an image from a url to your computer and flip it along the Y and X axis.

## Getting started
```
yarn install
```

## Package 
- axios: a promise-based HTTP Client for node.js and the browser.
- sharp: High performance Node.js image processing module.
- jest: a JavaScript testing framework.

## Directories 

`tmp/` stores images without flipping 
`img/` stores images after flipping
`download.js` provides functions to download and flip an image
`download.test.js` for automated tests

```
.
├── README.md
├── download.js
├── download.test.js
├── img
│   ├── img0.jpg
│   ├── img1.jpg
│   ├── img2.jpg
│   ├── img3.jpg
│   └── img4.jpg
├── package.json
├── tmp
│   ├── 0ZKUiii6vtMGoY9lYPML.jpg
│   ├── Ajm8Dav0BFtTtEG1BZXu.jpg
│   ├── LsTV1BNY6oOUvr5Di9IW.jpg
│   ├── eIqIQav1ooQgRtE4uZqn.jpg
│   ├── gtI72tUmjdcf1ZsA8MGf.jpg
│   └── zSclKkiBBkBcvXNkybzW.jpg
└── yarn.lock
```

## Automated Tests
### Before test
`tmp/` and `img/` will be cleaned up automatically.

### 10 Test Cases
#### Normal Test
* download a very small image 
    * should return "Success"
* download a small image
    * should return "Success"
* download a large image
    * should return "Success"
* download a very large image
    * should return "Success"
* download a random image
    * should return "Success"

#### Error Test
* when the fileUrl is empty
    * should return "Invalid argument"
* when the fileName is empty
    * should return "Invalid argument" 
* when the fileUrl is undefined
    * should return "Invalid argument" 
* when the fileName is undefined
    * should return "Invalid argument" 
* when the request url is not an image
    * should return "Error"

### Usage
```
yarn test
```

#### Expected Output
![](https://i.imgur.com/NpjwcI4.png)


## Thanks