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

const FormFee = ({
  fee,
  setFees,
  limit,
  page,
}: {
  fee?: any;
  setFees: any;
  limit: number;
  page: number;
}) => {
  const [feeData, setFeeData] = useState<any>({
    type: "",
    description: "",
    price: 0,
    ...fee,
  });
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    const name = searchParams.get("name");
    let url = `public/fees?limit=${limit}&page=${page}`;
    if (name) {
      url = `public/fees?type=${name}&limit=${limit}&page=${page}`;
    }
    if (fee) {
      await fetchData(`admin/fees/${feeData.id}`, setData, "PUT", feeData);
    } else {
      await fetchData(`admin/fees`, setData, "POST", feeData);
    }
    await fetchData(url, setFees);
  };
  const handleDeleteFee = async (event: any) => {
    event.preventDefault();
    const name = searchParams.get("name");
    let url = `public/fees?limit=${limit}&page=${page}`;
    if (name) {
      url = `public/fees?name=${name}&limit=${limit}&page=${page}`;
    }
    await fetchData(`admin/fees/${feeData.id}`, setData, "DELETE");
    await fetchData(url, setFees);
  };

  return (
    <Card className="flex-1 py-8 flex flex-col justify-center gap-8">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {fee ? "Cập nhật thông tin." : "Tạo phí dịch vụ mới."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 items-center">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Loại phí</Label>
          <Input
            type="text"
            id="name"
            placeholder="type..."
            value={feeData.type}
            onChange={(e) => setFeeData({ ...feeData, type: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Đơn vị</Label>
          <Input
            type="text"
            id="email"
            placeholder="unit..."
            value={feeData.description}
            onChange={(e) =>
              setFeeData({ ...feeData, description: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Giá/đơn vị</Label>
          <Input
            type="number"
            id="password"
            placeholder="price..."
            value={feeData.price}
            onChange={(e) => {
              setFeeData({ ...feeData, price: Number(e.target.value) });
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {fee && (
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={handleDeleteFee}
          >
            Xóa
          </Button>
        )}
        <Button type="submit" className="flex-1" onClick={handleSubmitForm}>
          {fee ? "Cập nhật" : "Tạo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormFee;
