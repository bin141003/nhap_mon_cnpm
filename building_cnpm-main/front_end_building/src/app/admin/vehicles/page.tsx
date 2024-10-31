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
import Loading from "../../components/Loading";
import { PaginationComponent } from "../../components/Pagination";
import FormVehicle from "../../components/FormVehicle";
export default function Vehicles() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<any>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    const name = searchParams.get("name");
    let url = `public/vehicle-types?limit=${limit}&page=${page}`;
    if (name) {
      url = `public/vehicles-types?type=${name}&limit=${limit}&page=${page}`;
    }
    fetchData(url, setVehicles);
    setLoading(false);
  }, [page, searchParams]);
  console.log(vehicles);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">
              Danh sách các loại phương tiện
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
                <FormVehicle
                  setVehicles={setVehicles}
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
                    <TableHead>Loại xe</TableHead>
                    <TableHead>Phí/tháng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles?.data?.vehicles.map(
                    (vehicle: any, index: number) => (
                      <AlertDialog key={vehicle.id}>
                        <AlertDialogTrigger asChild>
                          <TableRow className="cursor-pointer">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{vehicle.name}</TableCell>
                            <TableCell>{`${vehicle.monthlyFee}đ`}</TableCell>
                          </TableRow>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="!max-w-[800px] !h-fit flex !flex-col !justify-start">
                          <div className="flex justify-end">
                            <AlertDialogCancel className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-xl !text-white">
                              X
                            </AlertDialogCancel>
                          </div>
                          <FormVehicle
                            vehicle={vehicle}
                            setVehicles={setVehicles}
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
                  {(page - 1) * limit + vehicles?.data?.vehicles.length}
                </strong>
                of <strong>{vehicles?.data?.count}</strong> vehicles
              </div>
            </CardFooter>
          </Card>
          <PaginationComponent
            totalPages={
              vehicles?.data?.count > 0
                ? Math.ceil(vehicles?.data?.count / limit)
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
