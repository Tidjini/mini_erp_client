import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { useSelector } from "react-redux";
const today = new Date();

function FooterLayout1(props) {
  const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar id="fuse-footer" className="relative z-10" color="default">
        <Toolbar className="px-36 py-0 flex items-center">
          <Typography
            style={{
              fontSize: 14,
              color: "#264653",
            }}
          >
            Exercice : <span style={{ fontWeight: "400" }}>01/01/2022</span> au
            <span style={{ fontWeight: "400", color: "red" }}> 31/12/2022</span>
          </Typography>

          <Typography
            style={{
              fontSize: 16,
              color: "#264653",
              fontWeight: "600",
              flex: 1,
              display: "flex",
              justifycontent: "end",
            }}
          >
            {"Date: " +
              today.getDate() +
              "/" +
              today.getMonth() +
              "/" +
              today.getFullYear()}
          </Typography>
          {/* <Typography>Footer Layout component footer layout</Typography> */}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default FooterLayout1;
