"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../app/styles/Main.module.css";
import json_wedding_data from "../../data/wedding-data.json";
import { Clock } from "@/components";
import MusicPlayer from "@/components/ui/musicPlayer";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link'; 
import TimeLine from "@/components/ui/timeline";
import { Box, Button, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';

interface Props {
    params: { id: string };
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
};

export default function Home({params}: Props) {
    const id = params.id;

    const [open, setOpen] = useState(false);
    const [showInvitation, setShowInvitation] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const data = json_wedding_data;

    const AUDIO_FILE = "/solo-tu-ori.mp3";

    const guest = data.guests.find((guest) => guest.id == id);

	useEffect(() => {
        setFadeIn(true);
    }, []);

    const handleConfirm = () => {
        let text = ''
        if (guest!.quantity > 1){
            text = `Hola! Somos los invitados ${guest?.guests} y queremos confirmar nuestra asistencia a la boda de Diego y Mafer`
        } else {
            text = `Hola! Soy el/la invitado/da ${guest?.guests} y quiero confirmar mi asistencia a la boda de Diego y Mafer`
        }
        window.open(`https://api.whatsapp.com/send?phone=59178467687&text=${text}`, "_blank");
    }
	
	const handleShowInvitation = () => {
		const welcomeScreen = document.querySelector(`.${styles.welcomeScreen}`);
		if (welcomeScreen) {
			welcomeScreen.classList.add(styles.fadeOut);
			welcomeScreen.addEventListener('transitionend', () => {
				setShowInvitation(true);
			}, { once: true });
		} else {
			setShowInvitation(true);
		}
	};

    return(
        <div className={styles.container}>
            {!showInvitation ? (
                <div className={`${styles.welcomeScreen} ${fadeIn ? styles.fadeIn : ''} ${showInvitation ? styles.fadeOut : ''}`}>
					<h2 className={`${styles.for} ${fadeIn ? styles.fadeIn : ''}`}>Para:</h2>
					<h1 className={`${styles.guests} ${fadeIn ? styles.fadeIn : ''}`}>{guest?.guests}</h1>
					<button onClick={handleShowInvitation} className={`${styles.button} ${styles.viewInvitationButton} ${fadeIn ? styles.fadeIn : ''}`}>Ver invitación</button>
				</div>
            ) : (
                <div className={`${styles.invitationContent} ${showInvitation ? styles.fadeIn : ''}`}>
                    <div className={styles.border}>
                        <div className={styles.title_container}>
                            <h1 className={styles.title}>
                                ¡Nos Casamos!
                            </h1>
                        </div>
                        <div className={styles.name_container}>
                            <h2 className={styles.name_novio}>
                                {data.novio}
                            </h2>
                            <h2 className={styles.name_and}>
                                &
                            </h2>
                            <h2 className={styles.name_novia}>
                                {data.novia}
                            </h2>
                        </div>
                        <div className={styles.music_container}>
                            <h2 className={styles.music_text}>
                                Presiona el 
                                <span className={styles.heart}>
                                    <FavoriteIcon />
                                </span>
                                para escuchar nuestra canción
                            </h2>
                        </div>
                        <MusicPlayer audioSrc={AUDIO_FILE} />
                        <div className={styles.imageContainer}>
                            <Image 
                                priority
                                src="/assets/principal.png" 
                                width={1000} 
                                height={1000} 
                                layout="responsive" 
                                className={styles.image}
                                alt="wedding"
                                quality={100}
                                />
                        </div>
                        <div className={styles.cita_container}>
                            <h2 className={styles.texto}>
                                Nosotros amamos porque Dios nos amó primero.
                            </h2>
                            <h2 className={styles.cita}>
                                1 Juan 4:19
                            </h2>
                        </div>
                        <div className={styles.svgContainer1}>
                            <Image 
                                src="/assets/persons.svg"
                                width={10}
                                height={10}
                                alt="persons"
                                className={styles.svg}
                            />
                        </div>
                        <div className={styles.padres_container}>
                            <h2 className={styles.text_title}>
                                Con la bendición de Dios <br></br>y nuestros queridos padres
                            </h2>
                            <div className={styles.fathers_cont}>
                                <div className={styles.fathers}>
                                    <div className={styles.fathers_title}>
                                        <h2>
                                            Padres del Novio:
                                        </h2>
                                    </div>
                                    <div className={styles.fathers}>
                                        <div className={styles.father}>
                                            <h3>
                                                Clemente Casasola Miranda
                                            </h3>
                                        </div>
                                        <div className={styles.father}>
                                            <h3>
                                                Evelin Flores Añez
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.fathers}>
                                    <div className={styles.fathers_title}>
                                        <h2>
                                            Padres de la Novia:
                                        </h2>
                                    </div>
                                    <div className={styles.fathers}>
                                        <div className={styles.father}>
                                            <h3>
                                                Rubén Dario Justiniano Martinez
                                            </h3>
                                        </div>
                                        <div className={styles.father}>
                                            <h3>
                                                Alexandra Torrico Acosta
                                            </h3>
                                        </div>
                                        <div className={styles.father}>
                                            <h3>
                                                H. Freddy Fuentes Flores (+)
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageContainer_3}>
                            <Image 
                                priority
                                src="/assets/3.png" 
                                width={1000} 
                                height={1000} 
                                layout="responsive" 
                                className={styles.image}
                                alt="wedding"
                                quality={100}
                                />
                        </div>
                        <div className={styles.svgContainer}>
                            <Image 
                                src="/assets/rings.svg"
                                width={10}
                                height={10}
                                alt="rings"
                                className={styles.svg}
                            />
                        </div>
                        <div className={styles.invitation_text}>
                            {guest!.quantity > 1 ? (
                                <p>Tenemos el agrado de invitarlos <br></br> a Nuestra Boda.</p>
                            ) : (
                                <p>Tenemos el agrado de invitarte <br></br> a Nuestra Boda.</p>
                            )}
                        </div>
                        <div className={styles.date_content}>
                            <div className={styles.date_container}>
                                <div className={styles.day}>Domingo</div>
                                <div className={styles.date}>
                                    <h2 className={styles.date_number}>
                                        17
                                    </h2>
                                    <h2 className={styles.date_month}>
                                        Nov
                                    </h2>
                                </div>
                                <div className={styles.hour}>6:00 PM</div>
                            </div>
                        </div>
                        <div className={styles.count_days}>
                            <h2 className={styles.count_days_text}>
                                Faltan...
                            </h2>
                        </div>
                        <Clock></Clock>
                        <div className={styles.place_container}>
                            <div className={styles.svgContainer}>
                                <Image 
                                    src="/assets/locationheartfilled.svg"
                                    width={10}
                                    height={10}
                                    alt="location"
                                    className={styles.svg}
                                />
                            </div>
                            <div className={styles.place_direction_container}>
                                <h2 className={styles.place_title}>
                                    Macarella Eventos
                                </h2>
                                <p className={styles.place_direction}>
                                    Av. Los Cusis entre Av. Beni y Av. Banzer
                                </p>
                                <div className={styles.place_button}>
                                    <Link href="https://maps.app.goo.gl/PVMzeHEVWNU8z5Na6" passHref={true} legacyBehavior>
                                        <a target="_blank" rel="noopener noreferrer">
                                            <button className={styles.direction_button}>Ver Ubicación</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageContainer_4}>
                            <Image 
                                priority
                                src="/assets/4.png" 
                                width={1000} 
                                height={1000} 
                                layout="responsive" 
                                className={styles.image}
                                alt="wedding"
                                quality={100}
                                />
                        </div>
                        <div className={styles.svgContainer2}>
                            <Image 
                                src="/assets/dresscode.svg"
                                width={10}
                                height={10}
                                alt="rings"
                                className={styles.svg2}
                            />
                        </div>
                        <div className={styles.dress_codeinfo}>
                            <h2 className={styles.dresscode_title}>
                                Dress code
                            </h2>
                            <p className={styles.dresscode_dress}>
                                Formal/Elegante
                            </p>
                            <p className={styles.dresscode_info}>
                                La novia ha esperado usar blanco toda su vida, <br></br> por favor usa otro color.
                            </p>
                        </div>
                        <div className={styles.itinerario_container}>
                            <h2 className={styles.itinerario_title}>
                                Itinerario
                            </h2>
                        </div>
                        <TimeLine></TimeLine>
                        <div className={styles.imageContainer_5}>
                            <Image 
                                priority
                                src="/assets/5.png" 
                                width={1000} 
                                height={1000} 
                                layout="responsive" 
                                className={styles.image}
                                alt="wedding"
                                quality={100}
                                />
                        </div>
                        <div className={styles.gift_container}>
                            <h2 className={styles.gifts_title}>
                                Sugerencia de Regalos
                            </h2>
                            <p className={styles.thanks}>
                                ¡TU PRESENCIA ES NUESTRO MEJOR REGALO!
                            </p>
                            <p className={styles.gift_text}>
                                Si deseas bendecirnos con un obsequio,<br></br>
                                te sugerimos visitar nuestra mesa de regalos<br></br>
                                en Multicenter 4to anillo Banzer<br></br>
								o escanear el código QR.<br></br>
                            </p>
                            <p className={styles.thanks}>
                                ¡GRACIAS POR SER PARTE DE ESTE DÍA TAN ESPECIAL!
                            </p>
                            <div className={styles.gift_buttons}>
                                <button 
                                    onClick={handleOpen}
                                    className={`${styles.direction_button} ${styles.gift_list_button}`}
                                >
                                Ver QR
                                </button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <Box sx={style}>
                                        <Image
                                            width={1000}
                                            height={1000}
                                            src="/assets/qr.png"
                                            alt="qr"
                                        />
                                    </Box>
                                </Modal>
                                <Link href="https://wa.me/message/BPFV4P43EUSVD1?src=qr" passHref={true} legacyBehavior>
                                        <a target="_blank" rel="whatsapp Lista de Regalos">
                                            <button className={`${styles.direction_button} ${styles.gift_list_button}`}>Consultar Lista de Regalos</button>
                                        </a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.imageContainer_6}>
                            <Image 
                                priority
                                src="/assets/6.png" 
                                width={1000} 
                                height={1000} 
                                layout="responsive" 
                                className={styles.image}
                                alt="wedding"
                                quality={100}
                                />
                        </div>
                        <div className={styles.persons_quantity_container}>
                            <div className={styles.persons_quantity_title}>Pases...</div>
                            <div className={styles.first_text}>¡Hemos reservado</div>
                            <div className={styles.quantity_text}>
                                <div className={styles.quantity}>{guest?.quantity}</div>
                                <div>
                                    <div>{guest!.quantity > 1 ?('lugares'):('lugar')} en</div>
                                    <div>tu honor!</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.no_kids_container}>
                            <h2 className={styles.no_kids_title}>No Niños...</h2>
                            <p className={styles.no_kids_concept}>Aunque nos gustan los niños,<br></br> esta será una celebración solo para adultos.</p>
                        </div>
                        <div className={styles.confirmar_asistencia_container}>
                            <h2 className={styles.confirmar_asistencia_title}>Confirmar Asistencia</h2>
                            <p className={styles.confirmar_asistencia_text}>Tu presencia haría aún más mágico nuestro día.<br></br> Por favor, asegúrate de confirmarnos si podrás acompañarnos para poder asignar tu lugar.</p>
                            <button onClick={handleConfirm} className={`${styles.direction_button} ${styles.gift_list_button}`}>Confirmar Asistencia</button>
                        </div>
                        <div className={styles.imageContainer_6}>
                            <Image 
                                priority
                                src="/assets/7.png" 
                                width={1000} 
                                height={1000} 
                                layout="responsive" 
                                className={styles.image}
                                alt="wedding"
                                quality={100}
                                />
                        </div>
                        <div className={styles.last_container}>
                            <p className={styles.last_container_frase}>Con mucha ilusión queremos vivir este<br></br>
                                momento rodeados de personas que han<br></br>
                                formado parte de nuestra historia.<br></br>
                                Será un honor contar con tu presencia.
                            </p>
                            <p className={styles.last_container_esperamos}>¡Te esperamos!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}