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

const FormHousehold = ({
  household,
  setHouseholds,
  limit,
  page,
}: {
  household?: any;
  setHouseholds: any;
  limit: number;
  page: number;
}) => {
  const [householdData, setHouseholdData] = useState<any>({
    houseNumber: "",
    address: "",
    totalArea: 0,
    phoneNumber: "",
    ...household,
  });
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    const name = searchParams.get("name");
    let url = `manager/households?limit=${limit}&page=${page}`;
    if (name) {
      url = `manager/households?name=${name}&limit=${limit}&page=${page}`;
    }
    if (household) {
      await fetchData(
        `manager/households/${householdData.id}`,
        setData,
        "PUT",
        householdData
      );
    } else {
      await fetchData(`manager/households`, setData, "POST", householdData);
    }
    await fetchData(url, setHouseholds);
  };
  const handleDeleteHousehold = async (event: any) => {
    event.preventDefault();
    const name = searchParams.get("name");
    let url = `manager/households?limit=${limit}&page=${page}`;
    if (name) {
      url = `manager/households?name=${name}&limit=${limit}&page=${page}`;
    }
    await fetchData(
      `manager/households/${householdData.id}`,
      setData,
      "DELETE"
    );
    await fetchData(url, setHouseholds);
  };

  return (
    <Card className="flex-1 py-8 flex flex-col justify-center gap-8">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {household ? "Cập nhật thông tin." : "Tạo hộ gia đình mới."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 items-center">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="houseNumber">Số nhà</Label>
          <Input
            type="text"
            id="houseNumber"
            placeholder="Số nhà..."
            value={householdData.houseNumber}
            onChange={(e) =>
              setHouseholdData({
                ...householdData,
                houseNumber: e.target.value,
              })
            }
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            type="text"
            id="address"
            placeholder="Địa chỉ..."
            value={householdData.address}
            onChange={(e) =>
              setHouseholdData({ ...householdData, address: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="totalArea">Diện tích</Label>
          <Input
            type="number"
            id="totalArea"
            placeholder="Diện tích..."
            value={householdData.totalArea}
            onChange={(e) =>
              setHouseholdData({ ...householdData, totalArea: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phoneNumber">Số điện thoại</Label>
          <Input
            type="text"
            id="phoneNumber"
            placeholder="Số điện thoại..."
            value={householdData.phoneNumber}
            onChange={(e) =>
              setHouseholdData({
                ...householdData,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {household && (
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={handleDeleteHousehold}
          >
            Xóa
          </Button>
        )}
        <Button type="submit" className="flex-1" onClick={handleSubmitForm}>
          {household ? "Cập nhật" : "Tạo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormHousehold;
