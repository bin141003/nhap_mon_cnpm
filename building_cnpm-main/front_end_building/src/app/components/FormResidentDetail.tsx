import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchData } from "@/lib/fetchData";
import getDate from "@/lib/getDate";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

const TabResidentDetail = ({
  id,
  householdId,
  setHousehold,
}: {
  id: number;
  householdId: number;
  setHousehold: any;
}) => {
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);
  useEffect(() => {
    fetchData(`manager/residents/${id}`, setData);
  }, [id]);
  useEffect(() => {
    if (data !== null) {
      setUserData(data.data);
    }
  }, [data]);
  const handleDeleteFeeDetail = async (e: any) => {
    e.preventDefault();
    await fetchData(`manager/residents/${id}`, setSuccess, "DELETE");
    await fetchData(`public/households/${householdId}`, setHousehold);
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    await fetchData(`manager/residents/${id}`, setData, "PUT", userData);
    await fetchData(`manager/residents/${id}`, setData);
  };
  return (
    <div>
      {data && data.data && (
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl space-y-4 font-semibold">
              <div>
                <Label> Họ tên</Label>
                <Input
                  type="text"
                  value={userData?.fullName}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label> Giới tính</Label>
                <Input
                  type="text"
                  value={userData?.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                />
              </div>
              <div>
                <Label> CMND/CCCD</Label>
                <Input
                  type="text"
                  value={userData?.identityNumber}
                  onChange={(e) =>
                    setUserData({ ...userData, identityNumber: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <Label>Ngày sinh</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        userData?.dateOfBirth !== "" && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {userData?.dateOfBirth ? (
                        format(userData?.dateOfBirth, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={userData?.dateOfBirth}
                      onSelect={(e: any) =>
                        setUserData({
                          ...userData,
                          dateOfBirth: format(e, "yyyy-MM-dd"),
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Mối quan hệ</Label>
                <Input
                  type="text"
                  value={userData?.relationship}
                  onChange={(e) =>
                    setUserData({ ...userData, relationship: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              className="flex-1"
              variant={"destructive"}
              onClick={handleDeleteFeeDetail}
            >
              Xóa
            </Button>
            <Button type="submit" className="flex-1" onClick={handleSubmitForm}>
              Cập nhật
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default TabResidentDetail;
