import React from "react";
import { motion } from 'framer-motion'

const loaderVariants = {
    animate: {
      y: [-10, 0, -10],
      transition: {
        y: {
          repeat: Infinity,
          duration: 0.5,
          ease: "easeInOut",
        }
      }
    }
  }

function Loader() {
    return(
        <div style={{ fontWeight: "bold", fontSize: "2rem", color: 'white' }}>
            Loading
            <motion.span
                style={{ display: "inline-block", marginLeft: "0.2rem" }}
                variants={loaderVariants}
                animate="animate"
            >
                ...
            </motion.span>
        </div>
    )
}

export default Loader;