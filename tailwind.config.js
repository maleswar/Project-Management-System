const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#3233FF",
        cBlueShade:"#3a3bff",
        customSky: "#00A2E0",
        customGreen: "#70BC95",
        customPurple: "#735CD2",
      },
      backgroundColor: {
        lightBg:"#f3faff",
        bgSky: "#E0F2FE",
        bgBlue: "#F9FBFF",
        bgLogin: "#E8F2F7",
        bgwhite: "#fafaff",
      },
    },
  },
  plugins: [],
});
