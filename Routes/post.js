const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const {user, post} = new PrismaClient();

router.post('/newPost', async (req, res)=>{
    const { title, content, user_id } = req.body;
    const userExists = await user.findUnique({
       where:{
        userID: parseInt(user_id) 
       } 
    });

    if(!userExists){
        return res.status(400).json({
            msg: "the user not found"
        })
    }

    const newPost = await post.create({
        data: {
            title,
            post: content,
            user_id: parseInt(user_id)  
        }
    });
    res.json(newPost);
});

router.get('/:user_id', async (req, res)=>{
    const { user_id } = req.params;

    const postsOfUser = await post.findMany({
        where:{
            user_id: parseInt(user_id)
        },
    });
    res.json(postsOfUser);
});

module.exports = router;