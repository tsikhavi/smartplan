import React from 'react'

type AlertProps = {
  color: 'malachite' | 'red'
  message: string
}

const Alert: React.FC<AlertProps> = ({ color, message }) => {
  const [showAlert, setShowAlert] = React.useState(true)

  return (
    <>
      {showAlert && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 z-50 rounded-md shadow-lg bg-${color}-300`}
        >
          <span className={`text-${color}-800 mr-4`}>{message}</span>
          <button
            className={` text-${color}-700 hover:text-${color}-900 text-xl font-bold focus:outline-none`}
            onClick={() => setShowAlert(false)}
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}

export default Alert
