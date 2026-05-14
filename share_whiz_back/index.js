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
})

app.get("/posts", async(req, res) => {
  try {
  const AllTasks = await prisma.task.findMany();
  const updatedTasks = AllTasks.map((task) => {
    if (task.image) {
      task.image = `http://localhost:3000/${task.image}`
    } else {
      task.image = null;
    }
    return task;
  });

  res.json(updatedTasks)
  } catch(error) {
  console.log(error)
  }
});

app.get('/search', async (req, res) => { 
 const query = req.query.q || ''; 
 
 try { 
   const tasks = await prisma.task.findMany({ 
     where: { 
       title: { 
         contains: query,  
         mode: 'insensitive'  
       } 
     }, 
     orderBy: { 
      created_at: 'desc'
     } 
   }); 
 
   const updatedTasks = tasks.map((task) => { 
     if (task.image) { 
       task.image = `http://localhost:3000/${task.image}` 
     } else { 
       task.image = null; 
     } 
     return task; 
   }); 
 
   res.json(updatedTasks);  
 } catch (error) { 
   console.error("検索処理に失敗しました:", error); 
   res.status(500).json({ message: "検索処理に失敗しました" }); 
 } 
}); 