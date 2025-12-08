import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Guest Mode</h1>
      <div className="space-x-10">
        <Link href={"/login"}>Login</Link>
        <Link href={"/register/role-selection"}>Register</Link>
      </div>
    </div>
  );
}
