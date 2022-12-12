const settingsConfig = {
  layout: {
    style: "layout1", // layout-1 layout-2 layout-3
    config: {}, // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
  },
  customScrollbars: true,
  theme: {
    main: "mainThemeLight",
    navbar: "mainThemeLight",
    toolbar: "mainThemeDark",
    footer: "mainThemeLight",
  },
};
// FuseScrollbars.defaultProps = {
//   className               : '',
//   enable                  : true,
//   scrollToTopOnChildChange: false,
//   scrollToTopOnRouteChange: false,
//   option                  : {
//       wheelPropagation: true
//   },
//   ref                     : undefined,
//   onScrollY               : undefined,
//   onScrollX               : undefined,
//   onScrollUp              : undefined,
//   onScrollDown            : undefined,
//   onScrollLeft            : undefined,
//   onScrollRight           : undefined,
//   onYReachStart           : undefined,
//   onYReachEnd             : undefined,
//   onXReachStart           : undefined,
//   onXReachEnd             : undefined
// };

export default settingsConfig;
