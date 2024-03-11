import React from "react";

function Footer() {
  return (
    <div className="bg-customBlue text-white rounded-t-3xl mt-8 md:-mt-32 lg:mt-20">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className="w-full md:-ml-20">
          <h1 className="font-semibold text-3xl pb-4">PrimeProject</h1>
          <p>
            Empowering Innovation, Building Excellence - PrimeProject: Where
            Ideas Take Flight and Success Finds a Home.
          </p>
        </div>

        <div>
          <nav className="flex flex-col gap-2 md:ml-10 md:mt-10 ">
            <a className="cursor-pointer text-white group relative">Features</a>
            <a className="cursor-pointer text-white group relative ">Contact</a>
            <a className="cursor-pointer text-white group relative ">
              Our Team
            </a>
            <a className="cursor-pointer text-white group relative ">
              Services
            </a>
          </nav>
        </div>
        <div className="">
          <nav className="flex flex-col gap-2 md:ml-10 md:mt-10 ">
            <a className="cursor-pointer text-white group relative">About Us</a>
            <a className="cursor-pointer text-white group relative">Blog</a>
            <a className="cursor-pointer text-white group relative">FAQ</a>
            <a className="cursor-pointer text-white group relative">Privacy</a>
          </nav>
        </div>
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0 md:ml-10">
            Contact Us
          </h1>
          <nav className="flex flex-col gap-2 md:ml-10 lg:ml-10">
            <a className="cursor-pointer" href="">
              Address: 123 Main St, Cityville, USA
            </a>
            <a className="cursor-pointer" href="">
              Phone: (555) 123-4567
            </a>
            <a className="cursor-pointer" href="">
              Email: primeproject@example.com
            </a>
          </nav>
        </div>
      </div>
      <div>
        <p className="align-center text-center mt-10">
          All Copyright © Reserved 2024 PrimeProject
        </p>
      </div>
    </div>
  );
}

export default Footer;
