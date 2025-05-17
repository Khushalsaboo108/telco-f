"use client";

import { getAllUsers, softDeleteUser } from "@/app/actions/user.action";
import { TableCommonButtons } from "@/components/global/CommonButton";
import CustomTable from "@/components/global/CustomTable";
import { IUsersResponse } from "@/types/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IUserProps {
  userData: IUsersResponse | null;
  initialPage?: number;
  initialLimit?: number;
}

const UsersTable: React.FC<IUserProps> = ({
  userData = null,
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

  const [userDataState, setUserDataState] = useState<IUsersResponse | null>(
    userData
  );

  const fetchUserData = async () => {
    const response = await getAllUsers(tableParams);
    setUserDataState(response);
  };

  useEffect(() => {
    fetchUserData();
  }, [tableParams]);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", tableParams.page.toString());
    searchParams.set("limit", tableParams.limit.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  }, [tableParams, router, pathname]);

  const handleEdit = (id: string) => {
    router.push(`/admin/users/${id}`);
  };

  const handleDelete = async (id: string) => {
    const request = {
      id: id,
      isDeleted: true,
    };
    const response = await softDeleteUser(request);
    if (response.status) {
      toast.success("User deleted successfully");
      fetchUserData();
      router.refresh();
    }
  };

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
      dataIndex: "name",
      sorter: true,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      key: "phone",
      title: "Phone Number",
      dataIndex: "phone",
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
            deleteDisabled={record.isDeleted}
            modal="users"
            tooltipTitles={{
              view: "View Details",
              edit: "Edit User",
              delete: record.isDeleted
                ? "Delete User"
                : "User All Ready Delete",
            }}
          />
        );
      },
    },
  ];

  const meta = {
    totalRecords: userDataState?.pagination.totalRecords ?? 0,
    totalPages: userDataState?.pagination.totalPages ?? 0,
    currentPage: userDataState?.pagination.currentPage ?? 0,
    currentLimit: userDataState?.pagination.currentLimit ?? 0,
  };

  const record = { data: userDataState?.data ?? [], meta };

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
        type="users"
        handleTableChange={handleTableChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default UsersTable;
