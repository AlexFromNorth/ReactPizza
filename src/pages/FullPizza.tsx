import React from 'react'
import { useParams } from 'react-router-dom'

const FullPizza = () => {
    const {id} = useParams()

  return (
    <div className='container'>
        <img src="" alt="picture" />
        <h2>{id}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur veritatis nisi maxime dignissimos debitis eius ipsa ex voluptatum porro recusandae sunt fugiat, quo optio laborum obcaecati fuga mollitia, blanditiis velit?</p>
        <h4>250 руб</h4>
    </div>
  )
}

export default FullPizza