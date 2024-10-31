"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const FormUser = ({
  user,
  setUsers,
  limit,
  page,
}: {
  user?: any;
  setUsers: any;
  limit: number;
  page: number;
}) => {
  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    password: "",
    role: 0,
    ...user,
  });
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    const name = searchParams.get("name");
    let url = `admin/users?limit=${limit}&page=${page}`;
    if (name) {
      url = `admin/users?name=${name}&limit=${limit}&page=${page}`;
    }
    if (user) {
      await fetchData(`admin/users/${userData.id}`, setData, "PUT", userData);
    } else {
      await fetchData(`admin/register`, setData, "POST", userData);
    }
    await fetchData(url, setUsers);
  };
  const handleDeleteUser = async (event: any) => {
    event.preventDefault();
    const name = searchParams.get("name");
    let url = `admin/users?limit=${limit}&page=${page}`;
    if (name) {
      url = `admin/users?name=${name}&limit=${limit}&page=${page}`;
    }
    await fetchData(`admin/users/${userData.id}`, setData, "DELETE");
    await fetchData(url, setUsers);
  };

  return (
    <Card className="flex-1 py-8 flex flex-col justify-center gap-8">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {user ? "Cập nhật thông tin." : "Tạo người quản lý mới."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 items-center">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="name"
            id="name"
            placeholder="Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="role">Role</Label>
          <Select
            defaultValue={`${userData.role}`}
            onValueChange={(e) => setUserData({ ...userData, role: Number(e) })}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="1">Quản trị viên</SelectItem>
                <SelectItem value="0">Quản lý</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {user && (
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={handleDeleteUser}
          >
            Xóa
          </Button>
        )}
        <Button type="submit" className="flex-1" onClick={handleSubmitForm}>
          {user ? "Cập nhật" : "Tạo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormUser;
