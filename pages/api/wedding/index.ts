import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import cors, { runMiddleware } from './middleware';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Ejecutar el middleware CORS
    await runMiddleware(req, res, cors);

    // Manejar solicitudes OPTIONS
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).end();
    }

    const { method, body } = req;

    switch (method) {
        case "GET":
            try {
                const query = "select * from guests g where wedding_id = 1 order by guests";
                const response = await conn.query(query);
                return res.json(response.rows);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        case "POST":
            try {
                const { guests, quantity, table_num, confirmed, cel1, cel2, gender, fisica, delivered } = body;

                if (!guests || !quantity || !table_num || !cel1 || gender == undefined ) {
                    return res.status(400).json({ message: "All fields are required" });
                }

                const id = uuidv4();
                const wedding_id = 1;

                const query = `
                    INSERT INTO guests(
                        id, wedding_id, guests, quantity, table_num, confirmed, cel1, cel2, gender, fisica, delivered
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
                    ) RETURNING *`;
                const values = [id, wedding_id, guests, quantity, table_num, confirmed, cel1, cel2, gender, fisica, delivered];

                const response = await conn.query(query, values);

                return res.status(201).json(response.rows[0]);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        default:
            return res.status(400).json({ message: "Method not supported" });
    }
}