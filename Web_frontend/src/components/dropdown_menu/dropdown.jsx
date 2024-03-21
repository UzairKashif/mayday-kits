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


          <NavigationMenu.Content className="NavigationMenuContent">
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
                        <svg fill="currentColor" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.888 31.977c-7.539 0-12.887-5.228-12.887-12.431 0-3.824 2.293-7.944 2.39-8.116 0.199-0.354 0.59-0.547 0.998-0.502 0.404 0.052 0.736 0.343 0.84 0.736 0.006 0.024 0.624 2.336 1.44 3.62 0.548 0.864 1.104 1.475 1.729 1.899-0.423-1.833-0.747-4.591-0.22-7.421 1.448-7.768 7.562-9.627 7.824-9.701 0.337-0.097 0.695-0.010 0.951 0.223 0.256 0.235 0.373 0.586 0.307 0.927-0.010 0.054-1.020 5.493 1.123 10.127 0.195 0.421 0.466 0.91 0.758 1.399 0.083-0.672 0.212-1.386 0.41-2.080 0.786-2.749 2.819-3.688 2.904-3.726 0.339-0.154 0.735-0.104 1.027 0.126 0.292 0.231 0.433 0.603 0.365 0.969-0.011 0.068-0.294 1.938 1.298 4.592 1.438 2.396 1.852 3.949 1.852 6.928 0 7.203-5.514 12.43-13.111 12.43zM6.115 14.615c-0.549 1.385-1.115 3.226-1.115 4.931 0 6.044 4.506 10.43 10.887 10.43 6.438 0 11.11-4.386 11.11-10.431 0-2.611-0.323-3.822-1.567-5.899-0.832-1.386-1.243-2.633-1.439-3.625-0.198 0.321-0.382 0.712-0.516 1.184-0.61 2.131-0.456 4.623-0.454 4.649 0.029 0.446-0.242 0.859-0.664 1.008s-0.892 0.002-1.151-0.364c-0.075-0.107-1.854-2.624-2.637-4.32-1.628-3.518-1.601-7.323-1.434-9.514-1.648 0.96-4.177 3.104-4.989 7.466-0.791 4.244 0.746 8.488 0.762 8.529 0.133 0.346 0.063 0.739-0.181 1.018-0.245 0.277-0.622 0.4-0.986 0.313-0.124-0.030-2.938-0.762-4.761-3.634-0.325-0.514-0.617-1.137-0.864-1.742z"></path>
                        </svg>
                        </span>
                        <span className="checkbox-details">
        <span className="checkbox-title">Fires Mayday & FIRMS</span>
        <span className="checkbox-description">Description here</span>
        {/* Add more spans or divs as needed for additional details */}
      </span>
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
                        <svg width="800px" height="800px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M92.603 56.375a38.999 38.999 0 0 1 41.38 23.584c-.262.063-.523.13-.783.2a6 6 0 0 0-4.242 7.348 6 6 0 0 0 7.348 4.243 22.002 22.002 0 0 1 26.747 27.636A22.003 22.003 0 0 1 142 135H28.518a35.006 35.006 0 0 1 32.313-28.933 6 6 0 1 0-.743-11.976c-.36.022-.72.048-1.08.079a39.001 39.001 0 0 1 33.595-37.795ZM47.032 96.796a51 51 0 0 1 99.492-17.494 33.995 33.995 0 0 1 24.349 15.743A34 34 0 0 1 142 147H22a6 6 0 0 1-5.995-6.24 6.034 6.034 0 0 1-.002-.241 47.002 47.002 0 0 1 31.029-43.723Z" clip-rule="evenodd"/></svg>
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
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path fill-rule="nonzero" d="M5 21a1 1 0 0 1-.993-.883L4 20v-9H1l10.327-9.388a1 1 0 0 1 1.246-.08l.1.08L23 11h-3v9a1 1 0 0 1-.883.993L19 21H5zm7-17.298L6 9.156V19h4.357l1.393-1.5L8 14l5-3-2.5-2 3-3-.5 3 2.5 2-4 3 3.5 3-1.25 2H18V9.157l-6-5.455z"/>
                            </g>
                        </svg>
                        </span>
                        <span className="checkbox-label">Earthquakes</span>
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
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path fill-rule="nonzero" d="M5 21a1 1 0 0 1-.993-.883L4 20v-9H1l10.327-9.388a1 1 0 0 1 1.246-.08l.1.08L23 11h-3v9a1 1 0 0 1-.883.993L19 21H5zm7-17.298L6 9.156V19h4.357l1.393-1.5L8 14l5-3-2.5-2 3-3-.5 3 2.5 2-4 3 3.5 3-1.25 2H18V9.157l-6-5.455z"/>
                            </g>
                        </svg>
                        </span>
                        <span className="checkbox-label">Earthquakes</span>
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