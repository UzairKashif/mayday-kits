// HoverCardDemo.jsx
import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { IoIosArrowForward } from 'react-icons/io'; 
import './hovercard.css';

const HoverCardDemo = () => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <div className="ListItemHeading" style={{color:'#FF977D',}}>NWS Alerts for US
      <IoIosArrowForward className="ArrowIcon" /> </div>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content className="HoverCardContent" sideOffset={5}>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4>NWS Extreme Weather Alerts Details</h4>
          <p>Information about current extreme weather alerts...</p>
        </div>
        
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default HoverCardDemo;
