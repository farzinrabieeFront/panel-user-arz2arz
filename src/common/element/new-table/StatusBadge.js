import classNames from "classnames";
import React from "react";
import { Badge } from "react-bootstrap";
import { BsCheckAll, BsX, BsCheck } from "react-icons/all";
import Styles from "./NewTable.module.scss";

const status_data = {
  PENDING: {
    variant: "warning",
    title: "درحال بررسی",
    icon: <BsCheck size={20} className="text-warning" />,
  },
  CANCELED: {
    variant: "danger",
    title: "ناموفق",
    icon: <BsX size={20} className="text-danger" />,
  },
  CONFIRMED: {
    variant: "success",
    title: "موفق",
    icon: <BsCheckAll size={20} className="text-success" />,
  },
  // NEW: { variant: "warning", title: "سفارش باز", icon: <BsCheck size={18} /> },
  PENDING: {
    variant: "warning",
    title: "در حال بررسی",
    icon: <BsCheck size={18} />,
  },
  CHECKING: {
    variant: "warning",
    title: "در حال بررسی",
    icon: <BsCheck size={18} />,
  },
  PARTIALLY_FILLED: {
    variant: "info",
    title: "در حال بررسی",
    icon: <BsCheck size={18} />,
  },
  PENDING_CANCEL: {
    variant: "warning",
    title: "لغو شده",
    icon: <BsX size={18} />,
  },
  FILLED: {
    variant: "success",
    title: "انجام شده",
    icon: <BsCheckAll size={18} />,
  },
  EXPIRED: {
    variant: "secondary",
    title: "منقضی شده",
    icon: <BsX size={18} />,
  },
  REJECTED: { variant: "danger", title: "رد شده", icon: <BsX size={18} /> },
  CANCELED: { variant: "danger", title: "لغو شده", icon: <BsX size={18} /> },
  NEW: {
    variant: "warning",
    title: "درحال بررسی",
    icon: <BsCheck size={18} />,
  },
  Email_Sent: {
    variant: "warning",
    title: "درحال بررسی",
    icon: <BsCheck size={18} />,
  },
  Cancelled: { variant: "danger", title: "ناموفق", icon: <BsX size={18} /> },
  Awaiting_Approval: {
    variant: "warning",
    title: "درحال بررسی",
    icon: <BsCheck size={18} />,
  },
  Rejected: { variant: "danger", title: "رد شده", icon: <BsX size={18} /> },
  Processing: {
    variant: "warning",
    title: "درحال بررسی",
    icon: <BsCheck size={18} />,
  },
  Failure: { variant: "danger", title: "ناموفق", icon: <BsX size={18} /> },
  Completed: {
    variant: "success",
    title: "موفق",
    icon: <BsCheckAll size={18} />,
  },
  FAILED: { title: "لفو شده", variant: "danger", icon: <BsX size={18} /> },
  WAITING: {
    title: "در حال انجام",
    variant: "warning",
    icon: <BsCheck size={18} />,
  },
};

export default function StatusBadge({
  status = "light",
  onClick,
  className,
  badgeClassName,
  iconClassName,
}) {
  const badgeClasses = classNames(
    Styles.badge,
    badgeClassName,
    "size-5",
    "no-min-width",
    "p-1 ps-3",
    "align-items-center"
  );
  const iconClasses = classNames(iconClassName, "d-block d-md-none");

  return [
    <Badge
      pill
      bg={status_data[status]?.variant}
      className={badgeClasses}
      onClick={onClick}
    >
      {status_data[status]?.icon ? (
        <span className="px-1">{status_data[status]?.icon}</span>
      ) : null}
      {status_data[status]?.title}
    </Badge>,
    <span className={`${iconClasses} text-${status_data[status]?.variant}`}>
      {status_data[status]?.icon}
    </span>,
  ];
}
