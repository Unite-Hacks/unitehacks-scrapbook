import { getSession } from "next-auth/react"

export const redirectIfUnauthenticated = async (context: any) => {
  const session = await getSession(context)

  if (!session) {
    const { res } = context

    res.writeHead(301, { Location: '/' })
    res.end()
   
    return true
  }
}
