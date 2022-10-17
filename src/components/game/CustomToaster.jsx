import { Toaster } from 'react-hot-toast';

export const CustomToaster = () => {
  return (
    <Toaster
        position='bottom-center'
        reverseOrder={true}

        toastOptions={{
            // Define default options
            className: 'gameToast',
            duration: 3000,

            success: {
                className: 'gameToast success'
            },
            error: {
                className: 'gameToast error'
            },
        }}
        
    />
  )
}
