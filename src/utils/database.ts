import {Pool} from 'pg'

let conn: any

if (!conn){
    conn = new Pool({
        user: 'postgres',
        password: 'SDB0livia',
        host: '165.232.137.91',
        port: 5432,
        database: 'dm'
    });    
}

export { conn };
