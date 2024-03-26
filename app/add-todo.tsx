import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is Required",
    })
    .min(1, "Title is Required"),
});

type FormData = z.infer<typeof formSchema>;

const AddTodo = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await AsyncStorage.setItem("todo", JSON.stringify(data));
      router.back();
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  return (
    <View className='flex-1 px-6 bg-white'>
      <Stack.Screen
        options={{
          headerTitle: "Add Todo",
        }}
      />
      <View className='w-full pt-10'>
        <Controller
          control={form.control}
          name='title'
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <View className='w-full flex-col'>
              <Text className='text-base text-black  mb-0.5 tracking-normal'>
                Title
              </Text>
              <TextInput
                placeholder='Title'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className='border border-neutral-300 rounded-lg px-3 py-4 text-neutral-500 text-[16px] font-medium'
              />
              {fieldState.error && (
                <Text className='text-sm text-red-500  mt-0.5 tracking-normal'>
                  {fieldState.error.message}
                </Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          disabled={form.formState.isSubmitting}
          onPress={form.handleSubmit(onSubmit)}
        >
          <View className='w-full  rounded-lg mt-5 bg-indigo-500'>
            <Text className='text-center py-4 text-[16px] font-medium text-white'>
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodo;
