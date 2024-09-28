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
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import '../../app/globals.css';

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
						<Typography sx={{fontFamily: "Philosopher-Bold"}} variant="h6" component="span">
							Recepción
						</Typography>
						<Typography sx={{fontFamily: "Philosopher-Bold"}}>6:00 pm</Typography>
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
						<Typography sx={{fontFamily: "Philosopher-Bold"}} variant="h6" component="span">
							Ceremonia
						</Typography>
						<Typography sx={{fontFamily: "Philosopher-Bold"}}>6:30 pm</Typography>
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
						<Typography sx={{fontFamily: "Philosopher-Bold"}} variant="h6" component="span">
							Brindis
						</Typography>
						<Typography sx={{fontFamily: "Philosopher-Bold"}}>8:15 pm</Typography>
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
						<Typography sx={{fontFamily: "Philosopher-Bold"}} variant="h6" component="span">
							Cena
						</Typography>
						<Typography sx={{fontFamily: "Philosopher-Bold"}}>8:45 pm</Typography>
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
						<Typography sx={{fontFamily: "Philosopher-Bold"}} variant="h6" component="span">
							Tiempo de Júbilo
						</Typography>
						<Typography sx={{fontFamily: "Philosopher-Bold"}}>10:15 pm</Typography>
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
						<Typography sx={{fontFamily: "Philosopher-Bold"}} variant="h6" component="span">
							Torta
						</Typography>
						<Typography sx={{fontFamily: "Philosopher-Bold"}}>10:30 pm</Typography>
					</TimelineContent>
				</TimelineItem>
			</Timeline>
		</div>
	);
};

export default TimeLine;
