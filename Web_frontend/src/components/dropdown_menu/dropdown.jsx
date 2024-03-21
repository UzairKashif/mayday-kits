import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './stylesdrop.css';
import fireicon from '../assets/fire.png';
import '@radix-ui/themes/styles.css';
import * as HoverCard from '@radix-ui/react-hover-card';
import './check.scss'



const NavigationMenuDemo = ({ showFire, setShowFire, showEarthquake, setShowEarthquake, showWeather,setShowWeather}) => {

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




  return (
    <>
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Events <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>


          <NavigationMenu.Content className="NavigationMenuContentf">
              <ul className="List one">
                
                  
                  <div className="checkbox">
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        id="fireCheckbox"
                        checked={showFire}
                        onChange={(e) => setShowFire(e.target.checked)}
                      />
                      <span className="checkbox-tile">
                        <span className="checkbox-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                          <rect width="256" height="256" fill="none"></rect>
                          <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
                          <path d="M71.0247,205.27116a159.91145,159.91145,0,0,1,136.98116-77.27311q8.09514,0,15.99054.78906" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M188.0294,53.09083A159.68573,159.68573,0,0,1,64.00586,111.99805a160.8502,160.8502,0,0,1-30.15138-2.83671" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M85.93041,41.68508a159.92755,159.92755,0,0,1,78.99267,138.00723,160.35189,160.35189,0,0,1-4.73107,38.77687" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                        </svg>
                        </span>
                        <span className="checkbox-label">Display Fire Events</span>
                      </span>
                    </label>
                  </div>


                  {/* The Weather Selector */}
                  <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                              type="checkbox"
                              className="checkbox-input"
                              checked={showWeather}
                              onChange={(e) => setShowWeather(e.target.checked)}
                    />
                      <span className="checkbox-tile">
                        <span className="checkbox-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                          <rect width="256" height="256" fill="none"></rect>
                          <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
                          <path d="M71.0247,205.27116a159.91145,159.91145,0,0,1,136.98116-77.27311q8.09514,0,15.99054.78906" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M188.0294,53.09083A159.68573,159.68573,0,0,1,64.00586,111.99805a160.8502,160.8502,0,0,1-30.15138-2.83671" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M85.93041,41.68508a159.92755,159.92755,0,0,1,78.99267,138.00723,160.35189,160.35189,0,0,1-4.73107,38.77687" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                        </svg>
                        </span>
                        <span className="checkbox-label">Weather</span>
                      </span>
                    </label>
                  </div>





                   {/* The Earthquake Selector */}
                   <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={showEarthquake}
                      className="checkbox-input"
                      onChange={(e) => setShowEarthquake(e.target.checked)}
                    />
                      <span className="checkbox-tile">
                        <span className="checkbox-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                          <rect width="256" height="256" fill="none"></rect>
                          <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
                          <path d="M71.0247,205.27116a159.91145,159.91145,0,0,1,136.98116-77.27311q8.09514,0,15.99054.78906" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M188.0294,53.09083A159.68573,159.68573,0,0,1,64.00586,111.99805a160.8502,160.8502,0,0,1-30.15138-2.83671" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M85.93041,41.68508a159.92755,159.92755,0,0,1,78.99267,138.00723,160.35189,160.35189,0,0,1-4.73107,38.77687" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                        </svg>
                        </span>
                        <span className="checkbox-label">Weather</span>
                      </span>
                    </label>
                  </div>



                  {/* The Earthquake Selector */}
                  <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={showEarthquake}
                      className="checkbox-input"
                      onChange={(e) => setShowEarthquake(e.target.checked)}
                    />
                      <span className="checkbox-tile">
                        <span className="checkbox-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                          <rect width="256" height="256" fill="none"></rect>
                          <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
                          <path d="M71.0247,205.27116a159.91145,159.91145,0,0,1,136.98116-77.27311q8.09514,0,15.99054.78906" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M188.0294,53.09083A159.68573,159.68573,0,0,1,64.00586,111.99805a160.8502,160.8502,0,0,1-30.15138-2.83671" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M85.93041,41.68508a159.92755,159.92755,0,0,1,78.99267,138.00723,160.35189,160.35189,0,0,1-4.73107,38.77687" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                        </svg>
                        </span>
                        <span className="checkbox-label">Weather</span>
                      </span>
                    </label>
                  </div>


                  {/* The Earthquake Selector */}
                  <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={showEarthquake}
                      className="checkbox-input"
                      onChange={(e) => setShowEarthquake(e.target.checked)}
                    />
                      <span className="checkbox-tile">
                        <span className="checkbox-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                          <rect width="256" height="256" fill="none"></rect>
                          <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
                          <path d="M71.0247,205.27116a159.91145,159.91145,0,0,1,136.98116-77.27311q8.09514,0,15.99054.78906" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M188.0294,53.09083A159.68573,159.68573,0,0,1,64.00586,111.99805a160.8502,160.8502,0,0,1-30.15138-2.83671" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                          <path d="M85.93041,41.68508a159.92755,159.92755,0,0,1,78.99267,138.00723,160.35189,160.35189,0,0,1-4.73107,38.77687" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                        </svg>
                        </span>
                        <span className="checkbox-label">Weather</span>
                      </span>
                    </label>
                  </div>
            
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