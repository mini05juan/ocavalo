const express = require("express");
const path = require('path');
const db = require("./src/database/conexao")

const app = express();

app.use('/public', express.static(path.resolve("./src/public")))
app.use(express.json())
app.use(express.urlencoded({

   extended: true

}))

app.listen(3000,() => {

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
   .then(resposta => console.log('ok'))
   .catch(err => console.log('erro: ' + err));

   res.end();

});

app.get('/listar', (req, res) =>{
   res.sendFile(path.resolve('./src/views/list.html'))
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



const pool = require('./src/database/conexao'); 