import { useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom';

function ReNavigate(){
    const location=useLocation()
    const navigate=useNavigate();
    navigate(location.pathname)
    return <></>
}


export default ReNavigate;