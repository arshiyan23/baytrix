import React, { useEffect, useState } from "react";
import "../styles/offer-banner.css";
import ScheduleCall from "./ScheduleCall";


const OfferBanner = () => {
    const [visible, setVisible] = useState(true);
    const [showScheduleCall, setShowScheduleCall] = useState(false);

    useEffect(() => {
        if (visible) {
            document.body.style.paddingTop = "60px";
        } else {
            document.body.style.paddingTop = "0px";
        }

        return () => {
            document.body.style.paddingTop = "0px";
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <>
            <div className="offer-banner">
                <div className="offer-content">
                    Book your FREE 30 mins consultation now!
                    {/* FREE 30 MINUTE CONSULTATION! */}
                    <button
                        onClick={() => setShowScheduleCall(true)}
                        className="offer-btn">
                        GET STARTED
                    </button>
                </div>
                <button className="offer-close" onClick={() => setVisible(false)}>×</button>
            </div>
            {showScheduleCall && (
                <ScheduleCall onClose={() => setShowScheduleCall(false)} />
            )}
        </>
    );
};

export default OfferBanner;
