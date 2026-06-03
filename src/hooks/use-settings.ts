import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSettings, updateSettings } from '@/lib/firebase-service'
import { AdminSettings } from '@/lib/admin-store'

// --- Queries ---

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })
}

// --- Mutations ---

export const useUpdateSettings = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<AdminSettings>) => updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}
