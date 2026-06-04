"use client";

import { useState } from "react";
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
export default function WeddingPage() {
  const [hasOpened, setHasOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpened = () => {
    setHasOpened(true);
  };

  return (
    <main className="relative min-h-screen bg-[#fcfaf6]">
      <RosePetals />

      {/* Intro */}
      <div className="mb-10 md:mb-16">
        <InteractiveIntro onOpened={handleOpened} />
      </div>

      {hasOpened && (
        <div className="animate-in fade-in duration-1000">
          <RosePetals />

          {/* FloatingMusic tự phát khi mount */}
          <FloatingMusic
            src="/musics/nen.mp3"
            autoPlay={true}
            targetSectionId="timeline"
          />
          <OurStorySection />
          <FamilyIntro />
          <WeddingEvents />
          <PhotoGallery />
          <ThankYouSection />

          <div id="rsvp-section">
            <RSVPForm onOpenDonation={() => setIsModalOpen(true)} />
          </div>
        </div>
      )}

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
