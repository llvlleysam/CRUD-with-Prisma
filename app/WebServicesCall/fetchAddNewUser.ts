type TData = {
  name?: string;
  family?: string;
  age?: number;
  liked?: boolean;
};

export default async function fetchAddNewUser(newUser: TData) {
    console.log(typeof newUser.age);
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
