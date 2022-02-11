
async function carregarAnimais(){
    const response = await axios.get('http://localhost:8000/animais')

    const animais = response.data

    const lista = document.getElementById('lista_animais')

    lista.innerHTML = ''

    animais.forEach(animal => {
        const item = document.createElement('li')

        item.innerText = `${animal.nome} - idade: ${animal.idade} - sexo: ${animal.sexo} - cor: ${animal.cor}`

        lista.appendChild(item)
    });

}

function manipular_formulario(){
    const form_animal = document.getElementById('form_animal')
    const deleta_animal = document.getElementById('deleta_animal')

    const input_nome = document.getElementById('nome')
    const input_idade = document.getElementById('idade')
    const input_sexo = document.getElementById('sexo')
    const input_cor = document.getElementById('cor')

    const input_nome_del = document.getElementById('id_del')

    form_animal.onsubmit = async (event) => {//caso clique no botao (submit) que esta dentro de form_animal
       event.preventDefault()
        const nome_animal = input_nome.value
        const idade_animal = input_idade.value
        const sexo_animal = input_sexo.value
        const cor_animal = input_cor.value

        await axios.post('http://localhost:8000/animais',{
            nome: nome_animal,
            idade: idade_animal,
            sexo: sexo_animal,
            cor: cor_animal
        })
        carregarAnimais()
        alert('animal cadastrado...')
    }

    deleta_animal.onsubmit = async (event) =>{
        event.preventDefault()
        const nome_del = input_nome_del.value
        await axios.delete('http://localhost:8000/animais',{
            id: nome_del,
        })
        carregarAnimais()
        alert('animal deletado...')
    }

}

function app(){
    console.log('App iniciada')
    carregarAnimais()
    manipular_formulario()
}

app()
