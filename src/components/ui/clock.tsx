import { useEffect, useState } from "react";
import styles from "../../app/styles/Home.module.css"
import Head from "next/head";
import json_wedding_data from "../../data/wedding-data.json"

export const Clock = () => {
	const [partyTime, setPartyTime] = useState(false);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
		// traer el json wedding-data.json
		const data = json_wedding_data;

	useEffect(() => {
		const target = new Date(data["wedding-date"]);

		const interval = setInterval(() => {
			const now = new Date();
			const difference = target.getTime() - now.getTime();

			const d = Math.floor(difference / (1000 * 60 * 60 * 24));
			setDays(d);

				const h = Math.floor(
					(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				setHours(h);

				const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
				setMinutes(m);

				const s = Math.floor((difference % (1000 * 60)) / 1000);
				setSeconds(s);

				if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
					setPartyTime(true);
				}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="timer-wrapper">
			<div className="timer-inner">
				<div className="timer-segment">
					<span className="time">{days}</span>
					<span className="label">Días</span>
				</div>
				{/* <span className="divider">:</span> */}
				<div className="timer-segment">
					<span className="time">{hours}</span>
					<span className="label">Horas</span>
				</div>
				{/* <span className="divider">:</span> */}
				<div className="timer-segment">
					<span className="time">{minutes}</span>
					<span className="label">Minutos</span>
				</div>
				{/* <span className="divider">:</span> */}
				<div className="timer-segment">
					<span className="time">{seconds}</span>
					<span className="label">Segundos</span>
				</div>
			</div>
		</div>
	);
};

export default Clock;
