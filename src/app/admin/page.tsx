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
    const [cantInvConfirmados, setCantInvConfirmados] = useState(0);

    const [filterGuests, setFilterGuests] = useState('');
    const [filterTable, setFilterTable] = useState('');
    const [filterFisica, setFilterFisica] = useState('');
    const [filterDelivered, setFilterDelivered] = useState('');
    const [filterConfirmed, setFilterConfirmed] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [actionType, setActionType] = useState('');
    const [newTableNumber, setNewTableNumber] = useState<number | null>(null);
    const [editGuestData, setEditGuestData] = useState<Partial<Guest>>({});
    const [newGuestData, setNewGuestData] = useState<Partial<Guest>>({});

    useEffect(() => {
        let totalInvitados = 0;
        let cantInvFisica = 0;
        let cantInvVirtual = 0;
        let cantInvConfirmados = 0;
        data.guests.forEach((guest) => {
            totalInvitados += guest.quantity;
            if (guest.fisica) {
                cantInvFisica += 1;
            } else if (guest.fisica == false) {
                cantInvVirtual += 1;
            }
            if (guest.confirmed) {
                cantInvConfirmados += 1;
            }
        });
        setCantInvitados(totalInvitados);
        setCantInvFisica(cantInvFisica);
        setCantInvVirtual(cantInvVirtual);
        setCantInvConfirmados(cantInvConfirmados);
    }, [data]);

    useEffect(() => {
        if (filterTable) {
            const invitadosMesa = data.guests.reduce((acc, guest) => {
                return guest.table.toString() === filterTable ? acc + guest.quantity : acc;
            }, 0);
            setCantInvitados(invitadosMesa);
        } else {
            let totalInvitados = 0;
            data.guests.forEach((guest) => {
                totalInvitados += guest.quantity;
            });
            setCantInvitados(totalInvitados);
        }
    }, [filterTable, data]);

    const filteredData = data.guests.filter((guest) => {
        return (
            (filterGuests === '' || guest.guests.toLowerCase().includes(filterGuests.toLowerCase())) &&
            (filterTable === '' || guest.table.toString() === filterTable) &&
            (filterFisica === '' || guest.fisica.toString() === filterFisica) &&
            (filterDelivered === '' || guest.delivered.toString() === filterDelivered) &&
            (filterConfirmed === '' || guest.confirmed.toString() === filterConfirmed)
        );
    });

    const clearFilters = () => {
        setFilterGuests('');
        setFilterTable('');
        setFilterFisica('');
        setFilterDelivered('');
        setFilterConfirmed('');
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

    const handleEditGuest = (guest: Guest) => {
        setSelectedGuest(guest);
        setEditGuestData({
            guests: guest.guests,
            quantity: guest.quantity,
            cel1: guest.cel1,
            fisica: guest.fisica,
        });
        setModalContent(`Editar datos del invitado ${guest.guests}`);
        setActionType('editGuest');
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

    const handleDeleteGuest = (guest: Guest) => {
        setSelectedGuest(guest);
        setModalContent(`¿Está seguro que desea eliminar al invitado ${guest.guests}?`);
        setActionType('delete');
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedGuest(null);
        setActionType('');
        setNewTableNumber(null);
        setEditGuestData({});
        setNewGuestData({});
    };

    const handleModalConfirm = async () => {
        if (!selectedGuest && actionType !== 'addGuest') return;

        let updatedData;
        if (actionType === 'confirm') {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest!.id ? { ...guest, confirmed: true } : guest
            );
        } else if (actionType === 'unconfirm') {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest!.id ? { ...guest, confirmed: false } : guest
            );
        } else if (actionType === 'deliver') {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest!.id ? { ...guest, delivered: true } : guest
            );
        } else if (actionType === 'editTable' && newTableNumber !== null) {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest!.id ? { ...guest, table: newTableNumber } : guest
            );
        } else if (actionType === 'editGuest') {
            updatedData = data.guests.map((guest) =>
                guest.id === selectedGuest!.id ? { ...guest, ...editGuestData } : guest
            );
        } else if (actionType === 'addGuest') {
            const newGuest = {
                ...newGuestData,
                id: Date.now().toString(), // Generar un ID único
                confirmed: false,
                delivered: false,
            } as Guest;
            updatedData = [...data.guests, newGuest];
        } else if (actionType === 'delete') {
            updatedData = data.guests.filter((guest) => guest.id !== selectedGuest!.id);
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

    const handleAddGuest = () => {
        setModalContent('Añadir nuevo invitado');
        setActionType('addGuest');
        setShowModal(true);
    };

    return (
        <div>
            <div className={styles['invitados-container']}>
                <div className={styles['invitado']}>
                    <div className={styles['numero']}>{cantInvitados}</div>
                    <div className={styles['label']}>Invitados</div>
                </div>
                <div className={styles['invitado']}>
                    <div className={styles['numero']}>{cantInvFisica}</div>
                    <div className={styles['label']}>Invitaciones Físicas</div>
                </div>
                <div className={styles['invitado']}>
                    <div className={styles['numero']}>{cantInvVirtual}</div>
                    <div className={styles['label']}>Invitaciones Digitales</div>
                </div>
                <div className={styles['invitado']}>
                    <div className={styles['numero']}>{cantInvConfirmados}</div>
                    <div className={styles['label']}>Invitados Confirmados</div>
                </div>
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
                <select
                    value={filterConfirmed}
                    onChange={(e) => setFilterConfirmed(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="true">Confirmado</option>
                    <option value="false">No Confirmado</option>
                </select>
                <button onClick={clearFilters}>Borrar Filtros</button>
                <button onClick={handleAddGuest}>Añadir Invitados</button>
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
                                    {/* <button
                                        className={`${styles.actionButton} ${styles.editButton}`}
                                        onClick={() => handleEditTable(guest)}
                                    >
                                        Editar mesa
                                    </button> */}
                                    <button
                                        className={`${styles.actionButton} ${styles.editGuestButton}`}
                                        onClick={() => handleEditGuest(guest)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.copyLinkButton}`}
                                        onClick={() => handleCopyLink(guest)}
                                    >
                                        Copiar link
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={() => handleDeleteGuest(guest)}
                                    >
                                        Eliminar
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
                        {actionType === 'editGuest' && (
                            <div>
                                <input
                                    type="text"
                                    value={editGuestData.guests ?? ''}
                                    onChange={(e) => setEditGuestData({ ...editGuestData, guests: e.target.value })}
                                    placeholder="Nombre del invitado"
                                    className={styles.tableInput}
                                />
                                <input
                                    type="number"
                                    value={editGuestData.quantity ?? ''}
                                    onChange={(e) => setEditGuestData({ ...editGuestData, quantity: Number(e.target.value) })}
                                    placeholder="Cantidad de pases"
                                    className={styles.tableInput}
                                />
                                <input
                                    type="text"
                                    value={editGuestData.cel1 ?? ''}
                                    onChange={(e) => setEditGuestData({ ...editGuestData, cel1: e.target.value })}
                                    placeholder="Celular"
                                    className={styles.tableInput}
                                />
                                <select
                                    value={editGuestData.fisica?.toString() ?? ''}
                                    onChange={(e) => setEditGuestData({ ...editGuestData, fisica: e.target.value === 'true' })}
                                    className={styles.tableInput}
                                >
                                    <option value="true">Física</option>
                                    <option value="false">Digital</option>
                                </select>
                            </div>
                        )}
                        {actionType === 'addGuest' && (
                            <div>
                                <input
                                    type="text"
                                    value={newGuestData.guests ?? ''}
                                    onChange={(e) => setNewGuestData({ ...newGuestData, guests: e.target.value })}
                                    placeholder="Nombre del invitado"
                                    className={styles.tableInput}
                                />
                                <input
                                    type="number"
                                    value={newGuestData.quantity ?? ''}
                                    onChange={(e) => setNewGuestData({ ...newGuestData, quantity: Number(e.target.value) })}
                                    placeholder="Cantidad de pases"
                                    className={styles.tableInput}
                                />
                                <input
                                    type="text"
                                    value={newGuestData.cel1 ?? ''}
                                    onChange={(e) => setNewGuestData({ ...newGuestData, cel1: e.target.value })}
                                    placeholder="Celular"
                                    className={styles.tableInput}
                                />
                                <select
                                    value={newGuestData.fisica?.toString() ?? ''}
                                    onChange={(e) => setNewGuestData({ ...newGuestData, fisica: e.target.value === 'true' })}
                                    className={styles.tableInput}
                                >
                                    <option value="true">Física</option>
                                    <option value="false">Digital</option>
                                </select>
                                <input
                                    type="number"
                                    value={newGuestData.table ?? ''}
                                    onChange={(e) => setNewGuestData({ ...newGuestData, table: Number(e.target.value) })}
                                    placeholder="Número de mesa"
                                    className={styles.tableInput}
                                />
                            </div>
                        )}
                        <button onClick={handleModalConfirm}>Sí</button>
                        <button onClick={handleModalClose}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}