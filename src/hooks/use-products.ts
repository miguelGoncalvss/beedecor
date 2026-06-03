import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getPublicProducts, 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  PublicProduct
} from '@/lib/firebase-service'
import { AdminProduct } from '@/lib/admin-store'

// --- Queries ---

export const usePublicProducts = () => {
  return useQuery({
    queryKey: ['products', 'public'],
    queryFn: getPublicProducts,
  })
}

export const useAdminProducts = () => {
  return useQuery({
    queryKey: ['products', 'admin'],
    queryFn: getProducts,
  })
}

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}

export const useFeaturedProducts = () => {
  const { data: products, ...rest } = usePublicProducts()
  const featured = products?.filter(p => p.destaque) || []
  return { data: featured, ...rest }
}

// --- Mutations ---

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<AdminProduct, 'id'>) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<AdminProduct>) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products', id] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
