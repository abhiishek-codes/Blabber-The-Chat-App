// tailwind.config.js
module.exports = {
  // other configurations...
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgcolor: "#1C1C24",
        bgbox: "#292932",
        bgbutton: "#79D861",
      },
    },
  },
  variants: {
    extend: {
      width: {
        1024: "1024px",
      },
      // extend your variants here if needed
    },
  },
  plugins: [
    // add a plugin to hide scrollbars
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
