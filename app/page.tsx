import { Hero } from "@/components/Hero";
import { TrustRail } from "@/components/TrustRail";
import { Lede } from "@/components/Lede";
import { Fleet } from "@/components/Fleet";
import { Why } from "@/components/Why";
import { Delivery } from "@/components/Delivery";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Guides } from "@/components/Guides";
import { Faq } from "@/components/Faq";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { ActionBar } from "@/components/ActionBar";
import { RIBBON } from "@/lib/content";
import { homepageSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <div className="ribbon">
        {RIBBON.lead}
        <span className="hide-sm">{RIBBON.wide}</span>
        {RIBBON.mid}
        <span className="hide-sm">{RIBBON.wideTail}</span>
      </div>

      <main id="main">
        <Hero />
        <TrustRail />
        <Lede />
        <Fleet />
        <Why />
        <Delivery />
        <Process />
        <Reviews />
        <Guides />
        <Faq />
      </main>

      <Closing />
      <Footer />
      <ActionBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema()) }}
      />
    </>
  );
}
