const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 黑色系
        "black-light": "#061826",
        black: "#090B0E",
        "black-dark": "#000000",
        // 白色系
        "white-light": "#f8fafc",
        white: "#ffffff",
        "white-dark": "#fafafa",
        // 灰色系
        "gray-light": "#e5e7eb",
        gray: "#d1d5db",
        "gray-dark": "#9ca3af",
      },
      fontSize: {
        12: ["12px", "14px"],
        14: ["14px", "16px"],
        16: ["16px", "20px"],
        18: ["18px", "22px"],
        20: ["20px", "24px"],
        22: ["22px", "26px"],
        28: ["28px", "32px"],
        32: ["32px", "38px"],
      },
      borderRadius: {
        2: "4px",
        4: "4px",
        6: "6px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
