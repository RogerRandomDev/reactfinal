import React from 'react'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function ProductCardSkeleton({ amount }) {
  return (
    <>
      {new Array(amount).fill().map((_, idx) => {
        return <div className='w-[12rem]' key={idx}>
          <Skeleton height={"10rem"} />
          <Skeleton height={"2rem"} />
          <Skeleton count={2} />
        </div>
      })}

    </>
  )
}

export default ProductCardSkeleton