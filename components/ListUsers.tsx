import '@/app/globals.css';
import { User } from '@/interfaces/users';
import { Image, Text, View } from "react-native";

const ListNotes = ({ email, first_name, last_name, avatar }: User) => {

    return (
        <View className="bg-[white] p-[20]">            
            <View className='flex-row flex-wrap items-center'>
                <Image 
                    source={{uri: avatar}} 
                    resizeMode='cover' 
                    style={{ width: '30%', height: undefined, aspectRatio: 1 }}
                    className='overflow-hidden rounded-full' 
                />
                <View className='flex-column flex-grow'>
                    <Text className='text-black font-bold text-xl ml-5'>{first_name} {last_name}</Text>
                    <Text className='text-black sm-bold text-base ml-2'>{email}</Text>
                </View>
            </View>
        </View>
    );
}

export default ListNotes;