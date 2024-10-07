import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import cors, { runMiddleware } from '../middleware';

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
                const query = "select * from wedding where id = 1";
                const response = await conn.query(query);
                return res.json(response.rows);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        default:
            return res.status(400).json({ message: "Method not supported" });
    }
}