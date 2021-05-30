const express = require('express');
const multer  = require('multer');
const homeController = require('./controllers/home');
const mainController = require('./controllers/main');

const PORT = 2001
const app = express();
const upload = multer({ dest: 'public/uploads/' })

app.use('/public', express.static('public'))
app.set('view engine', 'ejs')

app.get('/', homeController)
app.post('/img-mod', upload.single('image'), mainController);

app.listen(PORT, () => console.log(`running ${PORT}`));

