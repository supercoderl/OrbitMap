import React, { createContext, useState, useContext } from "react";
import { ActivityIndicator, Modal, View, StyleSheet } from "react-native";

let needLoadingRequestCount = 0;

export type LoadingContextType = {
  showFullScreenLoading: () => void;
  tryHideFullScreenLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showFullScreenLoading = () => {
    if (needLoadingRequestCount === 0) setIsLoading(true);
    needLoadingRequestCount++;
  };

  const tryHideFullScreenLoading = () => {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ showFullScreenLoading, tryHideFullScreenLoading }}>
      {children}
      <Modal transparent={true} animationType="fade" visible={isLoading}>
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
