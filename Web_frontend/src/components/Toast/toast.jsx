import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './toast.css';

const ToastDemo = ({ open, setOpen }) => {
    const eventDateRef = React.useRef(new Date());
    const timerRef = React.useRef(0);
  
    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);
  return (
    <Toast.Provider swipeDirection="right">
    

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">☁️Weather</Toast.Title>
        <Toast.Description >
        <p className='descip'>To see Event List. Click ☁️ icon. </p>
        <br />
          <time className="ToastDescription" dateTime={eventDateRef.current.toISOString()}>
            {prettyDate(eventDateRef.current)}
          </time>
        
        </Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
         
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

function oneWeekAway(date) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export default ToastDemo;