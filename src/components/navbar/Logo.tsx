import Link from "next/link";
import { Button } from "../ui/button";
import { VscCode } from "react-icons/vsc";
import Image from "next/image";

function Logo() {
  return (
    // <Link href="/">
    //   <Image src="/logo/logo2.png" alt="logo" width={200} height={50} />
    // </Link>
    <div className="">
      <Link href="/">
        <Image
          src={"/logo/logo2.png"}
          alt="Team Logo"
          className="w-full  object-cover"
          width={200}
          height={50}
        />
      </Link>
    </div>
  );
}
export default Logo;
