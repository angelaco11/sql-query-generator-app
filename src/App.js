/**
 * This app displays rows with dropdowns and text inputs for a user to create a SQL query
 * with various inputs and print out the query to the view.
 *
 * @author Angela Cooney
 */

import "./App.css";
import React from "react";
import SQLGeneratorView from "./SQLGeneratorView.jsx";

/**
 * @class
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <SQLGeneratorView />
      </div>
    );
  }
}

export default App;
