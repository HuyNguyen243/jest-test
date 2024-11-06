import axios from 'axios'
import React from 'react'
function Login() {
  const [error, setErr] = React.useState(false)
  const [userName,setUserName] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [user,setUser] = React.useState({})
  const [loading , setLoading] = React.useState(false)
  const handleClick = (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const {data} = axios.get("https://jsonplaceholder.typicode.com/user/1")
      setUser(data)
    } catch (error) {
      setErr(true)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <form onSubmit={handleClick}>
        <input type="text" name="name" id="" placeholder='Enter your name' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        <input type="password" name="" id="" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button  disabled={!userName || !password ? true: false}>{loading ?"please wait": "Login"}</button>
        <span data-testid="error" style={{ visibility: error ? "visible": 'hidden' }} >Something went wrong</span>
    
      </form>
    </div>
  )
}

export default Login