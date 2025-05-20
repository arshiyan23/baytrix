import React, { useEffect, useState, useRef } from 'react';
import '../styles/global-timer.css';

const GlobalTimer = () => {
    const [timeLeft, setTimeLeft] = useState(null);
    const intervalRef = useRef(null); // 👈 important
    let offerStartUTC = new Date("2025-05-19T00:00:00Z").getTime();
    let offerEndUTC = offerStartUTC + 7 * 24 * 60 * 60 * 1000;

    useEffect(() => {
        const startTicking = (offset) => {
            intervalRef.current = setInterval(() => {
                const now = Date.now() + offset;
                let remaining = offerEndUTC - now;
                if (remaining <= 0) {
                    const newStart = now;
                    const newEnd = newStart + 7 * 24 * 60 * 60 * 1000;
                    remaining = newEnd - now;
                    offerEndUTC = newEnd;
                }
                setTimeLeft(remaining);
            }, 1000);
        };

        const fetchUTCTime = async () => {
            try {
                const res = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=UTC");
                const data = await res.json();
                const serverTimeUTC = new Date(data.dateTime + "Z").getTime();
                const localTime = Date.now();
                const utcOffset = serverTimeUTC - localTime;
                startTicking(utcOffset);
            } catch (err) {
                console.error("Failed to fetch UTC time, falling back to system time:", err);
                startTicking(0); // fallback to system time
            }
        };

        fetchUTCTime();

        return () => clearInterval(intervalRef.current); // 👈 ensure cleanup
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
            {timeLeft !== null ? formatTime(timeLeft) : "LIMITED TIME..."}
        </div>
    );
};

export default GlobalTimer;
