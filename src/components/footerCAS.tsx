import React from 'react';
import { FaTiktok, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importar iconos

const footerCAS: React.FC = () => {
    return (
        <footer className="h-min bg-black">
            <div className="flex justify-between items-center">

                <div aria-label="footer text" className="flex flex-row items-center bg-black">

                    <div className="flex flex-col items-center bg-black mx-5">
                        <h3 className="self-center">Universidad peruana de ciencias aplicadas</h3>
                        <label className="self-start">IEEE Student branch</label>
                    </div>

                    <div className="mr-3 h-0 bg-white"></div>

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MfYmvdBoZbAfpgKzo1g4-0T0nD7VsR2ofSlXbtdqqg&s"
                    className="h-20 m-2"></img>

                </div>

                
                <div className='flex flex-row bg-[#155544]'>
                    <div className="w-0 h-0
                        border-t-[120px] border-t-transparent
                        border-l-[60px] border-l-black
                        border-t-[70px] border-t-transparent"
                    ></div>
                    <div aria-label='redes sociales' className="flex flex-col items-center justify-between h-full mt-3 mb-3 mx-9 bg-[#155544]" >
                       
                        <div className="flex flex-row my-4">
                            <a href="https://www.tiktok.com" aria-label="TikTok" className="mx-2">
                                <FaTiktok size={24} />
                            </a>
                            <a href="https://www.instagram.com" aria-label="Instagram" className="mx-2">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://www.linkedin.com" aria-label="LinkedIn" className="mx-2">
                                <FaLinkedin size={24} />
                            </a>
                        </div>

                        <div className="flex flex-row items-center mb-2">
                            <a href="https://www.instagram.com/ieee.cas.upc/">@ieee.cas.upc</a>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}

export default footerCAS;