import { FC, useEffect, useState } from "react";
import { css, MenuItem, Select, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Button from "../button";

const ThemeUpdate: FC<{}> = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <div
        
      ></div>
    );

  return (
      
		<Button 
		    border="none"
		    height = "200px"
		    onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
		    radius = "50%"
		    children = "light_mode"
		/>
  );
};

export default ThemeUpdate;
