const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./Routes/user');
const postRouter = require('./Routes/post');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/users',userRouter);
app.use('/api/posts',postRouter);
const port = 5000;

app.listen(port, ()=>console.log(`server is listening in port ${port}`));