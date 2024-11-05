"use client";
import { useEffect, useState } from "react";
import json_wedding_data from "../../data/wedding-data.json";
import styles from "../../app/styles/Admin.module.css";

type Guest = {
    id: string;
    guests: string;
    quantity: number;
    table_num: number;
    confirmed: boolean;
    cel1: string;
    cel2: string;
    gender: number;
    fisica: boolean;
    delivered: boolean;
};

export default function Admin() {
    const getGuests = async () => {
        try {
            const response = await fetch("https://bodadm2024.sd-bo.com/api/wedding", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setData({ guests: data });
            } else {
                console.error("Unexpected response format:", data);
            }
        } catch (error) {
            console.error("Error fetching guests: ", error);
        }
    };

    const updateGuest = async (guestId: string, updatedGuestData: Partial<Guest>) => {
        try {
            const response = await fetch(`https://bodadm2024.sd-bo.com/api/wedding/${guestId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedGuestData),
            });
            if (response.ok) {
                await getGuests();
            } else {
                console.error("Error updating guest:", await response.text());
            }
        } catch (error) {
            console.error("Error updating guest: ", error);
        }
    };

    const addGuest = async (guest: Guest) => {
        try {
            const response = await fetch("https://bodadm2024.sd-bo.com/api/wedding", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(guest),
            });
            if (response.ok) {
                await getGuests();
            } else {
                console.error("Error adding guest:", await response.text());
            }
        } catch (error) {
            console.error("Error adding guest: ", error);
        }
    };

    const deleteGuest = async (guestId: string) => {
        try {
            const response = await fetch(`https://bodadm2024.sd-bo.com/api/wedding/${guestId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                await getGuests();
            } else {
                console.error("Error deleting guest:", await response.text());
            }
        } catch (error) {
            console.error("Error deleting guest: ", error);
        }
    };
    const [data, setData] = useState<{ guests: Guest[] }>({ guests: [] });
    const [cantInvitados, setCantInvitados] = useState(0);
    const [cantInvFisica, setCantInvFisica] = useState(0);
    const [cantInvVirtual, setCantInvVirtual] = useState(0);
    const [cantInvConfirmados, setCantInvConfirmados] = useState(0);
    const [cantInvNoConfirmados, setCantInvNoConfirmados] = useState(0);

    useEffect(() => {
        getGuests();
    }, []);

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

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);


    useEffect(() => {
        let totalInvitados = 0;
        let cantInvFisica = 0;
        let cantInvVirtual = 0;
        let cantInvConfirmados = 0;
        let cantInvNoConfirmados = 0;
        data.guests.forEach((guest) => {
            totalInvitados += guest.quantity;
            if (guest.fisica) {
                cantInvFisica += 1;
            } else if (guest.fisica == false) {
                cantInvVirtual += 1;
            }
            if (guest.confirmed) {
                cantInvConfirmados += guest.quantity;
            } else {
                cantInvNoConfirmados += guest.quantity;
            }
        });
        setCantInvitados(totalInvitados);
        setCantInvFisica(cantInvFisica);
        setCantInvVirtual(cantInvVirtual);
        setCantInvConfirmados(cantInvConfirmados);
        setCantInvNoConfirmados(cantInvNoConfirmados);
    }, [data]);

    useEffect(() => {
        if (filterTable) {
            const invitadosMesa = data.guests.reduce((acc, guest) => {
                return guest.table_num.toString() === filterTable ? acc + guest.quantity : acc;
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
            (filterTable === '' || guest.table_num.toString() === filterTable) &&
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
        setActiveDropdown(null);
        setShowModal(true);
    };

    const handleMarkAsDelivered = (guest: Guest) => {
        setSelectedGuest(guest);
        setModalContent(`¿Está seguro que desea marcar como entregado al invitado ${guest.guests}?`);
        setActionType('deliver');
        setActiveDropdown(null);
        setShowModal(true);
    };

    const handleEditTable = (guest: Guest) => {
        setSelectedGuest(guest);
        setNewTableNumber(guest.table_num);
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
            table_num: guest.table_num,
        });
        setModalContent(`Editar datos del invitado ${guest.guests}`);
        setActionType('editGuest');
        setActiveDropdown(null);
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
        setActiveDropdown(null);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedGuest(null);
        setActionType('');
        setNewTableNumber(null);
        setEditGuestData({});
        setNewGuestData({});
        getGuests();
    };

    const handleModalConfirm = async () => {
        if (!selectedGuest && actionType !== 'addGuest') return;
    
        let updatedData;
        let response;
    
        try {
            if (actionType === 'confirm') {
                await updateGuest(selectedGuest!.id, { confirmed: true });
            } else if (actionType === 'unconfirm') {
                response = await updateGuest(selectedGuest!.id, { confirmed: false });
            } else if (actionType === 'deliver') {
                response = await updateGuest(selectedGuest!.id, { delivered: true });
            } else if (actionType === 'editTable' && newTableNumber !== null) {
                response = await updateGuest(selectedGuest!.id, { table_num: newTableNumber });
            } else if (actionType === 'editGuest') {
                response = await updateGuest(selectedGuest!.id, editGuestData);
            } else if (actionType === 'addGuest') {
                const newGuest = {
                    ...newGuestData,
                    confirmed: false,
                    delivered: false,
                    cel2: '',
                } as Guest;
                response = await addGuest(newGuest);
            } else if (actionType === 'delete') {
                response = await deleteGuest(selectedGuest!.id);
            }
        } catch (error) {
            console.error('Error updating guest list', error);
        }
    
        handleModalClose();
    };

    const toggleDropdown = (id: string | null) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const handleAddGuest = () => {
        setModalContent('Añadir nuevo invitado');
        setActionType('addGuest');
        setShowModal(true);
    };

    const [isFormValid, setIsFormValid] = useState(false);
    interface FormErrors {
        newTableNumber?: string;
        guests?: string;
        quantity?: string;
        cel1?: string;
        fisica?: string;
        table_num?: string;
        gender?: string;
    }

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        validateForm();
    }, [newTableNumber, editGuestData, newGuestData]);

    const validateForm = () => {
        let errors: FormErrors = {};
        let isValid = true;

        if (actionType === 'editTable' && !newTableNumber) {
            isValid = false;
            errors.newTableNumber = 'El número de mesa es obligatorio';
        }

        if (actionType === 'editGuest') {
            if (!editGuestData.guests) {
                isValid = false;
                errors.guests = 'El nombre del invitado es obligatorio';
            }
            if (!editGuestData.quantity) {
                isValid = false;
                errors.quantity = 'La cantidad de pases es obligatoria';
            }
            if (!editGuestData.cel1) {
                isValid = false;
                errors.cel1 = 'El celular es obligatorio';
            }
            if (editGuestData.fisica === undefined) {
                isValid = false;
                errors.fisica = 'El tipo de pase es obligatorio';
            }
            if (!editGuestData.table_num) {
                isValid = false;
                errors.table_num = 'El número de mesa es obligatorio';
            }
        }

        if (actionType === 'addGuest') {
            if (!newGuestData.guests) {
                isValid = false;
                errors.guests = 'El nombre del invitado es obligatorio';
            }
            if (!newGuestData.quantity) {
                isValid = false;
                errors.quantity = 'La cantidad de pases es obligatoria';
            }
            if (!newGuestData.cel1) {
                isValid = false;
                errors.cel1 = 'El celular es obligatorio';
            }
            if (newGuestData.fisica === undefined) {
                isValid = false;
                errors.fisica = 'El tipo de pase es obligatorio';
            }
            if (!newGuestData.table_num) {
                isValid = false;
                errors.table_num = 'El número de mesa es obligatorio';
            }
            if (newGuestData.gender === undefined) {
                isValid = false;
                errors.gender = 'El género es obligatorio';
            }
        }

        setErrors(errors);
        setIsFormValid(isValid);
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
                <div className={styles['invitado']}>
                    <div className={styles['numero']}>{cantInvNoConfirmados}</div>
                    <div className={styles['label']}>Invitados No Confirmados</div>
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
                <h2>Tipo Invitación:</h2>
                <select
                    value={filterFisica}
                    onChange={(e) => setFilterFisica(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="true">Física</option>
                    <option value="false">Digital</option>
                </select>
                <h2>Estado:</h2>
                <select
                    value={filterDelivered}
                    onChange={(e) => setFilterDelivered(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="true">Entregado</option>
                    <option value="false">No Entregado</option>
                </select>
                <h2>Confirmado:</h2>
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
                                <td data-label="N° Mesa">{guest.table_num}</td>
                                <td data-label="Acciones" className={styles.actions}>
                                    <div className={styles.desktopOnly}>
                                        <button className={styles.dropdownButton} onClick={() => toggleDropdown(guest.id)}>
                                            &#x22EE; {/* Icono de 3 puntos verticales */}
                                        </button>
                                        {activeDropdown === guest.id && (
                                            <div className={styles.dropdownMenu}>
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
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.mobileOnly}>
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
                                    </div>
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
                        <div>
                            <input
                                type="number"
                                value={newTableNumber ?? ''}
                                onChange={(e) => setNewTableNumber(Number(e.target.value))}
                                placeholder="Nuevo número de mesa"
                                className={styles.tableInput}
                            />
                            {errors.newTableNumber && <p className={styles.error}>{errors.newTableNumber}</p>}
                        </div>
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
                            {errors.guests && <p className={styles.error}>{errors.guests}</p>}
                            <input
                                type="number"
                                value={editGuestData.quantity ?? ''}
                                onChange={(e) => setEditGuestData({ ...editGuestData, quantity: Number(e.target.value) })}
                                placeholder="Cantidad de pases"
                                className={styles.tableInput}
                            />
                            {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}
                            <input
                                type="text"
                                value={editGuestData.cel1 ?? ''}
                                onChange={(e) => setEditGuestData({ ...editGuestData, cel1: e.target.value })}
                                placeholder="Celular"
                                className={styles.tableInput}
                            />
                            {errors.cel1 && <p className={styles.error}>{errors.cel1}</p>}
                            <select
                                value={editGuestData.fisica?.toString() ?? ''}
                                onChange={(e) => setEditGuestData({ ...editGuestData, fisica: e.target.value === 'true' })}
                                className={styles.tableInput}
                            >
                                <option value="true">Física</option>
                                <option value="false">Digital</option>
                            </select>
                            {errors.fisica && <p className={styles.error}>{errors.fisica}</p>}
                            <input
                                type="number"
                                value={editGuestData.table_num ?? ''}
                                onChange={(e) => setEditGuestData({ ...editGuestData, table_num: Number(e.target.value) })}
                                placeholder="Número de mesa"
                                className={styles.tableInput}
                            />
                            {errors.table_num && <p className={styles.error}>{errors.table_num}</p>}
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
                            {errors.guests && <p className={styles.error}>{errors.guests}</p>}
                            <input
                                type="number"
                                value={newGuestData.quantity ?? ''}
                                onChange={(e) => setNewGuestData({ ...newGuestData, quantity: Number(e.target.value) })}
                                placeholder="Cantidad de pases"
                                className={styles.tableInput}
                            />
                            {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}
                            <input
                                type="text"
                                value={newGuestData.cel1 ?? ''}
                                onChange={(e) => setNewGuestData({ ...newGuestData, cel1: e.target.value })}
                                placeholder="Celular"
                                className={styles.tableInput}
                            />
                            {errors.cel1 && <p className={styles.error}>{errors.cel1}</p>}
                            <select
                                value={newGuestData.fisica?.toString() ?? ''}
                                onChange={(e) => setNewGuestData({ ...newGuestData, fisica: e.target.value === 'true' })}
                                className={styles.tableInput}
                            >
                                <option disabled value="">Tipo de invitación</option>
                                <option value="true">Física</option>
                                <option value="false">Digital</option>
                            </select>
                            {errors.fisica && <p className={styles.error}>{errors.fisica}</p>}
                            <input
                                type="number"
                                value={newGuestData.table_num ?? ''}
                                onChange={(e) => setNewGuestData({ ...newGuestData, table_num: Number(e.target.value) })}
                                placeholder="Número de mesa"
                                className={styles.tableInput}
                            />
                            {errors.table_num && <p className={styles.error}>{errors.table_num}</p>}
                            <select
                                value={newGuestData.gender?.toString() ?? ''}
                                onChange={(e) => setNewGuestData({ ...newGuestData, gender: Number(e.target.value) })}
                                className={styles.tableInput}
                            >
                                <option disabled value="">Género</option>
                                <option value="0">Hombre</option>
                                <option value="1">Mujer</option>
                            </select>
                            {errors.gender && <p className={styles.error}>{errors.gender}</p>}
                        </div>
                    )}
                    <button onClick={handleModalConfirm} disabled={!isFormValid}>Sí</button>
                    <button onClick={handleModalClose}>No</button>
                </div>
            </div>
            )}
        </div>
    );
}