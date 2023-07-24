import asyncHandler from 'express-async-handler'
// import localLevelData from '../datas/localLevelData.js'
import Municipality from '../models/municipalitiesModel.js'

function pointInPolygon(point, polygon) {
  var x = point[0],
    y = point[1]
  var inside = false

  for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    var xi = polygon[i].lat,
      yi = polygon[i].lng
    var xj = polygon[j].lat,
      yj = polygon[j].lng

    var intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi

    if (intersect) inside = !inside
  }

  return inside
}

const getDetails = asyncHandler(async (req, res) => {
  const localLevelData = await Municipality.find({})
  const { lat, lng } = req.query

  if (!lat || !lng) {
    res.status(400)
    throw new Error('Invalid lat or lng')
  }

  const point = [parseFloat(lat), parseFloat(lng)]

  let isNotInside = false
  for (var i = 0; i < localLevelData.length; i++) {
    var polygon = localLevelData[i].coordinates
    var isInside = pointInPolygon(point, polygon)
    if (isInside) {
      res.json({
        coordintes: {
          lat,
          lng,
        },
        name: localLevelData[i].name,
        state_code: localLevelData[i].state_code,
        district: localLevelData[i].district,
        municipality: localLevelData[i].municipality,
        municipality_type: localLevelData[i].municipality_type,
        province: localLevelData[i].province,
        success: true,
      })
      return
      break
    } else {
      isNotInside = true
    }
  }

  if (isNotInside) {
    res.json({
      message: 'Coordinates is not inside any municipality',
      success: false,
    })
  }
})

export { getDetails }
