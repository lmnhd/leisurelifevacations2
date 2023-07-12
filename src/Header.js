import { useState, useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
  } from "@material-tailwind/react";
  import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
  import logo from "./llv-logo-june-2023.png";

function Header(){
    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () =>
      window.innerWidth >= 960 && setOpenNav(false);
  
    useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
  
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
    function NavList() {
        return (
          <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 z-0">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <a
                href="#"
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                Themed
              </a>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <a
                href="#"
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                Deals
              </a>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <a
                href="#"
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                Search
              </a>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <a
                href="#"
                className="flex items-center hover:text-blue-500 transition-colors"
              >
                About
              </a>
            </Typography>
          </ul>
        );
      }

    return <>
    <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02 z-50">
        <Navbar className="mx-auto max-w-screen-xl px-3 py-3">
          <div className="flex items-center justify-between text-blue-gray-900">
            <img src={logo} className="logo mr-4 cursor-pointer py-1.5"></img>
            <div className="hidden lg:block">
              <NavList />
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <Collapse open={openNav}>
            <NavList />
          </Collapse>
        </Navbar>
      </header>
    </>

}
export default Header;