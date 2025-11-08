import { AlertCircle, RefreshCw } from 'lucide-react'
import React from 'react'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className='bg-red-500 backdrop-blur-xl border border-red-400/50 rounded-3xl p-8 shadow-2xl'>
     <div className='flex items-center space-x-4 mb-4'></div>
     <div className='p-3 bg-red-500/20 rounded-full'>
      <AlertCircle className='text-red-100' size={32} />
     </div>
     <div>
      <h2 className='text-red-100 text-2xl font-semibold mb-2'>Error Fetching Weather Data</h2>
      <p className='text-red-200'>{message}</p>
      {onRetry && (
       <div className='mt-6'>
       <button className='flex items-center space-x-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-6 py-3 text-white 
       transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer' onClick={onRetry}>
        <RefreshCw className='mt-4 text-red-100 hover:text-red-200' size={24} />
        <span className='font-medium text-white'>Retry</span>
      </button>
     </div>)}
     </div>
    </div>
  )
}

export default ErrorMessage
