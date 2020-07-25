import  {Request, Response} from 'express';
import knex from '../database/connection';


class pointsController {
   
    
    async create(request:Request, response:Response)  {
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
    
    const trx = await knex.transaction();


    const point = {
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,                                             
        city,
        uf

    };
    
    const insertedids = await trx('points').insert(point);
    
    const point_id = insertedids[0];
    
    const pointItens = itens.map((item_id:number) => {
        return {
            item_id,
            point_id,
        };
    })

    await trx('points_itens').insert(pointItens);
    
    return response.json({
        id: point_id,
        ...point,
    });
 };

};

export default pointsController;