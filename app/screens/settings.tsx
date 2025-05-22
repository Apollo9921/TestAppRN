import { useRouter } from "expo-router";
import { Text, View } from "react-native";

const Settings = () => {
    const router = useRouter();

    return(
        <View className="bg-[purple] flex-1 p-[30]">
            <Text className="text-white font-sm text-xl">Settings Page</Text>
        </View>
    );
}

export default Settings;