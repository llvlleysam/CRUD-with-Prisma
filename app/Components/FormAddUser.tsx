"use client";

import useAddNewUser from "@/Hooks/useAddNewUser";
import useEditUser from "@/Hooks/useEditUser";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type TData = {
  id?: number;
  name?: string;
  family?: string;
  age?: number;
  liked?: boolean;
};

export default function FormAddUser({
  userEdited,
  onclose,
}: {
  userEdited?: TData | null;
  onclose: () => void;
}) {
  const qc = useQueryClient();

  const { register, handleSubmit, setValue, reset ,} = useForm({
    defaultValues: {
      name: "",
      family: "",
      age: 0,
      liked: false,
    },
  });

  const { mutate, isPending } = useAddNewUser();
  function handelCreate(data: TData) {
    mutate(data, {
      onSuccess: () => {
        reset();
        qc.invalidateQueries({ queryKey: ["users"] });
      },
    });
  }

  const { mutate: edit, isPending: isPendingEdit } = useEditUser();

  function handleEdit(user: TData) {
    edit(
      { data: user, id: userEdited?.id || 0 },
      {
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["users"] });
            reset();
        },
      }
    );
  }

  function onSubmit(data: TData) {
    if (userEdited !== null) {
      handleEdit(data);
    } else {
      handelCreate(data);
    }
    onclose();
  }

  if (userEdited !== null) {
    setValue("name", userEdited?.name || "");
    setValue("family", userEdited?.family || "");
    setValue("age", userEdited?.age || 0);
    setValue("liked", userEdited?.liked || false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid", gap: 8, maxWidth: 360, marginBottom: 16 }}
      className="bg-gray-50/30 p-4 rounded"
    >
      <input
        className="bg-gray-50/30 p-4 rounded"
        placeholder="name"
        {...register("name")}
      />
      <input
        className="bg-gray-50/30 p-4 rounded"
        placeholder="family"
        {...register("family")}
      />
      <label className="flex gap-2">
        <span className="">age</span>
      <input
        className="bg-gray-50/30 p-4 rounded"
        placeholder="age"
        type="number"
        {...register("age", { valueAsNumber: true })}
      />
      </label>
      <label className="flex gap-2">
        <input type="checkbox" {...register("liked")} />
        liked
      </label>
      <div className="flex gap-2">
        {userEdited && (
          <button
            onClick={() => {
              reset();
              onclose();
            }}
            className="bg-purple-500 py-2 px-4 rounded hover:bg-purple-600 cursor-pointer transition-all duration-150"
          >
            cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-green-500 py-2 px-4 rounded hover:bg-green-600 cursor-pointer transition-all duration-150 w-full"
        >
          {userEdited ? (
            <p>{isPendingEdit ? "Editing..." : "Edit"}</p>
          ) : (
            <p>{isPending ? "Adding..." : "Create"}</p>
          )}
        </button>
      </div>
    </form>
  );
}
