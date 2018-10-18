import React from 'react';
import { ImageOverlay } from '../../atoms/ImageOverlay';
import { Wrapper } from './particles/Wrapper';
import { HeroImageContent } from './particles/HeroImageContent';

// The hero image is a molecule because it combines
//  the image overlay
export const HeroImage = ({ children, ...props }) => (
  <Wrapper {...props}>
    <ImageOverlay>
      <HeroImageContent>
        {children}
      </HeroImageContent>
    </ImageOverlay>
  </Wrapper>
);
