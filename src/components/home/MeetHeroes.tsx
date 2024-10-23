import React from 'react';

const MeetHeroes: React.FC = () => {
  const heroes = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
      title: 'Public Speaking Master',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1531369201-4f7be267b1de',
      title: 'Discover the Secret to Joy',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      title: 'Unlock Your Minds Potential',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Meet the Heroes</h2>
      <p className="text-gray-600 text-center mb-12">
        Our teachers are influential role models who share their knowledge and
        abilities with thousands of students.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {heroes.map((hero) => (
          <div
            key={hero.id}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={hero.image}
              alt={hero.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{hero.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetHeroes;
