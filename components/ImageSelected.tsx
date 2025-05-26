import { Image, View } from "react-native";

interface Props {
    selectedImage: string | undefined
}

function ImageSelected({selectedImage}: Props) {
        const imageSource = selectedImage ? { uri: selectedImage } : undefined;
        return (
            <>
            <View className='items-center'>
                <Image
                    source={imageSource}
                    resizeMode="cover"
                    style={{ width: 150, height: 150, borderRadius: 75, overflow: 'hidden' }}
                    className="mb-10" />
            </View>    
            </>
        );
}

export default ImageSelected;