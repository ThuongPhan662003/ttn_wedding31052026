"use client";
import { useState, useEffect, useRef } from "react";
import InteractiveIntro from "@/components/wedding/InteractiveIntro";
import RosePetals from "@/components/wedding/RosePetals";
import FloatingMusic from "@/components/wedding/FloatingMusic";
import FamilyIntro from "@/components/wedding/FamilyIntro";
import RSVPForm from "@/components/wedding/RSVPForm";
import WeddingEvents from "@/components/wedding/WeddingEvents";
import PhotoGallery from "@/components/wedding/PhotoGallery";
import DonationModal from "@/components/wedding/DonationModal";

export default function WeddingPage() {
  const [hasOpened, setHasOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef(null);

  const [showContent, setShowContent] = useState(false);

  const handleOpened = () => {
    setHasOpened(true);

    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }

    // đợi animation intro chạy xong
    setTimeout(() => {
      setShowContent(true);
    }, 2000); // đúng thời gian animation của Intro
  };

  return (
    <main className="relative min-h-screen bg-[#fcfaf6]">
      <audio ref={audioRef} src="/musics/nen.mp3" loop />
      <RosePetals />
      {/* 1. HIỂN THỊ TRƯỚC: Màn hình Intro */}

      <div className="mb-10 md:mb-16">
        <InteractiveIntro onOpened={() => setHasOpened(true)} />
      </div>

      {/* 2. HIỂN THỊ SAU: Khi hasOpened là true */}
      {hasOpened && (
        <div className="animate-in fade-in duration-1000">
          {/* Cánh hoa hồng rơi theo phong cách nét cọ mảnh bạn đã chọn */}
          <RosePetals />

          <FloatingMusic src="/musics/nen.mp3" initialPlaying={true} />

          {/* Nội dung thiệp... */}
          <FamilyIntro />
          <WeddingEvents />
          <PhotoGallery />
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
