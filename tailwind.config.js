import { withUt } from "uploadthing/tw";
/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInSlideUp: "fadeInSlideUp 0.6s ease-out",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeInSlideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
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
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      fontSize: {
        headingSizeDesktop: "48px",
        headingSizeMobile: "40px",
        textSizeDesktop: "20px",
        textSizeMobile: "16px",
        subTextSizeDesktop: "24px",
        subTextSizeMobile: "20px",
      },
      maxWidth: {
        desktop: "1204px",
      },
      padding: {
        commonPadding: "0px 10px",
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 168, 232, 0.7)",
      },
      boxShadow: {
        light: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "light-hover": "0 8px 30px rgba(0, 0, 0, 0.12)",
        dark: "0 4px 20px rgba(0, 0, 0, 0.3)",
        "dark-hover": "0 8px 30px rgba(0, 0, 0, 0.5)",
      },
      backdropBlur: {
        "3xl": "blur(30px)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        subHeadingOrange: "#ff782d",
        background: "hsl(var(--background))",
        "dark-background": "#00032D",
        newBackgroundColor: "var(--new-background-color)",
        inputBackgroundColor: "var(--input-background-color)",
        transparent: "#00000000",
        specialBackgroundColor: "var(--special-background-color)",
        userDashboardBackground: "var(--user-dashboard-background)",
        userBodyBackground: "var(--user-body-background)",
        skyBlueBackgroundColour: "#e9effd",
        lableTextColor: "var(--lable-text-color)",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        button: {
          primaryLight: "hsl(var(--background))",
          primaryDark: "hsl(var(--background))",
          primaryTextLight: "hsl(var(--foreground))",
          primaryTextDark: "hsl(var(--primary-foreground))",
          hoverPrimaryLight: "hsl(var(--secondary))",
          hoverPrimaryDark: "hsl(var(--secondary))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".border-gradient-light": {
          border: "2px solid #C1C5BF",
          borderTop: "0",
          // borderImageSource: "linear-gradient(360deg,  0%, #FFFFFF 100%)",
          // boxShadow: "5px 8px 2px 0px #E8E1D7CC",
        },
        ".border-gradient-dark": {
          border: "1px solid ",
          borderImageSource:
            "linear-gradient(360deg, #838B7F 0%, #00032D 100%)",
          boxShadow: "2px 2px 2px 0px #E8E1D7CC",

          // boxShadow: "5px 0px 0px #E8E1D7CC, 5px 0px 25px #E8E1D7CC",
        },
      });
    },
  ],
});
