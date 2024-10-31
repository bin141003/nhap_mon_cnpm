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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const FormVoluntaries = ({
  voluntaries,
  setVoluntaries,
  limit,
  page,
}: {
  voluntaries?: any;
  setVoluntaries: any;
  limit: number;
  page: number;
}) => {
  const [voluntariesData, setVoluntariesData] = useState<any>({
    residentId: 0,
    description: "",
    amout: 0,
    date: "",
    ...voluntaries,
  });
  const [data, setData] = useState<any>(null);
  const [residents, setResidents] = useState<any>(null);
  useEffect(() => {
    fetchData("manager/residents", setResidents);
  }, []);
  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    let url = `public/voluntary-contributions?limit=${limit}&page=${page}`;
    if (voluntaries) {
      await fetchData(
        `manager/voluntary-contributions/${voluntariesData.id}`,
        setData,
        "PUT",
        voluntariesData
      );
    } else {
      await fetchData(
        `manager/voluntary-contributions`,
        setData,
        "POST",
        voluntariesData
      );
    }
    await fetchData(url, setVoluntaries);
  };
  const handleDeleteVoluntaries = async (event: any) => {
    event.preventDefault();
    let url = `public/voluntary-contributions?limit=${limit}&page=${page}`;
    await fetchData(
      `manager/voluntary-contributions/${voluntariesData.id}`,
      setData,
      "DELETE"
    );
    await fetchData(url, setVoluntaries);
  };
  return (
    <Card className="flex-1 py-8 flex flex-col justify-center gap-8">
      <CardHeader>
        <CardTitle className="flex justify-center">
          {voluntaries ? "Cập nhật thông tin." : "Tạo thông tin mới."}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="w-full">
          <Label>Người quyên góp</Label>
          <ComboBox
            datas={residents?.data?.residents}
            setValues={setVoluntariesData}
            values={voluntariesData}
            value="residentId"
            label="fullName"
          />
        </div>
        <div className="w-full">
          <Label>Miêu tả</Label>
          <Input
            type="text"
            value={voluntariesData.description}
            onChange={(e) =>
              setVoluntariesData({
                ...voluntariesData,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <Label>Số tiền</Label>
          <Input
            type="number"
            value={voluntariesData.amout}
            onChange={(e) =>
              setVoluntariesData({
                ...voluntariesData,
                amout: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <Label>Ngày quyên góp</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  voluntariesData.date !== "" && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {voluntariesData.date ? (
                  format(voluntariesData.date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={voluntariesData.date}
                onSelect={(e: any) =>
                  setVoluntariesData({
                    ...voluntariesData,
                    date: format(e, "yyyy-MM-dd"),
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {voluntaries && (
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={handleDeleteVoluntaries}
          >
            Xóa
          </Button>
        )}
        <Button type="submit" className="flex-1" onClick={handleSubmitForm}>
          {voluntaries ? "Cập nhật" : "Tạo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormVoluntaries;
