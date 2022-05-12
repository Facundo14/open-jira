import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
|{ ok: boolean, message: string}
|{ ok: boolean, message: string, entry: IEntry }
|{ ok: boolean, entry: IEntry }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;

    // if( !mongoose.isValidObjectId(id)){
    //     return res.status(400).json({
    //         ok: false,
    //         message: 'El id no es válido' + id
    //     });
    // }

    switch (req.method) {
        case 'GET':
            return getEntry( res, req);
        
        case 'PUT':
            return updateEntry(req, res);

        default:
            return res.status(400).json({
                ok: false,
                message: 'Endpoint no existe'
            });
    }
}

const getEntry = async ( res: NextApiResponse<Data>, req: NextApiRequest) => {

    const { id } = req.query;
    
    await db.connect();

    try {
        const entry = await Entry.findById(id);

        if(!entry){
            await db.disconnect();

            return res.status(400).json({
                ok: false,
                message: 'No existe la entrada con ese id:' + id
            });
        }

        
        res.status(200).json({
            ok: true,
            entry: entry!
        });

    } catch (error: any) {
        await db.disconnect();
        console.log(error);


        res.status(400).json({
            ok: false,
            message: error.errors.status.message
        });
    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;
    
    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if(!entryToUpdate){

        await db.disconnect();

        return res.status(400).json({
            ok: false,
            message: 'No existe la entrada con ese id:' + id
        });
    }

    const { 
        description = entryToUpdate.description, 
        status = entryToUpdate.status 
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, {
            description,
            status
        }
        , { runValidators: true, new: true });

        await db.disconnect();
        
        res.status(200).json({
            ok: true,
            message: 'Actualizado',
            entry: updatedEntry!
        });

    } catch (error: any) {
        await db.disconnect();
        console.log(error);


        res.status(400).json({
            ok: false,
            message: error.errors.status.message
        });
    }

}
