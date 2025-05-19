import ListUsers from "@/components/ListUsers";
import { Begin } from "@/interfaces/users";
import getListUsers from "@/services/getListUsers";
import { FlatList, Text, View } from "react-native";

interface Data {
    userData: Begin
}

const Home = ({ userData }: Data) => {
  return (
      <View className="bg-[purple] flex-1 p-[30]">
        <View className="flex-1 mb-12">
          <FlatList
            data={userData?.data}
            renderItem={({item}) => (
              <ListUsers email={item.email} first_name={item.first_name} last_name={item.last_name} avatar={item.avatar} id={item.id} />
            )}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={true}
            ItemSeparatorComponent={() => <View className="h-6" />}
            className="p-[10]"
          />
        </View>
      </View>
  );
}

const Index = () => {
  const {users, isLoading, isError, error} = getListUsers();

  if (isLoading) {
    return (
        <View className="bg-[purple] flex-1 p-[30]">
          <Text className="text-white">Loading users...</Text>
        </View>
    );
  }

  if (isError) {
    return (
        <View className="bg-[purple] flex-1 p-[30]">
          <Text className="text-white">Error loading users {error?.message}</Text>
        </View>
    );
  }

  return (
    <Home userData={users} />
  );
};

export default Index;