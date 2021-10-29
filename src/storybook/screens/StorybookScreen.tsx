import {
  GradientView,
  ResponsiveScrollView,
  ResponsiveView,
} from 'app/components/atoms';
import { useThemeColor } from 'app/hooks';

import React from 'react';

import StorybookUIRoot from 'storybook';

const StorybookScreen: React.FC = () => {
  const colors = useThemeColor('gradient', null) as string[];

  return (
    // <ResponsiveScrollView>
    <GradientView nativeID="Storybook" colors={colors} type="parent">
      <ResponsiveView type="parent">{/* <StorybookUIRoot /> */}</ResponsiveView>
    </GradientView>
    // </ResponsiveScrollView>
  );
};

export default StorybookScreen;
