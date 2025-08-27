import type { Config } from "tailwindcss"

const config = {
  prefix: "",
  theme: {
    extend: {
      colors: {
        bg1: `#E5E8EC`,
        bg2: `#5DC9A8`,
        bg3: `#2c9676`,
				bg4: `#f7f8fa`,
				color1: `#eff1f2`,
        black1: `rgba(0, 0, 0, 0.08)`
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config