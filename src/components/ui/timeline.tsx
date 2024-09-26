import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineOppositeContent,
	TimelineSeparator,
} from "@mui/lab";
import styles from "../../app/styles/TimeLine.module.css";
import FastfoodIcon from "@mui/icons-material className={styles.content_text}/Fastfood";
import LaptopMacIcon from "@mui/icon className={styles.content_text}s-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const TimeLine = () => {
	return (
		<div className={styles.timeline_container}>
			<Timeline position="alternate">
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot sx={{ bgcolor: "#ca9a51" }}>
							<FavoriteIcon />
						</TimelineDot>
						<TimelineConnector sx={{height: "1rem"}}/>
					</TimelineSeparator>
					<TimelineContent sx={{ py: "12px", px: 2 }}>
						<Typography className={styles.title} variant="h6" component="span">
							Recepción
						</Typography>
						<Typography className={styles.content_text}>6:00 pm</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector sx={{height: "1rem"}}/>
						<TimelineDot sx={{ bgcolor: "#ca9a51" }}>
							<FavoriteIcon />
						</TimelineDot>
						<TimelineConnector sx={{height: "1rem"}}/>
					</TimelineSeparator>
					<TimelineContent sx={{ py: "12px", px: 2 }}>
						<Typography className={styles.title} variant="h6" component="span">
							Ceremonia
						</Typography>
						<Typography className={styles.content_text}>6:30 pm</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector sx={{height: "1rem"}}/>
						<TimelineDot sx={{ bgcolor: "#ca9a51" }}>
							<FavoriteIcon />
						</TimelineDot>
						<TimelineConnector sx={{height: "1rem"}}/>
					</TimelineSeparator>
					<TimelineContent sx={{ py: "12px", px: 2 }}>
						<Typography className={styles.title} variant="h6" component="span">
							Brindis
						</Typography>
						<Typography className={styles.content_text}>8:15 pm</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector sx={{height: "1rem"}}/>
						<TimelineDot sx={{ bgcolor: "#ca9a51" }}>
							<FavoriteIcon />
						</TimelineDot>
						<TimelineConnector sx={{height: "1rem"}}/>
					</TimelineSeparator>
					<TimelineContent sx={{ py: "12px", px: 2 }}>
						<Typography className={styles.title} variant="h6" component="span">
							Cena
						</Typography>
						<Typography className={styles.content_text}>8:45 pm</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector sx={{height: "1rem"}}/>
						<TimelineDot sx={{ bgcolor: "#ca9a51" }}>
							<FavoriteIcon />
						</TimelineDot>
						<TimelineConnector sx={{height: "1rem"}}/>
					</TimelineSeparator>
					<TimelineContent sx={{ py: "12px", px: 2 }}>
						<Typography className={styles.title} variant="h6" component="span">
							Tiempo de Júbilo
						</Typography>
						<Typography className={styles.content_text}>10:15 pm</Typography>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineConnector sx={{height: "1rem"}}/>
						<TimelineDot sx={{ bgcolor: "#ca9a51" }}>
							<FavoriteIcon />
						</TimelineDot>
						<TimelineConnector sx={{height: "1rem"}}/>
					</TimelineSeparator>
					<TimelineContent sx={{ py: "12px", px: 2 }}>
						<Typography className={styles.title} variant="h6" component="span">
							Torta
						</Typography>
						<Typography className={styles.content_text}>10:30 pm</Typography>
					</TimelineContent>
				</TimelineItem>
			</Timeline>
		</div>
	);
};

export default TimeLine;
