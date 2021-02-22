/**
 * A view used to display functionality to build SQL queries and print them out
 *
 * @example <caption>Example use of SQLGeneratorView</caption>
 * <SQLGeneratorView />
 *
 * @author Angela Cooney
 */

import React from "react";
import QueryBuilderRow from "./elements/QueryBuilderRow.jsx";
import styles from "./SQLGeneratorView.module.css";
import SearchAndReset from "./elements/SearchAndReset.jsx";

/**
 * @class
 */
class SQLGeneratorView extends React.Component {
  constructor() {
    super();
    this.state = {
      sqlRowIds: [],
      id: 1,
      sqlQueryString: "",
    };

    this.rowRef = React.createRef();
    this.rowRefsArray = [];
    this.sqlSelect = "SELECT * FROM session WHERE ";

    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.resetRows = this.resetRows.bind(this);
    this.computeSqlQueries = this.computeSqlQueries.bind(this);
  }

  /**
   * Adds a new row to the view when the 'AND' button is clicked
   */
  addRow() {
    this.setState((prevState) => ({
      sqlRowIds: [...this.state.sqlRowIds, prevState.id + 1],
      id: prevState.id + 1,
      rowRefs: [...this.state.sqlRowIds, React.createRef()],
    }));
  }

  /**
   * Removes a given row when the 'x' delete button is selected for a singular row
   * @param {string} id - the id of the row to be deleted from the view
   */
  removeRow(id) {
    const filteredSqlRowIds = this.state.sqlRowIds.filter(
      (sqlRowId) => sqlRowId !== id
    );
    this.setState({
      sqlRowIds: filteredSqlRowIds,
    });
  }

  /**
   * Clears all added rows from the view and resets the first row
   */
  resetRows() {
    this.rowRef.current.clearFirstRow();
    this.setState({
      sqlRowIds: [],
      sqlQueryString: "",
    });
  }

  /**
   * Gets all the sql queries for all the rows in the view when the 'Search' button is clicked
   */
  computeSqlQueries() {
    // Retrieve sql query from the first row
    const firstRowSqlQuery = this.rowRef.current.createSqlStringForRow();
    const sqlQueries = [firstRowSqlQuery];
    // Loop through all the added rows and get the sql query for each row
    this.state.sqlRowIds.forEach((rowId) => {
      const sqlQuery = this.rowRefsArray[rowId].createSqlStringForRow();
      sqlQueries.push(sqlQuery);
    });
    const sqlAndStatements = sqlQueries.join(" AND ");
    const fullSqlQuery = this.sqlSelect.concat(sqlAndStatements);
    this.setState({
      sqlQueryString: fullSqlQuery,
    });
  }

  render() {
    return (
      <div>
        <div className={styles.header}>Search for Sessions</div>
        <div>
          <div>
            <QueryBuilderRow
              id={1}
              onRemoveRow={this.removeRow}
              ref={this.rowRef}
            />
            {this.state.sqlRowIds.map((sqlRowId) => (
              <QueryBuilderRow
                key={sqlRowId}
                id={sqlRowId}
                ref={(ref) => {
                  this.rowRefsArray[sqlRowId] = ref;
                }}
                onRemoveRow={this.removeRow}
              />
            ))}
          </div>
          <button onClick={() => this.addRow()} className={styles.andButton}>
            And
          </button>
        </div>
        <hr className={styles.lineBreak}></hr>
        <SearchAndReset
          computeSQLQueries={this.computeSqlQueries}
          resetRows={this.resetRows}
        />
        <div className={styles.generatedSqlBox}>
          <div className={styles.sqlText}>{this.state.sqlQueryString}</div>
        </div>
      </div>
    );
  }
}

export default SQLGeneratorView;
