import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import HoverCardDemo from './HoverCard/hovercard';
import './stylesdrop.css';
import * as HoverCard from '@radix-ui/react-hover-card';
import fireicon from '../assets/fire.png';
import '@radix-ui/themes/styles.css';



const NavigationMenuDemo = ({ showFire, setShowFire, showEarthquake,showWeather,setShowWeather, setShowEarthquake,weatherEventFilters, onWeatherFilterChange }) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    backgroundColor: '#010001',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '30px',
    padding: '20px',
    zIndex: 9999,
  };

  const validEvents = [
    "earthquake", "environment-pollution", "explosion", "fire", "flood", "hazmat", "landslide",
    "nuclear", "snow", "technological-disaster", "tsunami", "volcano", "wildfire", "hurricane",
    "tornado", "drought", "avalanche", "Air Quality Alert", "Ashfall Warning", "Beach Hazards Statement",
    "Coastal Flood Warning", "Dense Fog Advisory", "Dense Smoke Advisory", "Earthquake Warning",
    "Evacuation - Immediate", "Excessive Heat Warning", "Extreme Cold Warning", "Extreme Fire Danger",
    "Extreme Wind Warning", "Fire Warning", "Fire Weather Watch", "Flash Flood Warning", "Flood Warning",
    "Freeze Warning", "Freezing Fog Advisory", "Freezing Rain Advisory", "Freezing Spray Advisory",
    "Frost Advisory", "Gale Warning", "Hard Freeze Warning", "Hazardous Materials Warning",
    "Hazardous Seas Warning", "Hazardous Weather Outlook", "Heat Advisory", "High Surf Warning",
    "High Wind Warning", "Hurricane Force Wind Warning", "Hurricane Local Statement", "Ice Storm Warning",
    "Lakeshore Flood Warning", "Nuclear Power Plant Warning", "Radiological Hazard Warning", "Red Flag Warning",
    "Rip Current Statement", "Severe Thunderstorm Warning", "Severe Weather Statement", "Shelter In Place Warning",
    "Storm Surge Warning", "Storm Warning", "Tornado Warning", "Tsunami Warning", "Typhoon Warning",
    "Urban And Small Stream Flood Advisory", "Volcano Warning", "Wind Advisory", "Wind Chill Warning",
    "Winter Storm Warning", "Winter Weather Advisory"
  ];


  return (
    <>
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Events <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: 'span 4' }}>

             


                <NavigationMenu.Link asChild>
                  <a className="Callout" >
                   
                    <img src={fireicon} alt="" className="icon-small" />
                    <div className="CalloutHeading">Mayday Fire Events</div>
                    <p className="CalloutText">AI fire detections</p>
                    <li>
                    <label class="checkbox-container">
  <input type="checkbox" id="fireCheckbox" checked={showFire} onChange={(e) => setShowFire(e.target.checked)} />
  <span class="checkbox-label" for="fireCheckbox"></span>
</label>


          </li>
                  </a>
                </NavigationMenu.Link>
              </li>

              <ListItem  title="Earthquakes">
               USGS Earthquakes detections
               
          {/* Earthquakes Checkbox */}
          <li>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={showEarthquake}
                onChange={(e) => setShowEarthquake(e.target.checked)}
              />
            
  <span className="checkbox-label"></span>
            </label>
          </li>
              </ListItem>



              
              <ListItem  title="FIRMS fire events">
                NASA worldwide fire detections
              </ListItem>




              <HoverCard.Root>
                  <HoverCard.Trigger asChild>
                    <li>
                   
                      <ListItem href="/weather" title="Extreme Weather Alerts">
              </ListItem>
                        <li>
                        <label className="checkbox-container">
                            <input
                              type="checkbox"
                              checked={showWeather}
                              onChange={(e) => setShowWeather(e.target.checked)}
                            />
                            <span className="checkbox-label"></span>
                        </label>
                    </li>
                     
                    </li>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
        <HoverCard.Content   style={{zIndex:'1000',}}>
          {/* Place filter dropdown UI here */}
          <div className="filter-container">
  {validEvents.map((eventType) => (
    <div key={eventType} className="filter-option">
      <label>
        <input
          type="checkbox"
          name={eventType}
          checked={weatherEventFilters[eventType]}
          onChange={onWeatherFilterChange}
        />
        {eventType}
      </label>
    </div>
  ))}
</div>

        </HoverCard.Content>
      </HoverCard.Portal>
                </HoverCard.Root>


























             
             <ListItem href="#!" title="Satellite View" onClick={togglePopup}>
                  Global Satellite Video
                </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Overview <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <ListItem title="Introduction" href="/primitives/docs/overview/introduction">
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem title="Getting started" href="/primitives/docs/overview/getting-started">
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItem>
              <ListItem title="Styling" href="/primitives/docs/guides/styling">
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem title="Animation" href="/primitives/docs/guides/animation">
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem title="Accessibility" href="/primitives/docs/overview/accessibility">
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem title="Releases" href="/primitives/docs/overview/releases">
                Radix Primitives releases and their changelogs.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="https://github.com/radix-ui">
            About
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
    {isPopupVisible && (
        <div style={popupStyle}>
          <button style={{color:'white',}} onClick={() => setIsPopupVisible(false)}>Close</button>
          <video style={{ width: '100%', height: '100%' }} controls>
            <source src="https://geos-stat1.s3.us-east-2.amazonaws.com/G16/FULL/terra/Last24hrs.mp4" type="video/mp4" controls autoPlay muted loop />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>

  );
};

const ListItem = React.forwardRef(({ className, children, title, onClick, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef} onClick={onClick}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
));

export default NavigationMenuDemo;