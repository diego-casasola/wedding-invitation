// middleware.ts
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: '*', // Permitir todas las solicitudes de origen
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
import { NextApiRequest, NextApiResponse } from 'next';

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default cors;
export { runMiddleware };