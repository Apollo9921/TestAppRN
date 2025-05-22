import ListUsers from "@/components/ListUsers";
import { User } from "@/interfaces/users";
import getListUsers from "@/services/getListUsers";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";


const Search = () => {
    const [filteredUsers, setFiltered] = useState<User[]>();
    const [search, setSearch] = useState("");

    const {users, isLoading, isError, error} = getListUsers();

    function handleSearch(query: string) {
        if(users) {
            setSearch(query);
            const filtered = users?.data.filter(user => 
                user.email.toLowerCase().includes(query.toLowerCase())
            )
            setFiltered(filtered);
        }
    }
    
    if (isLoading) {
        return (
            <View className="bg-[purple] flex-1 p-[30] justify-center">
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }
    
    if (isError) {
        return (
            <View className="bg-[purple] flex-1 p-[30] justify-center">
                <Text className="text-white text-center">Error loading users {error?.message}</Text>
            </View>
        );
    }

    return (
        <View className="bg-[purple] flex-1 p-[10]">                   
            <View className="flex-1 mb-12">
                <View className="flex-row ml-20 mt-10 mb-5 mr-20 justify-center">
                    <TextInput
                        className="w-full border-2 border-white"
                        onChangeText={txt => handleSearch(txt)}
                        value={search}
                        placeholder="Search for a person..."
                        placeholderTextColor="white"
                    />
                </View>                
                <FlatList
                    data={filteredUsers}
                    renderItem={({item}) => (
                        <>
                            <ListUsers email={item.email} first_name={item.first_name} last_name={item.last_name} avatar={item.avatar} id={item.id} />
                        </>
                    )}
                    keyExtractor={item => item.id.toString()}
                    scrollEnabled={true}
                    ItemSeparatorComponent={() => <View className="h-6" />}                                                                                         
                    className="p-[10] mb-12"
                />
            </View>
        </View>
    );
}

export default Search;