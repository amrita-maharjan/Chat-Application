"use client";

import { Button } from "@/components/ui/button";
import classNames from "clsx";
import { useRouter } from "next/navigation";

type navProps = {
  user: string | null;
};

export const Navbar: React.FC<navProps> = ({ user }) => {
  const router = useRouter();
  const handleClick = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <nav
        className={classNames({
          "flex items-center justify-between": true,
          "w-screen md:w-full sticky z-10 px-4 md:px-16 h-[73px] md:h-[92px] top-0 ":
            true,
        })}
      >
        <p className="font-medium  text-lg md:text-2xl">Hello {user}</p>
        <Button onClick={handleClick} variant={"outline"}>
          Logout
        </Button>
      </nav>
    </>
  );
};
