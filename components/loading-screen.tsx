import React from 'react'

export default function LoadingScreen() {
  return (
    <div className='flex justify-center items-center flex-col w-full h-screen z-[9999] fixed bg-background'>
      <img src='https://media2.giphy.com/media/mFTRCmlZgMEr5CHmOV/giphy.gif?cid=6c09b952s2zs01za9dmxijpljtdzsv2ne85p2bykg1xpsq73&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s'></img>
      <h2>Loading ?</h2>
    </div>
  )
}
