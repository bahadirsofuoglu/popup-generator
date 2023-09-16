import { useToast } from '../context/toastContext';
import CloseIcon from './icons/CloseIcon';

// This is the toast component that will be used to display the toast message
// The toast message is stored in the toastContext. Can usable in globally

const Toast: React.FC = () => {
    const { message, isOpen, closeToast, type } = useToast();

    if (!isOpen) return null;

    const backgroundColor = type === 'error' ? 'bg-red-500' : 'bg-green-300';

    return (
        <div
            id='pg-toast'
            className={`fixed right-4 top-4 z-50 ${backgroundColor} flex flex-col rounded p-4 shadow-lg`}
            style={{ maxWidth: '300px' }}
        >
            <div className='mb-2 flex items-center justify-between'>
                <h1 className='text-xl font-bold text-white'>
                    {type?.toUpperCase() || 'ERROR'}
                </h1>
                <button onClick={closeToast}>
                    <span className='text-white'>
                        <CloseIcon />
                    </span>
                </button>
            </div>
            <div className='break-words text-white'>{message}</div>
        </div>
    );
};

export default Toast;
