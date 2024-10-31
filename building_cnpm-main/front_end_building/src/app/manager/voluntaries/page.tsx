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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import Loading from "../../components/Loading";
import { PaginationComponent } from "../../components/Pagination";
import FormVehicleDetail from "../../components/FormVehicleDetail";
import Link from "next/link";
import getDate from "@/lib/getDate";
import FormVoluntaries from "@/app/components/FormVoluntary";
export default function Voluntaries() {
  const router = useRouter();
  const [voluntaries, setVoluntaries] = useState<any>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    let url = `public/voluntary-contributions?limit=${limit}&page=${page}`;
    fetchData(url, setVoluntaries);
    setLoading(false);
  }, [page]);
  console.log(voluntaries);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">
              Danh sách phương tiện chi tiết
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
                <FormVoluntaries
                  setVoluntaries={setVoluntaries}
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
                    <TableHead>Người quyên góp</TableHead>
                    <TableHead>Quyên góp về</TableHead>
                    <TableHead>
                      Số tiền<noscript></noscript>
                    </TableHead>
                    <TableHead>Ngày quyên góp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {voluntaries?.data?.voluntaryContributions.map(
                    (voluntaryContribution: any, index: number) => (
                      <AlertDialog key={voluntaryContribution.id}>
                        <AlertDialogTrigger asChild>
                          <TableRow
                            className="cursor-pointer"
                            key={voluntaryContribution.id}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {voluntaryContribution.resident.fullName}
                            </TableCell>
                            <TableCell>
                              {voluntaryContribution.description}
                            </TableCell>
                            <TableCell>{voluntaryContribution.amout}</TableCell>
                            <TableCell>
                              {getDate(voluntaryContribution.date)}
                            </TableCell>
                          </TableRow>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="!max-w-[800px] !h-fit flex !flex-col !justify-start">
                          <div className="flex justify-end">
                            <AlertDialogCancel className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-xl !text-white">
                              X
                            </AlertDialogCancel>
                          </div>
                          <FormVoluntaries
                            voluntaries={voluntaryContribution}
                            setVoluntaries={setVoluntaries}
                            limit={limit}
                            page={page}
                          />
                        </AlertDialogContent>
                      </AlertDialog>
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
                  {(page - 1) * limit +
                    voluntaries?.data?.voluntaryContributions?.length}
                </strong>
                of <strong>{voluntaries?.data?.count}</strong> voluntaries
              </div>
            </CardFooter>
          </Card>
          <PaginationComponent
            totalPages={
              voluntaries?.data?.count > 0
                ? Math.ceil(voluntaries?.data?.count / limit)
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
