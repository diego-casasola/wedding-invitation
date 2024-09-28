"use client";
import { useEffect, useState } from "react";
import json_wedding_data from "../../data/wedding-data.json";

export default function Admin() {
    const [cantInvitados, setCantInvitados] = useState(0);

    useEffect(() => {
        let data = json_wedding_data;
        let totalInvitados = 0;
        data.guests.forEach((guest) => {
            totalInvitados += guest.quantity;
        });
        setCantInvitados(totalInvitados);
    }, []);

    return (
        <div>
            La Cantidad de invitados es: {cantInvitados}
        </div>
    );
}