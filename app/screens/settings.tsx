import storage from "@/storage/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Switch, Text, TouchableOpacity, View } from "react-native";

const Settings = () => {
    const router = useRouter();
    const [isEnabled, setIsEnabled] = useState(false);   

    function checkIfBiometricIsActive() {
        storage.load({
            key: 'biometricState',
            id: '0'
        })
        .then(ret => {            
            setIsEnabled(ret.isActive);
        })
        .catch(err => {
            console.warn(err.message);
            setIsEnabled(false);
        });
        return isEnabled;
    }

    function updateBiometricState(state: boolean) {
        var value = {
            isActive: state            
        };

        storage.save({
            key: 'biometricState',
            id: '0',
            data: value,
            expires: null
        });

        return setIsEnabled(state);
    }

    checkIfBiometricIsActive();

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
                    onValueChange={(value) => updateBiometricState(value)}
                    value={isEnabled}
                />
                <Text className="text-white font-sm text-xl">Activate Biometric</Text>
            </View>            
        </View>
    );
}

export default Settings;