import React, { FC } from "react";
import clsx from "clsx";
import { useLayout } from "../../core";
import { Link, NavLink } from "react-router-dom";
import { KTIcon } from "../../../helpers";

const AsideDefault: FC = () => {
  const { config, classes } = useLayout();
  const { aside } = config;

  return (
    <div
      id="kt_aside"
      className={clsx("aside", classes.aside.join(" "), {
        "d-none": !aside.display,
      })}
      data-kt-drawer="true"
      data-kt-drawer-name="aside"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'200px', '300px': '225px'}"
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_aside_toggle"
    >
      <div
        className="hover-scroll-overlay-y my-5 my-lg-5 w-100 ps-4 ps-lg-0 pe-4 me-1"
        id="kt_aside_menu_wrapper"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-height="auto"
        data-kt-scroll-dependencies="#kt_header"
        data-kt-scroll-wrappers="#kt_aside"
        data-kt-scroll-offset="5px"
      >
        <div
          className="menu menu-column menu-active-bg menu-hover-bg menu-title-gray-700 fs-6 menu-rounded w-100"
          id="#kt_aside_menu"
          data-kt-menu="true"
        >
          <div className="menu-item">
            <NavLink to="/dashboard" className="menu-link">
              <KTIcon iconName="home" className="fs-2" />
              <span className="menu-title px-2">Home</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to="/submit" className="menu-link">
              <KTIcon iconName="send" className="fs-2" />
              <span className="menu-title px-2">Submit Violations</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to="/whitelist" className="menu-link">
              <KTIcon iconName="search-list" className="fs-2" />
              <span className="menu-title px-2">Whitelist</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to="/billing" className="menu-link">
              <KTIcon iconName="bill" className="fs-2" />
              <span className="menu-title px-2">Billing</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to="/affiliate" className="menu-link">
              <KTIcon iconName="logistic" className="fs-2" />
              <span className="menu-title px-2">Affiliate Program</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to="/settings" className="menu-link">
              <KTIcon iconName="setting" className="fs-2" />
              <span className="menu-title px-2">Settings</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to="/faq" className="menu-link">
              <KTIcon iconName="question" className="fs-2" />
              <span className="menu-title px-2">FAQ</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to="/support" className="menu-link">
              <KTIcon iconName="support-24" className="fs-2" />
              <span className="menu-title px-2">Support</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AsideDefault };
