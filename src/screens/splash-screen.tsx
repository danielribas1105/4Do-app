import { Colors } from "@/src/constants/colors"
import React, { useCallback, useEffect, useRef } from "react"
import { Animated, Easing, Image, StyleSheet } from "react-native"

interface SplashScreenProps {
   onFinish: () => void
   ready: boolean
}

export function SplashScreen({ onFinish, ready }: SplashScreenProps) {
   const canDismiss = useRef(false)
   const logoScale = useRef(new Animated.Value(0.4)).current
   const logoOpacity = useRef(new Animated.Value(0)).current
   const titleOpacity = useRef(new Animated.Value(0)).current
   const titleY = useRef(new Animated.Value(16)).current
   const subtitleY = useRef(new Animated.Value(16)).current
   const subtitleOpacity = useRef(new Animated.Value(0)).current
   const screenOpacity = useRef(new Animated.Value(1)).current

   const dismiss = useCallback(() => {
      Animated.timing(screenOpacity, {
         toValue: 0,
         duration: 600,
         easing: Easing.in(Easing.cubic),
         useNativeDriver: true,
      }).start(() => onFinish())
   }, [])

   useEffect(() => {
      Animated.sequence([
         Animated.parallel([
            Animated.spring(logoScale, {
               toValue: 1,
               tension: 60,
               friction: 8,
               useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
         ]),
         Animated.parallel([
            Animated.timing(titleOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
            Animated.timing(titleY, {
               toValue: 0,
               duration: 350,
               easing: Easing.out(Easing.cubic),
               useNativeDriver: true,
            }),
         ]),
         Animated.parallel([
            Animated.timing(subtitleOpacity, {
               toValue: 1,
               duration: 300,
               delay: 100,
               useNativeDriver: true,
            }),
            Animated.timing(subtitleY, {
               toValue: 0,
               duration: 350,
               delay: 100,
               easing: Easing.out(Easing.cubic),
               useNativeDriver: true,
            }),
         ]),
         Animated.delay(2000),
      ]).start(() => {
         canDismiss.current = true
         // ✅ ready já pode ser true sem ter re-disparado o useEffect — chama direto
         dismiss()
      })
   }, [])

   // ✅ Cobre o caso onde loading demora mais que a animação
   useEffect(() => {
      if (ready && canDismiss.current) dismiss()
   }, [ready, dismiss])

   return (
      <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
         {/* Logo / Ícone */}
         <Animated.View
            style={{
               opacity: logoOpacity,
               transform: [{ scale: logoScale }],
               marginBottom: 24,
            }}
         >
            <Image
               source={require("@/assets/icons/4do_icon_512_dark.jpg")}
               style={styles.iconImage}
               resizeMode="contain"
            />
         </Animated.View>

         {/* Título */}
         <Animated.Text
            style={[
               styles.title,
               {
                  opacity: titleOpacity,
                  transform: [{ translateY: titleY }],
               },
            ]}
         >
            4Do
         </Animated.Text>

         {/* Subtítulo */}
         <Animated.Text
            style={[
               styles.subtitle,
               { opacity: subtitleOpacity, transform: [{ translateY: subtitleY }] },
            ]}
         >
            Task Matrix · Eisenhower
         </Animated.Text>

         {/* Tagline */}
         <Animated.Text
            style={[
               styles.tagline,
               { opacity: subtitleOpacity, transform: [{ translateY: subtitleY }] },
            ]}
         >
            Faça o que importa primeiro.
         </Animated.Text>
      </Animated.View>
   )
}

const styles = StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors.background,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
   },
   iconImage: {
      width: 120,
      height: 120,
      borderRadius: 28, // mesma borda arredondada de antes
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
   },
   iconBox: {
      width: 96,
      height: 96,
      borderRadius: 28,
      backgroundColor: Colors.accent,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: Colors.accent,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
      elevation: 10,
   },
   iconText: {
      fontSize: 52,
      fontWeight: "900",
      color: "#FFF",
      letterSpacing: -2,
      lineHeight: 60,
   },
   iconDot: {
      position: "absolute",
      bottom: 14,
      right: 14,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "rgba(255,255,255,0.6)",
   },
   title: {
      fontSize: 42,
      fontWeight: "900",
      color: Colors.foreground,
      letterSpacing: -1.5,
      marginBottom: 8,
   },
   subtitle: {
      fontSize: 13,
      fontWeight: "600",
      color: Colors.muted,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      marginBottom: 32,
   },
   tagline: {
      fontSize: 15,
      color: Colors.muted,
      fontStyle: "italic",
      /* position: "absolute",
      bottom: 60, */
   },
})
