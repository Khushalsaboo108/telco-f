"use client";

import type React from "react";

import { TableCommonButtons } from "@/components/global/CommonButton";
import CustomTable from "@/components/global/CustomTable";
import type { IApiBlogResponse, IBlog } from "@/types/blog";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteBlog, getAllBlog } from "@/app/actions/blog.action";

interface IBlogData {
  blogData: IApiBlogResponse | null;
  initialPage?: number;
  initialLimit?: number;
}

const BlogTable: React.FC<IBlogData> = ({
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
  const [blogDataState, setBlogDataState] = useState<IApiBlogResponse | null>(
    blogData
  );

  const fetchBlogData = async () => {
    const response = await getAllBlog(tableParams);
    setBlogDataState(response);
  };

  useEffect(() => {
    fetchBlogData();
  }, [tableParams]);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", tableParams.page.toString());
    searchParams.set("limit", tableParams.limit.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  }, [tableParams, router, pathname]);

  const handleView = (id: string) => {
    router.push(`/admin/blog/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/blog/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    await fetchBlogData(); // Refresh data after deletion
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
      key: "blogTitle",
      title: "Blog Title",
      dataIndex: "blogTitle",
      sorter: true,
    },
    // {
    //   key: "blogContent",
    //   title: "Blog Content",
    //   dataIndex: "blogContent",
    // },
    {
      key: "isPublished",
      title: "Published",
      render: (_: any, record: IBlog) => {
        return (
          <div key={record._id}>
            {record.isPublished ? "Published" : "Not Published"}
          </div>
        );
      },
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
            modal="blogs"
            tooltipTitles={{
              view: "View Details",
              edit: "Edit Blog",
              delete: "Delete Blog",
            }}
          />
        );
      },
    },
  ];

  const meta = {
    totalRecords: blogDataState?.pagination.totalRecords ?? 0,
    totalPages: blogDataState?.pagination.totalPages ?? 0,
    currentPage: blogDataState?.pagination.currentPage ?? 0,
    currentLimit: blogDataState?.pagination.currentLimit ?? 0,
  };

  const record = { data: blogDataState?.data ?? [], meta };

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
        type="Blog"
        handleTableChange={handleTableChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default BlogTable;
