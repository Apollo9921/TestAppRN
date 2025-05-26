import ImageSelected from '@/components/ImageSelected';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";


const Profile = () => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: false,
          quality: 1,
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        } else {
            alert('You did not select any image.');
        }
    }

    const OptionsLayout = () => {
        const options = [
            {
                "id": "0",
                "title": "Option 1"
            },
            {
                "id": "1",
                "title": "Option 2"
            },
            {
                "id": "2",
                "title": "Option 3"
            },
            {
                "id": "3",
                "title": "Option 4"
            },
        ]

        const [optionSelected, setOption] = useState("");

        return (
            <FlatList
                className='grow-0'
                numColumns={2}
                scrollEnabled={false}
                data={options}
                keyExtractor={item => item.id}
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => setOption(item.id)} activeOpacity={1}>
                        {(() => {
                            if (optionSelected != "" && optionSelected == item.id) {
                                return(
                                    <View className='bg-[white] mb-5 mx-5 p-10 border-2 border-solid border-indigo-500 rounded-xl'>
                                        <Text className='text-black font-sm'>{item.title}</Text> 
                                    </View>
                                )   
                            } else {
                                return (
                                    <View className='bg-[white] mb-5 mx-5 p-10 border-2 border-white rounded-xl'>
                                        <Text className='text-black font-sm'>{item.title}</Text> 
                                    </View>
                                )
                            }
                        })()}
                    </TouchableOpacity>
                }
            />
        )
    }

    return(
        <View className="bg-[purple] flex-1 p-[30]">
            <OptionsLayout />
            <ImageSelected selectedImage={selectedImage} />
            <Button 
                onPress={pickImageAsync}
                title={"Select Image"} 
                color={"#222222"}
            />
            <Button
                onPress={() => router.push("/screens/settings")}
                title={"Go to Settings"}
                color={"#444444"}
            />
        </View>
    );
}

export default Profile;