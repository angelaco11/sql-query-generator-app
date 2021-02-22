/**
 * A component used to display a row to build a SQL query.
 *
 * @example <caption>Example use of QueryBuilderRow</caption>
 * <QueryBuilderRow
 *    id={this.state.id}
 *    onRemoveRow={this.removeRow}
 * />
 *
 * @author Angela Cooney
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "./css/QueryBuilderRow.module.css";
import Dropdown from "./Dropdown.jsx";
import TextInput from "./TextInput.jsx";
import TextBlock from "./TextBlock.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 * @class
 */
class QueryBuilderRow extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPredicate: { name: "User Email", type: "string" },
      selectedOperator: "",
      showIsElement: false,
      textInput: "",
      secondTextInput: "",
      sqlColumn: "",
    };
    this.predicateFieldOptions = [
      "User Email",
      "Screen Width",
      "Screen Height",
      "Number of Visits",
      "First Name",
      "Last Name",
      "Page Response Time (ms)",
      "Domain",
      "Page Path",
    ];
    this.predicateInfo = [
      { name: "User Email", sqlColumn: "user_email", type: "string" },
      { name: "Screen Width", sqlColumn: "screen_width", type: "numeric" },
      { name: "Screen Height", sqlColumn: "screen_height", type: "numeric" },
      { name: "Number of Visits", sqlColumn: "visits", type: "numeric" },
      { name: "First Name", sqlColumn: "user_first_name", type: "string" },
      { name: "Last Name", sqlColumn: "user_last_name", type: "string" },
      {
        name: "Page Response Time (ms)",
        sqlColumn: "page_response",
        type: "numeric",
      },
      { name: "Domain", sqlColumn: "domain", type: "string" },
      { name: "Page Path", sqlColumn: "path", type: "string" },
    ];
    this.stringOperators = ["equals", "contains", "starts with", "in list"];
    this.integerOperators = [
      "equals",
      "between",
      "greater than",
      "less than",
      "in list",
    ];

    this.handlePredicateFieldSelect = this.handlePredicateFieldSelect.bind(
      this
    );
    this.handleOperatorSelect = this.handleOperatorSelect.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleSecondTextInput = this.handleSecondTextInput.bind(this);
    this.setSqlColumnForSelection = this.setSqlColumnForSelection.bind(this);
  }

  componentDidMount() {
    this.setSqlColumnForSelection();
  }

  componentDidUpdate(_, prevState) {
    // Whenever the predicate changes, get the sql column of that predicate
    if (prevState.selectedPredicate !== this.state.selectedPredicate) {
      this.setSqlColumnForSelection();
    }
    if (
      prevState.selectedPredicate.type !== this.state.selectedPredicate.type &&
      this.state.selectedOperator !== "in list"
    ) {
      this.setState({
        selectedOperator: "equals",
      });
    }
    if (
      prevState.selectedPredicate !== this.state.selectedPredicate ||
      prevState.selectedOperator !== this.state.selectedOperator
    ) {
      this.displayIsTextBlock();
    }
  }

  /**
   * Saves the value selected in the predicate dropdown to state. Also finds
   * and sets  the predicate type from the predicateInfo object
   * @param {*} e - event containing selected predicate dropdown value
   */
  handlePredicateFieldSelect(e) {
    const predicateName = e.target.value;
    const predicateWithType = this.predicateInfo.find(
      (predicate) => predicateName === predicate.name
    );
    const selectedPredicate = {
      name: predicateName,
      type: predicateWithType.type,
    };
    this.setState({
      selectedPredicate: selectedPredicate,
    });
  }

  /**
   * Saves the value selected in the operator dropdown to state
   * @param {*} e - event containing selected operator dropdown value
   */
  handleOperatorSelect(e) {
    this.setState({
      selectedOperator: e.target.value,
    });
  }

  /**
   * Saves the value entered into text input field to state
   * @param {*} e - event containing text input
   */
  handleTextInput(e) {
    this.setState({
      textInput: e.target.value,
    });
  }

  /**
   * Saves the value entered into the second text input field to state
   * @param {*} e - event containing text input
   */
  handleSecondTextInput(e) {
    this.setState({
      secondTextInput: e.target.value,
    });
  }

  /**
   * Sets the appropriate sql column based on the predicate field that is selected
   */
  setSqlColumnForSelection() {
    const predicateWithColumn = this.predicateInfo.find(
      (predicate) => this.state.selectedPredicate.name === predicate.name
    );
    this.setState({
      sqlColumn: predicateWithColumn.sqlColumn,
    });
  }

  /**
   * Creates a sql query string based on the selected user input
   */
  createSqlStringForRow() {
    return (
      {
        equals:
          this.state.selectedPredicate.type === "string"
            ? `${this.state.sqlColumn} = '${this.state.textInput}'`
            : `${this.state.sqlColumn} = ${this.state.textInput}`,
        contains: `${this.state.sqlColumn} LIKE '%${this.state.textInput}%'`,
        "starts with": `${this.state.sqlColumn} LIKE '${this.state.textInput}%'`,
        "in list": `${this.state.sqlColumn} IN (${this.state.textInput})`,
        between: `${this.state.sqlColumn} BETWEEN ${this.state.textInput} AND ${this.state.secondTextInput}`,
        "greater than": `${this.state.sqlColumn} > ${this.state.textInput}`,
        "less than": `${this.state.sqlColumn} < ${this.state.textInput}`,
      }[this.state.selectedOperator] ||
      `${this.state.sqlColumn} = '${this.state.textInput}'`
    );
  }

  /**
   * Displays the appropriate string or integer operator dropdown depending
   * on the predicate selected.
   */
  displayOperatorDropdown() {
    if (this.state.selectedPredicate.type === "string") {
      return (
        <Dropdown
          menuItems={this.stringOperators}
          onSelect={this.handleOperatorSelect}
          selectedItem={this.state.selectedOperator}
        />
      );
    }
    return (
      <Dropdown
        menuItems={this.integerOperators}
        onSelect={this.handleOperatorSelect}
        selectedItem={this.state.selectedOperator}
      />
    );
  }

  /**
   * Displays the 'is' text box based on the selected predicate and operator
   */
  displayIsTextBlock() {
    if (
      this.state.selectedPredicate.type === "numeric" &&
      this.state.selectedOperator !== "equals" &&
      this.state.selectedOperator !== ""
    ) {
      if (!this.state.showIsElement) {
        this.setState({ showIsElement: true });
      }
    } else {
      if (this.state.selectedOperator === "in list") {
        if (!this.state.showIsElement) {
          this.setState({ showIsElement: true });
        }
      } else {
        if (this.state.showIsElement) {
          this.setState({ showIsElement: false });
        }
      }
    }
  }

  clearFirstRow() {
    this.setState({
      selectedPredicate: { name: "User Email", type: "string" },
      selectedOperator: "equals",
      textInput: "",
    });
  }

  /**
   * Removes a row from the view. If it is the first row, resets the selection.
   */
  onRemoveRow() {
    // If it is the first row, reset the selection
    if (this.props.id === 1) {
      this.clearFirstRow();
    }
    this.props.onRemoveRow(this.props.id);
  }

  render() {
    return (
      <div className={styles.rowContainer}>
        <FontAwesomeIcon
          onClick={() => {
            this.onRemoveRow();
          }}
          icon={faTimes}
          className={styles.deleteIcon}
        />
        <Dropdown
          menuItems={this.predicateFieldOptions}
          onSelect={this.handlePredicateFieldSelect}
          selectedItem={this.state.selectedPredicate.name}
        />
        {this.state.showIsElement ? <TextBlock text={"is"} /> : null}
        {this.displayOperatorDropdown()}
        <TextInput
          selectedPredicate={this.state.selectedPredicate.name}
          selectedOperator={this.state.selectedOperator}
          handleTextInput={this.handleTextInput}
          handleSecondTextInput={this.handleSecondTextInput}
          textInputValue={this.state.textInput}
        />
      </div>
    );
  }
}

/**
 * The prop types that are taken in by QueryBuilderRow component
 * @property {number} id - The id of the row
 * * @property {function} onRemoveRow - function to be called when the delete button is clicked to remove a row
 */
QueryBuilderRow.propTypes = {
  id: PropTypes.number,
  onRemoveRow: PropTypes.func,
};

export default QueryBuilderRow;
