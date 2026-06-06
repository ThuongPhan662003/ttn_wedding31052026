'use client";';
export default function GalleryLayout({ topImage, leftImage, rightImage }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-2">
      <div className="grid gap-4">
        {/* Ảnh trên */}
        {topImage && (
          <div className="overflow-hidden rounded-2xl">
            <img
              src={topImage}
              alt="Top"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Hàng dưới */}
        {(leftImage || rightImage) && (
          <div
            className={`grid gap-4 ${
              leftImage && rightImage ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {leftImage && (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={leftImage}
                  alt="Left"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {rightImage && (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={rightImage}
                  alt="Right"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
