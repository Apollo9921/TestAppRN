import { Image } from "react-native";

interface Props {
    selectedImage: string | undefined
}

function ImageSelected({selectedImage}: Props) {
        const imageSource = selectedImage ? { uri: selectedImage } : undefined;
        return (
            <Image
                source={imageSource}
                height={300}
                resizeMode="contain"
                className="mb-10"
            />
        );
}

export default ImageSelected;