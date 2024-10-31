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

const FormVehicle = ({
  vehicle,
  setVehicles,
  limit,
  page,
}: {
  vehicle?: any;
  setVehicles: any;
  limit: number;
  page: number;
}) => {
  const [vehicleData, setVehicleData] = useState<any>({
    name: "",
    monthlyFee: 0,
    ...vehicle,
  });
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    const name = searchParams.get("name");
    let url = `public/vehicle-types?limit=${limit}&page=${page}`;
    if (name) {
      url = `public/vehicle-types?type=${name}&limit=${limit}&page=${page}`;
    }
    if (vehicle) {
      await fetchData(
        `admin/vehicle-types/${vehicleData.id}`,
        setData,
        "PUT",
        vehicleData
      );
    } else {
      await fetchData(`admin/vehicle-types`, setData, "POST", vehicleData);
    }
    await fetchData(url, setVehicles);
  };
  const handleDeleteVehicle = async (event: any) => {
    event.preventDefault();
    const name = searchParams.get("name");
    let url = `public/vehicle-types?limit=${limit}&page=${page}`;
    if (name) {
      url = `public/vehicle-types?name=${name}&limit=${limit}&page=${page}`;
    }
    await fetchData(`admin/vehicle-types/${vehicleData.id}`, setData, "DELETE");
    await fetchData(url, setVehicles);
  };
  console.log(vehicleData);
  return (
    <Card className="flex-1 py-8 flex flex-col justify-center gap-8">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {vehicle ? "Cập nhật thông tin." : "Tạo phí dịch vụ mới."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 items-center">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Loại xe</Label>
          <Input
            type="text"
            id="name"
            placeholder="name..."
            value={vehicleData.name}
            onChange={(e) =>
              setVehicleData({ ...vehicleData, name: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Phí/tháng</Label>
          <Input
            type="number"
            id="password"
            placeholder="monthly fee..."
            value={vehicleData.monthlyFee}
            onChange={(e) => {
              setVehicleData({
                ...vehicleData,
                monthlyFee: Number(e.target.value),
              });
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {vehicle && (
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={handleDeleteVehicle}
          >
            Xóa
          </Button>
        )}
        <Button type="submit" className="flex-1" onClick={handleSubmitForm}>
          {vehicle ? "Cập nhật" : "Tạo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormVehicle;
