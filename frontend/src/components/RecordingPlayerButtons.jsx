
export const RecordingPlayerButtons = ({BUTTON_CONFIG}) => {
  const buttonClass =
    "p-2 border border-gray-300 rounded-full bg-color bg-hover hover:text-white hover:border-gray-600 cursor-pointer transition-colors duration-150";

  return (
    <div className="flex items-center space-x-2">
      {BUTTON_CONFIG.map(({ Icon, label, key }) => (
        <button 
          key={key}   
          className={buttonClass} 
          aria-label={label} 
        > 
          {Icon && <Icon className="text-white text-lg" />}
        </button>
      ))}
    </div>
  );
};