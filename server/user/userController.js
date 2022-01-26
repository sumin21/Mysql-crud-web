const mql = require('../models/mysql-db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    creatUser: (req, res) =>{
        //회원가입 할때 필요한 정보들을 client에서 가져오면
        //그것들을 데이터 베이스에 넣어준다.
        console.log("🚀 ~ req.body", req.body)
        const param = [req.body.name, req.body.email, req.body.password]

        // 회원가입 시 비밀번호 
        bcrypt.hash(param[2], saltRounds, (error, hash)=>{
            param[2] = hash
            mql.query('INSERT INTO users(`name`, `email`, `password`) VALUES (?,?,?)', param, (err, row) => {
            if(err) return res.json({success: false, err})
            })
        })

    }
}