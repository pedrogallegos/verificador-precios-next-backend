import * as dotenv from 'dotenv'

// Load environment variables from.env file
dotenv.config({ path: '.env' })

export const config = {
  PORT: process.env.PORT || 4000,
  // Railway usará las variables de entorno individuales
  MONGODB_URI: process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  JWT_ISSUER: process.env.JWT_ISSUER,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
  SENDGRID_FROM_NAME: process.env.SENDGRID_FROM_NAME,
  SENDGRID_TEMPLATE_ID_NEW_CLIENT: process.env.SENDGRID_TEMPLATE_ID_NEW_CLIENT
}