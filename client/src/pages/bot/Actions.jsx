import axios from "axios";
import { useState } from "react"

const api = import.meta.env.VITE_API_URI + "/user"

export default function Actions(){
    const [values, setValues] = useState({serverId: '', userId: '', reason: '', time: ''})
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    function handleChange(e){
        setValues({...values, [e.target.name]: e.target.value})
    }
    async function handleBanClick(){
        await axios.post(api+"/ban", {
            serverId: values.serverId,
            userId: values.userId,
            reason: values.reason
        }).then(res=> setData(res.data)).catch(err=> setError(err))
    }
    async function handleKickClick(){
        await axios.post(api+"/kick", {
            serverId: values.serverId,
            userId: values.userId,
            reason: values.reason
        }).then(res=> setData(res.data)).catch(err=> setError(err))
    }
    async function handleUnbanClick(){
        await axios.post(api+"/unban", {
            serverId: values.serverId,
            userId: values.userId,
            reason: values.reason
        }).then(res=> setData(res.data)).catch(err=> setError(err))
    }
    async function handleTimeoutClick(){
        await axios.post(api+"/timeout", {
            serverId: values.serverId,
            userId: values.userId,
            reason: values.reason,
            time: values.time
        }).then(res=> setData(res.data)).catch(err=> setError(err))
    }
    return (
        <>
            {error && error?.message}
            {data?.success && data?.message}


            <div className="container">
                {JSON.stringify(values)}
                <label htmlFor="serverId">Server ID: <input type="text" name="serverId" value={values.serverId} onChange={handleChange} placeholder="Server ID..."  /></label>
                <label htmlFor="userId">User ID: <input type="text" name="userId" value={values.userId} onChange={handleChange} placeholder="User ID..." /></label>
                <label htmlFor="reason">Reason: <input type="text" name="reason" value={values.reason} onChange={handleChange} placeholder="Reason.." /></label>
                
                <button onClick={handleBanClick}>Ban</button>
                <button onClick={handleKickClick}>Kick</button>
                <button onClick={handleUnbanClick}>Unban</button>

                <div>
                    <h3>Timeout</h3>
                    <label htmlFor="time">Time: <input type="text" name="time" value={values.time} onChange={handleChange} placeholder="Time.." /></label>
                    <button onClick={handleTimeoutClick}>Timeout</button>
                </div>
            </div>

        </>
    )
}