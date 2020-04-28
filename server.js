const http = require("http");
const jsonBody = require("body/json");
const fs = require("fs");
const url = require("url");

function shiftString(input, shift) {
  /**
   * Some assumptions
   * input/output processed as lowercase alphabet (a-z) and spaces
   * Thus: 'a' or 'A' shifted by 1 is 'b'
   * 'z' shifted by 1 is 'a'
   */
  const arr = [...input];
  const ZCODE = 122;
  const WRAPCODE = 96;
  const output = arr.map((item) => {
    if (item === " ") {
      return item;
    } else {
      let charCode = item.charCodeAt();
      if (charCode + shift > ZCODE) {
        return String.fromCharCode(((charCode + shift) % ZCODE) + WRAPCODE);
      } else {
        return String.fromCharCode(charCode + shift);
      }
    }
  });
  return output.join("");
}

const server = http.createServer();
server.on("request", (request, response) => {
  const parseUrl = url.parse(request.url, true);
  if (request.method === "POST" && parseUrl.pathname === "/api/encode") {
    jsonBody(request, response, (err, body) => {
      if (err) {
        response.statusCode = 500;
        response.end();
      } else {
        let codedData = shiftString(body.Message, body.Shift);
        var encoding = "utf8";
        fs.writeFile("shifted.txt", codedData, encoding, (err) => {
          if (err) {
            response.statusCode = 500;
            response.end();
          }
          // success case, the file was saved
          response.end(JSON.stringify({ EncodedMessage: codedData }));
        });
      }
    });
  } else {
    response.statusCode = 400;
    response.end();
  }
});

server.listen(23456);
