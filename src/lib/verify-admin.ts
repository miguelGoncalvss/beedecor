import { adminAuth } from './firebase-admin'

export const verifyAdminToken = async (
  request: Request
): Promise<boolean> => {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) return false
    const token = authHeader.split('Bearer ')[1]
    const decoded = await adminAuth.verifyIdToken(token)
    return decoded.uid === process.env.FIREBASE_ADMIN_UID
  } catch {
    return false
  }
}
