require('dotenv').config()
const express = require("express");
const path = require('path');
const db = require("./src/database/conexao")

const PORT = process.env.PORT || 3000

const app = express();
app.set("views", path.resolve("./src/views"))
app.set("view engine", "ejs")

app.use('/public', express.static(path.resolve("./src/public")))
app.use(express.json())
app.use(express.urlencoded({

   extended: true

}))

app.listen(PORT,() => {

   console.log("Servidor rodando na porta 3000");

})
app.get('/', (req,res) => {
   res.sendFile(path.resolve('./src/views/index.html'))
})

app.get('/cadastrar', (req,res) => {
   console.log(path.resolve('./src/views/form-album.html'));
   res.sendFile(path.resolve('./src/views/form-album.html'))
})

app.post("/inserir", async(req, res)=>{

   const {inputName} = req.body

   console.log(inputName);
    
   console.log(`
   req.body.nome = ${req.body.inputName}
   req.body.cpf = ${req.body.inputEmail}
   req.body.telefone = ${req.body.inputTelefone}
   req.body.cpf = ${req.body.inputCPF}
   req.body.mensagem = ${req.body.inputMsg}
   `);
   
   await pool.query(`INSERT INTO cadastrar 
   (nome, email, telefone, 
       cpf,mensagem) 
   VALUES 
   ($1, $2, $3, $4, $5)`, 
   [req.body.inputName, req.body.inputEmail, req.body.inputTelefone, 
       req.body.inputCPF, req.body.inputMsg
       ])
   .then(resposta => {
      
      
      
      console.log('ok')})

      res.redirect("/listar")
   .catch(err => console.log('erro: ' + err));

});

app.get('/listar', async(req, res) =>{
   await pool.query(`SELECT *
	FROM cadastrar order by id asc`)
   .then((resultado) => {
   
      const usuarios = resultado.rows

      res.render("list" , {usuarios})

   })
})


app.get('/api/listar',async(req,res) =>{
   await pool.query(`SELECT *
	FROM cadastrar order by id asc`)
   .then((resultado) => {
      resultado.rows.forEach((row)=>{
         console.log(`
           id: ${row.id},
           Nome: ${row.nome},
           Email: ${row.email},
           Telefone: ${row.telefone},
           CPF: ${row.cpf},
           Mensagem: ${row.mensagem}
         `)
      })

      res.json(resultado)

   })
    
})

app.get("/deletar/:id" , async(req,res) =>{

   const {id} = req.params

    await pool.query(`DELETE FROM cadastrar WHERE ID = ${id}`)

    res.redirect("/listar")
})

app.post("/editar/:id" , async(req,res) =>{

   const {id} = req.params
   const {inputName, inputEmail, inputTelefone, inputCPF, inputMsg} = req.body

    await pool.query(`UPDATE cadastrar
    SET nome= '${inputName}', email= '${inputEmail}', telefone= '${inputTelefone}', cpf= '${inputCPF}', mensagem='${inputMsg}'
    WHERE id = ${id};`)

    res.redirect("/listar")
})

app.get("/edit/:id", async(req,res) =>{
   const {id} = req.params
   await pool.query(`SELECT * FROM CADASTRAR WHERE ID = ${id}`)

   .then(resultado => {

       const usuario = resultado.rows[0]

       res.render("edit.ejs" , {usuario})


   })
   

})



const pool = require('./src/database/conexao'); 