import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" bg-purple-900 py-4   left-0   h-12 ">
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Wave Synth. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
