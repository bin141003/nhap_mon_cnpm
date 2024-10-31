"use client";

import { PaginationComponent } from "./components/Pagination";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "./components/Header";
import HouseholdListTable from "./components/HouseholdListTable";
import Loading from "./components/Loading";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [households, setHouseholds] = useState<any>([]);
  const [total, setTotal] = useState<any>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;
  useEffect(() => {
    if (searchTerm === "") {
      router.push("/");
    }
  }, [searchTerm, router]);

  useEffect(() => {
    setLoading(true);
    const houseNumber = searchParams.get("houseNumber");
    let url_count = `public/households/count`;
    let url = `public/households?limit=${limit}&page=${page}`;
    if (houseNumber) {
      url_count = `public/households/count?houseNumber=${houseNumber}`;
      url = `public/households?houseNumber=${houseNumber}&limit=${limit}&page=${page}`;
    }
    fetchData(url_count, setTotal);
    fetchData(url, setHouseholds);
    setLoading(false);
  }, [page, searchParams]);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {loading ? (
          <Loading />
        ) : (
          <div className="">
            <HouseholdListTable
              households={households}
              page={page}
              limit={limit}
              total={total}
            />
            <PaginationComponent
              totalPages={total.data > 0 ? Math.ceil(total.data / limit) : 1}
              className="mt-8"
              setPage={setPage}
            />
          </div>
        )}
      </main>
    </div>
  );
}
