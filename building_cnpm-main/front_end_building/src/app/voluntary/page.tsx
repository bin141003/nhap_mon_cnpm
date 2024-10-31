"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationComponent } from "../components/Pagination";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "../components/Loading";
import { fetchData } from "@/lib/fetchData";
import getDate from "@/lib/getDate";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";
const Volubtary = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [voluntaries, setVoluntaries] = useState<any>({});
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    let url = `public/voluntary-contributions?limit=${limit}&page=${page}`;
    fetchData(url, setVoluntaries);
    setLoading(false);
  }, [page]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Card className="mx-4 my-4">
          <CardHeader>
            <Link
              href={"/"}
              className="flex gap-2 text-2xl font-semibold items-center"
            >
              {" "}
              <ChevronsLeft className="h-8 w-8" />
              Trang chủ
            </Link>
            <CardTitle>Danh sách ủng hộ</CardTitle>
          </CardHeader>
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
                    <TableRow
                      className="cursor-pointer"
                      key={voluntaryContribution.id}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {voluntaryContribution.resident.fullName}
                      </TableCell>
                      <TableCell>{voluntaryContribution.description}</TableCell>
                      <TableCell>{voluntaryContribution.amout}</TableCell>
                      <TableCell>
                        {getDate(voluntaryContribution.date)}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <PaginationComponent
              totalPages={
                voluntaries?.data?.count > 0
                  ? Math.ceil(voluntaries?.data?.count / limit)
                  : 1
              }
              className="mt-4"
              setPage={setPage}
            />
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Volubtary;
