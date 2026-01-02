import { motion } from "framer-motion";

interface Book3DProps {
  coverImage: string;
  title: string;
  className?: string;
}

export function Book3D({ coverImage, title, className = "" }: Book3DProps) {
  return (
    <motion.div 
      className={`book-3d-container ${className}`}
      whileHover={{ rotateY: -25 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
    >
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
    </motion.div>
  );
}
