// import { useThemeColor } from 'app/hooks';

import React from 'react';
import { SafeAreaView, View } from 'react-native';

import StorybookUIRoot from 'storybook';

const StorybookScreen: React.FC = () => {
  // const colors = useThemeColor('gradient', null) as string[];

  return (
    // <ScrollView>
    <View nativeID="Storybook">
      <SafeAreaView>
        <View>
          <StorybookUIRoot />
        </View>
      </SafeAreaView>
    </View>
    // </ScrollView>
  );
};

export default StorybookScreen;
