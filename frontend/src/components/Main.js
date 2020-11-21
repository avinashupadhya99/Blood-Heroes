import React from 'react'
import img from '../images/img.jpg'
import {Link} from 'react-router-dom'
export default function Main() {
    return (
        <React.Fragment>
            <div className="main">
                <div className="text">
                    <h1 className="heading">Bring A Life Back To Power</h1>
                    <h2 className="heading2">I'm  A</h2>
                    <div style={{display:'flex'}}>
                        <Link to="/login" className="btn">Doctor</Link>
                        <Link to="/donor" className="btn">Donor</Link>
                    </div>
                </div>
                <div className="image">
                <img src={img} className="img" alt="Loading." />
                </div>
            </div>
        </React.Fragment>
    )
}