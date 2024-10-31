"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useEffect, useState } from "react";

const LoginOrControl = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user: any = jwt.verify(token, "123456");
      setUser(user);
    }
  }, []);
  return (
    <>
      {user ? (
        <Link href={user.role === 1 ? "/admin" : "manager"}>
          <Avatar>
            <AvatarImage
              src="https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};

export default LoginOrControl;
