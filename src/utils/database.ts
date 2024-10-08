import {Pool} from 'pg'

let conn: any

if (!conn){
    conn = new Pool({
        user: process.env.PGSQL_USER || 'postgres',
        password: process.env.PGSQL_PASSWORD || 'SDB0livia',
        host: process.env.PGSQL_HOST || 'localhost',
        port: parseInt(process.env.PGSQL_PORT || '5432'),
        database: process.env.PGSQL_DATABASE || 'postgres'
    });    
}

export { conn };
