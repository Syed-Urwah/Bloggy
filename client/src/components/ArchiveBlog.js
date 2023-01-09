import React from 'react'
import profilieImage from '../images/profile-img.jpg'




export default function ArchiveBlog() {


    

    return (
        <div>

            <div className="top-article">

                <div className="left">

                </div>

                <div className="right">
                    <div className="top-tag">Teachnology</div>
                    <h1 className='top-title'>Title 1</h1>
                    <div className="top-description blog-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi aliquam reprehenderit ipsa inventore exercitationem, tempora minus quam culpa eligendi. Id numquam iure distinctio debitis quidem illum est odio. Impedit, ipsum.</div>

                    <div className="user">
                        <img src={profilieImage} alt="" />
                        <div className="user-details">
                            <div className="name">Urwah</div>
                            <div className="time">jun 21, 2022</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
