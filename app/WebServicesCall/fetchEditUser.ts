type TData = {
  id?: number;
  name?: string;
  family?: string;
  age?: number;
  liked?: boolean;
};

export default async function fetchEditUser(updatedUser: TData, id: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: { "Content-Type": "application/json" },
    });
    const data: TData = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
