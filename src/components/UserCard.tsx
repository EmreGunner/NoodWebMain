import React from 'react';

interface UserCardProps {
  name: string;
  level: string;
  studyTime: string;
  assessments: number;
  liveSessions: number;
  imageUrl: string;
  videoUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  level,
  studyTime,
  assessments,
  liveSessions,
  imageUrl,
  videoUrl,
}) => {
  // Convert Google Drive link to embed format
  const embedUrl = videoUrl.replace('view?usp=sharing', 'preview');
  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
      {/* Header with user info */}
      <div className="p-4 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {level}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-700 border border-green-100">
              {studyTime}
            </span>
          </div>
        </div>
      </div>
      
      {/* Video */}
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      
      {/* Footer with stats */}
      <div className="p-4 flex justify-between border-t border-gray-100">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{assessments}</span> Assessments
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{liveSessions}</span> Live Sessions
        </div>
      </div>
    </div>
  );
};

export default UserCard; 