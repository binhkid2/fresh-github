import { Handlers}  from "$fresh/server.ts"

export const handler: Handlers = {
    async POST(req) {
        const body = await req.json();
        
        const res = await fetch(`https://api.github.com/users/${body.q}`);
        if(res.status === 404){
          const err = await res.json();
          return new Response(JSON.stringify(err),{status:404});
        }
    
        const user = await res.json();
        return new Response(JSON.stringify(user));
      }
}