import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const MENU_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Book Table", href: "/reservation" },
];

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuModal]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuModal(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-22 z-50 relative ${
        router.asPath === "/"  ? "bg-light/10" : "bg-primary"
      }`}
    >
      <div className="container mx-auto h-full flex justify-between items-center ">
        <Logo />
        <nav
          className={`sm:static absolute top-0 left-0 sm:text-primary-text text-primary-light font-bold sm:w-auto sm:h-auto w-full h-screen sm:bg-transparent bg-light sm:flex hidden ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
          <ul className="uppercase flex flex-col sm:flex-row gap-x-2 ">
            {MENU_ITEMS.map((item) => (
              <li
                key={item.href}
                className={`px-[5px] py-5 font-crimson-text text-lg  hover:rounded-full sm:list-none list-disc on-hover ${
                  router.asPath === item.href ? "text-secondary" : ""
                }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
          {isMenuModal && (
            <button
              className=" absolute top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <IoMdCloseCircle size={25} className=" on-hover" />
            </button>
          )}
        </nav>
        <div
          className={`flex gap-x-4 items-center md:p-0 p-10 ${
            isMenuModal ? "hidden" : ""
          }`}
        >
          <Link href="/auth/login">
            <FaUserAlt
              className={`on-hover ${
                (router.asPath.includes("auth") ||
                  router.asPath.includes("user")) &&
                "text-primary"
              } `}
            />
          </Link>
          <Link href="/cart" className="on-hover relative">
            <FaShoppingCart />
            {mounted && (
              <span className="cart-badge">{cart.products.length}</span>
            )}
          </Link>

          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="on-hover" />
          </button>

          <Link href="/cart" className="md:inline-block hidden">
            <button className="btn-primary ">Order Online</button>
          </Link>

          <button
            className="sm:hidden inline-block "
            onClick={() => setIsMenuModal(true)}
          >
            <RxHamburgerMenu className="text-xl on-hover" />
          </button>
        </div>
      </div>
      <div>
        {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
      </div>
    </div>
  );
};

export default Header;
