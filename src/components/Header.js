import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation} from 'react-router-dom'
const Header = (props) => {
    const location = useLocation()
    
    
    return (
        <header className="header">
            <h1>{ props.title }</h1>
            {location.pathname === '/' && 
            <Button 
                color={props.showAddTask ? "Red" : "Green"} 
                text={props.showAddTask ? "Close" : "Add"} 
                onClick={props.onAdd}>
            </Button>}
            
        </header>

    )
}

Header.defaultProps = { //Adding default props
    title: 'Task tacker'
}

Header.propTypes = { //Creates the prop type
    title: PropTypes.string,
}

//Css in JS
/*
const headingStyle = {
    color: 'red',
    backgroundColor: 'black'

}
*/

export default Header

