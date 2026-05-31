'use client';
import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Biến ref để ghi nhớ xem nhạc đã phát thành công chưa
  const hasInteracted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Hàm "mở khóa" âm thanh
    const unlockAudio = () => {
      // Nếu đã phát rồi thì thôi, không chạy lại nữa
      if (hasInteracted.current) return;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Phát thành công!
            setIsPlaying(true);
            hasInteracted.current = true;
            
            // GỠ BỎ TOÀN BỘ CẢM BIẾN để web chạy mượt
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('mousedown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
          })
          .catch(err => {
            // Trình duyệt chặn, tiếp tục chờ khách click/chạm
            console.log("Trình duyệt đang chờ bạn click hoặc chạm vào màn hình...");
          });
      }
    };

    // 1. Thử phát ngay lập tức (sẽ thành công nếu khách tải lại trang / F5)
    unlockAudio();

    // 2. Gắn cảm biến "Click/Chạm vào bất kỳ đâu"
    window.addEventListener('click', unlockAudio);
    window.addEventListener('mousedown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio);

    // Dọn dẹp bộ nhớ
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('mousedown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <>
      {/* Nút nhạc báo hiệu trạng thái */}
      <button 
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-[#D4AF37]/30 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 ${!isPlaying ? 'animate-bounce opacity-80' : 'opacity-50 hover:opacity-100'}`}
      >
        {isPlaying ? '⏸️' : '🎵'}
      </button>

      {/* Thẻ audio ẩn */}
      <audio 
        ref={audioRef} 
        src={src} 
        loop 
        preload="auto"
        onEnded={handleSongEnd} 
      />
    </>
  );
}
