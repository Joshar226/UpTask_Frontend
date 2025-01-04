import { addUserToProyect } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"


type SearchResultProps = {
    user: TeamMember,
    reset: () => void
}

export default function SearchResult({user, reset} : SearchResultProps) {
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: addUserToProyect,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
            toast.success(data)
            reset()
        }
    })

    const handleAddUserToProyect = () => {
        const data = {
            projectId,
            id: user._id
        }
        mutate(data)
    }

  return (
    <>
        <p className=" mt-10 text-center font-bold">Resultado:</p>
        <div className=" flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
            <p>{user.name}</p>
            <button
                type="button"
                className=" text-purple-700 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                onClick={handleAddUserToProyect}
            >
                Agregar al Proyecto
            </button>
        </div>
    </>
  )
}
