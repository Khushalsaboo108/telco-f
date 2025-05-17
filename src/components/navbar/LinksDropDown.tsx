"use client";
import { Button } from "../ui/button";
import UserIcon from "./UserIcon";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "react-cookies";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { authLoading, authName, logoutAuth } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

function LinksDropDown() {
  const dispatch = useAppDispatch();
  const userAccessToken = Cookies.load("userAccessToken");
  const userRefreshToken = Cookies.load("userRefreshToken");
  const loading = useAppSelector(authLoading);
  const name = useAppSelector(authName);
  const router = useRouter();

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!userAccessToken && !userRefreshToken) {
    return (
      <div>
        <Button size={"lg"} variant={"outline"} asChild>
          <Link href={"/signin"}>Login</Link>
        </Button>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await dispatch(logoutAuth());
      router.refresh();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* Protect user session data and provide fallback */}
        <UserIcon username={name || "User"} size="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" me-4 ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/user/courses">
          <DropdownMenuItem>My Courses</DropdownMenuItem>
        </Link>
        <Link href="/user/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href="/user/labs">
          <DropdownMenuItem>Labs</DropdownMenuItem>
        </Link>
        <Link href="/billing">
          <DropdownMenuItem>Purchases</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {/* Added Logout functionality */}
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropDown;
