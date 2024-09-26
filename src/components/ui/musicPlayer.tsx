import { useEffect, useRef, useState } from "react";
import styles from "../../app/styles/MusicPlayer.module.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface MusicPlayerProps {
    audioSrc: string;
}

export const MusicPlayer = ({ audioSrc }: MusicPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
        setIsPlaying(true);
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setIsPlaying(false);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
        }
        setCurrentTime(Number(e.target.value));
    };

    function formatDuration(durationSeconds: number) {
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`;
    }

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener("timeupdate", handleTimeUpdate);
        }
        return () => {
            if (audioElement) {
                audioElement.removeEventListener("timeupdate", handleTimeUpdate);
            }
        };
    }, []);

    return (
        <div className={styles.player_card}>
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className={styles.rangeInput}
                style={{ '--progress': `${(currentTime / duration) * 100}%` } as React.CSSProperties}
            />

            <audio ref={audioRef} src={audioSrc} />
            <div className={styles.track_duration}>
                <p>{formatDuration(currentTime)}</p>
                <button className={styles.playPauseButton} onClick={handlePlayPause}>
                    {isPlaying ? <PauseIcon /> : <FavoriteIcon />}
                </button>
                <p>{formatDuration(duration)}</p>
            </div>
        </div>
    );
}

export default MusicPlayer;