import _ from 'lodash';

import React, { useEffect, useMemo, createContext, useContext, useState } from "react";

import { Box, Radio, RadioGroup, FormControlLabel, Switch, Link } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const themeModes = {
  light: {
    name: "light",
    primary: "#D6D6D6",
    text: "#141414",
  },
  dark: {
    name: "dark",
    primary: "#141414",
    text: "#D6D6D6",
  }
}

export const PalettesOptions = (selectedThemeMode) => {

  const palettes = {

    // ### Dark Themes ###
    // https://coolors.co/141414-a30029-660019-666666-d6d6d6
    red: {
      name: "red",
      colors: {
        primary: selectedThemeMode.primary,
        secondary: "#A30029",
        tertiary: "#660019",
        quinary: "#666666",
        text: selectedThemeMode.text,
      },
      materials: {
        primaryMaterial: {
          color: selectedThemeMode.primary,
          roughness: 0.5,
          metalness: 0.2,
        },
        secondaryMaterial: {
          color: "#A30029",
          roughness: 0.8,
          metalness: 0,
          emissiveIntensity: 0,
          emissive: "#A30029",
        },
      },
    },

    // https://coolors.co/141414-6021c0-46188c-666666-d6d6d6
    purple: {
      name: "purple",
      colors: {
        primary: selectedThemeMode.primary,
        secondary: "#6021c0",
        tertiary: "#46188c",
        quinary: "#666666",
        text: selectedThemeMode.text,
      },
      materials: {
        primaryMaterial: {
          color: selectedThemeMode.primary,
          roughness: 0.5,
          metalness: 0.2,
        },
        secondaryMaterial: {
          color: "#6622CC",
          roughness: 0.8,
          metalness: 0,
          emissiveIntensity: 0.1,
          emissive: "#A755C2",
        },
      },
    },

    // ### Light Themes ###
    // https://coolors.co/141414-368f8b-246a73-666666-d6d6d6
    cyan: {
      name: "cyan",
      colors: {
        primary: selectedThemeMode.primary,
        secondary: "#368F8B",
        tertiary: "#246A73",
        quinary: "#666666",
        text: selectedThemeMode.text,
      },
      materials: {
        primaryMaterial: {
          color: selectedThemeMode.primary,
          roughness: 0.5,
          metalness: 0.2,
        },
        secondaryMaterial: {
          color: "#368F8B",
          roughness: 0.8,
          metalness: 0,
          emissiveIntensity: 0.1,
          emissive: "#368F8B",
        },
      },
    },

    // https://coolors.co/141414-fabc2a-db9b06-666666-d6d6d6
    gold: {
      name: "gold",
      colors: {
        primary: selectedThemeMode.primary,
        secondary: "#FABC2A",
        tertiary: "#DB9B06",
        quinary: "#666666",
        text: selectedThemeMode.text,
      },
      materials: {
        primaryMaterial: {
          color: selectedThemeMode.primary,
          roughness: 0.5,
          metalness: 0.2,
        },
        secondaryMaterial: {
          color: "#FABC2A",
          roughness: 0.5,
          metalness: 1,
          emissiveIntensity: 0.1,
          emissive: "#FABC2A",
        },
      },
    },
  }

  return palettes
};

const defaultThemeMode = themeModes.dark
const defaultPalette = PalettesOptions(defaultThemeMode).red;

export const ThemeContext = createContext({
  selectedThemeMode: defaultThemeMode,
  selectedPalette: defaultPalette,
  setSelectedThemeMode: () => { },
  setSelectedPalette: () => { },
});

// Other tweakables
export const shadow = "0px 4px 6px rgba(0, 0, 0, 0.1)"
export const bevelRadius = "20px"
export const pagePadding = "4%"
export const contentPadding = "4%"
export const contentMargin = "4%"

