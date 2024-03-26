import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

const Home = () => {
  const [todos, setTodos] = useState<any>(null);

  const getTodos = async () => {
    try {
      const value = await AsyncStorage.getItem("todo");
      if (value !== null) {
        setTodos(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <View className='flex-1 items-center justify-center'>
      <Stack.Screen
        options={{
          headerTitle: "Todo List",
          headerRight: () => (
            <Button title='Add' onPress={() => router.push("/add-todo")} />
          ),
        }}
      />

      <Text>{todos}</Text>
    </View>
  );
};

export default Home;
