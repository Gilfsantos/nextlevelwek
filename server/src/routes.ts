import express, {request, response} from 'express';
import knex from './database/connection';

const routes = express.Router();




routes.get('/itens', async(request, response) => {
    const itens = await knex('itens').select('*');

    const serializedItens = itens.map(itens => {
        return {title: itens.title,
            image_url:`http://localhost:3333/uploads/${itens.image}`,

        }
    })
    // select * from itens
    return  response.json(serializedItens);
});

    export default routes;