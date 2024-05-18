import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import * as AppAuth from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      if (token && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          navigation.replace("Main");
        } else {
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      } else {
        console.log("No token found");
      }
    };

    checkTokenValidity();
  }, []);

  async function authenticate() {
    const discovery = {
      authorizationEndpoint: "https://accounts.spotify.com/authorize",
      tokenEndpoint: "https://accounts.spotify.com/api/token",
    };
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: "b1e7b57b2df64e589a4df4a1c59135dd",
        scopes: [
          "user-read-email",
          "user-library-read",
          "user-read-recently-played",
          "user-top-read",
          "playlist-read-private",
          "playlist-read-collaborative",
          "playlist-modify-public",
        ],
        usePKCE: false,
        redirectUri: makeRedirectUri({
          scheme: "exp://192.168.1.4:8081/--/spotify-auth-callback",
        }),
      },
      discovery
    );
    // const config = {
    //   issuer: "https://accounts.spotify.com",
    //   clientId: "b1e7b57b2df64e589a4df4a1c59135dd",
    //   scopes: [
    //     "user-read-email",
    //     "user-library-read",
    //     "user-read-recently-played",
    //     "user-top-read",
    //     "playlist-read-private",
    //     "playlist-read-collaborative",
    //     "playlist-modify-public",
    //   ],
    //   redirectUrl: "exp://192.168.1.4:8081/--/spotify-auth-callback",
    // };
    // const result = await AppAuth.authAsync(config);
    console.log(result);
    if (result.accessToken) {
      const expirationDate = new Date(
        result.accessTokenExpirationDate
      ).getTime();
      AsyncStorage.setItem("token", result.accessToken);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());
      navigation.navigate("Main");
    }
  }
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          name="spotify"
          style={{ textAlign: "center" }}
          size={80}
          color={"white"}
        />

        <Text
          style={{
            color: "white",
            fontSize: Platform.OS === "android" ? 28 : 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on Spotify
        </Text>

        <View style={{ height: 80 }} />
        <Pressable
          onPress={authenticate}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>
            Sign In With {Platform.OS == "android" ? "Spotify " : "Spotify"}
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
          }}
        >
          <MaterialIcons name="phone-android" size={24} color={"white"} />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            Continue with phone number
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
          }}
        >
          <AntDesign name="google" size={24} color={"red"} />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            Continue with Google
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
          }}
        >
          <Entypo name="facebook" size={24} color={"#1028ff"} />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            Sign In with facebook
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
