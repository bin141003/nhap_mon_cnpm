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
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import ComboBox from "./ComboBox";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const FormFeeDetail = ({
  feeDetail,
  setFeeDetails,
  limit,
  page,
  status,
}: {
  feeDetail?: any;
  setFeeDetails: any;
  limit: number;
  page: number;
  status: string;
}) => {
  const [feeDetailData, setFeeDetailData] = useState<any>({
    householdId: 0,
    feeId: 0,
    quantity: 0,
    dueDate: "",
    status: "pending",
    ...feeDetail,
  });
  const [data, setData] = useState<any>(null);
  const [households, setHouseholds] = useState<any>(null);
  const [fees, setFees] = useState<any>(null);
  useEffect(() => {
    fetchData("manager/households", setHouseholds);
    fetchData("public/fees", setFees);
  }, []);
  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    let url = `manager/fee-details?limit=${limit}&page=${page}`;
    if (status !== "all") {
      url = `manager/fee-details?status=${status}&limit=${limit}&page=${page}`;
    }
    if (feeDetail) {
      await fetchData(
        `manager/fee-details/${feeDetailData.id}`,
        setData,
        "PUT",
        feeDetailData
      );
    } else {
      await fetchData(`manager/fee-details`, setData, "POST", feeDetailData);
    }
    await fetchData(url, setFeeDetails);
  };
  const handleDeleteFeeDetail = async (event: any) => {
    event.preventDefault();
    let url = `manager/fee-details?limit=${limit}&page=${page}`;
    if (status !== "all") {
      url = `manager/fee-details?status=${status}&limit=${limit}&page=${page}`;
    }
    await fetchData(
      `manager/fee-details/${feeDetailData.id}`,
      setData,
      "DELETE"
    );
    await fetchData(url, setFeeDetails);
  };
  return (
    <Card className="flex-1 py-8 flex flex-col justify-center gap-8">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {feeDetail ? "Cập nhật thông tin." : "Tạo phí dịch vụ mới."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="w-full">
          <Label>Số nhà</Label>
          <ComboBox
            datas={households?.data?.households}
            setValues={setFeeDetailData}
            values={feeDetailData}
            value="householdId"
            label="houseNumber"
          />
        </div>
        <div className="w-full">
          <Label>Loại phí</Label>
          <ComboBox
            datas={fees?.data?.fees}
            setValues={setFeeDetailData}
            values={feeDetailData}
            value="feeId"
            label="type"
          />
        </div>
        <div className="w-full">
          <Label>Số lượng</Label>
          <Select
            defaultValue={feeDetailData.status}
            onValueChange={(e) =>
              setFeeDetailData({ ...feeDetailData, status: e })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="pending">Chưa trả</SelectItem>
                <SelectItem value="pair">Đã trả</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Label>Số lượng</Label>
          <Input
            type="number"
            value={feeDetailData.quantity}
            onChange={(e) =>
              setFeeDetailData({
                ...feeDetailData,
                quantity: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="w-full">
          <Label>Hạn trả</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  feeDetailData.dueDate !== "" && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {feeDetailData.dueDate ? (
                  format(feeDetailData.dueDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={feeDetailData.dueDate}
                onSelect={(e: any) =>
                  setFeeDetailData({
                    ...feeDetailData,
                    dueDate: format(e, "yyyy-MM-dd"),
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {feeDetail && (
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={handleDeleteFeeDetail}
          >
            Xóa
          </Button>
        )}
        <Button type="submit" className="flex-1" onClick={handleSubmitForm}>
          {feeDetail ? "Cập nhật" : "Tạo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormFeeDetail;
