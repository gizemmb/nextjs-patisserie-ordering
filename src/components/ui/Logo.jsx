import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src= "/images/gizzypie_.png"
        alt="GizzyPie Logo"
        priority
        width={200}
        height={50}
        className="w-auto  h-auto max-w-[120px] sm:max-w-[140px] md:max-w-40 lg:max-w-[180px]"
      />
    </Link>
  );
};

export default Logo;
