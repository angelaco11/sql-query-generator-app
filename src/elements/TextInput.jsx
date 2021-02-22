/**
 * a custom text input element
 *
 * @example <caption>Example use of Text Input</caption>
 * <TextInput
 *    selectedPredicate={this.state.selectedPredicate.name}
 *    selectedOperator={this.state.selectedOperator}
 *    handleTextInput={this.handleTextInput}
 *    handleSecondTextInput={this.handleSecondTextInput}
 *    textInputValue={this.state.textInput}
 * />
 *
 * @author Angela Cooney
 */

import React from "react";
import styles from "./css/TextInput.module.css";
import TextBlock from "./TextBlock.jsx";
import PropTypes from "prop-types";

/**
 * @class
 */
class TextInput extends React.Component {
  constructor() {
    super();
    this.state = {
      placeholder: "",
      name: "",
      showBetweenOptions: false,
    };
    this.textBoxAttributes = {
      "User Email": {
        type: "text",
        name: "email",
        placeholder: "johndoe@email.com",
      },
      "First Name": { name: "firstName", placeholder: "John" },
      "Last Name": { name: "lastName", placeholder: "Doe" },
      Domain: { name: "domain", placeholder: "website.com" },
      "Page Path": { name: "path", placeholder: "/examples" },
      "Screen Width": { name: "screenWidth", placeholder: "0" },
      "Screen Height": { name: "screenHeight", placeholder: "0" },
      "Number of Visits": { name: "visits", placeholder: "0" },
      "Page Response Time (ms)": { name: "pageResponse", placeholder: "0" },
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.setInputTextBoxAttributes();
  }

  /**
   * Updates the proper text input when props are updated
   * @param {*} prevProps -
   */
  componentDidUpdate(prevProps) {
    if (prevProps.selectedPredicate !== this.props.selectedPredicate) {
      this.setInputTextBoxAttributes();
    }
    if (
      prevProps.selectedOperator !== this.props.selectedOperator ||
      prevProps.selectedPredicate !== this.props.selectedPredicate
    ) {
      if (this.props.selectedOperator === "between") {
        if (!this.state.showBetweenOptions) {
          this.setState({
            showBetweenOptions: true,
          });
        }
      } else {
        this.setState({
          showBetweenOptions: false,
        });
      }
    }
  }

  /**
   * Sets attributes for an input box with the appropriate placeholder depending on the
   * selected predicate
   */
  setInputTextBoxAttributes() {
    const attributes = this.textBoxAttributes[this.props.selectedPredicate] || {
      name: "",
      placeholder: "",
    };

    this.setState({
      name: attributes.name,
      placeholder: attributes.placeholder,
    });
  }

  render() {
    if (!this.state.showBetweenOptions) {
      return (
        <React.Fragment>
          <input
            className={styles.textInput}
            type="text"
            id={this.state.name}
            value={this.props.textInputValue}
            name={this.state.name}
            placeholder={this.state.placeholder}
            onChange={this.props.handleTextInput}
          />
        </React.Fragment>
      );
    } else {
      return (
        <div className={styles.betweenContainer}>
          <input
            className={styles.textInput}
            type="text"
            id={this.state.name + "-between1"}
            name={this.state.name + "-between1"}
            placeholder={this.state.placeholder}
            onChange={this.props.handleTextInput}
          />
          <TextBlock text={"and"} />
          <input
            className={styles.textInput}
            type="text"
            id={this.state.name + "-between2"}
            name={this.state.name + "-between2"}
            placeholder="0"
            onChange={this.props.handleSecondTextInput}
          />
        </div>
      );
    }
  }
}

/**
 * The prop types that are taken in by TextInput component
 * @property {string} selectedPredicate - The predicate selected in the predicate dropdown
 * @property {string} selectedOperator - The operator selected in the operator dropdown
 * @property {function} handleTextInput - The function to be called when text is input in the input element
 * @property {function} handleSecondTextInput - The function to be called when text is input in the second input element
 * @property {string} textInputValue - The value that is currently entered in the text input box
 */
TextInput.propTypes = {
  selectedPredicate: PropTypes.string,
  selectedOperator: PropTypes.string,
  handleTextInput: PropTypes.func,
  handleSecondTextInput: PropTypes.func,
  textInputValue: PropTypes.string,
};

export default TextInput;
