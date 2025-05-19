import React, { useEffect, useState } from 'react';
import '../styles/global-timer.css';


const GlobalTimer = () => {
    const [timeLeft, setTimeLeft] = useState(null);

    let offerStartUTC = new Date("2025-05-19T00:00:00Z").getTime();
    let offerEndUTC = offerStartUTC + 7 * 24 * 60 * 60 * 1000;

    useEffect(() => {
        let interval;
        let utcOffset = 0;

        const fetchUTCTime = async () => {
            try {
                const res = await fetch("https://worldtimeapi.org/api/timezone/etc/utc");
                const data = await res.json();
                const serverTimeUTC = new Date(data.utc_datetime).getTime();
                const localTime = Date.now();
                utcOffset = serverTimeUTC - localTime;

                // Start ticking
                interval = setInterval(() => {
                    const now = Date.now() + utcOffset;
                    let remaining = offerEndUTC - now;
                    if (remaining <= 0) {
                        // Reset the offer start and end to now
                        const newStart = now;
                        const newEnd = newStart + 7 * 24 * 60 * 60 * 1000;
                        remaining = newEnd - now;
                        offerEndUTC = newEnd; // reassign for future ticks
                    }
                    setTimeLeft(remaining);

                }, 1000);
            } catch (err) {
                console.error("Failed to fetch UTC time:", err);
            }
        };

        fetchUTCTime();

        return () => clearInterval(interval);
    }, []);

    const formatTime = (ms) => {
        if (ms <= 0) return "00 : 00 : 00 : 00";
        const totalSeconds = Math.floor(ms / 1000);
        const days = String(Math.floor(totalSeconds / 86400)).padStart(2, '0');
        const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${days} : ${hours} : ${minutes} : ${seconds}`;
    };

    return (
        <div className="global-timer-box">
            {timeLeft !== null ? formatTime(timeLeft) : "Limited Time"}
        </div>
    );
};

export default GlobalTimer;
