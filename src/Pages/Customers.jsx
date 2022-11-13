import React from 'react'
import Table from '../Components/Table'

function Customers() {
  return (
    <div className="p-4">
        <h2 className='text-2xl font-semibold my-4'>Customers</h2>
    <Table search={true} type="Full" th={["Customer","Email","Member Since","Purchases","Last Purchase", "Status", "Action"]} data=
    {
        [
            {profile:"Rory Seekamp", email:"roryseekamp@gmail.com",memberSince:new Date().toDateString(), purchases:"25", lastOrder:new Date().toDateString(), status:"Blocked", action:"action"},
            {profile:"Timothy Kauper", email:"timkaup123@gmail.com",memberSince:new Date().toDateString(), purchases:"51", lastOrder:new Date().toDateString(), status:"Active", action:"action"},
            {profile:"James Rockford", email:"jmrf4567@gmail.com",memberSince:new Date().toDateString(), purchases:"3", lastOrder:new Date().toDateString(), status:"Active", action:"action"},
        ]
    }
    />
    </div>
  )
}

export default Customers