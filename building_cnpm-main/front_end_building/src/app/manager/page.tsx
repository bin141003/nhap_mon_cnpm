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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import Loading from "../components/Loading";
import { PaginationComponent } from "../components/Pagination";
import FormHousehold from "../components/FormHousehold";
import Link from "next/link";
export default function ManagerDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [households, setHouseholds] = useState<any>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    const name = searchParams.get("name");
    let url = `manager/households?limit=${limit}&page=${page}`;
    if (name) {
      url = `manager/households?name=${name}&limit=${limit}&page=${page}`;
    }
    fetchData(url, setHouseholds);
    setLoading(false);
  }, [page, searchParams]);
  const handleRowClick = (id: number) => {
    router.push(`/manager/${id}`);
  };

  const handleClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">
              Danh sách các hộ dân
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
                <FormHousehold
                  setHouseholds={setHouseholds}
                  limit={limit}
                  page={page}
                />
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
                    <TableHead>Số nhà</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead>Diện tích(m^2)</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Chỉnh sửa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {households?.data?.households.map(
                    (household: any, index: number) => (
                      <TableRow
                        key={household.id}
                        className="cursor-pointer"
                        onClick={() => handleRowClick(household.id)}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{household.houseNumber}</TableCell>
                        <TableCell>{household.address}</TableCell>
                        <TableCell>{household.totalArea}</TableCell>
                        <TableCell>{household.phoneNumber}</TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button onClick={handleClick}>Update</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent
                              className="!max-w-[800px] !h-fit flex !flex-col !justify-start"
                              onClick={handleClick}
                            >
                              <div className="flex justify-end">
                                <AlertDialogCancel className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-xl !text-white">
                                  X
                                </AlertDialogCancel>
                              </div>
                              <FormHousehold
                                household={household}
                                setHouseholds={setHouseholds}
                                limit={limit}
                                page={page}
                              />
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing{" "}
                <strong>
                  {(page - 1) * limit + 1}-
                  {(page - 1) * limit + households?.data?.households?.length}
                </strong>
                of <strong>{households?.data?.count}</strong> households
              </div>
            </CardFooter>
          </Card>
          <PaginationComponent
            totalPages={
              households?.data?.count > 0
                ? Math.ceil(households?.data?.count / limit)
                : 1
            }
            className="mt-4"
            setPage={setPage}
          />
        </main>
      )}
    </>
  );
}
