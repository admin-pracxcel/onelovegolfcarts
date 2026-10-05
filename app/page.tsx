import { Masthead } from "@/components/Masthead";
import { Hero } from "@/components/Hero";
import { TrustRail } from "@/components/TrustRail";
import { Lede } from "@/components/Lede";
import { Fleet } from "@/components/Fleet";
import { Why } from "@/components/Why";
import { IslandMap } from "@/components/IslandMap";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Guides } from "@/components/Guides";
import { Faq } from "@/components/Faq";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { ActionBar } from "@/components/ActionBar";
import { homepageSchema } from "@/lib/schema";

/**
 * Section order is a journey: arrival, the carts, the island, the destination.
 *
 * Container widths never repeat back to back, which is the rule that stops
 * every section looking like the same component with different text:
 *   hero wide · trust rail · lede shell · fleet shell-in-rail · why shell+bleed
 *   map shell-in-rail · process offset · reviews shell · guides shell+bleed
 *   faq shell · closing shell-in-rail · footer shell
 * Grounds: paper, ink, paper, ink, paper, navy, paper-2, ink, paper, paper,
 * red, ink. The one repeat (guides into faq) is the deliberate calm.
 */
export default function Home() {
  return (
    <>
      <Masthead />
      <main id="main">
        <Hero />
        <TrustRail />
        <Lede />
        <Fleet />
        <Why />
        <IslandMap />
        <Process />
        <Reviews />
        <Guides />
        <Faq />
      </main>
      <Closing />
      <Footer />
      <ActionBar />
      <script type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema()) }} />
    </>
  );
}
