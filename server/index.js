const express = require('express')
const app = express()
const port = 5000

const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const config = require('./config/key');//
const cookieParser = require("cookie-parser");

const {User} = require("./models/User");
const {auth} = require("./middleware/auth");

const mql = require('./models/mysql-db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const {creatUser} = require('./user/userController');

//application/x-www-form-urlencoded 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application.json 을 분석해서 가져옴
app.use(bodyParser.json());
//cookie
app.use(cookieParser());

mongoose.connect(config.mongoURI).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


//route
app.get('/', (req, res) => {
  res.send('hi')
})

//route
app.get('/api/hello', (req, res) => {
  res.send('hello')
})

//회원가입 route
app.post('/api/users/register', creatUser);  

//login route
app.post('/api/users/login', (req, res) => {

  const param = [req.body.email, req.body.password]
  console.log("🚀 ~ param", param)
  
  mql.query('SELECT * FROM users WHERE email=?', param[0], (err, row) =>{
    if(err) return res.json({success:false, err})
    console.log('이메일 있음')
    console.log(row.length)
    
    if(row.length > 0){
      //user 존재 -> 비밀번호 확인
      bcrypt.compare(param[1], row[0].password, (error, result)=>{
        console.log(result)
        if(result){
          //성공
          //비밀번호 일치 -> token 생성
          console.log('login')
      
          let userToken = jwt.sign(row[0].id, 'secretToken')
          mql.query('UPDATE users SET token=? WHERE email=? AND password=?', [userToken, ...param], (err, row)=>{
            if(err) return res.status(400).send(err);
            console.log('token created')            
            res.cookie("x_auth", userToken).status(200).json({
              login: true,
              token: userToken
            })
          })
        } else{
          //비밀번호 불일치
          return res.json({
            login: false,
            err: "비밀번호가 틀렸습니다."
          })
        }
      })
    }
    else{
      //user 없음
      return res.json({
        login: false,
        err: "해당 이메일의 유저가 없습니다."
      })
    }
  })

})


//middleware
app.get('/api/users/auth', auth, (req,res) => {
  //인증 완료
  let user = req.user;
  //role:0 -> 일반인
  //role:1,2.... -> 관리자
  res.status(200).json({
    _id: user._id,
    isAdmin: user.role === 0 ? false : true,
    isAuth: true,
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    role: user.role,
    image: user.image
  })
})

//logout (login된 상태이기 때문에 auth를 넣어준다.)
app.get('/api/users/logout', auth, (req,res) => {
  User.findOneAndUpdate({_id: req.user._id}, {token:""}, (err, user)=> {
    if(err) return res.json({success: false, error: err});
    return res.status(200).send({success:true})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})