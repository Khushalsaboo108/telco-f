"use client";

import type React from "react";

import { TableCommonButtons } from "@/components/global/CommonButton";
import CustomTable from "@/components/global/CustomTable";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IPurchaseCourseDetail } from "@/types/course";

interface IUserDetailData {
  userDetailData: IPurchaseCourseDetail | null;
  initialPage?: number;
  initialLimit?: number;
}

const UserDetailTable: React.FC<IUserDetailData> = ({
  userDetailData = null,
  initialPage = 1,
  initialLimit = 10,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [tableParams, setTableParams] = useState({
    page: initialPage,
    limit: initialLimit,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", tableParams.page.toString());
    searchParams.set("limit", tableParams.limit.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  }, [tableParams, router, pathname]);

  const handleTableChange = (_pagination: any, filters: any) => {
    const selectedQuery = null;

    const updatedParams = {
      ...tableParams,
      query: selectedQuery,
    };

    setTableParams(updatedParams);
  };

  const columns = [
    {
      key: "userName",
      title: "User Name",
      dataIndex: ["user", "name"],
    },
    {
      key: "userEmail",
      title: "Email",
      dataIndex: ["user", "email"],
    },
    {
      key: "userPhone",
      title: "Phone",
      dataIndex: ["user", "phone"],
    },
  ];

  const meta = {
    totalRecords: userDetailData?.pagination.totalRecords ?? 0,
    totalPages: userDetailData?.pagination.totalPages ?? 0,
    currentPage: userDetailData?.pagination.currentPage ?? 0,
    currentLimit: userDetailData?.pagination.currentLimit ?? 0,
  };

  const record = { data: userDetailData?.data ?? [], meta };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: string[]) => {
      setSelectedRowKeys(keys);
    },
  };

  return (
    <div className="container mx-auto py-10">
      {userDetailData?.data.length === 0 ? (
        "This course has no purchase details yet."
      ) : (
        <CustomTable
          columns={columns}
          record={record}
          // loading={loading}
          tableParams={tableParams}
          setTableParams={setTableParams}
          type={`${userDetailData?.data[0].course?.title} Purchase Details`}
          handleTableChange={handleTableChange}
          rowSelection={rowSelection}
        />
      )}
    </div>
  );
};

export default UserDetailTable;
