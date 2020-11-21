import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../stylesheets/signup.css'
export class signup extends Component {
    constructor(props) {
        super(props);
    
        this.onchangename = this.onchangename.bind(this);
        this.onchangeid = this.onchangeid.bind(this);
        this.onchangepassword = this.onchangepassword.bind(this);
        this.onchangehospital = this.onchangehospital.bind(this);
    
        this.state = {
          name: '',
          id:'',
          password:'',
          hospital:''
        }
    }
    onchangename=e=>{
        this.setState({
            name:e.target.value
        })
    }
    onchangeid=e=>{
        this.setState({
            id:e.target.value
        })
    }
    onchangepassword=e=>{
        this.setState({
            password:e.target.value
        })
    }
    onchangehospital=e=>{
        this.setState({
            hospital:e.target.value
        })
    }
    render() {
        return (
            <div className="signup-image">
                <div className="bgc"></div>
                <div className="form1">
                    <h1 className="form-heading">CREATE ACCOUNT</h1>
                    <form onSubmit={this.onSubmit} className="main-form">
                        <h1 className="error">{this.state.errors}</h1>
                        <input type="text" required className="input" value={this.state.name} onChange={this.onchangename} placeholder="NAME" />
                        <input type="text" required className="input" value={this.state.id} onChange={this.onchangeid} placeholder="DOCTOR ID" />
                        <input type="password" required className="input" value={this.state.password} onChange={this.onchangepassword} placeholder="PASSWORD" />
                        <input type="text" required className="input" value={this.state.hospital} onChange={this.onchangehospital} placeholder="HOSPITAL'S NAME" />
                        <input type="submit" className="form-btn" />
                    </form>
                    <h1 className="login-line">HAVE AN ACCOUNT ? <Link to='/login' className="login-link">LOG IN</Link></h1>
                </div>
            </div>
        )
    }
}

export default signup

