"use client";

import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import Loading from "../components/Loading";
import { PaginationComponent } from "../components/Pagination";
import FormUser from "../components/FormUser";
export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<any>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    const name = searchParams.get("name");
    let url = `admin/users?limit=${limit}&page=${page}`;
    if (name) {
      url = `admin/users?name=${name}&limit=${limit}&page=${page}`;
    }
    fetchData(url, setUsers);
    setLoading(false);
  }, [page, searchParams]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">
              Danh sách quản lý chung cư
            </h1>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="bg-slate-500 w-14 h-14 rounded-full">
                  <SquarePen className="w-8 h-8" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="!max-w-[800px] !h-fit flex !flex-col !justify-start">
                <div className="flex justify-end">
                  <AlertDialogCancel className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-xl !text-white">
                    X
                  </AlertDialogCancel>
                </div>
                <FormUser setUsers={setUsers} limit={limit} page={page} />
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Card
            x-chunk="dashboard-06-chunk-0"
            className="min-h-[600px] flex flex-col justify-between"
          >
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STT</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Chức vụ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.data?.users.map((user: any, index: number) => (
                    <AlertDialog key={user.id}>
                      <AlertDialogTrigger asChild>
                        <TableRow className="cursor-pointer">
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {user.role === 1 ? "Quản trị viên" : "Quản lý"}
                          </TableCell>
                        </TableRow>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="!max-w-[800px] !h-fit flex !flex-col !justify-start">
                        <div className="flex justify-end">
                          <AlertDialogCancel className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-xl !text-white">
                            X
                          </AlertDialogCancel>
                        </div>
                        <FormUser
                          user={user}
                          setUsers={setUsers}
                          limit={limit}
                          page={page}
                        />
                      </AlertDialogContent>
                    </AlertDialog>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing{" "}
                <strong>
                  {(page - 1) * limit + 1}-
                  {(page - 1) * limit + users?.data?.total}
                </strong>
                of <strong>{users?.data?.count}</strong> users
              </div>
            </CardFooter>
          </Card>
          <PaginationComponent
            totalPages={
              users?.data?.count > 0 ? Math.ceil(users?.data?.count / limit) : 1
            }
            className="mt-4"
            setPage={setPage}
          />
        </main>
      )}
    </>
  );
}
