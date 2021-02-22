/**
 * A component used to display a custom dropdown
 *
 * @example <caption>Example use of Dropdown</caption>
 * <Dropdown
 *    menuItems={this.predicateFieldOptions}
 *    onSelect={this.handlePredicateFieldSelect}
 *    selectedItem={this.state.selectedPredicate.name}
 * />
 *
 * @author Angela Cooney
 */

import React from "react";
import styles from "./css/Dropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * @class
 */
class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      chevron: faChevronDown,
    };

    this.toggleChevron = this.toggleChevron.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  /**
   * Toggles the custom chevron in the dropdown. Up when the dropdown
   * menu is closed and an up chevron when the dropdown menu is open.
   */
  toggleChevron() {
    if (this.state.chevron === faChevronDown) {
      this.setState({
        chevron: faChevronUp,
      });
    } else {
      this.setState({
        chevron: faChevronDown,
      });
    }
  }

  /**
   * Sets the chevron to down when dropdown is clicked outside and the
   * dropdown menu is closed
   */
  onBlur() {
    if (this.state.chevron === faChevronUp) {
      this.setState({
        chevron: faChevronDown,
      });
    }
  }

  render() {
    return (
      <div className={styles.selectContainer}>
        <select
          value={this.props.selectedItem}
          className={styles.select}
          onClick={this.toggleChevron}
          onChange={this.props.onSelect}
          onBlur={this.onBlur}
        >
          {this.props.menuItems.map((menuItem) => (
            <option key={menuItem}>{menuItem}</option>
          ))}
        </select>
        <FontAwesomeIcon icon={this.state.chevron} className={styles.chevron} />
      </div>
    );
  }
}

/**
 * The prop types that are taken in by Dropdown component
 * @property {Array[String]} menuItems - The menu items to be displayed in the dropdown menu
 * @property {function} onSelect - function to be called when a menu item is selected
 * @property {string} selectedItem - The item that is currently selected in the dropdown
 */
Dropdown.propTypes = {
  menuItems: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  selectedItem: PropTypes.string,
};

export default Dropdown;
