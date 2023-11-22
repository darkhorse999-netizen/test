import { useMemo } from "react";
import { useTable, ColumnInstance, Row } from "react-table";
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn";
import { CustomRow } from "./columns/CustomRow";
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../core/QueryResponseProvider";
import { usersColumns } from "./columns/_columns";
import { User } from "../core/_models";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { UsersListPagination } from "../components/pagination/UsersListPagination";
import { KTCardBody } from "../../../../../../_metronic/helpers";

const UsersTable = () => {
  const users = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(
    () => [
      {
        id: 10,
        name: "Test Test",
        avatar: "avatars/300-6.jpg",
        email: "test@gmail.com",
        position: "Developer",
        role: "Developer",
        last_login: "2 days ago",
        two_steps: true,
        joined_day: "10 days ago",
        online: true,
        initials: {
          label: "Test",
          state: "Test",
        },
      },
      {
        id: 10,
        name: "Test Test",
        avatar: "avatars/300-6.jpg",
        email: "test@gmail.com",
        position: "Developer",
        role: "Developer",
        last_login: "2 days ago",
        two_steps: true,
        joined_day: "10 days ago",
        online: true,
        initials: {
          label: "Test",
          state: "Test",
        },
      },
      {
        id: 10,
        name: "Test Test",
        avatar: "avatars/300-6.jpg",
        email: "test@gmail.com",
        position: "Developer",
        role: "Developer",
        last_login: "2 days ago",
        two_steps: true,
        joined_day: "10 days ago",
        online: true,
        initials: {
          label: "Test",
          state: "Test",
        },
      },
      {
        id: 10,
        name: "Test Test",
        avatar: "avatars/300-6.jpg",
        email: "test@gmail.com",
        position: "Developer",
        role: "Developer",
        last_login: "2 days ago",
        two_steps: true,
        joined_day: "10 days ago",
        online: true,
        initials: {
          label: "Test",
          state: "Test",
        },
      },
      {
        id: 10,
        name: "Test Test",
        avatar: "avatars/300-6.jpg",
        email: "test@gmail.com",
        position: "Developer",
        role: "Developer",
        last_login: "2 days ago",
        two_steps: true,
        joined_day: "10 days ago",
        online: true,
        initials: {
          label: "Test",
          state: "Test",
        },
      },
    ],
    [users]
  );
  const columns = useMemo(() => usersColumns, []);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <KTCardBody className="py-4">
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
          {...getTableProps()}
        >
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
                prepareRow(row);
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="row pt-4">
        <div className="d-flex align-items-center justify-content-end">
          <div id="kt_table_users_paginate">
            <ul className="pagination">
              <li className="page-item previous disabled">
                <a href="#" className="page-link">
                  <i className="previous"></i>
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a href="#" className="page-link">
                  2
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  3
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  4
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  5
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  6
                </a>
              </li>
              <li className="page-item next">
                <a href="#" className="page-link">
                  <i className="next"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isLoading && <UsersListLoading />}
    </KTCardBody>
  );
};

export { UsersTable };
