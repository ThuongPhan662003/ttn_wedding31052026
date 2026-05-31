'use strict';
'use client';
import { useState } from 'react';

export default function RsvpForm({ guestSlug }) {
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!status) {
      alert('Vui lòng chọn trạng thái tham dự của bạn!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: guestSlug, status, note }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Cảm ơn bạn đã phản hồi thiệp mời! ❤️');
      } else {
        setMessage('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (err) {
      setMessage('Không thể kết nối đến máy chủ.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-4 pt-2">
      <p className="text-sm font-semibold text-wedding-dark text-center">Bạn sẽ tham gia cùng chúng mình chứ?</p>
      
      <div className="flex justify-center gap-4">
        <label className={`flex-1 p-3 border rounded-xl text-center cursor-pointer transition ${status === 'Đi đến' ? 'bg-wedding-pink border-wedding-gold text-white font-bold' : 'bg-gray-50 border-gray-200'}`}>
          <input type="radio" name="status" value="Đi đến" className="sr-only" onChange={(e) => setStatus(e.target.value)} />
          Sẽ Đến 🎉
        </label>
        
        <label className={`flex-1 p-3 border rounded-xl text-center cursor-pointer transition ${status === 'Không đến' ? 'bg-gray-400 border-gray-500 text-white font-bold' : 'bg-gray-50 border-gray-200'}`}>
          <input type="radio" name="status" value="Không đến" className="sr-only" onChange={(e) => setStatus(e.target.value)} />
          Rất Tiếc 😢
        </label>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-500 font-medium">Lời nhắn gửi cô dâu & chú rể:</label>
        <textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập lời chúc hoặc số người đi cùng..." 
          className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:outline-none focus:border-wedding-gold"
          rows={2}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-wedding-pink text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-opacity-90 transition active:scale-[0.98] disabled:bg-gray-300"
      >
        {loading ? 'Đang gửi phản hồi...' : 'Xác nhận tham dự'}
      </button>

      {message && <p className="text-center text-sm font-medium text-wedding-gold mt-2">{message}</p>}
    </form>
  );
}