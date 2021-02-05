// 
import axios from 'axios'

/* interface Location {
    "address": string,
    "content": {
        "address_detail": {
            "province": "浙江省",
            "city": "杭州市",
            "district": "",
            "street": "",
            "street_number": "",
            "city_code": 179
        },
        "address": "浙江省杭州市",
        "point": {
            "y": "3515188.13",
            "x": "13382905.27"
        }
    },
    "status": number
} */
export function getCityInfo() {
    const url = 'http://api.map.baidu.com/location/ip?ak=juQI7ubxirLbo1tPwX1qKzdwz4aXvElo'
    return axios.get(url)
}