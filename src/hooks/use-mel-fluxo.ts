import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getMelFluxo, 
  updateMelNode, 
  createMelNode, 
  deleteMelNode 
} from '@/lib/firebase-service'
import { MelNode } from '@/lib/admin-store'

export const useMelFluxo = () => {
  return useQuery({
    queryKey: ['mel_fluxo'],
    queryFn: () => getMelFluxo(),
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}

export const useUpdateMelNode = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<MelNode> }) => 
      updateMelNode(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mel_fluxo'] })
    },
  })
}

export const useCreateMelNode = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: MelNode) => createMelNode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mel_fluxo'] })
    },
  })
}

export const useDeleteMelNode = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteMelNode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mel_fluxo'] })
    },
  })
}
