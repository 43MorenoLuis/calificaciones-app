import React from 'react'
import { SidebarData } from './SidebarData'

export default function sidebarScreen() {
    return (
        <div className='__sidebar'>
            <p>SidebarScreen</p>
            
            <ul className='__sidebarList'>
                { SidebarData.map(( val, key ) => {
                    return (
                        <li key= { val.key } className='__row'>
                            <div>{ val.icon }</div>
                            <div>{ val.title }</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
