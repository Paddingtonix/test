const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const fs = require('fs');
const app = express();
const multer = require('multer');
const port = 3001; // выберите подходящий порт

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public'); // Путь, куда сохранять файлы
  },
  filename: (req, file, cb) => {
    cb(null, 'test.xlsx'); // Имя файла
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // const uploadedFilePath = req.file.path;
  
  res.status(200).send({success: true});
});

app.post('/parser', (req, res) => {
  exec('parser_1.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка выполнения скрипта: ${error}`);
      return res.status(500).send('Ошибка выполнения скрипта');
    }
    console.log(`Скрипт выполнен успешно: ${stdout}`);

    const dataToWrite = 'Некоторые данные для записи в файл';
    fs.writeFileSync('./test.xlsx', dataToWrite, 'utf-8');

    res.send('Скрипт выполнен успешно');
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
