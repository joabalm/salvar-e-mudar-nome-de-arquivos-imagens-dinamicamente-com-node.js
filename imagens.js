const http = require("http");
const express = require("express");
const bodyParser=require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());



app.get("/", function(req, res) {
    res.send("<h1>Servidor rodando com ExpressJS</h1>");
});


if (!fs.existsSync('upload')) {
  fs.mkdirSync('upload');
};

const upload = multer({ dest: '/tmp' }).array('images', 10);

function salvarimagem(imagens, caminho) {
    for (let i = 0; i < imagens.length; i++) {
      const imagemNome = `imagem-${i}.jpg`;
      fs.readFile(imagens[i].path, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          fs.writeFile(path.join(caminho, imagemNome), data, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Imagem ${imagemNome} salva com sucesso!`);
            }
          });
        }
      });
    }
  };
  

app.post('/upload', upload, (req, res) => {
  salvarimagem(req.files, './upload');
  res.send('imagem recebida e salva com sucesso');
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));




