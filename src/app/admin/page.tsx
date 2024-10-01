"use client";
import { useEffect, useState } from "react";
import json_wedding_data from "../../data/wedding-data.json";
import styles from "../../app/styles/Admin.module.css";

type Guest = {
    id: string;
    guests: string;
    quantity: number;
    table: number;
    confirmed: boolean;
    cel1: string;
    cel2: string;
    gender: number;
    fisica: boolean;
    delivered: boolean;
};

export default function Admin() {
    const [data, setData] = useState<{ guests: Guest[] }>({ guests: (json_wedding_data as any).guests.map((guest: Guest) => ({ ...guest, confirmed: guest.confirmed ?? false })) });
    const [cantInvitados, setCantInvitados] = useState(0);
    const [cantInvFisica, setCantInvFisica] = useState(0);
    const [cantInvVirtual, setCantInvVirtual] = useState(0);

    const [filterGuests, setFilterGuests] = useState('');
    const [filterTable, setFilterTable] = useState('');
    const [filterFisica, setFilterFisica] = useState('');
    const [filterDelivered, setFilterDelivered] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [actionType, setActionType] = useState('');
    const [newTableNumber, setNewTableNumber] = useState<number | null>(null);

    useEffect(() => {
        let totalInvitados = 0;
        let cantInvFisica = 0;
        let cantInvVirtual = 0;
        data.guests.forEach((guest) => {
            totalInvitados += guest.quantity;
            if (guest.fisica) {
                cantInvFisica += 1;
            } else if (guest.fisica == false) {
                cantInvVirtual += 1;
            }
        });
        setCantInvitados(totalInvitados);
        setCantInvFisica(cantInvFisica);
        setCantInvVirtual(cantInvVirtual);
    }, [data]);

    const filteredData = data.guests.filter((guest) => {
        return (
            (filterGuests === '' || guest.guests.toLowerCase().includes(filterGuests.toLowerCase())) &&
            (filterTable === '' || guest.table.toString() === filterTable) &&
            (filterFisica === '' || guest.fisica.toString() === filterFisica) &&
            (filterDelivered === '' || guest.delivered.toString() === filterDelivered)
        );
    });

    const clearFilters = () => {
        setFilterGuests('');
        setFilterTable('');
        setFilterFisica('');
        setFilterDelivered('');
    };

    const handleConfirmAttendance = (guest: Guest) => {
        setSelectedGuest(guest);
        if (guest.confirmed) {
            setModalContent(`¿Está seguro que desea quitar la asistencia del invitado ${guest.guests}?`);
            setActionType('unconfirm');
        } else {
            setModalContent(`¿Está seguro que desea confirmar la asistencia del invitado ${guest.guests}?`);
            setActionType('confirm');
        }
        setShowModal(true);
    };

    const handleMarkAsDelivered = (guest: Guest) => {
        setSelectedGuest(guest);
        setModalContent(`¿Está seguro que desea marcar como entregado al invitado ${guest.guests}?`);
        setActionType('deliver');
        setShowModal(true);
    };

    const handleEditTable = (guest: Guest) => {
        setSelectedGuest(guest);
        setNewTableNumber(guest.table);
        setModalContent(`Editar número de mesa para ${guest.guests}`);
        setActionType('editTable');
        setShowModal(true);
    };

    const handleCopyLink = (guest: Guest) => {
        const link = `https://bodadm2024.sd-bo.com/${guest.id}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link).then(() => {
                alert(`Link copiado: ${link}`);
            }, (err) => {
                console.error('Error al copiar el link: ', err);
            });
        } else {
            // Fallback para navegadores que no soportan navigator.clipboard.writeText
            const textArea = document.createElement("textarea");
            textArea.value = link;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                alert(`Link copiado: ${link}`);
            } catch (err) {
                console.error('Error al copiar el link: ', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedGuest(null);
        setActionType('');
        setNewTableNumber(null);
    };

    const handleModalConfirm = async () => {
        if (!selectedGuest) return;

        let updatedData;
        if (actionType === 'confirm') {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest.id ? { ...guest, confirmed: true } : guest
            );
        } else if (actionType === 'unconfirm') {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest.id ? { ...guest, confirmed: false } : guest
            );
        } else if (actionType === 'deliver') {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest.id ? { ...guest, delivered: true } : guest
            );
        } else if (actionType === 'editTable' && newTableNumber !== null) {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest.id ? { ...guest, table: newTableNumber } : guest
            );
        }

        // Llamada a la API para actualizar el JSON en el servidor
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guests: updatedData }),
        });

        if (response.ok) {
            if (updatedData) {
                setData({ guests: updatedData });
            }
        } else {
            console.error('Error updating guest list');
        }

        handleModalClose();
    };

    return (
        <div>
            <div>
                La Cantidad de invitados es: {cantInvitados}
                <br />
                La Cantidad de invitados fisicos es: {cantInvFisica}
                <br />
                La Cantidad de invitados virtuales es: {cantInvVirtual}
            </div>
            <div className={styles.filters}>
                <h2>Filtros</h2>
                <input
                    type="text"
                    placeholder="Invitado"
                    value={filterGuests}
                    onChange={(e) => setFilterGuests(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="N° Mesa"
                    value={filterTable}
                    onChange={(e) => setFilterTable(e.target.value)}
                />
                <select
                    value={filterFisica}
                    onChange={(e) => setFilterFisica(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="true">Física</option>
                    <option value="false">Digital</option>
                </select>
                <select
                    value={filterDelivered}
                    onChange={(e) => setFilterDelivered(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="true">Entregado</option>
                    <option value="false">No Entregado</option>
                </select>
                <button onClick={clearFilters}>Borrar Filtros</button>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Invitado</th>
                            <th>Pases</th>
                            <th>Celular</th>
                            <th>Confirmado</th>
                            <th>Entregada</th>
                            <th>Invitación</th>
                            <th>N° Mesa</th>
                            <th className={styles.actionsHeader}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {filteredData.map((guest) => (
                            <tr key={guest.id}>
                                <td data-label="Invitado" className={styles.guestName}>{guest.guests}</td>
                                <td data-label="Pases">{guest.quantity}</td>
                                <td data-label="Celular">{guest.cel1}</td>
                                <td data-label="Confirmado">{guest.confirmed ? 'Yes' : 'No'}</td>
                                <td data-label="Entregada">{guest.delivered ? 'Yes' : 'No'}</td>
                                <td data-label="Invitación">{guest.fisica ? 'Física' : 'Digital'}</td>
                                <td data-label="N° Mesa">{guest.table}</td>
                                <td data-label="Acciones" className={styles.actions}>
                                    <button
                                        className={`${styles.actionButton} ${guest.confirmed ? styles.unconfirmButton : styles.confirmButton}`}
                                        onClick={() => handleConfirmAttendance(guest)}
                                    >
                                        {guest.confirmed ? 'Quitar asistencia' : 'Confirmar asistencia'}
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.deliverButton}`}
                                        onClick={() => handleMarkAsDelivered(guest)}
                                    >
                                        Marcar como entregado
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.editButton}`}
                                        onClick={() => handleEditTable(guest)}
                                    >
                                        Editar mesa
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.copyLinkButton}`}
                                        onClick={() => handleCopyLink(guest)}
                                    >
                                        Copiar link
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>{modalContent}</p>
                        {actionType === 'editTable' && (
                            <input
                                type="number"
                                value={newTableNumber ?? ''}
                                onChange={(e) => setNewTableNumber(Number(e.target.value))}
                                placeholder="Nuevo número de mesa"
                                className={styles.tableInput}
                            />
                        )}
                        <button onClick={handleModalConfirm}>Sí</button>
                        <button onClick={handleModalClose}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}