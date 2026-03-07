import { BCN_ZONES } from "./barcelona"
import { MAD_ZONES } from "./madrid"

// Tipo de cada zona
type Zone = {
  zone: number
  lab: number
  fes: number
}

// Tipo de dirección
type Address = {
  address: string
  lat: number
  lng: number
  postalCode: string
}

export function calculatePrice(city: "barcelona" | "madrid", addresses: Address[]) {
  let total = 0
  const isHoliday = false

  addresses.forEach((a, index) => {
    const postal = a.postalCode

    if (city === "barcelona") {
      if (index === 0) {
        total += 2
        return
      }

      const zone: Zone | undefined = BCN_ZONES[postal as keyof typeof BCN_ZONES]

      if (zone) {
        total += isHoliday ? zone.fes : zone.lab
      }
    }

    if (city === "madrid") {
      const zone: Zone | undefined = MAD_ZONES[postal as keyof typeof MAD_ZONES]

      if (zone) {
        total += isHoliday ? zone.fes : zone.lab
      }
    }
  })

  return total
}
