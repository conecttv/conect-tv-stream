const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const clientsFile = './clients.json';

app.get('/clients', (req, res) => {
  fs.readFile(clientsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler os dados');
    res.send(JSON.parse(data));
  });
});

app.post('/clients', (req, res) => {
  const newClient = req.body;
  fs.readFile(clientsFile, 'utf8', (err, data) => {
    const clients = data ? JSON.parse(data) : [];
    clients.push(newClient);
    fs.writeFile(clientsFile, JSON.stringify(clients), err => {
      if (err) return res.status(500).send('Erro ao salvar');
      res.send({ status: 'Cliente cadastrado' });
    });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));