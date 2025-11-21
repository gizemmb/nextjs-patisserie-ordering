import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../ui/Title";
import Logo from "../ui/Logo";

const Footer = () => {
  const [footer, setFooter] = useState(null);
  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        if (res.data && res.data.length > 0) {
          setFooter(res.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);

  return (
    <div className="bg-primary-light ">
      <div className="container mx-auto pt-15 pb-10">
        <div className="flex md:justify-around justify-center text-center flex-wrap md:gap-y-0 gap-y-6">
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Contact Us</Title>
            <div className="flex flex-col gap-y-2 mt-6">
              {footer?.location && (
                <a href={footer.location} className="on-hover">
                  <i className="fa fa-map-marker"></i>
                  <span className="inline-block ml-2">
                    456 Sweet Street, New York
                  </span>
                </a>
              )}
              {footer?.phoneNumber && (
                <a href={`tel:${footer.phoneNumber}`} className="on-hover">
                  <i className="fa fa-phone"></i>
                  <span className="inline-block ml-2">
                    {footer.phoneNumber}
                  </span>
                </a>
              )}
              {footer?.email && (
                <a href={`mailto:${footer.email}`} className="on-hover">
                  <i className="fa fa-envelope"></i>
                  <span className="inline-block ml-2">{footer.email}</span>
                </a>
              )}
            </div>
          </div>

          <div className="md:flex-1">
            <div className="flex fles-col justify-center ">
              <Logo />
            </div>
            <div className="flex flex-col gap-y-6 mt-6">
              {footer?.desc && (
                <p className="text-primary-text max-w-md mx-auto ">{footer.desc}</p>
              )}
              {footer?.socialMedia && footer.socialMedia.length > 0 && (
                <div className="flex justify-center gap-x-2 ">
                  {footer?.socialMedia?.map((item) => (
                    <a
                      href={item?.link}
                      className="w-8 h-8 grid place-content-center bg-white text-primary-dark rounded-full hover:text-white hover:bg-primary"
                      key={item._id}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      <i className={item.icon}></i>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:flex-1">
            <Title addClass="text-[30px]">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-6">
              {footer?.openingHours?.day && (
                <div className="flex flex-col gap-1">
                  <span className="inline-block ml-2 mb-3">
                    {footer.openingHours.day}
                  </span>
                </div>
              )}

              {footer?.openingHours?.hour && (
                <div>
                  <span className="inline-block ml-2 ">
                    {footer.openingHours.hour}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-center mt-20">
          © 2022 All Rights Reserved By Free Html Templates
        </p>
      </div>
    </div>
  );
};

export default Footer;
