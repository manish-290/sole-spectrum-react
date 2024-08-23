import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='bg-black shadow mt-10 '>
        <div className='container mx-auto px-6 py-3'>
            <div className='p-10 text-center text-gray-400'>
                &copy; 2024 Sole Spectrum. All rights reserved.
                <div className='flex  justify-center p-10'>
                  <a href='https://www.facebook.com/' className='px-2'>
                  <FaFacebook size="1.4em"/>
                  </a>
                  <a href='https://www.instagram.com/' className='px-2'>
                  <FaInstagram size="1.4em"/>
                  </a>
                  <a href='https://www.github.com/' className='px-2' >
                  <FaGithub size="1.4em"/>
                  </a>
                  <a href='https://www.github.com/' className='px-2'>
                  <BiLogoGmail  size="1.4em"/>
                  </a>
                  <a href='https://www.github.com/' className='px-2'>
                  <FaSquareTwitter   size="1.4em"/>
                  </a>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;