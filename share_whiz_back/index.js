const express = require("express");
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads'))

const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.listen(3000, () => {
    console.log("Listening on localhost port 3000");
});

app.post("/posts", upload.single('image'), async (req, res) => {
  console.log("リクエストボディ",req.body)
  try {
    const imagePath = req.file ? `uploads/${req.file.filename}` : null; 
    const postData = await prisma.task.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        image: imagePath,
      },
    });

   if (postData.image) {
      postData.image = `http://localhost:3000/${postData.image}`
      console.log(postData.image)
    } else {
      postData.image = null;
    }

    res.json(postData)
  } catch(error) {
    console.log(error)
    res.status(500).send("タスクの保存に失敗しました")
  }
});

