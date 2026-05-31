'use client';
import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Dùng biến ref để ghi nhớ xem nhạc đã được phát thành công chưa (không làm re-render giao diện)
  const hasInteracted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Hàm cố gắng phát nhạc
    const tryPlayMusic = async () => {
      if (!hasInteracted.current) {
        try {
          await audio.play();
          setIsPlaying(true);
          hasInteracted.current = true; // Đánh dấu là đã phát thành công
          removeListeners();            // Gỡ bỏ bộ theo dõi ngay lập tức để giảm tải cho trình duyệt
        } catch (err) {
          // Trình duyệt chặn autoplay, tiếp tục chờ khách lướt/chạm
        }
      }
    };

    // 2. Thử phát tự động ngay khi vừa vào web (Cho các trình duyệt dễ tính)
    tryPlayMusic();

    // 3. Danh sách các hành động "Lướt" và "Chạm" của khách
    const events = ['click', 'scroll', 'touchstart', 'touchmove', 'wheel'];

    const handleUserInteraction = () => {
      tryPlayMusic();
    };

    // Hàm gắn bộ theo dõi
    const addListeners = () => {
      events.forEach((event) => {
        // { passive: true } giúp việc vuốt trên điện thoại mượt hơn, không bị khựng
        window.addEventListener(event, handleUserInteraction, { passive: true });
      });
    };

    // Hàm gỡ bộ theo dõi (Giúp web nhẹ và mượt)
    const removeListeners = () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserInteraction);
      });
    };

    // Nếu nhạc chưa phát được, thì bắt đầu "rình" xem khách có lướt trang không
    if (!hasInteracted.current) {
      addListeners();
    }

    // Dọn dẹp khi khách rời khỏi trang
    return () => {
      removeListeners();
    };
  }, []);

  // Nút Bật/Tắt thủ công (Góc phải dưới)
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Ép lặp lại bài hát khi kết thúc
  const handleSongEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <>
      <button 
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-[#D4AF37]/30 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 ${!isPlaying ? 'animate-bounce opacity-80' : 'opacity-50 hover:opacity-100'}`}
      >
        {isPlaying ? '⏸️' : '🎵'}
      </button>

      <audio 
        ref={audioRef} 
        src={src} 
        loop 
        onEnded={handleSongEnd} 
      />
    </>
  );
}