export const hexToRgba = (hex, alpha) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const ThemeDefinition = (selectedPalette) => {
  const backgroundColor = selectedPalette?.colors?.secondary
    ? hexToRgba(selectedPalette.colors.secondary, 0.3)
    : 'rgba(0,0,0,0.3)';

  return createTheme({
    palette: {
      primary: {
        main: selectedPalette.colors.primary,
      },
      secondary: {
        main: selectedPalette.colors.secondary,
      },
      text: {
        primary: selectedPalette.colors.text,
        secondary: selectedPalette.colors.text,
        disabled: selectedPalette.colors.text,
        hint: selectedPalette.colors.text,
      },
    },
    typography: {
      fontFamily:
        "'Poppins', 'Inter', 'Fira Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontWeight: 700,
        fontSize: "3.5rem",
        color: selectedPalette.colors.text,
      },
      h2: {
        fontWeight: 600,
        fontSize: "2rem",
        color: selectedPalette.colors.text,
      },
      h3: {
        fontWeight: 500,
        fontSize: "1.75rem",
        color: selectedPalette.colors.text,
      },
      body1: {
        fontWeight: 500,
        fontSize: "1.25rem",
        color: selectedPalette.colors.text,
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.875rem",
        color: selectedPalette.colors.text,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage:
              `linear-gradient(to top right, ${selectedPalette.colors.secondary}, ${selectedPalette.colors.primary}, ${selectedPalette.colors.primary})`,
            backgroundAttachment: 'fixed',
            minHeight: "100vh",
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: selectedPalette.colors.tertiary,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-track-piece': {
              background: selectedPalette.colors.primary,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: selectedPalette.colors.secondary,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: selectedPalette.colors.text,
            transition: 'background-color 0.3s ease-in',
            '&:hover': {
              backgroundColor: selectedPalette.colors.tertiary,
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: backgroundColor,
            borderRadius: bevelRadius,
            boxShadow: shadow,
            backdropFilter: "blur(25px)",
          }
        }
      }
    },
  });
};

const ThemeSelector = () => {
  const { selectedThemeMode, selectedPalette, setSelectedThemeMode, setSelectedPalette } = useContext(ThemeContext);

  // Update palettes when themeMode changes
  const handleThemeChange = (newThemeMode) => {
    setSelectedThemeMode(newThemeMode);
    // Also update the palette for the new theme mode
    const newPalettes = PalettesOptions(newThemeMode);
    const newPalette = newPalettes[Object.keys(newPalettes).find(key => _.isEqual(selectedPalette.name, newPalettes[key].name))];
    setSelectedPalette(newPalette);
  };

  const handlePaletteChange = (palette) => {
    setSelectedPalette(palette);
  };

  const palettes = PalettesOptions(selectedThemeMode)

  const backgroundColor = selectedPalette?.colors?.secondary
    ? hexToRgba(selectedPalette.colors.secondary, 0.3)
    : 'rgba(0,0,0,0.3)';

  return (
    <Link sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <Box sx={{
        position: "relative",
        top: "0",
        zIndex: 2,
        backgroundColor: backgroundColor,
        borderRadius: bevelRadius,
        boxShadow: shadow,
        backdropFilter: "blur(25px)",
        marginTop: "1%",
        marginBottom: "-3%",
        paddingLeft: "1.5rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <RadioGroup
          value={selectedPalette}
          onChange={(event) => handlePaletteChange(palettes[event.target.value])}
          row
        >
          {Object.keys(palettes).map((option) => {
            return (
              <FormControlLabel
                value={option}
                control={
                  <Radio sx={{ color: palettes[option].colors.secondary, '&.Mui-checked': { color: palettes[option].colors.secondary } }} />
                }
                checked={_.isEqual(selectedPalette, palettes[option])}
                key={option}
              />
            );
          })}
        </RadioGroup>
        <Switch
          checked={_.isEqual(selectedThemeMode, themeModes.dark)}
          onChange={(event) => {
            handleThemeChange(event.target.checked ? themeModes.dark : themeModes.light);
          }}
          sx={{
            '&.MuiSwitch-switchBase.Mui-checked': {
              color: 'white',
            },
            '&.MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'white',
            },
            '&.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'black',
            },
          }}
        />
      </Box>
    </Link>
  );
};

export const ThemeWrapper = ({ children }) => {
  const [selectedThemeMode, setSelectedThemeMode] = useState(themeModes[localStorage.getItem('themeMode')] || defaultThemeMode);
  const [selectedPalette, setSelectedPalette] = useState(PalettesOptions(selectedThemeMode)[localStorage.getItem('palette')] || defaultPalette);

  useEffect(() => {
    localStorage.setItem('themeMode', selectedThemeMode.name);
  }, [selectedThemeMode]);

  useEffect(() => {
    localStorage.setItem('palette', selectedPalette.name);
  }, [selectedPalette]);

  const contextValue = useMemo(() => ({
    selectedThemeMode,
    selectedPalette,
    setSelectedThemeMode,
    setSelectedPalette
  }), [selectedThemeMode, selectedPalette]);

  const theme = ThemeDefinition(selectedPalette)

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <ThemeSelector />
        <CssBaseline />
        <Box padding={pagePadding}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
