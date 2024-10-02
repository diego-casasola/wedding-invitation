import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    console.log('API: update-guest');
    try {
        const { guests } = await req.json();

        // Ruta al archivo JSON
        const filePath = path.join(process.cwd(), 'src/data/wedding-data.json');

        // Leer el archivo JSON
        const data = await fs.promises.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        // Actualizar el archivo JSON
        jsonData.guests = guests;

        // Escribir los cambios en el archivo JSON
        await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2));

        return NextResponse.json({ message: 'Guest list updated successfully' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}

// obtener el json mediante un get
export async function GET(req: NextRequest) {
    console.log('API: get-guests');
    try {
        // Ruta al archivo JSON
        const filePath = path.join(process.cwd(), 'src/data/wedding-data.json');

        // Leer el archivo JSON
        const data = await fs.promises.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        return NextResponse.json(jsonData.guests);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}