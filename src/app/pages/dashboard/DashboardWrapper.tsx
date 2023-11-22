import { FC, useEffect } from "react";
import { EnableSidebar, PageTitle } from "../../../_metronic/layout/core";
import { Questions } from "../../modules/apps/dev/components/partials/Questions";
import { QueryRequestProvider } from "../../modules/apps/user-management/users-list/core/QueryRequestProvider";
import { QueryResponseProvider } from "../../modules/apps/user-management/users-list/core/QueryResponseProvider";
import {
  ListViewProvider,
  useListView,
} from "../../modules/apps/user-management/users-list/core/ListViewProvider";
import { KTCard, KTIcon } from "../../../_metronic/helpers";
import { UsersListHeader } from "../../modules/apps/user-management/users-list/components/header/UsersListHeader";
import { UsersTable } from "../../modules/apps/user-management/users-list/table/UsersTable";
import {
  StatisticsWidget4,
  StatisticsWidget5,
  StatisticsWidget6,
} from "../../../_metronic/partials/widgets";
import { MenuComponent } from "../../../_metronic/assets/ts/components";

const UsersList = () => {
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
    </>
  );
};

const DashboardWrapper: FC = () => {
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  return (
    <EnableSidebar>
      <div className="row pb-4">
        <div className="d-flex align-items-center justify-content-end">
          <>
            <span className="fw-semibold fs-7 px-2">Sort by</span>
            <a
              href="#"
              className="btn btn-light btn-active-light-primary btn-sm"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
            >
              Today
              <KTIcon iconName="down" className="fs-5 m-0" />
            </a>
            {/* begin::Menu */}
            <div
              className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
              data-kt-menu="true"
            >
              {/* begin::Menu item */}
              <div className="menu-item px-3">
                <a className="menu-link px-3">Today</a>
              </div>
              {/* end::Menu item */}

              {/* begin::Menu item */}
              <div className="menu-item px-3">
                <a className="menu-link px-3">Yesterday</a>
              </div>
              {/* end::Menu item */}
            </div>
            {/* end::Menu */}
          </>
        </div>
      </div>

      {/* begin::Row */}
      <div className="row g-5 g-xl-8">
        <div className="col-xl-3">
          <StatisticsWidget5
            className="card-xl-stretch mb-xl-8"
            svgIcon="chart-simple"
            color="warning"
            iconColor="white"
            title="252"
            description="Links Scraped"
          />
        </div>

        <div className="col-xl-3">
          <StatisticsWidget5
            className="card-xl-stretch mb-xl-8"
            svgIcon="chart-simple"
            color="danger"
            iconColor="white"
            title="252"
            description="Links Manually Checked"
          />
        </div>

        <div className="col-xl-3">
          <StatisticsWidget5
            className="card-xl-stretch mb-xl-8"
            svgIcon="chart-simple"
            color="danger"
            iconColor="white"
            title="252"
            description="Links Violations"
          />
        </div>

        <div className="col-xl-3">
          <StatisticsWidget5
            className="card-xl-stretch mb-xl-8"
            svgIcon="chart-simple"
            color="success"
            iconColor="white"
            title="252"
            description="Links Removed"
          />
        </div>
      </div>
      {/* end::Row */}

      {/* end::Row */}
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </EnableSidebar>
  );
};

export { DashboardWrapper };
