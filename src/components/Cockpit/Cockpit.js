import React, { useEffect, useRef } from 'react'

import classes from './Cockpit.module.scss'

const Cockpit = props => {
    const toggleBtnRef = useRef(null)

    useEffect(() => {
        console.log('[Cockpit.js] useEffect')
        // Http request...
        // setTimeout(() => {
        //     alert('Saved data to cloud!')
        // }, 1000)
        toggleBtnRef.current.click()
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect')
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect')
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect')
        }
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;

        if (props.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }
        if (props.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}>
                Toggle Persons
            </button>
        </div>
    )
}

export default React.memo(Cockpit)
