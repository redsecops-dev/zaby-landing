"use client";

/**
 * BackgroundImage Component
 * 
 * Fixed background layer with glass morphism effect + photographic background image
 * Provides the visual foundation for the entire page using /example's aesthetic.
 * 
 * Styling:
 * - Fixed position (z-index -10) to stay behind all content
 * - Background image: High-quality photographic image from Iria aesthetic
 * - Glass morphism: bg-white/40 + backdrop-blur-3xl (24px blur)
 * - Creates premium layered effect
 */

export function BackgroundImage() {
  return (
    <>
      {/* Fixed background image layer */}
      <div
        className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(232,121,249,0.15) 0%, rgba(217,70,239,0.1) 50%, rgba(255,255,255,0.05) 100%), url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Glass morphism overlay on top of background image */}
      <div className="fixed inset-0 -z-10 w-screen h-screen bg-white/90 backdrop-blur-xs pointer-events-none" />
    </>
  );
}
