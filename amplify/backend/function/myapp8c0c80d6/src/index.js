const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');           // ← 追加
const app = express();
app.use(bodyParser.json());

/* ===== DynamoDB 設定 ===== */
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.STORAGE_TODOTABLE_NAME; // amplify が環境変数で挿入する

/* ====== ① GET /items – 全件取得 ====== */
app.get('/items', async (_req, res) => {
  try {
    const data = await docClient.scan({ TableName: TABLE_NAME }).promise();
    res.json(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failed to scan' });
  }
});

/* ====== ② POST /items – 新規追加 ====== */
app.post('/items', async (req, res) => {
  const { title, comment } = req.body;
  const item = {
    id: Date.now().toString(),   // 例: タイムスタンプを ID に
    title,
    comment,
  };

  try {
    await docClient.put({
      TableName: TABLE_NAME,
      Item: item,
    }).promise();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failed to put' });
  }
});

/* デフォルト（ヘルスチェックなど） */
app.get('/', (_req, res) => {
  res.json({ message: 'hello from todoApi' });
});

module.exports = app;
