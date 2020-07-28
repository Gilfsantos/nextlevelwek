import  {Request, Response} from 'express';
import knex from '../database/connection';


class pointsController {
    async index(request: Request, response: Response) {
        const { city, uf, itens } = request.query;

        const parsedItens = String(itens).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
        .join('points_itens', 'points.id', '=', 'points_itens.point_id')
        .whereIn('points_itens.item_id', parsedItens)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');
       
        return response.json( points);
    }
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'point not found'});

        }

        const itens = await knex('itens')
        .join('point_itens', 'itens.id', '=', 'points_itens.item_id')
        .where('points_itens.point_id',id)
        .select('itens.title');

        return response.json({point, itens});
    } 


   
    
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
    });

    await trx('points_itens').insert(pointItens);

    await trx.commit();
    
    return response.json({
        id: point_id,
        ...point,
    });
 };
     
};

export default pointsController;