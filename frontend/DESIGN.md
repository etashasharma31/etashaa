```markdown
# Design System Document: The Editorial Heritage

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Atelier"**
This design system rejects the "template" aesthetic of standard e-commerce. For a brand like Etashaa, the interface must act as a silent, sophisticated gallery host. We are moving away from rigid, boxed-in layouts toward a **High-End Editorial** experience that mirrors the flow of a luxury fashion magazine. 

The visual strategy relies on **intentional asymmetry**, high-ratio white space, and **tonal layering**. Elements should feel "placed" rather than "slotted," using overlapping imagery and staggered typography to create a sense of bespoke craftsmanship. We do not use borders to contain luxury; we use space and light.

---

## 2. Colors & Tonal Depth
Our palette is rooted in the warmth of Ivory and the weight of Deep Black, accented by the prestige of Royal Gold and Muted Maroon.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Traditional lines feel "technical" and "cheap" in a luxury context. 
- Define boundaries through background shifts: A `surface-container-low` (#f6f3f0) section sitting on a `surface` (#fcf9f6) background.
- Use the **Surface Hierarchy**: Treat the UI as stacked sheets of fine handmade paper.
    - **Base Layer:** `surface` (#fcf9f6)
    - **In-Page Sections:** `surface-container` (#f0edea)
    - **Elevated Cards/Modals:** `surface-container-lowest` (#ffffff) for a "bright" lift.

### Glass & Gradient Rule
To prevent the UI from feeling flat:
- **Glassmorphism:** For floating navigation or quick-view overlays, use `surface` at 80% opacity with a `20px` backdrop blur.
- **Signature Textures:** Use subtle linear gradients for CTAs, transitioning from `primary` (#735b24) to `primary_container` (#c8a96a). This mimics the way light hits silk or gold embroidery.

---

## 3. Typography: The Editorial Voice
We use a high-contrast typographic scale to establish an authoritative hierarchy.

*   **Headings (notoSerif):** This is our "Couture" voice. Use `display-lg` (3.5rem) for hero statements and `headline-md` (1.75rem) for collection titles. These should often be center-aligned or intentionally offset to create an editorial rhythm.
*   **Body (plusJakartaSans):** Our "Modern" voice. It provides a clean, breathable counter-point to the serif. Use `body-lg` (1rem) for product descriptions to ensure maximum legibility against the ivory background.
*   **The "Jewelry" Label:** Use `label-md` (0.75rem) with `0.1em` letter spacing and All-Caps for category tags or "New Arrival" badges. This creates a premium, branded feel.

---

## 4. Elevation & Depth
In this design system, hierarchy is achieved through **Tonal Layering**, not structural scaffolding.

*   **The Layering Principle:** Depth is created by "nesting" tokens. Place a `surface-container-highest` image card onto a `surface-container-low` section. This creates a soft, natural focal point without needing a single line.
*   **Ambient Shadows:** If a floating element (like a "Book an Appointment" fab) is required, use the "Ambient" approach. 
    - **Blur:** 40px to 60px.
    - **Opacity:** 5% of `on_surface` (#1c1c1a). 
    - **Offset:** Large Y-offset to simulate a light source from above, mimicking a high-end photography studio.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input fields), use `outline_variant` (#d0c5b5) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Interaction

### Buttons (The Bespoke Label)
- **Primary:** Background `primary` (#735b24), Text `on_primary` (#ffffff). No rounded corners (use `none` or `sm` - 0.125rem). Luxury is sharp and precise.
- **Secondary:** Background `surface_container_highest`, Text `on_surface`. 
- **Interaction:** On hover, primary buttons should transition to `secondary` (#a13c46) for a flash of Muted Maroon, signifying passion and wedding-focus.

### Cards & Product Grids
- **Forbid Dividers:** Do not separate products with lines. Use the `surface-container` shifts and the Spacing Scale (minimum 32px between items).
- **Asymmetric Layouts:** In lookbooks, alternate between `display-sm` headings on the left and images shifted slightly to the right to break the "standard grid" monotony.

### Input Fields
- **Style:** Underline only, using the `outline` token (#7f7668) at 30% opacity. 
- **Focus State:** The underline transitions to `primary` (#735b24) with a `label-sm` floating label.

### Editorial Chips
- Use `tertiary_container` (#b3aca2) for filter chips. They should be pill-shaped (`full` roundedness) to contrast against the sharp-edged primary buttons.

---

## 6. Do's and Don'ts

### Do:
- **Use "White Space" as a Material:** Treat empty space as an intentional design element, not just "gap."
- **Layer Imagery:** Overlap a model shot with a close-up of fabric texture to create depth.
- **Mix Case:** Use `notoSerif` in Title Case for headers and `plusJakartaSans` in All-Caps for small labels.

### Don't:
- **Don't use 100% Black:** Always use `on_surface` (#1c1c1a) for text; pure #000000 is too harsh for the warmth of the Ivory background.
- **Don't use Heavy Shadows:** Avoid "dirty" UI. If a shadow is visible at first glance, it is too dark.
- **Don't Center Everything:** Use left-aligned body text and right-aligned imagery to create a sophisticated, unbalanced balance.

---

## 7. Imagery Integration
All photography must adhere to "Warm Studio Lighting." Images should be framed with `surface-variant` (#e5e2df) placeholders during loading. When images are active, ensure they utilize the `md` (0.375rem) roundedness scale to subtly soften the high-fashion edge, making the brand feel approachable for brides.**```