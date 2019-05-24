import React, { Component } from 'react';
import classes from './App.module.scss';
import Person from '../components/Persons/Person/Person'

class App extends Component {
  state = {
    persons: [
      { id: 'qwer', name: 'Max', age: 28 },
      { id: 'asdf', name: 'Manu', age: 29 },
      { id: 'zxcv', name: 'Stephanie', age: 26 }
    ],
    otherProps: 'other props',
    showPersons: false
  }

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons })
  }

  render() {
    let persons = null;
    let btnClass = null;

    if (this.state.showPersons) {
      persons =
        <div>
          {this.state.persons.map((person) =>
            <Person
              key={person.id}
              name={person.name}
              age={person.age}
            />
          )}
        </div>
      btnClass = classes.Red
    }
    return (
      <div className={classes.App}>
        <h1>PSD2 test plan (Bookings)</h1>
        <p>This is really working!</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    )
  }
}

export default App;
