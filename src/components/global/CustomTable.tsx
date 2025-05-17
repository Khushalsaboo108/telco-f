"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { IPaginationRecords, IPaginations } from "@/types/common";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

interface ColumnType {
  key: string;
  title: string;
  dataIndex?: string | string[];
  render?: (text: any, record: any) => React.ReactNode;
  sorter?: boolean;
}

interface CustomTableProps {
  columns: ColumnType[];
  record: {
    data: any[];
    meta?: IPaginationRecords | null;
  };
  loading?: boolean;
  handleTableChange?: (pagination: any, filters: any) => void;
  tableParams?: IPaginations;
  setTableParams?: React.Dispatch<React.SetStateAction<IPaginations>>;
  rowClassName?: (record: any) => string;
  rowSelection?: {
    selectedRowKeys: string[];
    onChange: (selectedRowKeys: string[]) => void;
  };
  headerActions?: React.ReactNode;
  onDeleteMultiple?: () => void;
  pagination?: boolean;
  expandable?: {
    expandedRowRender: (record: any) => React.ReactNode;
    rowExpandable: (record: any) => boolean;
  };
  type?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  record,
  loading = false,
  handleTableChange,
  tableParams = { page: 1, limit: 10 },
  setTableParams,
  rowSelection,
  headerActions,
  pagination = true,
  expandable,
  type,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const totalPages = record.meta?.totalPages || 1;
  const currentPage = tableParams.page || 1;

  const pageSizeOptions = React.useMemo(() => {
    if (!record.meta?.totalRecords) return [10, 20, 50];

    const pageSizeArray: number[] = [];
    const step = 10;
    let currentSize = step;

    while (currentSize <= record.meta.totalRecords) {
      pageSizeArray.push(currentSize);
      currentSize += step;
    }

    if (pageSizeArray[pageSizeArray.length - 1] !== record.meta.totalRecords) {
      pageSizeArray.push(record.meta.totalRecords);
    }

    return pageSizeArray;
  }, [record.meta?.totalRecords]);

  // Filter and sort data
  const filteredAndSortedData = React.useMemo(() => {
    let filteredData = record.data;

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Handle null/undefined values
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        // Convert to string for comparison if needed
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();

        if (aString < bString) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aString > bString) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [record.data, searchTerm, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  const handlePageChange = (page: number) => {
    if (setTableParams) {
      setTableParams({ ...tableParams, page });
    }
  };

  const handlePageSizeChange = (pageSize: string) => {
    if (setTableParams) {
      setTableParams({
        ...tableParams,
        limit: Number.parseInt(pageSize),
        page: 1,
      });
    }
  };

  return (
    <div>
      <div className=" mb-3 ps-2 w-1/3">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <Card className="w-full">
        {type && (
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">{type}</h3>
          </div>
        )}
        <div className="p-4">
          <div className="mb-4 flex justify-between items-center">
            {headerActions && (
              <div className="flex justify-end">{headerActions}</div>
            )}
          </div>

          <div className={loading ? "opacity-60 pointer-events-none" : ""}>
            <Table>
              {columns.length > 0 && (
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead
                        key={column.key}
                        className={column.key === "actions" ? "w-[100px]" : ""}
                      >
                        <div className="flex items-center gap-2 cursor-pointer">
                          {column.title}
                          {column.sorter && (
                            <button
                              onClick={() => requestSort(column.key)}
                              className={`p-1 rounded-full flex items-center justify-center ${
                                sortConfig?.key === column.key
                                  ? "bg-gray-200"
                                  : "hover:bg-gray-100"
                              }`}
                              style={{ minWidth: "28px", minHeight: "28px" }}
                            >
                              <ArrowUpDown
                                className={`h-4 w-4 ${
                                  sortConfig?.key === column.key
                                    ? "text-blue-500"
                                    : "text-gray-500"
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>
                {filteredAndSortedData.length > 0 ? (
                  filteredAndSortedData.map((item, rowIndex) => (
                    <React.Fragment
                      key={
                        item._id || item.userId || item.key || `row-${rowIndex}`
                      }
                    >
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={`${column.key}-${rowIndex}`}>
                            {column.render
                              ? column.render(
                                  column.dataIndex
                                    ? Array.isArray(column.dataIndex)
                                      ? column.dataIndex.reduce(
                                          (acc, key) => acc?.[key],
                                          item
                                        )
                                      : item[column.dataIndex]
                                    : null,
                                  item
                                )
                              : column.dataIndex
                              ? Array.isArray(column.dataIndex)
                                ? column.dataIndex.reduce(
                                    (acc, key) => acc?.[key],
                                    item
                                  )
                                : item[column.dataIndex]
                              : null}
                          </TableCell>
                        ))}
                      </TableRow>
                      {expandable && expandable.rowExpandable(item) && (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length + (rowSelection ? 1 : 0)}
                            className="p-0"
                          >
                            {expandable.expandedRowRender(item)}
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (rowSelection ? 1 : 0)}
                      className="text-center py-6"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {pagination && record.meta && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Total {record.meta.totalRecords} {type || "items"}
              </div>
              <div className="flex items-center gap-4">
                <Select
                  value={tableParams.limit.toString()}
                  onValueChange={handlePageSizeChange}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizeOptions.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CustomTable;
