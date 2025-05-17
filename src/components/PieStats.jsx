import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";
import "../styles/pie-stats.css";
import ProcessHeading from "./ProcessHeading";

const stats = [
  {
    title: "Global Clientele",
    label: "Clients",
    tooltiptext: "100+ Clients Served",
    center: "Trusted by 100+ global clients",
    side: "We’ve collaborated with companies of all sizes across the world.",
    desc: "Our diverse client base spans multiple industries and continents, showcasing our global reach and trustworthiness."
  },
  {
    title: "Project Delivery",
    label: "Projects",
    tooltiptext: "250+ Projects Completed",
    center: "250+ creative and tech projects delivered",
    side: "From branding to automation — we’ve built things that last.",
    desc: "We have successfully delivered over 250 projects, combining creativity with technology to meet business goals."
  },
  {
    title: "Customer Satisfaction",
    label: "Rating",
    tooltiptext: "4.9⭐ Average Rating",
    center: "Our clients love us — 4.9 stars across platforms",
    side: "Rated highly on Google, Clutch, and more for quality and service.",
    desc: "Consistently maintaining a 4.9-star rating demonstrates our commitment to exceeding client expectations."
  },
  {
    title: "Experience & Expertise",
    label: "Experience",
    tooltiptext: "10+ Years of Experience",
    center: "Over a decade of building digital experiences",
    side: "We’ve mastered our craft across design, marketing, and tech.",
    desc: "Our seasoned team brings 10+ years of industry experience, ensuring quality and innovation in every project."
  },
  {
    title: "Impressions & Reach",
    label: "Impressions",
    tooltiptext: "30M+ Impressions",
    center: "30 million+ ad and content impressions",
    side: "Campaigns that break through the noise and get seen.",
    desc: "Our marketing efforts have generated over 30 million impressions, amplifying brand visibility and engagement."
  },
  {
    title: "Client Loyalty",
    label: "Retention",
    tooltiptext: "98% Client Retention",
    center: "Long-term relationships with lasting results",
    side: "Our success comes from our client-first mindset.",
    desc: "With a 98% retention rate, we build strong, long-term partnerships by prioritizing client satisfaction."
  },
];

const baseColor = "#7349ac";
const highlightColor = "#9c6bdb";

const PieStats = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#fff', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}>
          <p style={{ margin: 0 }}>{payload[0].name}</p>
        </div>
      );
    }
    return null;
  };

  // Dynamically calculate radii based on screen width
  const getRadii = () => {
    if (windowWidth <= 480) {
      return { innerRadius: 100, outerRadius: 140 };
    } else if (windowWidth <= 768) {
      return { innerRadius: 130, outerRadius: 180 };
    }
    return { innerRadius: 120, outerRadius: 200 };
  };

  const { innerRadius, outerRadius } = getRadii();

  const chartData = stats.map((s, index) => ({
    name: s.tooltiptext,
    value: 100 / stats.length,
  }));

  const handleClick = (_, index) => {
    setActiveIndex(index);
  };

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const label = stats[index].label.split(" ")[0]; // e.g., "100+"

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontWeight="600"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
      >
        {stats[index].label}
      </text>
    );
  };

  return (
    <>
      <div className="pie-section">
        <ProcessHeading
          backgroundText="STATS"
          foregroundText="OUR METRICS"
          description="Key performance metrics that demonstrates our 
          expertise and client success. Representing a core strength, from client retention to project delivery."
        />
        <div className="pie-wrapper">
          <div className="text-side">
            <h2>{stats[activeIndex].title}</h2>
            <p>{stats[activeIndex].desc}</p>
          </div>

          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart isAnimationActive={false}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  onClick={handleClick}
                  label={renderLabel}
                  labelLine={false}
                  isAnimationActive={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === activeIndex ? highlightColor : baseColor}
                      cursor="pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="center-text">
              <strong>{stats[activeIndex].center}</strong>
              <p>{stats[activeIndex].side}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PieStats;
