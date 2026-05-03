import React from "react";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className=" flex justify-between h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Briefcase />
          <p>Job Tracker</p>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-gray-700 hover:text-black">
              Log In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-primary hover:bg-primary/80 text-white">
              Start for free
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
