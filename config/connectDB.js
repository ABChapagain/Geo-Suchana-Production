import express from 'express'

import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    )
  } catch (error) {
    console.log(`Error: ${error.nessage}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
