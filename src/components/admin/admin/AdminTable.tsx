"use client";

import type React from "react";

import { TableCommonButtons } from "@/components/global/CommonButton";
import CustomTable from "@/components/global/CustomTable";
import type { IApiBlogResponse, IBlog } from "@/types/blog";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteBlog } from "@/app/actions/blog.action";
import { IAdminsResponse } from "@/types/admin";

interface IBlogData {
  blogData: IAdminsResponse | null;
  initialPage?: number;
  initialLimit?: number;
}

const AdminTable: React.FC<IBlogData> = ({
  blogData = null,
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

  const handleView = (id: string) => {
    router.push(`/admin/admin/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/admin/${id}`);
  };

  const handleDelete = async (id: string) => await console.log(id);

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
      key: "adminName",
      title: "Admin Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      key: "adminEmail",
      title: "Admin Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      key: "adminStatus",
      title: "Admin Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      key: "actions",
      title: "Actions",
      render: (_: any, record: any) => {
        return (
          <TableCommonButtons
            // onView={() => handleView(record._id)}
            onEdit={() => handleEdit(record._id)}
            onDelete={() => handleDelete(record._id)}
            modal="admin"
            tooltipTitles={{
              // view: "View Details",
              edit: "Edit Admin",
              delete: "Delete Admin",
            }}
          />
        );
      },
    },
  ];

  //   const meta = {
  //     totalRecords: blogData?.pagination.totalRecords ?? 0,
  //     totalPages: blogData?.pagination.totalPages ?? 0,
  //     currentPage: blogData?.pagination.currentPage ?? 0,
  //     currentLimit: blogData?.pagination.currentLimit ?? 0,
  //   };

  const record = { data: blogData?.data ?? [] };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: string[]) => {
      setSelectedRowKeys(keys);
    },
  };

  return (
    <div className="container mx-auto py-10">
      <CustomTable
        columns={columns}
        record={record}
        // loading={loading}
        tableParams={tableParams}
        setTableParams={setTableParams}
        type="Admin"
        handleTableChange={handleTableChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default AdminTable;
