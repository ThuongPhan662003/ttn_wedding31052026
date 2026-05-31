'use client';
import { useState, useEffect } from 'react';
// Nếu thư mục components của bạn nằm cùng cấp với app, hãy dùng đường dẫn @/components/...
import MusicPlayer from '@/components/OurStory/MusicPlayer'; 
import HeroSection from '@/components/OurStory/HeroSection';
import StoryTimeline from '@/components/OurStory/StoryTimeline';
import WeddingEvents from '@/components/OurStory/WeddingEvents';
export default function OurStoryPage() {
  const [timelines, setTimelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch('/api/story');
        const result = await response.json();
        
        if (result.data) {
          setTimelines(result.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu LoveStory:", error);
        setIsLoading(false);
      }
    };

    fetchStory();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#333333] relative font-sans">
      
      {/* 1. Trình phát nhạc (Truyền link bài hát vào biến src) */}
      <MusicPlayer src="/musics/nen.mp3" />

      {/* 2. Ảnh bìa tràn viền */}
      <HeroSection />
      <WeddingEvents />
      {/* 3. Dòng thời gian (Truyền dữ liệu và trạng thái loading xuống) */}
      <StoryTimeline timelines={timelines} isLoading={isLoading} />
      
    </main>
  );
}