// components/Loader.jsx
const Loader = ({ variant = 'pulse' }) => {
  // Variant options: 'pulse', 'dots', 'bar', 'spinner', 'fancy'
  
  const loaders = {
    pulse: (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
      </div>
    ),
    
    dots: (
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse delay-100"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse delay-200"></div>
      </div>
    ),
    
    spinner: (
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-reverse opacity-30"></div>
      </div>
    ),
    
    bar: (
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-progress"></div>
      </div>
    ),
    
    fancy: (
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 border-r-pink-500 rounded-full animate-spin"></div>
        <div className="absolute inset-1 border-4 border-transparent border-t-blue-500 border-r-cyan-400 rounded-full animate-spin-reverse"></div>
      </div>
    )
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 rounded-lg">
        {loaders[variant] || loaders['spinner']}
      </div>
    </div>
  );
};

export default Loader;