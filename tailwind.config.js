/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-bottom": "0px -4px 8px rgba(0, 0, 0, 0.5)",
      },
      height: {
        detailcard: "calc(100vh - 70px - 10rem)",
      },
      width: {
        size: "1350px",
      },
      screens: {
        size: "1350px",
        masonry: "851px",
        mlg: "900px",
      },
      colors: {
        primary: "#44175b",
        secondary: "#f27c40",
        "custom-gray": "#dddddd",
        "custom-light-gray": "#eeeeee",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "home-search-banner": `url('/images/home-banner.jpg')`,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // helvetica: ["HelveticaNeue"],
        emirates: ["Emirates"],
      },
      keyframes: {
        bounceOpacity: {
          "0%, 100%": {
            opacity: "1",
          },
          "60%": {
            opacity: "0",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
      animation: {
        bounceOpacity: "bounceOpacity 1s infinite ease",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addBase }) {
      addBase({
        "@font-face": [
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueLight.otf') format('opentype')",
          //   fontWeight: 300,
          //   fontStyle: "normal",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueLightItalic.otf') format('opentype')",
          //   fontWeight: 300,
          //   fontStyle: "italic",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueRoman.otf') format('opentype')",
          //   fontWeight: 400,
          //   fontStyle: "normal",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueMedium.otf') format('opentype')",
          //   fontWeight: 500,
          //   fontStyle: "normal",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueMediumItalic.otf') format('opentype')",
          //   fontWeight: 500,
          //   fontStyle: "italic",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueBold.otf') format('opentype')",
          //   fontWeight: 700,
          //   fontStyle: "normal",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueBoldItalic.otf') format('opentype')",
          //   fontWeight: 700,
          //   fontStyle: "italic",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueUltraLight.otf') format('opentype')",
          //   fontWeight: 200,
          //   fontStyle: "normal",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueUltraLightItalic.otf') format('opentype')",
          //   fontWeight: 200,
          //   fontStyle: "italic",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueBlack.otf') format('opentype')",
          //   fontWeight: 900,
          //   fontStyle: "normal",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueBlackItalic.otf') format('opentype')",
          //   fontWeight: 900,
          //   fontStyle: "italic",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueThin.otf') format('opentype')",
          //   fontWeight: 100,
          //   fontStyle: "normal",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueThinItalic.otf') format('opentype')",
          //   fontWeight: 100,
          //   fontStyle: "italic",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueHeavy.otf') format('opentype')",
          //   fontWeight: 800,
          //   fontStyle: "normal",
          // },
          // {
          //   fontFamily: "HelveticaNeue",
          //   src: "url('/font/HelveticaNeueHeavyItalic.otf') format('opentype')",
          //   fontWeight: 800,
          //   fontStyle: "italic",
          // },
          {
            fontFamily: "Emirates",
            src: "url('/font/Emirates-Medium.ttf') format('truetype')",
            fontWeight: 500,
            fontStyle: "normal",
          },
          {
            fontFamily: "Emirates",
            src: "url('/font/Emirates-Bold.ttf') format('truetype')",
            fontWeight: 700,
            fontStyle: "normal",
          },
        ],
      });
    },
    require("tailwind-scrollbar-hide"),
  ],
};
