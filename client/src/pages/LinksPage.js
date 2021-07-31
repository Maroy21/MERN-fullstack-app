import React, {useEffect, useState, useContext,useCallback} from 'react';
import {Loader} from '../components/Loader'
import {useHttp} from '../hooks/http.hook'
import { LinksList } from '../components/linksList';
import {AuthContext} from '../context/AuthContext'



const LinksPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [links, setLinks] = useState([])

    const fetchLinks =  useCallback( async ()=>{
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(fetched)
        } catch (error) {
            console.log('фетч подвел')
            }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])


    if(loading) {
        return <Loader />
    } 


    

    return (
        <>
            {!loading && links && <LinksList links={links}/>}
        </>
    )
            
        
     


    

    
    
}
export default LinksPage