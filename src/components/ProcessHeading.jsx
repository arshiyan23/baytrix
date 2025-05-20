import { motion } from "framer-motion";
import "../styles/process-heading.css";

const ProcessHeading = ({
  backgroundText = "BACKGROUND TEXT",
  foregroundText = "FOREGROUND TEXT",
  foregroundTextColor = "#7349ac",
  backgroundTextFill = "#ffffff",
  textStroke = "rgba(204, 204, 204, 0.5)",
  description = ""
}) => {
  // split nothing—just use the color
  const strokeColor = textStroke;

  return (
    <div className="process-heading-container">
      <motion.div
        className="process-heading-stack"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2
          className="process-background"
          aria-hidden="true"
          style={{
            color: backgroundTextFill,
            /* four shadows for a 1px uniform outline */
            textShadow: `
              -1px -1px 0 ${strokeColor},
               1px -1px 0 ${strokeColor},
              -1px  1px 0 ${strokeColor},
               1px  1px 0 ${strokeColor}
            `
          }}
        >
          {backgroundText}
        </h2>

        <motion.h3
          className="process-foreground"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          style={{ color: foregroundTextColor }}
        >
          {foregroundText}
        </motion.h3>
      </motion.div>

      {description && (
        <motion.p
          className="process-description"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ color: foregroundTextColor }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default ProcessHeading;
