"use client";

import type React from "react";

import { TableCommonButtons } from "@/components/global/CommonButton";
import CustomTable from "@/components/global/CustomTable";
import type { IApiBlogResponse, IBlog } from "@/types/blog";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteBlog } from "@/app/actions/blog.action";
import { IRolesResponse } from "@/types/role";

interface IBlogData {
  blogData: IRolesResponse | null;
  initialPage?: number;
  initialLimit?: number;
}

const RoleTable: React.FC<IBlogData> = ({
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
    router.push(`/admin/role/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/role/${id}`);
  };

  const handleDelete = async (id: string) => await deleteBlog(id);

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
      key: "roleTitle",
      title: "Role Title",
      dataIndex: "name",
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
            modal="roles"
            tooltipTitles={{
              view: "View Details",
              edit: "Edit Role",
              delete: "Delete Role",
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
        type="Role"
        handleTableChange={handleTableChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default RoleTable;
