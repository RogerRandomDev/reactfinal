import React from 'react'
import Table from '../Components/Table'

function Customers() {
  return (
    <div className="p-4">
        <h2 className='text-2xl font-semibold my-4'>Customers</h2>
    <Table type="Full" th={["CHECKBOX","Customer","Email","Purchases","Last Purchase", "Status", "Action"]} data=
    {
        [
            {checkbox:true,profile:"Rory Seekamp", email:"roryseekamp@gmail.com",purchases:"25", lastOrder:new Date().toDateString(), status:"Blocked", action:"action"},
            {checkbox:true,profile:"Timothy Kauper", email:"timkaup123@gmail.com",purchases:"51", lastOrder:new Date().toDateString(), status:"Active", action:"action"},
            {checkbox:true,profile:"James Rockford", email:"jmrf4567@gmail.com",purchases:"3", lastOrder:new Date().toDateString(), status:"Active", action:"action"},
        ]
    }
    />
    </div>
  )
}

export default Customers