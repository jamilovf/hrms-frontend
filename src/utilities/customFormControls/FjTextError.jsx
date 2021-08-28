import React from 'react'
import { Label } from 'semantic-ui-react'

export default function FjTextError(props) {
    
    return (<div className='error'><Label pointing basic color="red" content={props.children}></Label></div>)
}
