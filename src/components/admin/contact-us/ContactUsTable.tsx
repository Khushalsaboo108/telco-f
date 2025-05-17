"use client";
import { TableCommonButtons } from "@/components/global/CommonButton";
import CustomTable from "@/components/global/CustomTable";
import { IContactUsResponces, IRequestContactUs } from "@/types/contact-us";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

interface IContactUsTableProps {
  contactData: IContactUsResponces | null;
  initialPage?: number;
  initialLimit?: number;
}

const ContactUsTable: React.FC<IContactUsTableProps> = ({
  contactData = null,
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

  const handleEdit = (id: string) => {
    router.push(`/admin/contact-query/${id}`);
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
      key: "name",
      title: "Name",
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
      key: "contact",
      title: "Contact Number",
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
            onReply={() => handleEdit(record._id)}
            onDelete={() => handleDelete(record._id)}
            replyDisabled={record.isReplied}
            modal="contactQuery"
            tooltipTitles={{
              view: "View Details",
              edit: "Edit Blog",
              delete: "Delete Blog",
              reply: "Reply",
            }}
          />
        );
      },
    },
  ];

  const meta = {
    totalRecords: contactData?.pagination.totalRecords ?? 0,
    totalPages: contactData?.pagination.totalPages ?? 0,
    currentPage: contactData?.pagination.currentPage ?? 0,
    currentLimit: contactData?.pagination.currentLimit ?? 0,
  };

  const record = { data: contactData?.data ?? [], meta };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: string[]) => {
      setSelectedRowKeys(keys);
    },
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        record={record}
        // loading={loading}
        tableParams={tableParams}
        setTableParams={setTableParams}
        type="Contact Query"
        handleTableChange={handleTableChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default ContactUsTable;
