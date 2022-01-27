const mql = require('../models/mysql-db');

module.exports = {
    myPage: (req, res) =>{
        mql.query("SELECT name, email FROM users WHERE id=?", req.user.id, (err, row)=>{
            if(err) return res.json({success: false, error: err});
            return res.status(200).send({success:true, name:row[0].name, email:row[0].email});
        })
    }
}