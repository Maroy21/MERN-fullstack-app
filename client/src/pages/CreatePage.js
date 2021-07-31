import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'

const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    
    const {request} = useHttp()

    useEffect(() => {
        window.M.updateTextFields()
    },[])


    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (error) {
                
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem'}}>
                <div className="input-field ">
                    <input 
                        placeholder="Вставте ссылку " 
                        id="link" 
                        type="text" 
                        onChange={e => setLink(e.target.value)} 
                        onKeyPress = {pressHandler}                           
                        />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>            
        </div>
    )
}
export default CreatePage