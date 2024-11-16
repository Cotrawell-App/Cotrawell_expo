import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Animated,
} from "react-native";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [slideAnim] = useState(new Animated.Value(-300)); // Initial position off-screen

  useEffect(() => {
    if (Platform.OS === "web") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isMenuOpen]);

  const isDesktop = windowWidth >= 768;

  const handleCloseDrawer = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.navbar}>
      {isDesktop && <Text style={styles.logo}>Brand</Text>}

      {isDesktop && (
        <View style={[styles.navLinks, styles.navLinksDesktop]}>
          <Text style={styles.link}>Home</Text>
          <Text style={styles.link}>About</Text>
          <Text style={styles.link}>Services</Text>
          <Text style={styles.link}>Contact</Text>
        </View>
      )}

      {!isDesktop && (
        <TouchableOpacity
          style={styles.menuToggle}
          onPress={() => setIsMenuOpen(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      )}

      <View
        style={[styles.rightSection, isDesktop && styles.rightSectionDesktop]}
      >
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      {!isDesktop && (
        <>
          {isMenuOpen && (
            <TouchableOpacity
              style={styles.overlay}
              onPress={handleCloseDrawer}
              activeOpacity={1}
            />
          )}
          <Animated.View style={[styles.drawer, { left: slideAnim }]}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerLogo}>Brand</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseDrawer}
              >
                <Text style={styles.closeIcon}>✖</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.drawerContent}>
              <Text style={styles.drawerLink}>Home</Text>
              <Text style={styles.drawerLink}>About</Text>
              <Text style={styles.drawerLink}>Services</Text>
              <Text style={styles.drawerLink}>Contact</Text>
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#333",
    position: "relative",
    zIndex: 1000,
    height: 60,
  },
  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  navLinksDesktop: {
    flex: 1,
    marginLeft: 40,
  },
  link: {
    color: "#fff",
    marginHorizontal: 15,
    fontSize: 16,
  },
  menuToggle: {
    padding: 8,
  },
  menuIcon: {
    color: "#fff",
    fontSize: 24,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rightSectionDesktop: {
    marginLeft: "auto",
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  drawer: {
    zIndex: 1000,
    position: "fixed",
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "#333",
    zIndex: 1001,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  drawerLogo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    color: "#fff",
    fontSize: 20,
  },
  drawerContent: {
    paddingTop: 16,
  },
  drawerLink: {
    color: "#fff",
    fontSize: 18,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
});

export default Navbar;
