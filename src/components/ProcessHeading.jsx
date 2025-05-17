import { motion } from "framer-motion";
import "../styles/process-heading.css";

const ProcessHeading = ({
  backgroundText = "BACKGROUND TEXT",
  foregroundText = "FOREGROUND TEXT",
  foregroundTextColor = "#7349ac",
  textStroke = "1px rgba(204, 204, 204, 0.5)",
  description = ""
}) => {
  // Determine paragraph color based on foregroundTextColor
  const paragraphColor = foregroundTextColor === "#7349ac" ? "#444" : foregroundTextColor;

  return (
    <div className="process-heading-container">
      <motion.h2
        className="process-background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        aria-hidden="true"
        style={{ WebkitTextStroke: textStroke }}
      >
        {backgroundText}
      </motion.h2>

      <motion.h3
        className="process-foreground"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        style={{ color: foregroundTextColor }}
      >
        {foregroundText}
      </motion.h3>

      {description && (
        <motion.p
          className="process-description"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ color: paragraphColor }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default ProcessHeading;
