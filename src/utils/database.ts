import {Pool} from 'pg'

let conn: any

if (!conn){
    conn = new Pool({
        user: 'postgres',
        password: 'root',
        host: '192.168.0.2',
        port: 5432,
        database: 'dm'
    });    
}

export { conn };
