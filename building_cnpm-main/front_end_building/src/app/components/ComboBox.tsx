"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CommandList } from "cmdk";
import { AnyTxtRecord } from "dns";

export default function ComboBox({
  datas,
  setValues,
  values,
  value,
  label,
}: {
  datas: any[];
  setValues: any;
  values: any;
  value: string;
  label: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {values[value]
            ? datas?.find((data) => data.id === values[value])[label]
            : "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 h-[300px]">
        <Command className="">
          <CommandInput placeholder="Search..." />
          <CommandList className="overflow-y-scroll">
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {datas &&
                datas.map((data) => (
                  <CommandItem
                    key={data.id}
                    value={data.id}
                    onSelect={(e) => {
                      const x = datas.find((d) => d[label] === e);
                      setValues({ ...values, [value]: x.id });
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4
                    ${
                      values[value] === data.id ? " opacity-100" : " opacity-0"
                    }`}
                    />
                    {data[label]}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
