Please build a new website page using React/Next.js and Tailwind CSS. I want it to perfectly match my existing design system and typography. Please adhere strictly to the following design guidelines:

**1. Typography System (Tailwind Classes)**
- **Font Family:** Use a clean sans-serif font (Inter or Geist). Use `antialiased` on the body.
- **Hero Headings (H1):** `text-4xl sm:text-5xl md:text-[4.5rem] leading-[1.1] md:leading-[1.05] font-medium tracking-tighter text-gray-900 dark:text-[#f4f4f5]`
- **Section Headings (H2):** `text-[32px] md:text-[40px] leading-tight font-medium tracking-tight text-black dark:text-white`
- **Hero/Section Subtitles (P):** `text-[17px] md:text-[19px] text-gray-500 dark:text-[#8a8f98] font-medium leading-snug`
- **Widget/Card Titles:** `text-[15px] sm:text-[16px] md:text-[18px] font-semibold md:font-bold text-gray-900 dark:text-white tracking-tight`
- **Small Descriptions:** `text-[13px] sm:text-[14px] text-gray-500 dark:text-[#8a8f98] font-medium leading-relaxed`
- **Tags/Overlines:** `text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-wider uppercase`
- **Monospace accents:** Use `font-mono text-[10px] sm:text-[11px] text-gray-500` for technical details or metadata.

**2. Color Palette & Dark Mode**
- **Light Mode Base:** Background `bg-white`, Foreground text `text-black` or `text-gray-900`.
- **Dark Mode Base:** Background `dark:bg-black` or `dark:bg-[#0a0a0a]`, Foreground text `dark:text-white` or `dark:text-[#ededed]`.
- **Primary Text:** Use absolute `text-black dark:text-white` or high-contrast grays (`text-gray-900 dark:text-[#f4f4f5]`).
- **Secondary Text:** Use muted grays (`text-gray-500 dark:text-[#8a8f98]`).
- **Card/Widget Backgrounds:** Light mode uses `bg-white` or `bg-gray-50`, dark mode uses `dark:bg-[#111111]` or `dark:bg-[#161616]`.
- **Subtle Borders:** `border border-black/5 dark:border-white/5` (or `black/10` / `white/10`).

**3. UI Components & Layout Principles**
- **Buttons (Primary):** `bg-black dark:bg-[#f4f4f5] text-white dark:text-black px-7 py-3.5 rounded-full text-[14px] sm:text-[15px] font-semibold shadow-xl shadow-black/10 dark:shadow-white/5 transition-all duration-300 hover:scale-[0.98] active:scale-95`
- **Buttons (Secondary):** `bg-transparent border border-black/20 dark:border-white/20 text-gray-900 dark:text-[#f4f4f5] px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[0.98] active:scale-95`
- **Cards/Widgets:** Use `rounded-[14px]` with a subtle shadow (`shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none`). Add `hover:border-black/20 transition-colors` for interactivity.
- **Icons:** Use Lucide React icons, typically sized `w-4 h-4` or `w-5 h-5`. For circular icon containers, use `w-8 h-8 rounded-full flex items-center justify-center` with a subtle tinted background/border.

Ensure the design feels premium, minimalistic, and relies heavily on typography scale, negative space, and contrast rather than heavy backgrounds or saturated colors.