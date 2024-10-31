"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HouseholdListTable = ({
  households,
  page,
  limit,
  total,
}: {
  households: any;
  page: number;
  limit: number;
  total: any;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSubmitForm = async (e: any, id: number) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8080/api/public/households/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.data) {
      localStorage.setItem("phoneNumber", phoneNumber);
      router.push(`/household/${id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Các hộ gia đình</CardTitle>
        <CardDescription>Danh sách các hộ gia đình</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Số nhà </TableHead>
              <TableHead>Địa chỉ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {households &&
              households?.data?.households.map(
                (household: any, index: number) => (
                  <Dialog key={household.id}>
                    <DialogTrigger asChild>
                      <TableRow>
                        <TableCell className="font-medium">
                          {(page - 1) * limit + 1 + index}
                        </TableCell>
                        <TableCell className="font-medium">
                          {household.houseNumber}
                        </TableCell>
                        <TableCell>{household.address}</TableCell>
                      </TableRow>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Nhập số điện thoại</DialogTitle>
                        <DialogDescription>
                          Nhập số điện thoại để vào xem chi tiết thông tin các
                          khoản phí.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        className="flex items-center space-x-2"
                        onSubmit={(e) => handleSubmitForm(e, household.id)}
                      >
                        <div className="grid flex-1 gap-2">
                          <Input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <Button type="submit">Nhập</Button>
                      </form>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
            {(page - 1) * limit + households?.data?.total}
          </strong>{" "}
          of <strong>{total.data}</strong> households
        </div>
      </CardFooter>
    </Card>
  );
};

export default HouseholdListTable;
