import express, { request } from 'express'; 

const app = express();

app.use(express.json());

app.get('/users', (request, response) => {
   const search = String(request.query.search);

   const filteredUsers = search ? users.filter(user => user.includes(search)): users;

   console.log(search);
// Rota Endereço completo da requisiçao
// Recuros Qual entidade estamos acessando do sistema

// get: Buscar uma ou mais informaçao do back end
// post: Criar uma nova informaçao no back end
// put: Atualizar uma informaçao existente no back end
// delete: Remover uma informaçao do back end

// post http://localhost:3333/users = criar um usuario
// get  http://localhost:3333/users = listar usuarios
// get  http://localhost:3333/users/5 = buscar dados do usuario com id 5


 // request param: parametros que vem na propria rota que identificam um recurso
 // query parame: parametros que vem na propria rota geralmente opcionais para filtros, paginaçao
 // request body : parametros para criaçao /atualizaaçao
  return  response.json(filteredUsers);
});
const users = [
    'Diego',
    'Cleiton',
    'Robson',
    'Daniel'
 ];


app.get('/users/:id', (request, response) => {
 const id = Number( request.params.id);
 const user = users[id];

 return response.json(user);
});



app.post('/users',(request,response) => {

    const data = request.body;

    console.log(data);

    const user = {

        name: data.name,
        email: data.email,
    };

     return  response.json(user);
});

app.listen(3333);