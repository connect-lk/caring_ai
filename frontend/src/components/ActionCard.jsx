const ActionCard = ({
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`
      bg-white rounded-xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]   outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-[6px] p-6
      ${className}
    `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
            {subtitle}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onButtonClick}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                 focus:ring-offset-white dark:focus:ring-offset-gray-800"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ActionCard;
