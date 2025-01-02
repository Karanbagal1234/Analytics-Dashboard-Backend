import { average, bounceRate } from '../_helpers/SessonData.js';
import Anlytics from '../model/Anlytics.js'
import User from '../model/User.js'
import StatusFormat from '../_helpers/NumberFormat.js'

const cardController = async (req, res, next) => {
  
    let data =  {
     TotalVisite: await Anlytics.countDocuments(),
     TotalUsers: await User.countDocuments(),
    bouncerate: await bounceRate(),
    Average:await average(),
     Status: StatusFormat(await User.countDocuments({Status:'Active'})),
    }


res.send(data)

 }
 export default cardController;