import { useRouter } from "next/router"
import Cookies from "js-cookie"

export default function Logout(){
const router = useRouter()
    localStorage.setItem("user", '')
    Cookies.remove("user")
    router.push("/")

    return(<div></div>)
}