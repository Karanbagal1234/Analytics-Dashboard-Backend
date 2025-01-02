import getBounceRateData from '../_helpers/BounceRate.js'
import DaySortArray from '../_helpers/DaySorter.js'
import Device from '../_helpers/Device.js'
import PageURLdata from '../_helpers/PageURLdata.js'
import getSessionDurationData from '../_helpers/SessionChartData.js'
import Source from '../_helpers/sourceSorter.js'
import getNewVsReturningData from '../_helpers/viewerType.js'

const traficOverview = async(req,res)=>{

  res.send({
    days: await DaySortArray(),
    ref:await Source(),
    device: await Device(),
    BounceRate: await getBounceRateData(),
    SessionChart : await getSessionDurationData(),
    NewvsReturning: await getNewVsReturningData(),
    Url: await PageURLdata(),
  })
}
export default traficOverview;