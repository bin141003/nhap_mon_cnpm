"use client";

import Loading from "@/app/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { fetchData } from "@/lib/fetchData";
import getDate from "@/lib/getDate";
import { Bike, ChevronsLeft, CreditCard, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Household = () => {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [fees, setFees] = useState<any[]>([]);
  const [status, setStatus] = useState<any>("pending");
  useEffect(() => {
    setLoading(true);
    let phoneNumber = localStorage.getItem("phoneNumber");
    fetchData(`public/households/${id}?phoneNumber=${phoneNumber}`, setData);
  }, []);
  useEffect(() => {
    if (data !== null) {
      if (!data.data) {
        toast({
          variant: "destructive",
          title: "Số điện thoại không đúng",
          description: "Bạn không thể xem chi tiết thông tin các khoản phí.",
        });
        router.push("/");
      } else {
        setFees(data.data.fee_details);
        setLoading(false);
        console.log(data);
      }
    }
  }, [data]);

  const handleFeesData = (e: any) => {
    console.log(e);
    if (e === "all") setFees(data.data.fee_details);
    else setFees(data.data.fee_details.filter((fee: any) => fee.status === e));
    setStatus(e);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="m-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Thông tin các khoản phí</h1>
            <Link href="/" className="flex gap-4 text-2xl font-semibold">
              {" "}
              <ChevronsLeft className="h-8 w-8" /> Về trang chủ
            </Link>
          </div>
          <div className="mt-8 space-y-8">
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Thông tin hộ gia đình
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span>Số nhà: {data.data.houseNumber}</span>
                <span>Địa chỉ: {data.data.address}</span>
                <span>Số điện thoại: {data.data.phoneNumber}</span>
                <span>Diện tích: {data.data.totalArea}</span>
                <span>Thành viên: </span>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">STT</TableHead>
                      <TableHead className="">Tên</TableHead>
                      <TableHead>Ngày sinh</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.residents.map((resisent: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="">{index + 1}</TableCell>
                        <TableCell>{resisent.fullName}</TableCell>
                        <TableCell>{getDate(resisent.dateOfBirth)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Phương tiện
                </CardTitle>
                <Bike className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">STT</TableHead>
                      <TableHead className="">Loại xe</TableHead>
                      <TableHead>Biển số</TableHead>
                      <TableHead>Phí gửi xe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.vehicle_details.map(
                      (vehicle_detail: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="">{index + 1}</TableCell>
                          <TableCell>
                            {vehicle_detail.vehicle_type.name}
                          </TableCell>
                          <TableCell>
                            {vehicle_detail.registrationNumber}
                          </TableCell>
                          <TableCell>
                            {vehicle_detail.vehicle_type.monthlyFee + "/tháng"}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1" className="min-h-[300px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Các loại phí
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-20">
                      Chọn mục
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Chọn mục</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={status}
                      onValueChange={handleFeesData}
                    >
                      <DropdownMenuRadioItem value="all">
                        Tất cả
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="pending">
                        Chưa trả
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="pair">
                        Đã trả
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">STT</TableHead>
                      <TableHead className="">Loại phí</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Hạn nộp</TableHead>
                      <TableHead>Giá mỗi đơn vị</TableHead>
                      <TableHead>Đơn vị</TableHead>
                      <TableHead>Tổng tiền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fees.map((fee_detail: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="">{index + 1}</TableCell>
                        <TableCell>{fee_detail.fee.type}</TableCell>
                        <TableCell>{fee_detail.quantity}</TableCell>
                        <TableCell>{getDate(fee_detail.dueDate)}</TableCell>
                        <TableCell>{fee_detail.fee.price}</TableCell>
                        <TableCell>{fee_detail.fee.description}</TableCell>
                        <TableCell>
                          {fee_detail.fee.price * fee_detail.quantity}
                        </TableCell>
                        <TableCell>
                          {fee_detail.status === "pending"
                            ? "Chưa trả"
                            : "Đã trả"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Household;
