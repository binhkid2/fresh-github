import { useState } from "preact/hooks";
interface User {
  name: string;
  html_url: string;
  login: string;
  avatar_url: string;
}
export default function SearchGithubUser() {
  const [user, setUser] = useState<User | null>(null);
  const [q, setQ] = useState('');
  const [err,setErr] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(e:any) {
    e.preventDefault();
    setIsLoading(true);
 
      const res = await fetch('/api/github', {
        method:"POST",
        body: JSON.stringify({q}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if(res.ok){
        setUser(data)
        setErr(null)
        setIsLoading(false)
      }
      if(res.status === 404){
        setUser(null)
        setErr(data)
        setIsLoading(false)
      } 
    
   
  }

  function handleInput(e : any) {
    setQ(e.target.value)
  }

  return (
    <div>
      <section>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      name="q"
      value={q}
      onChange={handleInput}
      placeholder="Search Github user by Username"
      disabled={!user && isLoading}
      class={`w-full ${
        isLoading ? "!bg-gray-400" : "bg-gray-700"
      } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900`}
    />
    <button  class={`w-full ${
        isLoading ? "!bg-red-400" : "bg-red-700"
      } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900`}type="submit">Search</button>
  </form>
</section>
      {err ? (
  <h1>User not found</h1>
)
:(
<section>
    <a href={user?.html_url} target="_blank">
      <p>{user?.login}</p>
      <img src={user?.avatar_url} alt={user?.login} />
    </a>
  </section>
)
}


    </div>
  );
}
