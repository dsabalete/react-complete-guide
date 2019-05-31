import React, { Component } from 'react'

import classes from './App.module.scss'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass'
import AuxWrapper from '../hoc/AuxWrapper'
import AuthContext from '../context/auth-context'

class App extends Component {
    constructor(props) {
        super(props)
        console.log('[App.js] constructor')
    }

    state = {
        persons: [
            { id: 'qwer', name: 'Max', age: 28 },
            { id: 'asdf', name: 'Manu', age: 29 },
            { id: 'zxcv', name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value',
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        authenticated: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[App.js] getDerivedStateFromProps', nextProps, prevState)
        return prevState
    }

    getSnapshotBeforeUpdate() {
        console.log('[App.js] getSnapshotBeforeUpdate')
        return
    }
    // componentWillMount() {
    //   console.log('[App.s] componentWillMount')
    // }

    componentDidMount() {
        console.log('[App.s] componentDidMount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[App.js] shouldComponentUpdate')
        return true
    }

    componentDidUpdate() {
        console.log('[App.js] componentDidUpdate')
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id
        })

        const person = {
            ...this.state.persons[personIndex]
        }

        person.name = event.target.value

        const persons = [...this.state.persons]
        persons[personIndex] = person

        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            }
        })
    }

    deletePersonHandler = personIndex => {
        const persons = [...this.state.persons]
        persons.splice(personIndex, 1)
        this.setState({ persons: persons })
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons
        this.setState({ showPersons: !doesShow })
    }

    loginHandler = () => {
        this.setState({ authenticated: true })
    }

    render() {
        console.log('[App.js] render')
        let persons = null

        if (this.state.showPersons) {
            persons = (
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                    isAuthenticated={this.state.authenticated}
                />
            )
        }

        return (
            <AuxWrapper>
                <button
                    onClick={() => {
                        this.setState({ showCockpit: false })
                    }}
                >
                    Remove Cockpit
                </button>
                <AuthContext.Provider
                    value={{
                        authenticated: this.state.authenticated,
                        login: this.loginHandler
                    }}
                >
                    {this.state.showCockpit ? (
                        <Cockpit
                            title={this.props.appTitle}
                            showPersons={this.state.showPersons}
                            persons={this.state.persons}
                            clicked={this.togglePersonsHandler}
                        />
                    ) : null}
                    {persons}
                </AuthContext.Provider>
            </AuxWrapper>
        )
    }
}

export default withClass(App, classes.App)
