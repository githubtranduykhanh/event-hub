import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Text, Animated, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { colors } from '~/styles';

interface SuccessModalProps {
  visible: boolean;
  onClose?: () => void; // Hàm tùy chọn để đóng modal sau khi ẩn
  timeout?: number;
  messages?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, timeout, messages, onClose }) => {
  const [showModal, setShowModal] = useState<boolean>(visible);
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const rotateValue = useRef<Animated.Value>(new Animated.Value(0)).current; // Giá trị để quay icon
  const scaleValue = useRef<Animated.Value>(new Animated.Value(0)).current; // Giá trị để phóng to
  useEffect(() => {
    if (visible) {
      setShowModal(true);
      rotateValue.setValue(0)
      scaleValue.setValue(0);
     
      // Hiệu ứng fade in và zoom in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 1, // Quay 1 vòng (360 độ)
          duration: 500, // 1 giây
          useNativeDriver: true,
        })
      ]).start();

      // Tự động ẩn modal sau một thời gian
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateValue, {
            toValue: 1, // Quay 1 vòng (360 độ)
            duration: 500, // 1 giây
            useNativeDriver: true,
          })
        ]).start(() => {
          setShowModal(false);
          if (onClose) {
            onClose();
          }
        });
      }, timeout ?? 1000); // 1 giây hoặc thời gian tuỳ chỉnh

      return () => clearTimeout(timer); // Xóa timer khi component unmount
    }
  }, [visible, timeout, opacity, rotateValue, onClose]);

  if (!showModal) return null;

  // Tạo hiệu ứng quay bằng cách xoay theo giá trị rotateValue
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Quay từ 0 đến 360 độ
  });


  // Tạo hiệu ứng zoom in và zoom out
  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1], // Phóng to từ 0.5 đến 1
  });

  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      animationType="none"
    >
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalContent, { opacity,transform: [{ scale }] }]}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Feather name="check-circle" size={80} color={colors.primary} />
          </Animated.View>
          <Text style={styles.successText}>{messages ?? 'Success!'}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền tối mờ
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 200,
    height: 200,
  },
  successText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default SuccessModal;
