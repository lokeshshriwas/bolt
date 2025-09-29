"use client"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
const page = () => {
  const [value, setValue] = useState("")
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({}))
  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => invoke.mutate({value : value})}>invoke background job</Button>
    </div>  
  )
}

export default page