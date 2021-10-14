import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import styles from './styles';

const Message: React.FC<{ delay: number; onHide(): void; message: string }> = ({
  delay,
  onHide,
  message,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(delay),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, [delay, onHide, opacity]);

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}>
      <Text>{message}</Text>
    </Animated.View>
  );
};

const Toast: React.FC<{
  message: string | undefined;
  delay?: number;
  callback?: () => {} | undefined;
}> = ({ callback, message, delay }) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (message) {
      setMessages(msgs => [...msgs, message]);
    }
  }, [message]);

  return (
    <View style={styles.container}>
      {messages.map(msg => (
        <Message
          delay={delay || 2500}
          key={msg}
          message={msg}
          onHide={() => {
            setMessages(msgs =>
              msgs.filter(currentMessage => currentMessage !== message),
            );
            if (callback) {
              callback();
            }
          }}
        />
      ))}
    </View>
  );
};

export default Toast;
