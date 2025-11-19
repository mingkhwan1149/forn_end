import { Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { routesConfig } from "../../../router/router";

export default function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate: (path: string, name: string) => void;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 0,
        overflowY: "auto",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Menu
        // อย่าใช้ style ที่ fix สี ให้ใช้ menuItemStyles + theme แทน
        menuItemStyles={{
          // แถวบน ๆ
          root: ({ level }) => ({
            fontSize: level === 0 ? 16 : 14,
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
          }),
          // ปุ่มของเมนู
          button: ({ level, active }) => ({
            height: level === 0 ? 56 : 48,
            padding: level === 0 ? "0 14px" : "0 20px",
            color: theme.palette.text.primary,
            backgroundColor: active
              ? theme.palette.action.selected
              : "transparent",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.text.primary,
            },
          }),
          // ไอคอน
          icon: () => ({
            color: theme.palette.text.secondary,
          }),
          // ตัวอักษร label ของเมนู
          label: () => ({
            color: theme.palette.text.primary,
            fontWeight: 500,
          }),
          // เนื้อหา submenu
          subMenuContent: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {routesConfig.privateRoutes?.map((route) => {
          const children = Array.isArray(route.children)
            ? route.children.filter((c) => !c.subpath)
            : [];

          return children.length > 0 ? (
            <SubMenu
              key={route.path || route.code}
              icon={route.icon}
              label={
                <Typography sx={{ color: "text.primary", fontWeight: 500 }}>
                  {route.name}
                </Typography>
              }
              // หลีกเลี่ยง inline style ที่ fix สี/พื้นหลัง
            >
              {children.map((child) => (
                <MenuItem
                  key={child.path || child.code}
                  onClick={() => onNavigate(child?.path, child?.name)}
                >
                  <Typography sx={{ color: "text.primary", fontSize: 16, fontWeight: 500 }}>
                    {child.name}
                  </Typography>
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={route.path || route.code}
              icon={route.icon}
              onClick={() => onNavigate(route?.path, route?.name)}
            >
              <Typography sx={{ color: "text.primary", fontSize: 16, fontWeight: 500 }}>
                {route.name}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}