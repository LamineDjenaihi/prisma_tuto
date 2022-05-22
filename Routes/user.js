const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const {user} = new PrismaClient();

router.get('/All', async (req, res)=>{
        const users = await user.findMany({
            select : {
                userID : true,
                username : true
            }
        });
        res.json(users);
})
router.post('/newUser',async (req, res)=>{
    const { username } = req.body;
    const userExists = await user.findUnique({
        where:{
            username
        }, select:{
            username: true
        }
    });
    if(userExists){
        return res.status(400).json({
            msg: "the user is already exists"
        })
    }
    const newUser = await  user.create({
        data: {
            username
        }
    });
    res.json(newUser);
});
module.exports = router;