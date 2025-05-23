import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Switch, Text, TouchableOpacity, View } from "react-native";

const Settings = () => {
    const router = useRouter();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <View className="bg-[purple] flex-1 p-[30]">
            <TouchableOpacity 
                onPress={router.back}
                activeOpacity={1}
                className="flex-row items-center"
            >
                <Image
                    source={require("@/assets/images/back.png")}
                    width={10}
                    height={10}
                    tintColor={"#ffffff"}
                />
                <Text className="text-white font-bold text-xl ml-5">Settings</Text>
            </TouchableOpacity>
            <View className="flex-row p-10 items-center">
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text className="text-white font-sm text-xl">Activate Biometric</Text>
            </View>            
        </View>
    );
}

export default Settings;