import express from 'express';
import multer from 'multer'
import mongoose, { isValidObjectId } from 'mongoose';
import cors from 'cors'
import  { loginValidation, postCreateValidation, registerValidation } from './validation.js'

import { UserController, PostController, CommentController } from './controllers/index.js';

import { checkAuth, handleValidationErors } from './utils/index.js';
const app = express();

const storage = multer.diskStorage({
    destination: (_ , __, cb) => {
        cb(null,'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage });



app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'))

mongoose
    .connect('mongodb://localhost:27017/blog')
    .then(() => console.log("DB ok"))
    .catch((err) => console.log('Db error', err))

app.get('/auth/me', checkAuth, UserController.getMe )
app.post('/auth/login', loginValidation, handleValidationErors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErors, UserController.register)

app.post('/upload', checkAuth, upload.single('image'), (req,res) => 
{
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.post('/posts', checkAuth, postCreateValidation, handleValidationErors, PostController.create);

app.get('/posts', PostController.getAll);
app.get('/tags', PostController.getLastTags);
app.get('/posts/:id',  PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id',checkAuth, postCreateValidation, handleValidationErors, PostController.update);



app.get('/comments', CommentController.getAllCommentsByPost);
app.get('/comments/:id',  CommentController.getComment);
app.post('/comments', checkAuth, CommentController.createComment);




app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server OK!");
});