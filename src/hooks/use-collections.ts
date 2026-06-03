import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getCollections, 
  createCollection, 
  updateCollection, 
  deleteCollection 
} from '@/lib/firebase-service'
import { AdminCollection } from '@/lib/admin-store'

// --- Queries ---

export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: getCollections,
  })
}

// --- Mutations ---

export const useCreateCollection = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<AdminCollection, 'id'>) => createCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}

export const useUpdateCollection = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<AdminCollection>) => updateCollection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}

export const useDeleteCollection = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}
