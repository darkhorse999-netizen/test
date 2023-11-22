import React from "react";
import { KTIcon } from "../../../helpers";

type Props = {
  className: string;
  color: string;
  svgIcon: string;
  iconColor: string;
  title: string;
  titleColor?: string;
  description: string;
  descriptionColor?: string;
};

const StatisticsWidget5: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  titleColor,
  description,
  descriptionColor,
}) => {
  return (
    <a href="#" className={`card hoverable ${className}`}>
      <div className="card-body">
        <div className="d-flex flex-column w-100">
          <div className="d-flex flex-row flex-center justify-content-between">
            <div className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5`}>
              {title}
            </div>
            <div
              className={`d-flex flex-center bg-${color}`}
              style={{ width: 32, height: 32 }}
            >
              <KTIcon
                iconName={svgIcon}
                className={`text-${iconColor} fs-2x ms-n1`}
              />
            </div>
          </div>

          <div className={`fw-semibold text-${descriptionColor}`}>
            {description}
          </div>
        </div>
      </div>
    </a>
  );
};

export { StatisticsWidget5 };
