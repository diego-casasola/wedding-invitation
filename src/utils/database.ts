import {Pool} from 'pg'

let conn: any

if (!conn){
    conn = new Pool({
        user: 'postgres',
        password: 'SDB0livia',
        host: '172.17.0.1',
        port: 5432,
        database: 'dm'
    });    
}

export { conn };
