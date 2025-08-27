
export default async function fetchDeleteUser(id:number) {
  try{
    const res = await fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    return data
  }catch (error) {
    console.log(error);
  }
}
