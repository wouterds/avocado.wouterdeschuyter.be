//@flow
import React from 'react';
import type { Node } from 'react';
import BasePage from 'components/Pages/Base';

const LandingPage = (): Node => {
  return (
    <BasePage>
      <p>
        Hi there 👋
        <br />
        Here I try to keep track of the growth and progress of my avocado plant,
        not much else to see!
      </p>
    </BasePage>
  );
};

export default LandingPage;
