import mongoose from 'mongoose'

const municipalitySchema = new mongoose.Schema({
  coordinates: {
    type: [
      {
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  state_code: {
    type: Number,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
    required: true,
  },
  municipality_type: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
})

const Municipality =
  mongoose.models.municipalities ||
  mongoose.model('municipalities', municipalitySchema)

export default Municipality
