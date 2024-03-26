import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import TodoItem from "../components/todo-item";

const Home = () => {
  const {
    data: todos,
    refetch,
    status,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const value = await AsyncStorage.getItem("todo");
      const todos = JSON.parse(value || "[]") as Todo[];
      return todos;
    },
    select(data) {
      const reversed = data.reverse();

      return reversed;
    },
  });

  const handleDeleteAll = async () => {
    await AsyncStorage.removeItem("todo");
    refetch();
  };

  return (
    <View className='flex-1 bg-white'>
      <Stack.Screen
        options={{
          headerTitle: "Todo List",
          headerRight: () => (
            <Button title='Add' onPress={() => router.push("/add-todo")} />
          ),
        }}
      />

      <View className='w-full px-6 py-4'>
        <TouchableOpacity className='ml-auto' onPress={handleDeleteAll}>
          <Text className='text-end text-blue-500'>Delete All</Text>
        </TouchableOpacity>
      </View>

      {status === "success" && (
        <>
          {todos.length > 0 ? (
            <FlatList
              data={todos ?? []}
              renderItem={({ item }) => <TodoItem {...item} />}
            />
          ) : (
            <View className='flex-1 items-center justify-center'>
              <Text className='text-center text-lg'>No Todo Found</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Home;
