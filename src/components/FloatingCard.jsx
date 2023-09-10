import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ThemeContext, shadow, bevelRadius, contentPadding } from "../Theme";

const FloatingCard = ({ children, type, size, ...props }) => {
  /*
  types: translucentPrimary, translucentSecondary, invisible
  
  sizes: large, medium, small, halfWidth
  */
  const { selectedPalette } = useContext(ThemeContext);

  const hexToRgba = (hex, alpha) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const colorMap = {
    translucentPrimary: {
      color: hexToRgba(selectedPalette.colors.primary, 0.3),
      zIndex: 1,
      blur: "25px",  // blur amount for translucentPrimary
    },
    translucentSecondary: {
      color: hexToRgba(selectedPalette.colors.secondary, 0.3),
      zIndex: 1,
      blur: "25px",  // blur amount for translucentSecondary
    },
    invisible: {
      color: "rgba(255, 255, 255, 0.0)",
      zIndex: -1,
    },
  };

  const sizeConfig = {
    large: { height: "75vh", xs: 12, sm: 12, md: 12 },
    medium: { height: "50rem", xs: 12, sm: 12, md: 12 },
    small: { height: "25rem", xs: 12, sm: 12, md: 12 },
    halfWidth: { height: "25rem", xs: 12, sm: 12, md: 6 },
    default: { xs: 12, sm: 12, md: 12 }, // default size with no fixed height
  };

  const { color, zIndex, blur } = colorMap[type] || {};
  const { height, xs, sm, md } = size ? sizeConfig[size] : sizeConfig.default;

  return (
    <Grid item xs={xs} sm={sm} md={md} zIndex={zIndex}>
      <Box
        sx={{
          backgroundColor: color,
          borderRadius: bevelRadius,
          boxShadow: type === "invisible" ? "none" : shadow,
          ...(height && { height }), // apply height only when it is defined
          backdropFilter: blur ? `blur(${blur})` : "none",  // add blur effect if blur is defined
          padding: contentPadding,
          ...props.sx,
        }}
        {...props}
      >
        {children}
      </Box>
    </Grid>
  );
};

export default FloatingCard;
