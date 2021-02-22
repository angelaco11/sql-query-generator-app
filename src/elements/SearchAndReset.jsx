import React from "react";
import styles from "./css/SearchAndReset.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * A function component to display Search and Reset buttons
 * @param {Object} props - The props containing functions from the parent
 */
function SearchAndReset(props) {
  return (
    <div className={styles.buttonContainer}>
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      <button onClick={props.computeSQLQueries} className={styles.searchButton}>
        Search
      </button>
      <button onClick={props.resetRows} className={styles.resetButton}>
        Reset
      </button>
    </div>
  );
}

/**
 * The prop types that are taken in by SearchAndReset component
 * @property {function} computeSQLQueries - A callback function to compute sql queries when Search button is clicked
 * @property {function} resetRows - callback function to reset rows when Reset button is clicked
 */
SearchAndReset.propTypes = {
  computeSQLQueries: PropTypes.func,
  resetRows: PropTypes.func,
};

export default SearchAndReset;
