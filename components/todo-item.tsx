import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TodoItem = (props: Todo) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const todos = queryClient.getQueryData(["todos"]) as Todo[];

    const newTodos = todos?.filter((todo) => todo._id !== props._id);

    await AsyncStorage.setItem("todo", JSON.stringify(newTodos));

    await queryClient.refetchQueries({
      queryKey: ["todos"],
    });
  };

  return (
    <View className='px-6 border-b-[1px] border-neutral-200 py-3 w-full flex-row flex items-center justify-between'>
      <Text className='text-base '>{props.title}</Text>

      <View className='items-center flex-row gap-5'>
        <TouchableOpacity onPress={handleDelete}>
          <Trash className='text-xs text-red-500' size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;
