import { useState, useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
  } from "@material-tailwind/react";
  import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
  import { Link } from "react-router-dom";
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
          <ul className="z-0 flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <a
                href="#"
                className="flex items-center transition-colors hover:text-blue-500"
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
                className="flex items-center transition-colors hover:text-blue-500"
              >
                Deals
              </a>
            </Typography>
            <Link
            to="/search"
            >
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
              >
                Search
              
              </Typography>
            </Link>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <a
                href="#"
                className="flex items-center transition-colors hover:text-blue-500"
              >
                About
              </a>
            </Typography>
          </ul>
        );
      }

    return <>
    <header className="sticky top-0 z-50 flex items-center justify-between w-full ">
        <Navbar className="max-w-full px-3 py-3">
          <div className="flex items-center justify-between text-blue-gray-900">
            <a href="/"><img src={logo} className="logo mr-4 cursor-pointer py-1.5"></img></a>
            {/* <Link to={"/"}></Link> */}
            <div className="hidden lg:block">
              <NavList />
            </div>
            <IconButton
              variant="text"
              className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="w-6 h-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="w-6 h-6" strokeWidth={2} />
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