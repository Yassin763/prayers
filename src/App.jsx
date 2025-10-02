import { useEffect, useState } from "react"
import Prayer from "./component/prayer"

function App() {
  const cities = [
    { "name": "القاهرة", "value": "Cairo" },
    { "name": "الأسكندرية", "value": "Alexandria" },
    { "name": "اسوان", "value": "Aswan" },
    { "name": "الجيزة", "value": "Giza" },
    { "name": "الأقصر", "value": "Luxor" },
    { "name": "المنصورة", "value": "Mansoura" },
    { "name": "السويس", "value": "Suez" },
    { "name": "دمياط", "value": "Damietta" },
    { "name": "المنيا", "value": "Minya" },
    { "name": "بني سويف", "value": "Beni Suef" },
    { "name": "الإسماعيلية", "value": "Ismailia" },
    { "name": "الفيوم", "value": "Faiyum" },
    { "name": "الشرقية", "value": "Sharqia" },
    { "name": "الدقهلية", "value": "Dakahlia" },
    { "name": "قنا", "value": "Qena" },
    { "name": "سوهاج", "value": "Sohag" },
    { "name": "مطروح", "value": "Matrouh" },
    { "name": "البحر الأحمر", "value": "Red Sea" },
    { "name": "كفر الشيخ", "value": "Kafr El Sheikh" },
    { "name": "الغربية", "value": "Gharbia" },
    { "name": "القليوبية", "value": "Qalyubia" },
    { "name": "المنوفية", "value": "Monufia" },
    { "name": "البحيرة", "value": "Beheira" },
    { "name": "أسيوط", "value": "Assiut" },
    { "name": "بورسعيد", "value": "Port Said" },
    { "name": "شمال سيناء", "value": "North Sinai" },
    { "name": "جنوب سيناء", "value": "South Sinai" }
  ]

  const [prayertimes , Setprayertimes] = useState({})

  const [date , Setdate] = useState("")

  const [city , Setcity] = useState("Cairo")
  
  useEffect(() => {
    async function fetchdata() {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/02-10-2025?city=${city}&country=Egypt&method=5`)
      const body = await response.json()
      Setprayertimes(body.data.timings)
      Setdate(body.data.date.gregorian.date)
    }
    fetchdata()
  } , [city])

  return (
    <>
      <section>
        <div className="container">
          <div className="top_sec">
            <div className="city">
              <h3>المدينة</h3>
              <select name="" id="" onChange={(e) => Setcity(e.target.value)}>
                {
                  cities.map(cityObj => (
                    <option key={cityObj.value} value={cityObj.value}>{cityObj.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="date">
              <h3>التاريخ</h3>
              <h4>{date}</h4>
            </div>
          </div>
          <Prayer name={"الفجر:"} time={prayertimes.Fajr} />
          <Prayer name={"الظهر:"} time={prayertimes.Dhuhr} />
          <Prayer name={"العصر:"} time={prayertimes.Asr} />
          <Prayer name={"المغرب:"} time={prayertimes.Maghrib} />
          <Prayer name={"العشاء:"} time={prayertimes.Isha} />
        </div>
      </section>
    </>
  )
}

export default App
