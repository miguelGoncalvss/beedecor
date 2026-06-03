import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'

function getAdminApp(): App | null {
  if (getApps().length > 0) return getApps()[0]

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('⚠️ Firebase Admin environment variables are missing. Admin features will be unavailable.')
    return null
  }

  // Handle common formatting issues in environment variables
  privateKey = privateKey.replace(/\\n/g, '\n')
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.substring(1, privateKey.length - 1)
  }

  try {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      })
    })
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error)
    return null
  }
}

const adminApp = getAdminApp()

export const adminAuth = adminApp ? getAuth(adminApp) : null as unknown as Auth
