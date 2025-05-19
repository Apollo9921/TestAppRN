import ListUsers from "@/components/ListUsers";
import { Begin } from "@/interfaces/users";
import { getListUsers } from "@/services/api";
import { useEffect, useState } from "react";
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
  const [userData, setUserData] = useState<Begin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getListUsers();
        setUserData(response);
        setLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err);
        setLoading(false);
        console.error("Error fetching users:", err?.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
        <View className="bg-[purple] flex-1 p-[30]">
          <Text className="text-white">Loading users...</Text>
        </View>
    );
  }

  if (error) {
    return (
        <View className="bg-[purple] flex-1 p-[30]">
          <Text className="text-white">Error loading users</Text>
        </View>
    );
  }

  if (userData) {
    return <Home userData={userData} />; // Pass the fetched data as a prop
  }

  return (
      <View className="bg-[purple] flex-1 p-[30]">
        <Text className="text-white">No data loaded.</Text>
      </View>
  );
};

export default Index;