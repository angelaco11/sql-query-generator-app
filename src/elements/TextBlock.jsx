import React from "react";
import styles from "./css/TextBlock.module.css";
import PropTypes from "prop-types";

/**
 * A function component to a text block
 * @param {Object} props - The props containing functions from the parent
 */
function TextBlock(props) {
  return (
    <React.Fragment>
      <div className={styles.textBlock}>{props.text}</div>
    </React.Fragment>
  );
}

/**
 * The prop types that are taken in by TextBlock component
 * @property {string} text - The text to be displayed in the component
 */
TextBlock.propTypes = {
  text: PropTypes.string,
};

export default TextBlock;
