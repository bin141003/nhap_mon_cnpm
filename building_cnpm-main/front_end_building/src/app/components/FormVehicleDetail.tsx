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

const FormVehicleDetail = ({
  vehicleDetail,
  setVehicleDetails,
  limit,
  page,
}: {
  vehicleDetail?: any;
  setVehicleDetails: any;
  limit: number;
  page: number;
}) => {
  const [vehicleDetailData, setVehicleDetailData] = useState<any>({
    householdId: 0,
    vehicleTypeId: 0,
    registrationNumber: "",
    ...vehicleDetail,
  });
  const [data, setData] = useState<any>(null);
  const [households, setHouseholds] = useState<any>(null);
  const [vehicleTypes, setVehicleTypes] = useState<any>(null);
  useEffect(() => {
    fetchData("manager/households", setHouseholds);
    fetchData("public/vehicle-types", setVehicleTypes);
  }, []);
  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    let url = `manager/vehicle-details?limit=${limit}&page=${page}`;
    if (vehicleDetail) {
      await fetchData(
        `manager/vehicle-details/${vehicleDetailData.id}`,
        setData,
        "PUT",
        vehicleDetailData
      );
    } else {
      await fetchData(
        `manager/vehicle-details`,
        setData,
        "POST",
        vehicleDetailData
      );
    }
    await fetchData(url, setVehicleDetails);
  };
  const handleDeleteVehicleDetail = async (event: any) => {
    event.preventDefault();
    let url = `manager/vehicle-details?limit=${limit}&page=${page}`;
    await fetchData(
      `manager/vehicle-details/${vehicleDetailData.id}`,
      setData,
      "DELETE"
    );
    await fetchData(url, setVehicleDetails);
  };
  return (
    <Card className="flex-1 py-8 flex flex-col justify-center gap-8">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {vehicleDetail ? "Cập nhật thông tin." : "Tạo thông tin mới."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="w-full">
          <Label>Số nhà</Label>
          <ComboBox
            datas={households?.data?.households}
            setValues={setVehicleDetailData}
            values={vehicleDetailData}
            value="householdId"
            label="houseNumber"
          />
        </div>
        <div className="w-full">
          <Label>Loại xe</Label>
          <ComboBox
            datas={vehicleTypes?.data?.vehicles}
            setValues={setVehicleDetailData}
            values={vehicleDetailData}
            value="vehicleTypeId"
            label="name"
          />
        </div>
        <div className="w-full">
          <Label>Biển số xe</Label>
          <Input
            type="text"
            value={vehicleDetailData.registrationNumber}
            onChange={(e) =>
              setVehicleDetailData({
                ...vehicleDetailData,
                registrationNumber: e.target.value,
              })
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {vehicleDetail && (
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={handleDeleteVehicleDetail}
          >
            Xóa
          </Button>
        )}
        <Button type="submit" className="flex-1" onClick={handleSubmitForm}>
          {vehicleDetail ? "Cập nhật" : "Tạo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormVehicleDetail;
