interface Book3DProps {
  coverImage: string;
  title: string;
  className?: string;
}

export function Book3D({ coverImage, title, className = "" }: Book3DProps) {
  return (
    <div className={`book-3d-container ${className}`}>
      <div className="book-3d">
        {/* Front Cover */}
        <div className="book-front">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover rounded-r-sm"
          />
        </div>
        
        {/* Spine */}
        <div className="book-spine" />
        
        {/* Pages */}
        <div className="book-pages" />
        
        {/* Back Cover */}
        <div className="book-back" />
      </div>
      
      {/* Shadow */}
      <div className="book-shadow" />
    </div>
  );
}
