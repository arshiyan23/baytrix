import { useEffect } from "react";

function getRandomBlobStyle() {
    const size = Math.floor(Math.random() * 60) + 40; // 40–100px
    const top = Math.floor(Math.random() * 300);      // Top offset
    const left = Math.floor(Math.random() * 100);     // Left offset (%)
    const duration = (Math.random() * 4 + 5).toFixed(1); // 5–9s

    return {
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}%`,
        animationDuration: `${duration}s`,
    };
}

function Branding() {
    const features = [
        {
            title: "Color Palette",
            desc: "We define a consistent and appealing set of colors that represent your brand’s personality.",
            icon: "/assets/branding-color.png",
        },
        {
            title: "Logo Design",
            desc: "We craft versatile and memorable logos that visually communicate your brand essence.",
            icon: "/assets/branding-logo.png",
        },
        {
            title: "Slogan & Tagline",
            desc: "We help define catchy slogans that reflect your brand’s mission and voice.",
            icon: "/assets/branding-slogan.png",
        },
        {
            title: "Typography",
            desc: "We select and pair fonts that enhance readability and brand recognition.",
            icon: "/assets/branding-typography.png",
        },
        {
            title: "Imagery Style",
            desc: "We establish consistent visuals, illustrations, and photography direction.",
            icon: "/assets/branding-imagery.png",
        },
        {
            title: "Complete Identity",
            desc: "We shape a unified brand system — from tone to visual impact — across all channels.",
            icon: "/assets/branding-identity.png",
        },
    ];

    useEffect(() => {
        const items = document.querySelectorAll(".brand-feature");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        items.forEach(item => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    const randomBlobs = Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="floating-blob" style={getRandomBlobStyle()} />
    ));

    return (
        <>
            <section className="brand-hero-section">
                {randomBlobs}
                <div className="brand-hero-container">
                    <img src="/assets/branding-intro2.png" alt="Branding Intro" className="brand-hero-img" />
                    <div className="brand-hero-text">
                        <h2>Build a Brand, Not Just a Business</h2>
                        <p>
                            We help shape how the world sees your business — with stunning visuals,
                            consistent messaging, and a distinct identity.
                        </p>
                    </div>
                </div>
            </section>

            <svg
                className="brand-wave"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
                    className="brand-curve"
                />
            </svg>

            <section className="brand-feature-section">
                <h2 className="section-heading">What We Shape For Your Brand</h2>
                <div className="brand-feature-grid">
                    {features.map((feature, i) => (
                        <div className="brand-feature" key={i}>
                            <img src={feature.icon} alt={feature.title} className="brand-icon" />
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Branding;
