import React, { useCallback } from "react";
import "./index.less";

const SvgIcon = React.memo(({ name, onClick, className, ...others }) => {
  const cls = `iconfont icon-${name} ${className || ""}`;

  const handleClick = useCallback(
    (e) => {
      if (onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  return <i {...others} className={cls.trim()} onClick={handleClick} />;
});

export default SvgIcon;
