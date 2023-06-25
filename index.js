const express = require('express');
const app = express();
app.use(express.json());

const addresses = {};

function filterAndPaginateKeys(keys, page = 1, pageSize = 10) {
  const filteredKeys = keys.filter(key => key.length >= 4 && key.length <= 8);
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return filteredKeys.slice(startIndex, endIndex);
}
app.post('/keys/:address', (req, res) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== 'foo') {
    res.status(401).json({ error: 'Invalid API key.' });
    return;
  }
  const address = req.params.address;
  const keys = req.body.keys;
  if (!addresses[address]) {
    addresses[address] = [];
  }
  const validKeys = keys.filter(key => key.length >= 4 && key.length <= 8);
  addresses[address] = addresses[address].concat(validKeys);
  res.status(200).json({ message: 'Keys added successfully.' });
});
app.get('/keys/:address', (req, res) => {
  const address = req.params.address;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  if (!addresses[address]) {
    res.status(404).json({ error: 'Address not found.' });
    return;
  }
  const filteredKeys = filterAndPaginateKeys(addresses[address], page, pageSize);
  res.status(200).json({ keys: filteredKeys });
});

app.put('/keys/:address/:key', (req, res) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== 'foo') {
    res.status(401).json({ error: 'Invalid API key.' });
    return;
  }
  const address = req.params.address;
  const key = req.params.key;

  if (!addresses[address]) {
    res.status(404).json({ error: 'Key not found.' });
    return;
  }
  if (!addresses[address].includes(key)) {
    res.status(404).json({ error: 'Key not found.' });
    return;
  }
  addresses[address] = addresses[address].filter(k => k !== key);
  addresses[address].push(key + '-invalid'); // Anahtarın sonuna "-invalid" ekleyin
  res.status(200).json({ message: 'Anahtar geçersiz olarak işaretlendi.' });
});

app.listen(3000, () => {
  console.log('The server is running on port 3000.');
});