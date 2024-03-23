import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader = (props) => {
  return (
    <div style={{ width: '360px', boxSizing: 'border-box', padding: '20px', backgroundColor: '#0D181F', borderRadius: '20px' }}>
      <ContentLoader 
        speed={2}
        width={270}
        height={80}
        viewBox="0 0 300 80"
        backgroundColor="#C9C9C9"
        foregroundColor="#0D181F"
        {...props}
      >
        {/* Only changed the width and height to fit the box */}
        <rect x="48" y="8" rx="3" ry="3" width="50" height="12" /> 
        <rect x="48" y="26" rx="3" ry="3" width="100" height="12" /> 
        <circle cx="20" cy="20" r="20" />
        {/* Additional rectangles to mimic the event card */}
        <rect x="48" y="50" rx="3" ry="3" width="560" height="12" /> 
       
      </ContentLoader>
    </div>
  );
};

export default SkeletonLoader;
