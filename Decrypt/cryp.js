require("dotenv/config");
const sha1 = require("sha1");
const fetch = require("node-fetch");
const fs = require("fs");
const token = process.env.TOKEN;
const url = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`;
const urlPost = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`;
const fileName = "answer.json";
const FormData = require("form-data");
const characters = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26
};

const numbers = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  5: "e",
  6: "f",
  7: "g",
  8: "h",
  9: "i",
  10: "j",
  11: "k",
  12: "l",
  13: "m",
  14: "n",
  15: "o",
  16: "p",
  17: "q",
  18: "r",
  19: "s",
  20: "t",
  21: "u",
  22: "v",
  23: "w",
  24: "x",
  25: "y",
  26: "z"
};

function fetchData(url) {
  fetch(url)
    .then(res => res.json())
    .then(json => {
      fs.writeFile(fileName, JSON.stringify(json), function(err) {
        if (err) throw err;
        console.log("JSON Generated!");
        decrypt(json);
      });
    });
}

function postData() {
  const formData = new FormData();

  formData.append("answer", fs.createReadStream("answer.json"));

  fetch(urlPost, {
    method: "post",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(res => res.json())
    .then(json => console.log(json));
}

function decrypt(json) {
  const { numero_casas, cifrado } = json;

  const decryptText = cifrado
    .split("")
    .map(char => {
      if (char.toUpperCase() !== char.toLowerCase()) {
        if (characters[char] - numero_casas < 0) {
          const charNumber = characters[char] - numero_casas;
          char = numbers[26 - Math.abs(charNumber)];
        } else {
          char = numbers[characters[char] - numero_casas];
        }
        return char;
      }
      return char;
    })
    .join("");

  console.log("Crypted: ", cifrado);
  console.log("Decrypted: ", decryptText);

  let content = JSON.parse(fs.readFileSync(fileName, "utf8"));

  content.decifrado = decryptText;
  content.resumo_criptografico = sha1(decryptText);

  fs.writeFileSync(fileName, JSON.stringify(content));

  postData();
}

fetchData(url);
