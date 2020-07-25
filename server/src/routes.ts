import express, {request, response} from 'express';
import knex from './database/connection';

const routes = express.Router();




routes.get('/itens', async(request, response) => {
    const itens = await knex('itens').select('*');

    const serializedItens = itens.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url:`http://localhost:3333/uploads/${item.image}`,

        };
    });
    // select * from itens
    return response.json(serializedItens);
});


routes.post('/points', async (request, response) => {
const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    itens

} = request.body

const ids = await knex('points').insert({

    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,                                             
    city,
    uf

});

const pointItens = itens.map((item_id:number) => {
    return {
        item_id,
        point_id: ids[0],
    };
} )
await knex('points_itens').insert(pointItens);

return response.json({success: true});
});
    export default routes;