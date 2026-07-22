const rooms = [
  {
    name: "Living Room",
    images: [
      "https://placehold.co/400x400/d4d4d8/52525b?text=Living+Room+1",
      "https://placehold.co/400x400/d4d4d8/52525b?text=Living+Room+2",
      "https://placehold.co/400x400/d4d4d8/52525b?text=Living+Room+3",
    ],
  },
  {
    name: "Laundry Room",
    images: [
      "https://placehold.co/400x400/e4e4e7/52525b?text=Laundry+1",
      "https://placehold.co/400x400/e4e4e7/52525b?text=Laundry+2",
      "https://placehold.co/400x400/e4e4e7/52525b?text=Laundry+3",
    ],
  },
  {
    name: "Bathroom",
    images: [
      "https://placehold.co/400x400/d4d4d8/52525b?text=Bathroom+1",
      "https://placehold.co/400x400/d4d4d8/52525b?text=Bathroom+2",
      "https://placehold.co/400x400/d4d4d8/52525b?text=Bathroom+3",
    ],
  },
  {
    name: "Bedroom",
    images: [
      "https://placehold.co/400x400/e4e4e7/52525b?text=Bedroom+1",
      "https://placehold.co/400x400/e4e4e7/52525b?text=Bedroom+2",
      "https://placehold.co/400x400/e4e4e7/52525b?text=Bedroom+3",
    ],
  },
  {
    name: "Home Studio",
    images: [
      "https://placehold.co/400x400/d4d4d8/52525b?text=Studio+1",
      "https://placehold.co/400x400/d4d4d8/52525b?text=Studio+2",
      "https://placehold.co/400x400/d4d4d8/52525b?text=Studio+3",
    ],
  },
];

export default function RoomGallery() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fits in every home
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Designed to blend seamlessly into any room. See how it looks in real homes.
          </p>
        </div>

        <div className="space-y-12">
          {rooms.map((room) => (
            <div key={room.name}>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">{room.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {room.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-100"
                  >
                    <img
                      src={img}
                      alt={`${room.name} ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
