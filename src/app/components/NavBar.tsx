import React from 'react';
import SoundWaveIcon from './SoundWaveIcon';
import Link from 'next/link'

const Links = [ 
{ label:"Home",
route:"/",

},
{ label:"About",
route:"/about"},
{ label:"Contact",
route:"/contact"}

]



const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0  cursor-pointer">
            <SoundWaveIcon />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {Links.map(({label,route})=>(
                    <Link  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"href={route}>
                        {label}
                    </Link>
))}
                

              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
             
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
