const express = require('express')
const app = express()
const port = 5000

const bodyParser = require("body-parser");
const config = require('./config/key');//
const cookieParser = require("cookie-parser");

const {auth} = require("./middleware/auth");


const {creatUser, loginUser, authUser, logoutUser} = require('./user/userController');

//application/x-www-form-urlencoded 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application.json 을 분석해서 가져옴
app.use(bodyParser.json());
//cookie
app.use(cookieParser());

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
app.post('/api/users/login', loginUser);


//middleware
app.get('/api/users/auth', auth, authUser);

//logout (login된 상태이기 때문에 auth를 넣어준다.)
app.get('/api/users/logout', auth, logoutUser);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})