import React, { Suspense } from 'react';
import useDarkMode from 'use-dark-mode';


const DarkModeToggle = () => {
  const darkMode = useDarkMode(true);
  return (
      <button id='dm' type="button" onClick={darkMode.toggle}>
        light_mode
        {/* <Suspense fallback={
          <img src='moonIcon.png' height='14px' width='14px' alt="darkMode toggle" />
        }>
          <img src={darkMode.value ? 'moonIcaon.png' : 'sunIacon.png'} height='30px' width='30px' alt="darkMode toggle" />
        </Suspense> */}
      </button>
  );
};

export default DarkModeToggle;