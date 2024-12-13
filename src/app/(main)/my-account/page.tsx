import { api } from "@/trpc/server";

export default async function MyAccountPage() {
  const hello = await api.post.hello({ text: "My Account" });
  
  return (
    <div>
        <h1>{hello.greeting}</h1>
    </div>
  )
}
