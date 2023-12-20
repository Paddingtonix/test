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
    cb(null, './uploads'); // Путь, куда сохранять файлы
  },
  filename: (req, file, cb) => {
    cb(null, 'test.xlsx'); // Имя файла
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const uploadedFilePath = req.file.path;

  // Удаление предыдущего файла test.xlsx
  const previousFilePath = './uploads/test.xlsx';
  try {
    if (fs.existsSync(previousFilePath)) {
      fs.unlinkSync(previousFilePath);
      console.log('Предыдущий файл успешно удален');
    }
  } catch (err) {
    console.error('Ошибка при удалении предыдущего файла:', err);
    return res.status(500).send('Ошибка при удалении предыдущего файла');
  }

  // Переименование загруженного файла в test.xlsx
  const newFilePath = './uploads/test.xlsx';
  try {
    fs.renameSync(uploadedFilePath, newFilePath);
    console.log('Загруженный файл успешно перемещен в test.xlsx');
  } catch (err) {
    console.error('Ошибка при перемещении загруженного файла:', err);
    return res.status(500).send('Ошибка при перемещении загруженного файла');
  }

  res.send('Файл успешно загружен и заменен');
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
