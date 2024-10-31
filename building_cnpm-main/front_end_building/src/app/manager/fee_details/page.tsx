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
import FormFeeDetail from "../../components/FormFeeDetail";
import Link from "next/link";
import getDate from "@/lib/getDate";
export default function FeeDetails() {
  const router = useRouter();
  const [feeDetails, setFeeDetails] = useState<any>({});
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    let url = `manager/fee-details?limit=${limit}&page=${page}`;
    if (status !== "all")
      url = `manager/fee-details?limit=${limit}&page=${page}&status=${status}`;
    fetchData(url, setFeeDetails);
    setLoading(false);
  }, [page, status]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">
              Danh sách Chi phí chi tiết
            </h1>
            <RadioGroup
              defaultValue={status}
              onValueChange={(e) => setStatus(e)}
              className="flex gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">Tất cả</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">Chưa trả</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pair" id="pair" />
                <Label htmlFor="pair">Đã trả</Label>
              </div>
            </RadioGroup>
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
                <FormFeeDetail
                  setFeeDetails={setFeeDetails}
                  limit={limit}
                  page={page}
                  status={status}
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
                    <TableHead>Loại phí</TableHead>
                    <TableHead>Số đơn vị</TableHead>
                    <TableHead>Giá/đơn vị</TableHead>
                    <TableHead>Hạn nộp</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Số nhà</TableHead>
                    <TableHead>Tổng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeDetails?.data?.feeDetails.map(
                    (feeDetail: any, index: number) => (
                      <AlertDialog key={feeDetail.id}>
                        <AlertDialogTrigger asChild>
                          <TableRow className="cursor-pointer">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{feeDetail.fee.type}</TableCell>
                            <TableCell>{feeDetail.quantity}</TableCell>
                            <TableCell>{feeDetail.fee.price}</TableCell>
                            <TableCell>{getDate(feeDetail.dueDate)}</TableCell>
                            <TableCell>
                              {feeDetail.status === "pending"
                                ? "Chưa trả"
                                : "Đã trả"}
                            </TableCell>
                            <TableCell>
                              {feeDetail.household.houseNumber}
                            </TableCell>
                            <TableCell>
                              {feeDetail.fee.price * feeDetail.quantity}
                            </TableCell>
                          </TableRow>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="!max-w-[800px] !h-fit flex !flex-col !justify-start">
                          <div className="flex justify-end">
                            <AlertDialogCancel className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-xl !text-white">
                              X
                            </AlertDialogCancel>
                          </div>
                          <FormFeeDetail
                            feeDetail={feeDetail}
                            setFeeDetails={setFeeDetails}
                            limit={limit}
                            page={page}
                            status={status}
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
                  {(page - 1) * limit + feeDetails?.data?.feeDetails?.length}
                </strong>
                of <strong>{feeDetails?.data?.count}</strong> feeDetails
              </div>
            </CardFooter>
          </Card>
          <PaginationComponent
            totalPages={
              feeDetails?.data?.count > 0
                ? Math.ceil(feeDetails?.data?.count / limit)
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
