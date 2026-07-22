import HeroCarousel from "@/components/home/HeroCarousel";
import RoomGallery from "@/components/home/RoomGallery";
import FeaturePillars from "@/components/home/FeaturePillars";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import PressLogos from "@/components/home/PressLogos";
import FaqAccordion from "@/components/home/FaqAccordion";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <RoomGallery />
      <FeaturePillars />
      <ReviewsCarousel />
      <PressLogos />
      <FaqAccordion />
      <Newsletter />
    </>
  );
}
