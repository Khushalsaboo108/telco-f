"use client";

import React, { useEffect, useState } from "react";
import { columns } from "@/components/admin/labs/datatable/Columns";
import { DataTable } from "@/components/admin/labs/datatable/DataTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllLabs } from "@/app/actions/lab.action";

function Page() {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const data = await getAllLabs();
        setLabs(data);
      } catch (error) {
        console.error("Error fetching labs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <Link href={"/admin/create-lab"}>
        <Button> New Lab </Button>
      </Link>
      <DataTable columns={columns} data={labs} />
    </div>
  );
}

export default Page;
