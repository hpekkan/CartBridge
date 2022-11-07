const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
//if you want in every domain then
app.use(cors())
const db = mysql.createPool({
   connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
   user: "root",         // "newuser" created in Step 1(e)
   password: "23362336",  // password for the new user
   database: "515",      // Database name
   port: "3306"             // port name, "3306" by default
})
db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})
const port = 3008
app.listen(port, 
()=> console.log(`Server Started on port ${port}...`))

app.use(express.json())
//middleware to read req.body.<params>
//CREATE USER
app.post("/createUser", async (req,res) => {
const user = req.body.name;
console.log(user)
db.getConnection( async (err, connection) => {
 if (err) throw (err)
 const sqlSearch = "SELECT * FROM kullanici WHERE kullanici_adi = ?"
 const search_query = mysql.format(sqlSearch,[req.body.kullaniciadi])
 const genRand = (len) => {
    return Math.random().toString(36).substring(2,len+2);
  }
  const id = genRand(8)
  console.log(req.body)
 const sqlInsert = "INSERT INTO kullanici VALUES (?,?,?,?,?,?,?,?,0)"
 const insert_query = mysql.format(sqlInsert,[id,user,req.body.surname,req.body.email,req.body.telno,req.body.adres,req.body.kullaniciadi, req.body.password])

 await connection.query (search_query, async (err, result) => {
  if (err) throw (err)
  console.log("------> Search Results")
  console.log(result.length)
  if (result.length != 0) {
   connection.release()
   console.log("------> User already exists")
   res.sendStatus(409) 
  } 
  else {
   await connection.query (insert_query, (err, result)=> {
   connection.release()
   if (err) throw (err)
   console.log ("--------> Created new User")
   console.log(result.insertId)
   res.sendStatus(201)
  })
 }
}) 
}) 
}) 

app.post("/Login", async (req,res) => {
    db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSearch = "SELECT * FROM kullanici WHERE kullanici_adi = ? AND sifre = ?"
     const search_query = mysql.format(sqlSearch,[req.body.kullaniciadi,req.body.password])
     await connection.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      console.log(result.length)
      if (result.length < 1) {
       connection.release()
       console.log("------> User not exists")
       res.sendStatus(401) 
      } 
      else {
        connection.release()
        if (err) throw (err)
        console.log ("--------> Login Successful")
        res.sendStatus(200)
      
     }
    }) 
    }) 
    }) 

    app.post("/createCC", async (req,res) => {
        db.getConnection( async (err, connection) => {
         if (err) throw (err)
         const sqlSearch = "SELECT * FROM sahiptir WHERE kullanici_adi = ? and kart_id in (select kart_id from kart where kart_no = ?) "
         const search_query = mysql.format(sqlSearch,[req.body.kullanici_adi,req.body.kart])
         const genRand = (len) => {
            return Math.random().toString(36).substring(2,len+2);
          }
          const id = genRand(8)
          console.log(req.body)
         const sqlInsert = "INSERT INTO kart VALUES (?,?,?,?,?)"
         const insert_query = mysql.format(sqlInsert,[id,req.body.kart,req.body.cvv,req.body.isim,req.body.gecerlilik])
         const sqlInsert2 = "INSERT INTO sahiptir VALUES (?,?)"
         const insert_query2 = mysql.format(sqlInsert2,[req.body.kullanici_adi,id])
        
         await connection.query (search_query, async (err, result) => {
          if (err) throw (err)
          console.log("------> Search Results")
          console.log(result.length)
          if (result.length != 0) {
           connection.release()
           console.log("------> Card already exists")
           res.sendStatus(409) 
          } 
          else {
           await connection.query (insert_query, (err, result)=> {
           if (err) throw (err)
           console.log ("--------> Created new User")
           console.log(result.insertId)
          })
          await connection.query (insert_query2, (err, result)=> {
            connection.release()
            if (err) throw (err)
            console.log ("--------> Created new Sahiptir Relation")
            console.log(result.insertId)
            res.sendStatus(201)
           })
         }
        }) 
        }) 
        }) 
        
    app.get("/HepsiburdaData", async (req,res) => {
        db.getConnection( async (err, connection) => {
         if (err) throw (err)
         const sqlSearch = "SELECT * FROM urun WHERE magaza_id = '1'"
         await connection.query (sqlSearch, async (err, result) => {
          if (err) throw (err)
          console.log("------> Search Results")
          console.log(result.length)
          if (result.length < 1) {
           connection.release()
           console.log("------> Urun not exists")
           res.sendStatus(401) 
          } 
          else {
            connection.release()
            if (err) throw (err)
            console.log ("--------> Urun Successful")
            res.send(result)
          
         }
        }) 
        }) 
        }) 
        app.get("/AmazinData", async (req,res) => {
            db.getConnection( async (err, connection) => {
             if (err) throw (err)
             const sqlSearch = "SELECT * FROM urun WHERE magaza_id = '2'"
             await connection.query (sqlSearch, async (err, result) => {
              if (err) throw (err)
              console.log("------> Search Results")
              console.log(result.length)
              if (result.length < 1) {
               connection.release()
               console.log("------> Urun not exists")
               res.sendStatus(401) 
              } 
              else {
                connection.release()
                if (err) throw (err)
                console.log ("--------> Urun Successful")
                res.send(result)
              
             }
            }) 
            }) 
            }) 
            app.get("/TrendiolData", async (req,res) => {
                db.getConnection( async (err, connection) => {
                 if (err) throw (err)
                 const sqlSearch = "SELECT * FROM urun WHERE magaza_id = '3'"
                 await connection.query (sqlSearch, async (err, result) => {
                  if (err) throw (err)
                  console.log("------> Search Results")
                  console.log(result.length)
                  if (result.length < 1) {
                   connection.release()
                   console.log("------> Urun not exists")
                   res.sendStatus(401) 
                  } 
                  else {
                    connection.release()
                    if (err) throw (err)
                    console.log ("--------> Urun Successful")
                    res.send(result)
                  
                 }
                }) 
                }) 
                }) 
            
                app.get("/getCard", async (req,res) => {
                  db.getConnection( async (err, connection) => {
                   if (err) throw (err)
                   console.log(req.body)
                   const sqlSearch = "SELECT * FROM kart where kart_id in (select kart_id from sahiptir where kullanici_adi = ?)"
                  const search_query = mysql.format(sqlSearch,[req.query.kullanici_adi])

                   await connection.query (search_query, async (err, result) => {
                    if (err) throw (err)
                    console.log("------> Search Results")
                    console.log(result.length)
                    if (result.length < 1) {
                     connection.release()
                     console.log("------> Kart not exists")
                     res.sendStatus(401) 
                    } 
                    else {
                      connection.release()
                      if (err) throw (err)
                      console.log ("--------> Kart Successful")
                      res.send(result)
                    
                   }
                  }) 
                  }) 
                  }) 
app.post("/SatinAl", async (req,res) => {
db.getConnection( async (err, connection) => {
   if (err) throw (err)
   const genRand = (len) => {
      return Math.random().toString(36).substring(2,len+2);
   }
   const id = genRand(8)
   console.log(req.body)
   const sqlInsert = "INSERT INTO odeme VALUES (?,?,?,?)"
   const insert_query = mysql.format(sqlInsert,[id,req.body.miktar,req.body.kart_id,req.body.kullanici_adi])
   

   
   await connection.query (insert_query, (err, result)=> {
   if (err) throw (err)
   console.log ("--------> Created new siparis")
   })
   res.send(201)
   
}) 
}) 
