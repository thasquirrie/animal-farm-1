import "@fontsource/cairo/200.css";
import "@fontsource/cairo/300.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import "@fontsource/cairo/900.css";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import themeValues from "../../src/theme.json";

const theme = extendTheme(themeValues);

const ThemeConfigContainer: React.FC = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ThemeConfigContainer;
