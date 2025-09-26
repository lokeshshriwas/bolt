"use client"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
const page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({}))
  return (
    <div>
      <Button onClick={() => invoke.mutate({text : "John"})}>invoke backgriund job</Button>
    </div>  
  )
}

export default page