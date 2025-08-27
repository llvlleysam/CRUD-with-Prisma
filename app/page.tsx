"use client";

import useGetAllUsers from "@/Hooks/useGetAllUsers";
import FormAddUser from "./Components/FormAddUser";
import useDeleteUser from "@/Hooks/useDeleteUser";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useEditUser from "@/Hooks/useEditUser";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { PiSpinnerGapThin } from "react-icons/pi";

type TUser = {
  id: number;
  name: string;
  family: string;
  age: number;
  liked: boolean;
};

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: list, isLoading: loadingUsers } = useGetAllUsers();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const qc = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate, isPending: loadingDelete } = useDeleteUser();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userDel, setUserDel] = useState(null as number | null);
  function handleDelete(id: number) {
    return () => {
      setUserDel(id);
      mutate(id, {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["users"] });
        },
      });
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userEdited, setUserEdited] = useState<TUser | null>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: edit, isPending: loadingEdit } = useEditUser();
  function handelLike(user: TUser) {
    return () => {
      setUserDel(user.id);
      edit(
        { data: { liked: !user.liked }, id: user.id },
        {
          onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["users"] });
          },
        }
      );
    };
  }

  return (
    <div
      style={{ padding: 24 }}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <h1>Users CRUD</h1>

      <FormAddUser
        userEdited={userEdited}
        onclose={() => setUserEdited(null)}
      />

      {loadingUsers ? (
  <PiSpinnerGapThin className="animate-spin text-4xl" />
) : list && list.length === 0 ? (
  <p> There is no user Please add one</p>
) : (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list?.map((user: TUser, index : number) => (
          <li
            key={user.id}
            style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}
          >
            <div className="flex justify-between items-center">
              <div className="font-bold bg-sky-500 w-8 h-8 flex justify-center items-center rounded">{index+1}</div> {user.name} {user.family} | age: {user.age}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button
                disabled={userEdited !== null}
                onClick={handelLike(user)}
                className="py-2 px-4 rounded hover:scale-115 disabled:hover:scale-100 cursor-pointer transition-all duration-150"
              >
                {userDel !== null && userDel === user.id && loadingEdit ? (
                  <PiSpinnerGapThin className="animate-spin text-2xl" />
                ) : user.liked ? (
                  <FcLike className="text-2xl" />
                ) : (
                  <FcLikePlaceholder className="text-2xl" />
                )}
              </button>
              <button
                disabled={userEdited !== null}
                onClick={handleDelete(user.id)}
                className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 cursor-pointer transition-all duration-150 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {userDel !== null && userDel === user.id && loadingDelete
                  ? "deleting..."
                  : "delete"}
              </button>
              <button
                onClick={() => setUserEdited(user)}
                className="bg-orange-500 py-2 px-4 rounded hover:bg-orange-600 cursor-pointer transition-all duration-150"
              >
                edit
              </button>
            </div>
          </li>
        ))}
      </ul>)}
    </div>
  );
}
