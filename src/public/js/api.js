

fetch("http://localhost:3000/api/listar")
.then((res) => {

    res.json().then((e) => {

        const renan = document.getElementById("renan")
        
        renan.innerText = `
        
            id: ${e.rows[0].id},
            Nome: ${e.rows[0].nome},
            Email: ${e.rows[0].email},
            Telefone: ${e.rows[0].telefone},
            CPF: ${e.rows[0].cpf},
            Mensagem: ${e.rows[0].mensagem}


        `

    })

})