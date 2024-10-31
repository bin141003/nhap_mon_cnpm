"use client";

import Link from "next/link";
import {
  BarChartHorizontalBig,
  Bike,
  ChevronsLeft,
  CreditCard,
  Home,
  Menu,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useParams, usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import NotFound from "../components/NotFound";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [pathName, setPathName] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      const user: any = jwt.verify(token, "123456");
      setUser(user);
    }
    setLoading(false);
  }, []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/admin?name=${searchTerm}`);
  };
  useEffect(() => {
    if (searchTerm === "") {
      router.push(`${pathName}/`);
    }
  }, [searchTerm, router, pathName]);
  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token");
    router.push("/");
  };
  useEffect(() => {
    setPathName(path);
  }, [path]);
  return (
    <>
      {!loading &&
        (user?.role !== 1 ? (
          <NotFound />
        ) : (
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-center">
                  <Link href="/" className="flex gap-1 items-center">
                    <ChevronsLeft className="h-8 w-8" />
                    <span className="text-lg font-semibold">Về trang chủ</span>
                  </Link>
                </div>
                <div className="flex-1">
                  <nav className="grid items-start px-2 font-medium lg:px-4">
                    <Link
                      href="/admin"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                        pathName === "/admin"
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <Home className="h-5 w-5" />
                      Trang chủ
                    </Link>
                    <Link
                      href="/admin/fees"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                        pathName.includes("fees")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <CreditCard className="h-5 w-5" />
                      Các loại phí
                    </Link>
                    <Link
                      href="/admin/vehicles"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                        pathName.includes("vehicles")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      } transition-all hover:text-primary`}
                    >
                      <Bike className="h-5 w-5" />
                      Các loại phương tiện
                    </Link>
                    <Link
                      href="/manager"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <BarChartHorizontalBig className="w-5 h-5" />
                      Trang chủ quản lý
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Home className="h-5 w-5" />
                        Trang chủ
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <CreditCard className="h-5 w-5" />
                        Các loại phí
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Bike className="h-5 w-5" />
                        Các loại phương tiện
                      </Link>
                    </nav>
                    <div className="mt-auto">
                      <Card>
                        <CardHeader>
                          <CardTitle>Upgrade to Pro</CardTitle>
                          <CardDescription>
                            Unlock all features and get unlimited access to our
                            support team.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button size="sm" className="w-full">
                            Upgrade
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search users..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <Avatar>
                        <AvatarImage
                          src="https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <Dialog>
                      <DialogTrigger className="w-full">
                        <DropdownMenuLabel className="cursor-pointer hover:bg-slate-100 active:bg-slate-200 rounded-md flex justify-start">
                          Đăng xuất
                        </DropdownMenuLabel>
                      </DialogTrigger>
                      <DialogContent className="py-10 w-[300px]">
                        <DialogHeader>
                          <DialogTitle className="flex !justify-center mb-4">
                            Bạn có chắc chắn đăng xuất?
                          </DialogTitle>
                        </DialogHeader>
                        <DialogFooter className="mx-4 flex !justify-between">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Hủy
                            </Button>
                          </DialogClose>
                          <Button
                            type="button"
                            variant="default"
                            onClick={handleLogout}
                          >
                            Đồng ý
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </header>
              {children}
            </div>
          </div>
        ))}
    </>
  );
}
