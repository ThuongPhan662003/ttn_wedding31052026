"use client";

import { useState, useRef } from "react";

import InteractiveIntro from "@/components/wedding/InteractiveIntro";
import RosePetals from "@/components/wedding/RosePetals";
import FloatingMusic from "@/components/wedding/FloatingMusic";
import FamilyIntro from "@/components/wedding/FamilyIntro";
import RSVPForm from "@/components/wedding/RSVPForm";
import WeddingEvents from "@/components/wedding/WeddingEvents";
import PhotoGallery from "@/components/wedding/PhotoGallery";
import DonationModal from "@/components/wedding/DonationModal";
import OurStorySection from "@/components/wedding/OurStorySection";
import ThankYouSection from "@/components/wedding/ThankYouSection";
import BrideGroomSection from "@/components/wedding/BrideGroomSection";

export default function WeddingPageClient({ type }) {
  const [hasOpened, setHasOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef(null);

  const handleOpened = async () => {
    setHasOpened(true);

    setTimeout(async () => {
      try {
        await audioRef.current?.play();
      } catch (err) {
        console.log(err);
      }
    }, 100);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcfaf6]">
      <RosePetals />

      <InteractiveIntro type={type} onOpened={handleOpened} />

      {hasOpened && (
        <div className="animate-in fade-in duration-1000">
          <audio ref={audioRef} src="/musics/nen.mp3" loop preload="auto" />

          <FloatingMusic audioRef={audioRef} targetSectionId="timeline" />

          <OurStorySection type={type} />
          <BrideGroomSection />
          <FamilyIntro type={type} />
          <WeddingEvents type={type} />
          <PhotoGallery />

          <section id="rsvp-section" className="px-4 py-12">
            <RSVPForm type={type} onOpenDonation={() => setIsModalOpen(true)} />
          </section>

          <ThankYouSection type={type} />
        </div>
      )}

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={type}
      />
    </main>
  );
}
