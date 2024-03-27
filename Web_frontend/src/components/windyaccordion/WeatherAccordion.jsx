import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import './weatheraccordion.css';

const AccordionDemo = ({ weatherData }) => {
  // Accessing nested weather data - adjust according to actual data structure
  const windSpeedSurface = weatherData['wind_u-surface']?.[0];
  const temperatureSurface = weatherData['ts']?.[0];
  const dewpointSurface = weatherData['dewpoint-surface']?.[0];
  const rhSurface = weatherData['rh-surface']?.[0];
  const pressureSurface = weatherData['pressure-surface']?.[0];

  return (
    <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
      <Accordion.Item className="AccordionItem" value="item-1">
        <AccordionTrigger>Windy.com Details</AccordionTrigger>
        <AccordionContent>
          <div className="detail-box">
            {windSpeedSurface && <><h4>Wind Speed (Surface)</h4><p>{windSpeedSurface} m/s</p></>}
          </div>
          <div className="detail-box">
            {temperatureSurface && <><h4>Temperature (Surface)</h4><p>{temperatureSurface} K</p></>}
          </div>
          <div className="detail-box">
            {dewpointSurface && <><h4>Dewpoint (Surface)</h4><p>{dewpointSurface} K</p></>}
          </div>
          <div className="detail-box">
            {rhSurface && <><h4>Relative Humidity (Surface)</h4><p>{rhSurface} %</p></>}
          </div>
          <div className="detail-box">
            {pressureSurface && <><h4>Pressure (Surface)</h4><p>{pressureSurface} Pa</p></>}
          </div>
        </AccordionContent>
      </Accordion.Item>

      {/* Additional accordion items... */}
      {/* Example for item-2 */}
      {/* Example for item-3 */}
    </Accordion.Root>
  );
};
const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames('AccordionTrigger', className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  ));
  
  const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames('AccordionContent', className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  ));
  export default AccordionDemo;