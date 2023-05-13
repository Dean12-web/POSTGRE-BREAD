var express = require('express');
var router = express.Router();
const moment = require('moment')

module.exports = (pool) => {
  /* GET home page. */

  // pool.query('SELECT * FROM data', (err, res) => {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log(res.rows)
  //   }
  // })
  // pool.end()
  router.get('/', function (req, res, next) {
    const currentDate = `SELECT date FROM data WHERE id = 1`
    const sql = `SELECT * FROM data`
    pool.query(sql,(err,row)=>{
      if(err){
        console.error(err)
      }else{
        // console.log(row.rows[0].date)
        const date = row.rows[0].date
        res.render('index', { title: 'POSTGRE-Breads',data : row.rows, moment});
      }
    })
  });
  router.get('/add', (req, res, next) => {
    res.render('add', { title: 'Add' })
  });

  router.post('/add', (req,res,next)=>{
    const string = req.body.string
    const integer = req.body.integer
    const float = req.body.float
    const date = req.body.date
    let convertDate = moment(date).format('YYYY-MM-DD');
    const boolean = req.body.boolean
    const sql = `INSERT INTO data(string,integer,float,date,boolean) VALUES('${string}', ${integer}, ${float},'${convertDate}',${boolean})`
    pool.query(sql,(err)=>{
      if(err){
        console.error(err)
      }else{
        console.log('ADDING DATA SUCCESS')
        res.redirect('/')
      }
    });
  });
  return router
}

// module.exports = router;
