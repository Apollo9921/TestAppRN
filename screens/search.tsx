import ListUsers from "@/components/ListUsers";
import { Begin, User } from "@/interfaces/users";
import { getListUsers } from "@/services/api";
import { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";


const Search = () => {
    const [userData, setUserData] = useState<Begin | null>(null);
    const [filteredUsers, setFiltered] = useState<User[]>();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getListUsers();
            setUserData(response);
          } catch (err: any) {
            console.error("Error fetching users:", err?.message);
          }
        };
    
        fetchData();
    }, []);

    function handleSearch(query: string) {
        setSearch(query);
        const filtered = userData?.data.filter(user => 
            user.email.toLowerCase().includes(query.toLowerCase())
        )
        setFiltered(filtered);
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